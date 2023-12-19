export default function rotate2DArray90degClockwise (array) {
    const rows = array.length
    const cols = array[0].length

    const transposed = []

    for (let col = 0; col < cols; col++) {
        transposed.push([])
        for (let row = 0; row < rows; row++) {
            transposed[col][rows - row - 1] = array[row][col]
        }
    }

    return transposed
}