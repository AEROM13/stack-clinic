import { renderInstrumentImage } from "@/lib/og-image";

// See app/opengraph-image.tsx — rendered on demand at the edge.
export const runtime = "edge";

export { size, contentType, alt } from "@/lib/og-image";

export default function TwitterImage() {
  return renderInstrumentImage();
}
