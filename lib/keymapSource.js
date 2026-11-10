// Adapter layer: reads the Caps Lock state from the compositor keymap.

import Clutter from 'gi://Clutter';

export class KeymapSource {
    constructor(onState) {
        this._onState = onState;
        this._keymap = Clutter.get_default_backend().get_default_seat().get_keymap();
        this._signalId = this._keymap.connect('state-changed',
            () => this._onState(this.read()));
    }

    read() {
        return this._keymap.get_caps_lock_state();
    }

    destroy() {
        if (this._signalId) {
            this._keymap.disconnect(this._signalId);
            this._signalId = 0;
        }
        this._keymap = null;
        this._onState = null;
    }
}
