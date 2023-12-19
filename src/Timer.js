class Timer {
    _name
    _interval

    constructor (name, seconds, callback) {
        this._name = name
        this._interval = setInterval(callback, seconds * 1000)
    }

    dispose () {
        clearInterval(this._interval)
        delete this._name
        delete this._interval
    }
}

export default Timer