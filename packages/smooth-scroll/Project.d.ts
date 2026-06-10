export interface ProjectProps {
  /**
   * Variant
   * Friendly names map to internal IDs:
   *   "Desktop - Color" → DVs_1soLj
   *   "Desktop - Grayscale" → UdgeVogri
   *   "Tablet/Phone" → lD6oBgyg0
   */
  variant?: 'Desktop - Color' | 'Desktop - Grayscale' | 'Tablet/Phone' | 'UdgeVogri' | 'DVs_1soLj' | 'lD6oBgyg0';
  /**
   * Project name — pass as `dpq1it6jS` not `projectName`.
   * @default "Project name"
   */
  dpq1it6jS?: string;
  /**
   * Category — pass as `CmBpAv3i5` not `category`.
   * @default "Category"
   */
  CmBpAv3i5?: string;
  /**
   * Image — pass as `BCN6MaQp5` not `image`.
   */
  BCN6MaQp5?: string;
  /**
   * Link — pass as `Xyth5FYmE` not `link`.
   */
  Xyth5FYmE?: string;
  /** Additional properties */
  [key: string]: unknown;
}
