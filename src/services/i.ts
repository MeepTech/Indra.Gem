import FramesManager from "./frames-manager";
import PanelsManager from "./panels-manager";

/**
 * Indra Globals for the Client
 */
export default abstract class I {
  public static readonly panels = new PanelsManager();
  public static readonly frames = new FramesManager();
}
