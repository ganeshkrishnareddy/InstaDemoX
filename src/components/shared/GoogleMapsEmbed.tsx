import React from "react";

interface GoogleMapsEmbedProps {
  address: string;
  city: string;
}

export default function GoogleMapsEmbed({ address, city }: GoogleMapsEmbedProps) {
  const query = encodeURIComponent(`${address}, ${city}`);
  const srcUrl = `https://maps.google.com/maps?q=${query}&output=embed`;

  return (
    <div className="w-full h-[350px] rounded-xl overflow-hidden border border-neutral-800 shadow-lg bg-neutral-900">
      <iframe
        title="Google Maps Location"
        src={srcUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
