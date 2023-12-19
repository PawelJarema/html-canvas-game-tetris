class Counter {
    _score

    constructor (initialScore = 0) {
        this._score = initialScore
    }

    addScore (score) {
        this._score += score
    }

    getScore () {
        return this._score
    }

    reset () {
        this._score = 0
    }
}

export default Counter