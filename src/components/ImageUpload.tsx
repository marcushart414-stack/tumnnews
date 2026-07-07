// src/components/ImageUpload.tsx
//
// Reusable upload widget. Uploads to the public 'media' bucket and returns
// the resulting public URL via onUploaded. Used for article featured images
// and profile avatars.

import { useState, ChangeEvent } from 'react';
import { supabase } from '../lib/supabase';

interface ImageUploadProps {
  label: string;
  currentUrl?: string | null;
  folder: string; // e.g. 'featured' or 'avatars' — keeps the bucket organized
  onUploaded: (url: string) => void;
}

export default function ImageUpload({ label, currentUrl, folder, onUploaded }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.');
      return;
    }

    setError(null);
    setUploading(true);

    const ext = file.name.split('.').pop();
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from('media').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

    setUploading(false);
    if (uploadError) {
      setError(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(path);
    setPreview(data.publicUrl);
    onUploaded(data.publicUrl);
  }

  return (
    <div>
      <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-1">{label}</label>
      {preview && (
        <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded mb-2 border border-neutral-300" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="block text-sm"
      />
      {uploading && <p className="text-xs text-neutral-500 mt-1">Uploading…</p>}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
