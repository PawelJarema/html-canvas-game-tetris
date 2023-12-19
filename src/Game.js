import Block from './Block'
import Board from './Board'
import Canvas from './Canvas'
import Counter from './Counter'
import KeyboardInput from './KeyboardInput'
import SignalBroadcaster from './SignalBroadcaster'
import Sounds from './Sounds'
import Timer from './Timer'
import TitleScreen from './TitleScreen'

import getRandomBlockShape from './utils/getRandomBlockShape'

class Game {
    _block
    _blockgravitationTimer
    _board
    _canvas
    _gameLoopIntervalId
    _keyboardInput
    _signalBroadcaster
    _sound
    _rowsPlucked
    _score
    _settings
    _speedDifficulty
    _titleScreen

    _pickANewBlock () {
        const {
            downKeyPressed,
            leftKeyPressed,
            rightKeyPressed,
            upKeyPressed,
        } = SignalBroadcaster.SIGNALS

        if (this._blockgravitationTimer) this._blockgravitationTimer.dispose()
        if (this._signalBroadcaster) this._signalBroadcaster.clear([
            downKeyPressed,
            leftKeyPressed,
            rightKeyPressed,
            upKeyPressed,
        ])

        const block = new Block(getRandomBlockShape(), this)

        if (!this._board.spaceIsAvailable(block.getShape(), block.getPosition())) {
            return
        }

        this._blockgravitationTimer = new Timer('Block down movement',
            1 / this._speedDifficulty,
            block.down.bind(block))

        this._signalBroadcaster.subscribe(downKeyPressed, block.down.bind(block))
        this._signalBroadcaster.subscribe(leftKeyPressed, block.left.bind(block))
        this._signalBroadcaster.subscribe(rightKeyPressed, block.right.bind(block))
        this._signalBroadcaster.subscribe(upKeyPressed, block.rotate.bind(block))

        return block
    }

    constructor (settings) {
        this._titleScreen = new TitleScreen(this)
        this._settings = settings
        this._canvas = new Canvas(
            this._settings.canvasId,
            this._settings.board.width,
            this._settings.board.height,
        )
    }

    start () {
        this._titleScreen.hide()

        this._board = new Board(this)
        this._keyboardInput = new KeyboardInput()
        this._rowsPlucked = new Counter(0)
        this._score = new Counter(0)
        this._signalBroadcaster = new SignalBroadcaster()
        this._sound = new Sounds()
        this._speedDifficulty = this._settings.initialDifficulty

        this._keyboardInput.bind(['a','A','ArrowLeft'], () => this._signalBroadcaster.broadcast(SignalBroadcaster.SIGNALS.leftKeyPressed))
        this._keyboardInput.bind(['d','D','ArrowRight'], () => this._signalBroadcaster.broadcast(SignalBroadcaster.SIGNALS.rightKeyPressed))
        this._keyboardInput.bind(['w','W','ArrowUp'], () => this._signalBroadcaster.broadcast(SignalBroadcaster.SIGNALS.upKeyPressed))
        this._keyboardInput.bind(['s','S','ArrowDown'], () => this._signalBroadcaster.broadcast(SignalBroadcaster.SIGNALS.downKeyPressed))

        this._sound.playMusicList(['theme-min','music-min'], true)

        this._gameLoopIntervalId = setInterval(this.tick.bind(this), parseInt(1000 / this._settings.fps))
    }

    tick () {
        if (this._board.isLocked()) return

        if (this._block?.isDisposed() || this._block == null) {
            this._block = this._pickANewBlock()
            if (!this._block) {
                return this.gameOver()
            }
        }

        this._canvas.clear()
        this._canvas.drawBoard(this._board.getBoard())
        this._canvas.drawBlock(this._block.getShape(), this._block.getPosition())
        this._canvas.drawScore(this._score.getScore())
    }

    gameOver () {
        clearInterval(this._gameLoopIntervalId)

        this._blockgravitationTimer.dispose()
        this._board.dispose()
        this._keyboardInput.dispose()
        this._signalBroadcaster.clear()
        this._sound.playMusic('game-over-min')
        this._titleScreen.update(this._score.getScore())
    }

    getBoard () {
        return this._board
    }

    getSettings () {
        return this._settings
    }

    getSignalBroadcaster () {
        return this._signalBroadcaster
    }

    getSound () {
        return this._sound
    }

    pluckRows (rowsCleared) {
        this._rowsPlucked.addScore(rowsCleared)
        this._score.addScore(rowsCleared * rowsCleared * 100)
        const totalRowsPlucked = this._rowsPlucked.getScore()
        const incDifficulty = this._settings.difficultyIncreasesEvery
        if (totalRowsPlucked % incDifficulty === 0) {
            this._speedDifficulty += totalRowsPlucked / incDifficulty
        }
    }
}

export default Game