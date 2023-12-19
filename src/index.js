import Game from './Game'

new Game({
    board: {
        width: 10,
        height: 20,
    },

    canvasId: 'canvas',
    difficultyIncreasesEvery: 30,
    fps: 60,
    initialDifficulty: 2,
})