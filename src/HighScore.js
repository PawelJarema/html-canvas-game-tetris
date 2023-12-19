const HIGHSCORE_KEY = 'tetris_hs_key'

class HighScore {
    _scoreList

    _getSaved () {
        try {
            const saved = localStorage.getItem(HIGHSCORE_KEY)
            if (!saved) throw new Error('No high score table in local storage. Initializing new.')
            return JSON.parse(saved)

        } catch (err) {
            console.log(err.message)
            return [1000,900,800,700,600,500,400,300,200,100]
        }
    }

    _save (scoreList) {
        try {
            const toSave = JSON.stringify(scoreList)
            localStorage.setItem(HIGHSCORE_KEY, toSave)

        } catch (err) {
            console.log(err)
        }
    }

    constructor () {
        this._scoreList = this._getSaved()
    }

    getScores () {
        return this._scoreList
    }

    update (score) {
        const place = this._scoreList.findIndex(val => val == undefined || val < score)

        if (place !== -1 && place < 10) {
            this._scoreList.splice(place, 0, score)
            this._scoreList = this._scoreList.slice(0, 10)
            this._save(this._scoreList)
            return place
        }
    }
}

export default HighScore