class KeyboardInput {
    _debug
    _mappings

    constructor (debug = false) {
        this._debug = debug
        this._mappings = {}
        window.addEventListener('keydown', this.keypressed.bind(this))
    }

    bind (binding, callback) {
        const keys = Array.isArray(binding)
            ? binding
            : [binding]

        for (const key of keys) {
            this._mappings[key] = callback
        }
    }

    clear () {
        this._mappings = {}
    }

    dispose () {
        this.clear()
        window.removeEventListener('keydown', this.keypressed.bind(this))
    }

    keypressed (e) {
        for (const key in this._mappings) {
            if (key === e.key) this._mappings[key]()
        }

        if (this._debug) {
            console.log(`${e.key} pressed.`)
        }
    }
}

export default KeyboardInput