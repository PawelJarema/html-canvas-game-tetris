import COLORS from './constants/colors'

const BOARD_MARGIN = 60

class Canvas {
    _blockPixelSize
    _boardHeight
    _boardWidth
    _canvas
    _height
    _width

    _getContext () {
        return this._canvas.getContext("2d")
    }

    constructor (id, boardWidth, boardHeight) {
        this._canvas = document.getElementById(id)
        this._boardHeight = boardHeight
        this._boardWidth = boardWidth

        window.addEventListener('resize', this.resize.bind(this))

        this.resize()
    }

    clear () {
        const ctx = this._getContext()
        ctx.clearRect(0, 0, this._width, this._height)
    }

    dispose () {
        window.removeEventListener('resize', this.resize.bind(this))

        delete this._blockPixelSize
        delete this._boardHeight
        delete this._boardWidth
        delete this._canvas
        delete this._height
        delete this._width
    }

    drawBoard (board) {
        const blockPixelSize = this._blockPixelSize
        const ctx = this._getContext()
        const height = this._boardHeight
        const width = this._boardWidth

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const char = board[row][col]
                if (!char) continue

                const fill = COLORS[char]
                const x = blockPixelSize * col + 1
                const y = blockPixelSize * row + 1

                ctx.fillStyle = fill
                ctx.fillRect(x, y, blockPixelSize - 1, blockPixelSize - 1)
            }
        }
    }

    drawBlock (shape, position) {
        const blockPixelSize = this._blockPixelSize
        const ctx = this._getContext()
        const height = shape.length
        const width = shape[0].length
        const x = blockPixelSize * position.getX()
        const y = blockPixelSize * position.getY()

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const char = shape[row][col]
                if (!char) continue

                const fill = COLORS[char]
                const _x = x + blockPixelSize * col + 1
                const _y = y + blockPixelSize * row + 1

                ctx.fillStyle = fill
                ctx.fillRect(_x, _y, blockPixelSize - 1, blockPixelSize - 1)
            }
        }
    }

    drawScore (score) {
        const ctx = this._getContext()
        const text = String(score)
        const textSize = ctx.measureText(text)
        ctx.font = "32px monospace"
        ctx.fillStyle = COLORS.g
        ctx.fillText(text, this._width - textSize.width - 10, 28)
    }

    resize () {
        const height = window.innerHeight
        const width = window.innerWidth

        const availableBlockHeight = (height - BOARD_MARGIN) / this._boardHeight
        const availableBlockWidth = (width - BOARD_MARGIN) / this._boardWidth
        this._blockPixelSize = Math.min(availableBlockHeight, availableBlockWidth)

        this._height = this._blockPixelSize * this._boardHeight
        this._width = Math.min(width, this._blockPixelSize * this._boardWidth)

        const ctx = this._getContext()
        ctx.canvas.width = this._width
        ctx.canvas.height = this._height

        this.clear()
    }
}

export default Canvas