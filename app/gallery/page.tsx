"use client";

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

  const selectedAlbum = albums.find(
    (album) => album.id === selectedAlbumId
  );

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

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-zinc-800 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          {selectedAlbumId ? (
            <BackButton onClick={backToAlbums} />
          ) : (
            <BackButton onClick={() => router.push(from)} />
          )}

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Personal Gallery
            </p>

            <h1 className="mt-3 text-5xl font-bold">
              {selectedAlbum
                ? selectedAlbum.title
                : "Gallery"}
            </h1>

            {selectedAlbum && (
              <p className="mt-4 max-w-xl text-zinc-400">
                {selectedAlbum.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {!selectedAlbum && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          {loading ? (
            <p className="text-zinc-400">
              Loading albums...
            </p>
          ) : albums.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-700 p-20 text-center">
              <p className="text-lg text-zinc-400">
                No albums yet
              </p>

              <p className="mt-3 text-sm text-zinc-500">
                No albums available.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => {
                const coverPhoto = album.photos?.[0];

                return (
                  <button
                    key={album.id}
                    onClick={() => openAlbum(album.id)}
                    className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 text-left transition hover:border-zinc-600"
                  >
                    {coverPhoto ? (
                      <img
                        src={coverPhoto.image_url}
                        alt={coverPhoto.title || album.title}
                        className="h-[260px] w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-[260px] items-center justify-center bg-zinc-950 text-zinc-600">
                        No Cover
                      </div>
                    )}

                    <div className="p-8">
                      <h2 className="text-3xl font-semibold">
                        {album.title}
                      </h2>

                      <p className="mt-4 leading-7 text-zinc-400">
                        {album.description}
                      </p>

                      <p className="mt-10 text-sm uppercase tracking-[0.2em] text-zinc-500">
                        {album.photos?.length || 0} Photos
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      )}

      {selectedAlbum && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          {selectedAlbum.photos.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-700 p-20 text-center">
              <p className="text-lg text-zinc-400">
                No photos yet
              </p>

              <p className="mt-3 text-sm text-zinc-500">
                No photos available in this album.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {selectedAlbum.photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() =>
                    setSelectedImage(photo.image_url)
                  }
                  className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 text-left transition hover:border-zinc-600"
                >
                  <img
                    src={photo.image_url}
                    alt={photo.title || "Gallery photo"}
                    className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="p-5">
                    <p className="text-base font-medium text-white">
                      {photo.title || "Untitled photo"}
                    </p>

                    {photo.description && (
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {photo.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
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

          <img
            src={selectedImage}
            alt="Large preview"
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}