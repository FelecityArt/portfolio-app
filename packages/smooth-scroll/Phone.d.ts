export interface PhoneProps {
  /**
   * Variant
   * Friendly names map to internal IDs:
   *   "1" → y0KXVwxnJ
   *   "2" → JA4JVtwmY
   */
  variant?: '1' | '2' | 'y0KXVwxnJ' | 'JA4JVtwmY';
  /**
   * Button 1 text — pass as `ohVTpWJO5` not `button1Text`.
   * @default "Info"
   */
  ohVTpWJO5?: string;
  /**
   * Button 1 link — pass as `iV1s5kZbn` not `button1Link`.
   */
  iV1s5kZbn?: string;
  /**
   * Button 2 text — pass as `rIBchGnD1` not `button2Text`.
   * @default "Work"
   */
  rIBchGnD1?: string;
  /**
   * Button 2 link — pass as `HXDpym66f` not `button2Link`.
   */
  HXDpym66f?: string;
  /** Additional properties */
  [key: string]: unknown;
}
