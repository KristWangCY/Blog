"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/ui/BackButton";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("Daily Life");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      alert("Please choose a photo.");
      return;
    }

    setLoading(true);

    const fileExt = file.name.split(".").pop();
    const filePath = `${Date.now()}.${fileExt}`;

    // Upload image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(filePath, file);

    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }

    // Get public URL
    const { data } = supabase.storage
      .from("photos")
      .getPublicUrl(filePath);

    const imageUrl = data.publicUrl;

    // Save metadata to database
    const { error: dbError } = await supabase.from("photos").insert({
      title,
      album,
      location,
      image_url: imageUrl,
      image_path: filePath,
    });

    if (dbError) {
      alert(dbError.message);
      setLoading(false);
      return;
    }

    alert("Photo uploaded successfully!");

    // Reset form
    setFile(null);
    setTitle("");
    setAlbum("Daily Life");
    setLocation("");

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">

        <BackButton />

        <h1 className="mb-3 text-5xl font-bold">
          Upload Photo
        </h1>

        <p className="mb-10 text-zinc-400">
          Add a new memory to your personal gallery.
        </p>

        <form
          onSubmit={handleUpload}
          className="
            space-y-6 rounded-3xl
            border border-zinc-800
            bg-zinc-900 p-8
          "
        >
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Photo Title
            </label>

            <input
              className="
                w-full rounded-2xl
                border border-zinc-700
                bg-black p-4 outline-none
                transition focus:border-indigo-500
              "
              placeholder="e.g. Sunset in Dublin"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Album */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Album
            </label>

            <input
              className="
                w-full rounded-2xl
                border border-zinc-700
                bg-black p-4 outline-none
                transition focus:border-indigo-500
              "
              placeholder="Travel / Daily Life / University"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Location
            </label>

            <input
              className="
                w-full rounded-2xl
                border border-zinc-700
                bg-black p-4 outline-none
                transition focus:border-indigo-500
              "
              placeholder="Dublin, Ireland"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="mb-3 block text-sm text-zinc-400">
              Choose Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
              className="
                block w-full cursor-pointer
                text-sm text-zinc-400
                file:mr-4
                file:rounded-xl
                file:border-0
                file:bg-white
                file:px-5
                file:py-3
                file:font-semibold
                file:text-black
                hover:file:bg-zinc-200
              "
            />

            {file && (
              <p className="mt-3 text-sm text-green-400">
                Selected: {file.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="
              rounded-2xl bg-white
              px-8 py-4 font-semibold
              text-black transition
              hover:bg-zinc-200
              disabled:opacity-50
            "
          >
            {loading ? "Uploading..." : "Upload Photo"}
          </button>
        </form>
      </div>
    </main>
  );
}