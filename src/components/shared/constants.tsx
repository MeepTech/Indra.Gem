
/**
 * For Pixel Units
 */
export const PIXELS_PANNEL_DIMENSION_UNITS = 'px';

/**
 * For Grid-Block units
 */
export const BLOCKS_PANNEL_DIMENSION_UNITS = 'bx';

/**
 * Included Pannel Dimension units
 */
export const PANEL_DIMENSION_UNITS = {
  PIXELS: PIXELS_PANNEL_DIMENSION_UNITS,
  BLOCKS: BLOCKS_PANNEL_DIMENSION_UNITS
}

/**
 * Pannel Type Key
 */
export const PANEL_TYPE_KEY = 'panel';

/**
 * Frame Type Key
 */
export const FRAME_TYPE_KEY = 'frame';

/**
 * GridItem Type Key
 */
export const GRID_ITEM_TYPE_KEY = 'grid-item';

/**
 * Grid Type Key
 */
export const GRID_TYPE_KEY = 'grid';

/**
 * Test colored square panel key
 */
export const TEST_COLORED_SQUARE_TYPE_KEY = 'grid';

/**
 * Included Pannel Type Keys
 */
export const PANEL_TYPES = {
  PANNEL: PANEL_TYPE_KEY,
  FRAME: FRAME_TYPE_KEY,
  TEST_COLORED_SQUARE: TEST_COLORED_SQUARE_TYPE_KEY
}

/**
 * Included Frame Type Keys
 */
export const FRAME_TYPES = {
  FRAME: PANEL_TYPE_KEY,
  GRID_ITEM: GRID_ITEM_TYPE_KEY,
  GRID_TYPE_KEY: GRID_TYPE_KEY
}
