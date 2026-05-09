"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/ui/BackButton";

export default function UploadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const albumId = searchParams.get("album");

  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  function backToAlbum() {
    if (albumId) {
      router.push(`/gallery?album=${albumId}`);
    } else {
      router.push("/gallery");
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    if (!albumId) {
      alert("Missing album id.");
      return;
    }

    if (files.length === 0) {
      alert("Please choose at least one photo.");
      return;
    }

    setLoading(true);

    try {
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const filePath = `${albumId}/${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("photos")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("photos")
          .getPublicUrl(filePath);

        const imageUrl = data.publicUrl;

        const { error: dbError } = await supabase.from("photos").insert({
          album_id: albumId,
          title: title || file.name,
          description,
          location,
          image_url: imageUrl,
          image_path: filePath,
        });

        if (dbError) throw dbError;
      }

      alert("Photos uploaded successfully!");
      router.push(`/gallery?album=${albumId}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Upload failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <BackButton onClick={backToAlbum} />

        <h1 className="mb-3 text-5xl font-bold">Upload Photos</h1>

        <p className="mb-10 text-zinc-400">
          Add new memories to your selected album.
        </p>

        <form
          onSubmit={handleUpload}
          className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
        >
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Photo Title
            </label>

            <input
              className="w-full rounded-2xl border border-zinc-700 bg-black p-4 outline-none transition focus:border-indigo-500"
              placeholder="Optional. If empty, file name will be used."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Description
            </label>

            <textarea
              className="min-h-[140px] w-full rounded-2xl border border-zinc-700 bg-black p-4 outline-none transition focus:border-indigo-500"
              placeholder="Write something about these moments..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Location
            </label>

            <input
              className="w-full rounded-2xl border border-zinc-700 bg-black p-4 outline-none transition focus:border-indigo-500"
              placeholder="Dublin, Ireland"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-3 block text-sm text-zinc-400">
              Choose Photos
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setFiles(Array.from(e.target.files));
                }
              }}
              className="block w-full cursor-pointer text-sm text-zinc-400 file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-5 file:py-3 file:font-semibold file:text-black hover:file:bg-zinc-200"
            />

            {files.length > 0 && (
              <div className="mt-4 rounded-2xl border border-zinc-800 bg-black p-4">
                <p className="mb-3 text-sm text-green-400">
                  Selected {files.length} photo{files.length > 1 ? "s" : ""}
                </p>

                <ul className="space-y-2 text-sm text-zinc-400">
                  {files.map((file) => (
                    <li key={file.name}>• {file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            disabled={loading}
            className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Photos"}
          </button>
        </form>
      </div>
    </main>
  );
}