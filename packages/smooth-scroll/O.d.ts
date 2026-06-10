export interface OProps {
  /**
   * Variant
   * Friendly names map to internal IDs:
   *   "Hidden" → PX1MOnVXY
   *   "Loading" → G47S15YSn
   */
  variant?: 'Hidden' | 'Loading' | 'G47S15YSn' | 'PX1MOnVXY';
  /** Additional properties */
  [key: string]: unknown;
}
