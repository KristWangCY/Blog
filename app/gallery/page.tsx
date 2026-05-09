"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/ui/BackButton";

type Photo = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
};

type Album = {
  id: string;
  title: string;
  description: string | null;
  photos: Photo[];
};

export default function GalleryPage() {
  return (
    <Suspense fallback={<GalleryLoading />}>
      <GalleryContent />
    </Suspense>
  );
}

function GalleryLoading() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-zinc-400">Loading gallery...</p>
      </div>
    </main>
  );
}

function GalleryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "/";
  const albumFromUrl = searchParams.get("album");

  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(
    albumFromUrl
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumDescription, setNewAlbumDescription] = useState("");

  const selectedAlbum = albums.find((album) => album.id === selectedAlbumId);

  useEffect(() => {
    setSelectedAlbumId(albumFromUrl);
  }, [albumFromUrl]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  async function fetchAlbums() {
    setLoading(true);

    const { data, error } = await supabase
      .from("albums")
      .select(`
        id,
        title,
        description,
        photos (
          id,
          title,
          description,
          image_url
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setAlbums((data as Album[]) || []);
    setLoading(false);
  }

  function openAlbum(albumId: string) {
    setSelectedAlbumId(albumId);
    router.replace(
      `/gallery?album=${albumId}&from=${encodeURIComponent(from)}`
    );
  }

  function backToAlbums() {
    setSelectedAlbumId(null);
    router.replace(`/gallery?from=${encodeURIComponent(from)}`);
  }

  async function handleCreateAlbum() {
    const title = newAlbumTitle.trim();

    if (!title) {
      alert("Please enter an album name.");
      return;
    }

    const { data, error } = await supabase
      .from("albums")
      .insert({
        title,
        description: newAlbumDescription.trim() || "New album",
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    const newAlbum: Album = {
      id: data.id,
      title: data.title,
      description: data.description,
      photos: [],
    };

    setAlbums((prev) => [newAlbum, ...prev]);
    setSelectedAlbumId(newAlbum.id);

    router.replace(
      `/gallery?album=${newAlbum.id}&from=${encodeURIComponent(from)}`
    );

    setNewAlbumTitle("");
    setNewAlbumDescription("");
    setIsCreateOpen(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-zinc-800 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          {selectedAlbumId ? (
            <BackButton onClick={backToAlbums} />
          ) : (
            <BackButton onClick={() => router.push(from)} />
          )}

          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Personal Gallery
              </p>

              <h1 className="mt-3 text-5xl font-bold">
                {selectedAlbum ? selectedAlbum.title : "Gallery"}
              </h1>

              {selectedAlbum && (
                <p className="mt-4 max-w-xl text-zinc-400">
                  {selectedAlbum.description}
                </p>
              )}
            </div>

            {selectedAlbum ? (
              <Link
                href={`/upload?album=${selectedAlbum.id}&from=${encodeURIComponent(
                  from
                )}`}
                className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                Upload Photo
              </Link>
            ) : (
              <button
                onClick={() => setIsCreateOpen(true)}
                className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                + New Album
              </button>
            )}
          </div>
        </div>
      </section>

      {!selectedAlbum && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          {loading ? (
            <p className="text-zinc-400">Loading albums...</p>
          ) : albums.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-700 p-20 text-center">
              <p className="text-lg text-zinc-400">No albums yet</p>
              <p className="mt-3 text-sm text-zinc-500">
                Create your first album.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <button
                  key={album.id}
                  onClick={() => openAlbum(album.id)}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-left transition hover:border-zinc-600"
                >
                  <h2 className="text-3xl font-semibold">{album.title}</h2>

                  <p className="mt-4 leading-7 text-zinc-400">
                    {album.description}
                  </p>

                  <p className="mt-10 text-sm uppercase tracking-[0.2em] text-zinc-500">
                    {album.photos?.length || 0} Photos
                  </p>
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {selectedAlbum && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          {selectedAlbum.photos.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-700 p-20 text-center">
              <p className="text-lg text-zinc-400">No photos yet</p>
              <p className="mt-3 text-sm text-zinc-500">
                Upload your first photo into this album.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {selectedAlbum.photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedImage(photo.image_url)}
                  className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 text-left transition hover:border-zinc-600"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={photo.image_url}
                      alt={photo.title || "Gallery photo"}
                      width={1200}
                      height={800}
                      className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-sm leading-6 text-zinc-400">
                      {photo.title || photo.description || "Untitled photo"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6">
          <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
            <h2 className="text-3xl font-bold">New Album</h2>

            <div className="mt-8 space-y-5">
              <input
                value={newAlbumTitle}
                onChange={(e) => setNewAlbumTitle(e.target.value)}
                placeholder="Album name"
                className="w-full rounded-2xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-500"
              />

              <textarea
                value={newAlbumDescription}
                onChange={(e) => setNewAlbumDescription(e.target.value)}
                placeholder="Description"
                className="min-h-[120px] w-full rounded-2xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsCreateOpen(false);
                  setNewAlbumTitle("");
                  setNewAlbumDescription("");
                }}
                className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateAlbum}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-zinc-200"
              >
                Create Album
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-6 top-6 text-4xl text-white hover:text-zinc-400"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <div onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Large preview"
              width={2000}
              height={1500}
              className="max-h-[90vh] w-auto rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}