/**
 * Twitter/X reads the same card as Open Graph. Re-exporting keeps one design
 * and one code path rather than a second, drifting image.
 */
export {
  default,
  alt,
  size,
  contentType,
  generateStaticParams,
} from "./opengraph-image";
