import Position from './Position'
import rotate2DArray90degClockwise from './utils/rotate2DArray90degClockwise'

class Block {
    _game
    _height
    _isDisposed
    _position
    _shape
    _width

    _newSafePosition (dx, dy) {
        if (this.isDisposed() || this._game.getBoard().isLocked()) return

        const newX = this._position.getX() + dx
        const newY = this._position.getY() + dy

        const newPosition = new Position(newX, newY)

        if (this._game.getBoard().spaceIsAvailable(this._shape, newPosition)) {
            return newPosition
        }
    }

    _setShape (shape) {
        this._shape = shape
        this._height = shape.length
        this._width = shape[0].length
    }

    constructor (shape, game) {
        this._game = game
        this._setShape(shape)

        const startX = parseInt(this._game.getBoard().getWidth() / 2 - this._width / 2)
        const startY = 0

        this._position = new Position(startX, startY)
    }

    getShape () {
        return this._shape
    }

    getPosition () {
        return this._position
    }

    rotate () {
        const newShape = rotate2DArray90degClockwise(this._shape)
        if (this._game.getBoard().spaceIsAvailable(newShape, this._position)) {
            this._game.getSound().playSound('rotate-min')
            this._setShape(newShape)
        }
    }

    left () {
        this._position = this._newSafePosition(-1, 0)
            || this._position
    }

    right () {
        this._position = this._newSafePosition(1, 0)
            || this._position
    }

    down () {
        if (this.isDisposed()) return

        const newPosition = this._newSafePosition(0, 1)
        if (!newPosition) {
            const rowsCleared = this._game.getBoard().landBlock(this)
            
            if (rowsCleared) {
                this._game.pluckRows(rowsCleared)
            }

            this._game.getSound().playSound('fall-min')
            this.dispose()
            return
        }

        this._position = newPosition
    }

    isDisposed () {
        return this._isDisposed
    }

    dispose () {
        delete this._game
        delete this._height
        delete this._position
        delete this._shape
        delete this._width

        this._isDisposed = true
    }
}

export default Block