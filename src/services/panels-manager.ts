import Panel from '../components/panels/panel';

export default class PanelsManager {
  private _panels: Record<string, Panel> = {};

  get all(): Array<Panel> {
    return Object.values(this._panels);
  }

  get keys(): Array<string> {
    return Object.keys(this._panels);
  }
}
