import React, { ReactNode, Validator } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { PANEL_DIMENSION_UNITS, PANEL_TYPE_KEY, PIXELS_PANNEL_DIMENSION_UNITS } from '../shared/constants';
// eslint-disable-next-line import/no-cycle
import { PropTypes_xyArray } from '../shared/validators';

//#region Prop Types

/**
 * The prop types for the dimensions prop for this component.
 */
export const DIMENSIONS_PROP_TYPES = {
  locked: PropTypes.oneOf([
    PropTypes.bool,
    PropTypes.shape({
      scale: PropTypes.bool,
      location: PropTypes.bool
    })
  ]),
  type: PropTypes.oneOf(
    Object.values(PANEL_DIMENSION_UNITS)
  ),
  min: PropTypes_xyArray,
  max: PropTypes_xyArray,
  current: PropTypes_xyArray,
};

/**
 * The TS types for the dimensions prop for this component.
 */
export type DimensionsProps = PropTypes.InferProps<typeof DIMENSIONS_PROP_TYPES>;

/**
 * Default values for the dimensions prop
 */
export const DIMENSIONS_DEFAULT_PROPS = {
  locked: false,
  type: PIXELS_PANNEL_DIMENSION_UNITS,
  min: [50, 20],
  max: [300, 400],
  current: [100, 120]
}

/**
 * The prop types for the options prop for this component.
 */
export const OPTIONS_PROP_TYPES = {
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  showButtons: PropTypes.bool,
  canBeClosed: PropTypes.bool,
  canBeMinimized: PropTypes.bool,
  dimensions: PropTypes.shape(DIMENSIONS_PROP_TYPES)
};

/**
 * The TS types for the options prop for this component.
 */
export type OptionsProps = InferProps<typeof OPTIONS_PROP_TYPES>;

/**
 * Default values for the options prop
 */
const OPTIONS_DEFAULT_PROPS = {
  showHeader: true,
  showButtons: true,
  showFooter: true,
  canBeClosed: true,
  canBeMinimized: true,
  dimensions: DIMENSIONS_DEFAULT_PROPS,
};

/**
 * The prop types for this component.
 */
export const PROP_TYPES = {
  key: PropTypes.string.isRequired,
  children: PropTypes.node,
  title: PropTypes.node,
  buttons: PropTypes.node,
  header: PropTypes.node,
  footer: PropTypes.node,
  minimized: PropTypes.bool,
  options: PropTypes.shape(OPTIONS_PROP_TYPES),
};

/**
 * The TS types for props for this component.
 */
export type PanelProps = InferProps<typeof PROP_TYPES>;

/**
 * Default props for this component
 */
export const DEFAULT_PROPS = {
  children: null,
  title: null,
  buttons: null,
  header: null,
  footer: null,
  minimized: false,
  options: OPTIONS_DEFAULT_PROPS
}

//#endregion

/**
 * Represents a 'panel' item (IFrames are also IPanels). Panels can be placed in containers, minimized, and closed
 */
export interface IPanel<TProps extends PanelProps = PanelProps> extends React.Component<TProps> {
  readonly isIndraPanel: true;
  readonly indraPanelType: string;
}

/**
 * A basic panel. The building block of the client.
 * Panels are contained in Frames and can contain any react content.
 */
export default class Panel<TProps extends PanelProps = PanelProps> extends React.Component<TProps> implements IPanel<TProps> {
  //#region Indra Config
  readonly isIndraPanel: true = true;
  readonly indraPanelType: string = PANEL_TYPE_KEY;
  protected readonly styleClassName: string = "Panel";
  protected readonly styleClassInitials: string = "P";
  protected readonly extraStyleClasses: Array<string> = [];
  //#endregion

  //#region React Config

  static get defaultProps() {
    return DEFAULT_PROPS;
  };

  static get propTypes() {
    return PROP_TYPES;
  }

  //#endregion

  //#region Get Info

  /**
   * The panel or frame's unique key.
   */
  get key(): string {
    return this.props.key;
  }

  get locationIsLocked()
    : boolean {
    const options = this.props.options;

    return ((options?.dimensions?.locked as boolean | undefined) === true)
      || (options?.dimensions?.locked as any)?.location;
  }

  get scaleIsLocked()
    : boolean {
    const options = this.props.options;

    return ((options?.dimensions?.locked as boolean | undefined) === true)
      || (options?.dimensions?.locked as any)?.scale;
  }

  getStyleClasses(tags?: string | Array<string | Array<unknown>>, includeDefaults: boolean = true) : string {
    const classes: Array<string> = [];
    if (includeDefaults) {
      classes.push(this.styleClassName);
      this.extraStyleClasses.forEach(classes.push);
    }

    if (!tags) {
      return classes[0];
    }

    if (Array.isArray(tags)) {
      if (!tags.length) {
        return classes[0];
      }

      for (const tag of tags!) {
        let toAppend: string = this.styleClassInitials + "--";
        if (Array.isArray(tag)) {
          toAppend = getSubClasses(tag, toAppend);
        } else {
          classes.push(toAppend + tag);
        }
      }
    } else {
      classes.push(this.styleClassInitials + "--" + tags);
    }

    return classes.join(" ");

    // helpers
    function getSubClasses(tag: Array<string|Array<string|any>>, toAppend: string) {
      for (const subTag of tag) {
        if (Array.isArray(subTag)) {
          getSubClasses(subTag, toAppend);
        } else {
          toAppend += subTag + "-";
          classes.push(toAppend.substring(0, toAppend.length - 1));
        }
      }

      return toAppend;
    }
  }

  //#endregion

  //#region Rendering

  /**
   * Renders the minimized panel.
   * This calls renderHeader by default.
   */
  protected renderMinimized = (
    key: string,
    options?: OptionsProps,
    title?: ReactNode,
    buttons?: ReactNode,
    header?: ReactNode,
  ): ReactNode =>
    this.renderHeader(key, options, title, buttons, header);

  /**
   * Renders the expanded panel.
   * This calls renderHeader, renderContent, and renderFooter by default.
   */
  protected renderExpanded = (
    children: ReactNode,
    key: string,
    options: OptionsProps | undefined,
    title: ReactNode,
    buttons: ReactNode,
    header: ReactNode,
    footer: ReactNode
  ): ReactNode =>
    <>
      {options?.showHeader && this.renderHeader(
        key,
        options,
        title,
        buttons,
        header
      )}
      {this.renderContentWithContainer(
        children,
        this.getStyleClasses("Content"),
        options
      )}
      {this.renderFooter(footer)};
    </>

  /**
   * Renders the panel's header
   * This uses the header, buttons, and title props, and calls renderButtons by default.
   */
  protected renderHeader = (
    key: string,
    options: OptionsProps | undefined,
    header: ReactNode,
    title: ReactNode,
    buttons: ReactNode,
  ): ReactNode =>
    <div className={this.getStyleClasses("Header")}>
      {header || (
        <div className={this.getStyleClasses("Title")}>
          {title || key}
        </div>
      )}
      {this.renderButtons(buttons, options)}
    </div>;

  /**
   * Renders the panel's header buttons.
   */
  protected renderButtons = (
    buttons: ReactNode,
    options: OptionsProps | undefined
  ): ReactNode =>
    options?.showButtons
      ? buttons || <div className={this.getStyleClasses("Buttons")} />
      : (<div className={this.getStyleClasses(["Buttons", "None"])} />);

  /**
   * Render's the panel's children as content.
   */
  protected renderContentWithContainer = (
    children: ReactNode,
    defaultStyleClasses: string,
    options: OptionsProps | undefined
  ): ReactNode =>
    <div className={defaultStyleClasses}>
      {this.renderContent(children, options)}
    </div>;

  /**
   * Render's the panel's content.
   */
  protected renderContent = (
    children: ReactNode,
    options: OptionsProps | undefined
  ): ReactNode => <>
    {children}
  </>;

  /**
   * Render's the panel's footer.
   * This uses the footer prop by default.
   */
  protected renderFooter = (
    footer?: ReactNode,
    options?: OptionsProps
  ): ReactNode =>
    options?.showFooter
      && (footer || <div className={this.getStyleClasses("Footer")} />)

  render(): ReactNode {
    const {
      key,
      minimized,
      options,
      children,
      title,
      buttons,
      header,
      footer
    } = this.props;

    return (
      <div className={minimized ? this.getStyleClasses(["Container", "Minimized"]) : this.getStyleClasses(["Container", "Expanded"])}>
        {minimized
          ? this.renderMinimized(
            key,
            options as OptionsProps,
            title as ReactNode,
            buttons as ReactNode,
            header as ReactNode
          ) : this.renderExpanded(
            children as ReactNode,
            key,
            options as OptionsProps,
            title as ReactNode,
            buttons as ReactNode,
            header as ReactNode,
            footer as ReactNode
          )
        }
      </div>
    );
  }

  //#endregion
}
