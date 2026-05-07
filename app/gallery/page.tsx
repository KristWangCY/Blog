"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/ui/BackButton";

type Photo = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  image_path: string;
  album: string | null;
  location: string | null;
  taken_at: string | null;
  created_at: string;
};

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPhotos() {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setPhotos(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadPhotos();
  }, []);

  async function handleDelete(photo: Photo) {
    const confirmed = confirm("Are you sure you want to delete this photo?");

    if (!confirmed) return;

    const { error: storageError } = await supabase.storage
      .from("photos")
      .remove([photo.image_path]);

    if (storageError) {
      alert(storageError.message);
      return;
    }

    const { error: dbError } = await supabase
      .from("photos")
      .delete()
      .eq("id", photo.id);

    if (dbError) {
      alert(dbError.message);
      return;
    }

    setPhotos((prev) => prev.filter((item) => item.id !== photo.id));
    alert("Photo deleted successfully.");
  }

  async function handleDownload(photo: Photo) {
    const response = await fetch(photo.image_url);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = photo.title || "photo";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-12 text-white">
        <p>Loading gallery...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <BackButton />

          <Link
            href="/upload"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Upload Photo
          </Link>
        </div>

        <h1 className="mb-3 text-5xl font-bold">
          Gallery
        </h1>

        <p className="mb-10 text-zinc-400">
          A personal photo album of travel, life, and memories.
        </p>

        {photos.length === 0 ? (
          <p className="text-zinc-500">
            No photos uploaded yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={photo.image_url}
                    alt={photo.title || "Gallery photo"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-3 p-5">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {photo.title || "Untitled"}
                    </h2>

                    <p className="text-sm text-zinc-400">
                      {photo.album || "Daily Life"}
                    </p>

                    {photo.location && (
                      <p className="mt-1 text-sm text-zinc-500">
                        {photo.location}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDownload(photo)}
                      className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
                    >
                      Download
                    </button>

                    <button
                      onClick={() => handleDelete(photo)}
                      className="rounded-xl border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}