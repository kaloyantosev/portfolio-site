import React from 'react';

// One post from a Threads thread, laid out like the original (avatar, handle, topic,
// date, text, images). Posts in a thread are joined by a line down the avatar column.
// Splits text so the given phrases render in red (the key points of the post).
function withHighlights(text, phrases = []) {
  if (!phrases.length) return text;
  const escape = p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(${phrases.map(escape).join('|')})`, 'g');
  return text.split(re).map((part, i) => (phrases.includes(part) ? <strong key={i} className="font-semibold text-red-400">{part}</strong> : part));
}

export default function ThreadPost({ author, avatar, topic, date, text, highlight, images = [], last }) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-x-3">
      <div className="flex flex-col items-center">
        <img src={avatar} alt="" className="h-9 w-9 rounded-full" />
        {!last && <div className="mt-2 w-px flex-1 bg-white/15" />}
      </div>
      <div className="pb-8">
        <div className="text-sm">
          <span className="font-semibold text-white">{author}</span>
          {topic && <span className="text-citi-muted"> › {topic}</span>}
          <span className="ml-2 text-citi-muted">{date}</span>
        </div>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-slate-200 whitespace-pre-line">{withHighlights(text, highlight)}</p>
        {images.length > 0 && (
          <div className={`mt-3 grid gap-2 ${images.length > 1 ? 'grid-cols-2' : ''}`}>
            {images.map(src => (
              <a key={src} href={src} target="_blank" rel="noreferrer">
                <img src={src} alt="" loading="lazy" className="w-full h-auto rounded-xl border border-white/10" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
