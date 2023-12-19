import HighScore from './HighScore'
import COLORS from './constants/colors'

const TEXT = {
    gameTitle: 'TETRIS',
    hiScore: 'HI score:',
    startGame: 'START GAME',
}

class TitleScreen {
    _highScore

    _populateHighScores (scores, highlight, element) {
        const highScore = element || document.getElementById('high-score')
        if (!highScore || !Array.isArray(scores) || !scores.length) return

        highScore.innerHTML = ''

        const li = document.createElement('li')
        li.innerText = TEXT.hiScore
        li.style.marginBottom = 0 // '16px'
        li.style.textAlign = 'center'

        highScore.appendChild(li)

        for (let i = 0; i < scores.length; i++) {
            const li = document.createElement('li')
            li.innerText = String(i + 1).padStart(2, ' ') + String(scores[i]).padStart(36, '.')
            li.style.color = highlight === i
                ? COLORS.g
                : '#FFFFFF'
            li.style.marginBottom = '16px'

            highScore.appendChild(li)
        }

        return highScore
    }

    constructor (game) {
        this._highScore = new HighScore()

        const titleScreen = document.createElement('div')
        titleScreen.id = 'title-screen'
        titleScreen.style.alignItems = 'center'
        titleScreen.style.background = '#121212'
        titleScreen.style.color = '#fff'
        titleScreen.style.display = 'flex'
        titleScreen.style.flexDirection = 'column'
        titleScreen.style.gap = '2vh'
        titleScreen.style.height = '100vh'
        titleScreen.style.justifyContent = 'center'
        titleScreen.style.left = 0
        titleScreen.style.position = 'fixed'
        titleScreen.style.top = 0
        titleScreen.style.width = '100vw'

        const title = document.createElement('h1')
        title.textContent = TEXT.gameTitle
        title.style.fontFamily = 'sans-serif'
        title.style.fontSize = 'min(16vw,12vh)'
        title.style.fontWeight = 900
        title.style.margin = 0

        const highScore = document.createElement('ul')
        highScore.id = 'high-score'
        highScore.style.fontFamily = 'monospace'
        highScore.style.listStyle = 'none'
        highScore.style.margin = 0
        highScore.style.padding = 0
        highScore.style.textAlign = 'right'

        this._populateHighScores(this._highScore.getScores(), null, highScore)

        const button = document.createElement('button')
        button.style.background = '#161616'
        button.style.border = `5px solid ${COLORS.o}`
        button.style.color = COLORS.o
        button.style.cursor = 'pointer'
        button.style.fontSize = '18px'
        button.style.marginTop = '1.5vh'
        button.style.padding = '20px'

        button.textContent = TEXT.startGame
        button.addEventListener('click', game.start.bind(game))

        titleScreen.appendChild(title)
        titleScreen.appendChild(highScore)
        titleScreen.appendChild(button)

        document.body.appendChild(titleScreen)
    }

    hide () {
        const titleScreen = document.getElementById('title-screen')
        titleScreen.style.display = 'none'
    }

    update (score) {
        const titleScreen = document.getElementById('title-screen')
        const place = this._highScore.update(score)
        this._populateHighScores(this._highScore.getScores(), place)

        titleScreen.style.display = 'flex'
        titleScreen.style.opacity = '0.94'
    }
}

export default TitleScreen