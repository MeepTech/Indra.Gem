import { ReactNode } from 'react';
import GridLayout from "react-grid-layout";
import PropTypes, { InferProps } from 'prop-types';
import { isMultiFrameChildOrChildrenValidator, PropTypes_xyArray } from "../shared/validators";
import { DIMENSIONS_PROP_TYPES as PANEL_DIMENSIONS_PROP_TYPES, OPTIONS_PROP_TYPES as PANEL_OPTIONS_PROP_TYPES } from "../panels/panel";
import { BLOCKS_PANNEL_DIMENSION_UNITS, GRID_TYPE_KEY, PIXELS_PANNEL_DIMENSION_UNITS } from "../shared/constants";
import Frame, {FrameProps, PROP_TYPES as FRAME_PROP_TYPES} from "./frame";
import { MultiFrameChildren } from 'components/shared/utilities';

/**
 * The prop types for the dimensions prop for this component.
 */
export const DIMENSIONS_PROP_TYPES = {
  ...PANEL_DIMENSIONS_PROP_TYPES,
  type: PropTypes.oneOf([BLOCKS_PANNEL_DIMENSION_UNITS]),
  pixels: PropTypes_xyArray,
}

/**
 * The TS types for the dimensions prop for this component.
 */
export type DimensionsProps = PropTypes.InferProps<typeof DIMENSIONS_PROP_TYPES>;

/**
 * The prop types for the options prop for this component.
 */
export const OPTIONS_PROP_TYPES = {
  ...PANEL_DIMENSIONS_PROP_TYPES,
  dimensions: PropTypes.shape(DIMENSIONS_PROP_TYPES)
}

/**
 * The TS types for the options prop for this component.
 */
export type OptionsProps = InferProps<typeof OPTIONS_PROP_TYPES>;

/**
 * The prop types for this component.
 */
export const PROP_TYPES = {
  ...FRAME_PROP_TYPES,
  children: PropTypes.objectOf<MultiFrameChildren>(isMultiFrameChildOrChildrenValidator),
  options: PropTypes.shape(OPTIONS_PROP_TYPES)
};

/**
 * The TS types for props for this component.
 */
export type GridProps = FrameProps & InferProps<typeof PROP_TYPES>;

/**
 * A grid of Pannels and Frames. Use GridItem as children for this.
 */
export default class Grid extends Frame<GridProps> {
  //#region Indra Config
  readonly indraFrameType: string = GRID_TYPE_KEY;
  protected readonly styleClassName: string = "Grid-Frame";
  protected readonly styleClassInitials: string = "G";
  //#endregion

  //#region React Config

  static get defaultProps() {
    return {
      ...Frame.defaultProps,
      location: [0, 0],
      options: {
        ...Frame.defaultProps.options,
        dimensions: {
          ...Frame.defaultProps.options.dimensions,
          pixels: [1000, 1200],
          type: BLOCKS_PANNEL_DIMENSION_UNITS,
          current: [20, 24],
          min: [0, 0],
          max: [Infinity, Infinity],
        }
      }
    }
  }

  //#endregion

  //#region Rendering

  protected renderContentWithContainer = (
    children: ReactNode,
    defaultStyleClasses: string,
    options: OptionsProps | undefined
  ): ReactNode => {
    const [widthBx, heightBx] = options?.dimensions?.current as Array<number>;
    const [widthPx, heightPx] = (options?.dimensions as DimensionsProps)?.pixels as Array<number>;

    return <GridLayout
      className={defaultStyleClasses}
      cols={widthBx}
      rowHeight={heightPx / heightBx}
      width={widthPx}
    >
      {this.renderChildOrChildrenPanels(
        children,
        options
      )}
    </GridLayout>
  }

  //#endregion
}
