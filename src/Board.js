class Board {
    _board
    _locked
    _height
    _width

    constructor (game) {
        this._board = []
        this._width = game.getSettings().board.width
        this._height = game.getSettings().board.height

        for (let row = 0; row < this._height; row++) {
            this._board[row] = []
        }
    }

    clearBlocksIfRowComplete (position, height) {
        const y = position.getY()
        const maxRow = y + height

        let rowsCleared = 0

        for (let row = y; row < maxRow; row++) {
            if (this.rowIsComplete(row)) {
                this.clearRow(row)
                rowsCleared += 1
            }
        }

        return rowsCleared
    }

    clearRow (completedRow) {
        for (let row = completedRow; row > 0; row--) {
            this._board[row] = this._board[row - 1]
        }

        this._board[0] = []
    }

    dispose () {
        delete this._board
        delete this._locked
        delete this._height
        delete this._width
    }

    getBoard () {
        return this._board
    }

    getHeight () {
        return this._height
    }

    getWidth () {
        return this._width
    }

    isLocked () {
        return this._locked
    }

    landBlock (block) {
        if (this.isLocked()) return

        const position = block.getPosition()
        const shape = block.getShape()

        if (this.spaceIsAvailable(shape, position)) {
            this._locked = true

            const height = shape.length
            const width = shape[0].length
            const x = position.getX()
            const y = position.getY()

            const maxCol = x + width
            const maxRow = y + height

            for (let row = y; row < maxRow; row++) {
                for (let col = x; col < maxCol; col++) {
                    const boardTile = this._board[row][col]
                    const shapeTile = shape[row - y][col - x]

                    if (!boardTile && shapeTile) {
                        this._board[row][col] = shapeTile
                    }
                }
            }

            const rowsCleared = this.clearBlocksIfRowComplete(position, height)

            this._locked = false

            return rowsCleared
        }
    }

    rowIsComplete (row) {
        for (let col = 0; col < this._width; col++) {
            if (!this._board[row][col]) return false
        }

        return true
    }

    spaceIsAvailable (shape, position) {
        const height = shape.length
        const width = shape[0].length
        const x = position.getX()
        const y = position.getY()

        const maxCol = x + width
        const maxRow = y + height

        if (x < 0
         || y < 0
         || maxRow > this._height
         || maxCol > this._width) return false

        for (let row = y; row < maxRow; row++) {
            for (let col = x; col < maxCol; col++) {
                const boardTile = this._board[row][col]
                const shapeTile = shape[row - y][col - x]
                if (boardTile && shapeTile) return false
            }
        }

        return true
    }
}

export default Board