import SHAPES from '../constants/shapes'
import random from './random'

export default function getRandomBlockShape () {
    const shapes = Object.values(SHAPES)
    const idx = Math.floor(random(shapes.length))
    return shapes[idx]
}