import Frame from '../components/frames/frame';

export default class FramesManager {
  private _frames: Record<string, Frame> = {};

  get all(): Array<Frame> {
    return Object.values(this._frames);
  }

  get keys(): Array<string> {
    return Object.keys(this._frames);
  }
}
