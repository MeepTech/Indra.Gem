import { isSingleFrameChildValidator, PropTypes_xyArray } from "../shared/validators";
import { DIMENSIONS_PROP_TYPES, OptionsProps, OPTIONS_PROP_TYPES } from "../panels/panel";
import { BLOCKS_PANNEL_DIMENSION_UNITS, GRID_ITEM_TYPE_KEY } from "../shared/constants";
import Frame, {FrameProps, PROP_TYPES as FRAME_PROP_TYPES} from "./frame";
import PropTypes, { InferProps } from 'prop-types';
import { SingleFrameChild } from "../shared/utilities";

export const PROP_TYPES = {
  ...FRAME_PROP_TYPES,
  children: PropTypes.objectOf<SingleFrameChild>(isSingleFrameChildValidator),
  location: PropTypes_xyArray,
  options: {
    ...OPTIONS_PROP_TYPES,
    dimensions: {
      ...DIMENSIONS_PROP_TYPES,
      type: PropTypes.oneOf([BLOCKS_PANNEL_DIMENSION_UNITS])
    }
  }
}

/**
 * The TS types for props for this component.
 */
export type GridItemProps = FrameProps & InferProps<typeof PROP_TYPES>;

/**
 * An individual Frame within a Grid.
 */
export default class GridItem extends Frame<GridItemProps> {
  //#region Indra Config
  readonly indraFrameType: string = GRID_ITEM_TYPE_KEY;
  protected readonly styleClassName: string = "GridItem-Frame";
  protected readonly styleClassInitials: string = "GI";
  //#endregion

  static get defaultProps() {
    return {
      ...Frame.defaultProps,
      location: [0, 0],
      options: {
        ...Frame.defaultProps.options,
        dimensions: {
          ...Frame.defaultProps.options.dimensions,
          type: BLOCKS_PANNEL_DIMENSION_UNITS,
          min: [10, 2],
          max: [Infinity, Infinity],
          current: [10, 12],
        }
      }
    }
  }

  //#region Rendering

  protected renderSingleChild = (
    child: SingleFrameChild,
    index: number,
    defaultStyleClasses: string,
    options: OptionsProps | undefined
  ): React.ReactNode => {
    const { location, key } = this.props;
    const [w, h] = options?.dimensions?.current as Array<number>;
    const [minW, minH] = options?.dimensions?.min as Array<number>;
    const [maxW, maxH] = options?.dimensions?.max as Array<number>;
    const [x, y] = location as Array<number>;

    const layout = {
      x, y,
      w, h,
      minW, minH,
      maxW, maxH,
      isDraggable: !this.locationIsLocked,
      isResizable: !this.scaleIsLocked,
      resizeHandles: ['s', 'w', 'e', 'sw', 'nw', 'se', 'ne'],
      isBounded: true
    };

    return (
      <div
        className={defaultStyleClasses}
        key={child?.props.key || key + "#" + index}
        data-grid={layout}
      >
        {child as React.ReactNode}
      </div>
    );
  }

  //#endregion
}
