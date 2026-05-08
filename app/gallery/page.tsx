"use client";

import Image from "next/image";
import { useState } from "react";

const galleryImages = [
  {
    src: "/images/gallery-1.jpg",
    alt: "My favourite guitar player - Eric Clapton",
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <section className="border-b border-zinc-800 px-6 py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Personal Gallery
            </p>

            <h1 className="mt-3 text-5xl font-bold">
              Gallery
            </h1>
          </div>

          <button
            onClick={() => window.history.back()}
            className="rounded-full border border-zinc-700 px-5 py-2 text-sm transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            Back
          </button>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <button
              key={image.src}
              onClick={() => setSelectedImage(image.src)}
              className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 text-left transition hover:border-zinc-600"
            >
              <div className="overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-sm leading-6 text-zinc-400">
                  {image.alt}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FULLSCREEN MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setSelectedImage(null)}
        >
          {/* CLOSE BUTTON */}
          <button
            className="absolute right-6 top-6 text-4xl text-white transition hover:text-zinc-400"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          {/* LARGE IMAGE */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
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