// eslint-disable-next-line import/no-cycle
import {
  isPanel,
  isPanelOrPanels,
  isFrame,
  isFrameOrFrames,
  isMultiFrameChildOrChildren,
  isSingleFrameChild,
  isFrameContent
} from './utilities';
import PropTypes from 'prop-types';
import { Validator } from 'react';

export const isWidthHeightArrayValidator = (a: unknown) => {
  if (!Array.isArray(a)) {
    return new Error('Must be array of 2 numeric elements: [width, height]');
  }
  if (a.length !== 2 || a.some((e: number) => typeof e !== 'number')) {
    return new Error('Must be array of 2 numeric elements: [width, height]');
  }

  return null;
};

export const PropTypes_xyArray = PropTypes.arrayOf<number>(
  isWidthHeightArrayValidator as Validator<number>
)

export const isPanelValidator = (a: unknown) => {
  if (!isPanel(a)) {
    return Error('Must be of type IPanel');
  }

  return null;
};

export const isPanelOrPanelsValidator = (a: unknown) => {
  if (!isPanelOrPanels(a)) {
    return Error('Must be of type IPanel or an array of IPanels');
  }

  return null;
};

export const isFrameValidator = (a: unknown) => {
  if (!isFrame(a)) {
    return Error('Must be of type IFrame');
  }

  return null;
};

export const isFrameOrFramesValidator = (a: unknown) => {
  if (!isFrameOrFrames(a)) {
    return Error('Must be of type IFrame or an array of IFrames');
  }

  return null;
};

export const isSingleFrameChildValidator = (a: unknown) => {
  if (!isSingleFrameChild(a)) {
    return Error('Must be of type IFrame or IPanel');
  }

  return null;
};

export const isMultiFrameChildOrChildrenValidator = (a: unknown) => {
  if (!isMultiFrameChildOrChildren(a)) {
    return Error('Must be of type IFrame or IPanel or an array of IPanels or an array of IFrames');
  }

  return null;
};

export const isFrameContentValidator = (a: unknown) => {
  if (!isFrameContent(a)) {
    return Error('Must be of type IFrame or IPanel or an array of IPanels or an array of IFrames');
  }

  return null;
};
