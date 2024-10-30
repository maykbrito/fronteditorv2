export function PreviewIframe({ src }: { src: string }) {
  return (
    <iframe
      title="preview"
      src={src}
      id="result"
      allow="camera; microphone; fullscreen; accelerometer; autoplay; geolocation; payment; midi; magnetometer; gyroscope; document-domain; encrypted-media; picture-in-picture; screen-wake-lock"
      className="w-full h-full flex-1 relative z-10"
    />
  )
}
