import React from 'react';

// Static screenshot of a web app (public/snapshots/<id>.webp, taken in dark mode at
// 1280×800). Used in lists and the homepage carousel so pages never load the live
// apps; the real app opens on its detail page.
export default function SitePreview({ id, title }) {
  return (
    <img
      src={`/snapshots/${id}.webp`}
      alt={`${title} screenshot`}
      loading="lazy"
      draggable="false"
      className="block w-full aspect-[1280/800] object-cover object-top rounded-lg border border-white/10"
    />
  );
}
