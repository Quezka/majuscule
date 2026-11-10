// Domain layer: pure Caps Lock state tracking. No GNOME imports allowed here
// (enforced by tests/layers.test.sh).

export const LABEL_ON = 'CAPS LOCK ON';
export const LABEL_OFF = 'CAPS LOCK OFF';

export class CapsState {
    constructor() {
        this._last = null;
    }

    get isOn() {
        return this._last === true;
    }

    /**
     * Feed the current lock state.
     * Returns null when nothing should be shown (first reading or no change),
     * otherwise {on, label} describing the change.
     */
    update(on) {
        on = Boolean(on);
        const first = this._last === null;
        const changed = this._last !== on;
        this._last = on;
        if (first || !changed)
            return null;
        return {on, label: on ? LABEL_ON : LABEL_OFF};
    }
}
