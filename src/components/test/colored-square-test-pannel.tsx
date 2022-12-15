import Panel, {
  PROP_TYPES as PANEL_PROP_TYPES
} from '../panels/panel';
import PropTypes, {
  InferProps
} from 'prop-types';
import { TEST_COLORED_SQUARE_TYPE_KEY } from 'components/shared/constants';

export const PROP_TYPES = {
  ...PANEL_PROP_TYPES,
  color: PropTypes.string
}

/**
 * The TS types for props for this component.
 */
export type ColoredSquareProps = InferProps<typeof PROP_TYPES>;

/**
 * A pannel that's just a colored square for testing.
 */
export default class ColoredSquare extends Panel<ColoredSquareProps> {
  readonly indraPanelType: string = TEST_COLORED_SQUARE_TYPE_KEY;
  readonly extraStyleClasses: Array<string> = super.extraStyleClasses.append("");
}
