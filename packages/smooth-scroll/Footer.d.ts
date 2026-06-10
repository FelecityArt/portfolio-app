export interface FooterProps {
  /**
   * Variant
   * Friendly names map to internal IDs:
   *   "Desktop/Tablet" → esA4oGvJM
   *   "Phone" → gHYUY4YJJ
   */
  variant?: 'Desktop/Tablet' | 'Phone' | 'esA4oGvJM' | 'gHYUY4YJJ';
  /**
   * Show Back to top button — pass as `XRMESN2uQ` not `showBackToTopButton`.
   * @default true
   */
  XRMESN2uQ?: boolean;
  /**
   * Back to top link — pass as `BKs2sAFSp` not `backToTopLink`.
   */
  BKs2sAFSp?: string;
  /** Additional properties */
  [key: string]: unknown;
}
