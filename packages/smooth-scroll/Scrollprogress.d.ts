export interface ScrollprogressProps {
  /**
   * Bar Color — pass as `color` not `barColor`.
   * @default "#0099FF"
   */
  color?: string;
  /**
   * Background — pass as `backgroundColor` not `background`.
   * @default "#EEEEEE"
   */
  backgroundColor?: string;
  /**
   * Height
   * Range: min: 2, max: 40, step: 1
   * @default 8
   */
  height?: number;
  /**
   * Radius — pass as `borderRadius` not `radius`.
   * Range: min: 0, max: 24
   * @default 8
   */
  borderRadius?: number;
  /** Additional properties */
  [key: string]: unknown;
}
