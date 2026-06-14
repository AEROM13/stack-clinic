import { renderInstrumentImage } from "@/lib/og-image";

// Render on demand at the edge: avoids prerendering the image at build time
// (where @vercel/og's Node default-font loader breaks on Windows) and lets the
// font fetch run from the edge. Crawlers hit it at request time; it's cached.
export const runtime = "edge";

export { size, contentType, alt } from "@/lib/og-image";

export default function OpengraphImage() {
  return renderInstrumentImage();
}
