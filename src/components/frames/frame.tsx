import React, { ReactNode } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import {
  isFrameContentValidator, PropTypes_xyArray,
} from '../shared/validators';
import {
  FrameContent,
  SingleFrameChild
} from '../shared/utilities';
import Panel, {
  IPanel,
  OptionsProps,
  PanelProps,
  PROP_TYPES as PANNEL_PROP_TYPES
} from '../panels/panel';
import { FRAME_TYPE_KEY } from '../shared/constants';

export const PROP_TYPES = {
  ...PANNEL_PROP_TYPES,
  children: PropTypes.objectOf<FrameContent>(isFrameContentValidator)
};

/**
 * The TS types for props for this component.
 */
export type FrameProps = PanelProps & InferProps<typeof PROP_TYPES>;

/**
 * Represents a 'frame' that contains and shapes a pannel or set of pannels.
 */
export interface IFrame<TProps extends FrameProps = FrameProps> extends IPanel<TProps> {
  readonly isIndraFrame: true;
  readonly indraFrameType: string;
}

/**
 * The base of all frames. Frames contain one or more pannels or frames in different ways.
 */
export default abstract class Frame<TProps extends FrameProps = FrameProps> extends Panel<TProps> implements IFrame<TProps> {
  //#region Indra Config
  readonly isIndraFrame: true = true;
  readonly indraFrameType: string = FRAME_TYPE_KEY;
  readonly indraPanelType: string = FRAME_TYPE_KEY;
  protected readonly styleClassName: string = "Frame";
  protected readonly styleClassInitials: string = "F";
  //#endregion

  //#region React Config

  static get defaultProps() {
    return {
      ...Panel.defaultProps,
      location: [0, 0],
      options: {
        ...Panel.defaultProps.options,
        canBeMinimized: false,
        showFooter: false,
      },
    }
  };

  static get propTypes() {
    return PROP_TYPES;
  }

  //#endregion

  //#region Rendering

  protected renderContentWithContainer = (
    children: ReactNode,
    defaultStyleClasses: string,
    options: OptionsProps | undefined
  ): ReactNode =>
    super.renderContentWithContainer(
      this.renderChildOrChildrenPanels(children, options),
      defaultStyleClasses,
      options
    );

  protected renderChildOrChildrenPanels = (
    children: ReactNode,
    options?: OptionsProps | undefined
  ) =>
    Array.isArray(children)
      ? children.map((c, i) => this.renderSingleChild(c, i, this.getStyleClasses([
        "Pane",
        [i.toString(), "Multiple"]
      ]), options))
      : this.renderSingleChild(children as SingleFrameChild, 0, this.getStyleClasses([
        "Pane",
        ["0", "Single"]
      ]), options);

  protected renderSingleChild = (
    child: SingleFrameChild,
    index: number,
    defaultStyleClasses: string,
    options: OptionsProps | undefined
  ): ReactNode =>
    <div className={defaultStyleClasses}>
      {child as React.ReactNode}
    </div>;

  //#endregion
};
