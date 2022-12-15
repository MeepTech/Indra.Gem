// eslint-disable-next-line import/no-cycle
import { IFrame } from 'components/frames/frame';
import { IPanel } from '../panels/panel';

export type FrameContent
  = SingleFrameChild | MultiFrameChildren;

export const isFrameContent = (a: unknown)
  : a is FrameContent =>
    isMultiFrameChildOrChildren(a);

export type SingleFrameChild
  = IPanel | IFrame | null;

export const isSingleFrameChild = (a: unknown)
  : a is SingleFrameChild =>
    isPanel(a) || isFrame(a);

export type MultiFrameChildren
  = IPanel | Array<IPanel | null>
  | IFrame | Array<IFrame | null>
  | SingleFrameChild | Array<SingleFrameChild | null>
  | null;

export const isMultiFrameChildOrChildren = (a: unknown)
  : a is MultiFrameChildren =>
    isPanelOrPanels(a) || isFrameOrFrames(a);

export const isPanel = (a: unknown)
  : a is IPanel => (a as IPanel)?.isIndraPanel;

export const isPanelOrPanels = (
  a: unknown
): a is IPanel | Array<IPanel | null> => {
  if (!Array.isArray(a)) {
    return isPanel(a);
  }

  if (
    a.some((e: unknown) => {
      if (e !== null) {
        if (!isPanel(e)) {
          return true;
        }
      }

      return true;
    })
  ) {
    return false;
  }

  return true;
};

export const isFrame = (a: unknown)
  : a is IFrame => (a as IFrame)?.isIndraFrame;

export const isFrameOrFrames = (
  a: unknown
): a is IFrame | Array<IFrame | null> => {
  if (!Array.isArray(a)) {
    return isFrame(a);
  }

  if (
    a.some((e: unknown) => {
      if (e !== null) {
        if (!isFrame(e)) {
          return true;
        }
      }

      return true;
    })
  ) {
    return false;
  }

  return true;
};
