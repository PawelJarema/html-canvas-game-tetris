class Sounds {
    _format
    _music
    _path
    _sound

    _pathTo (name, format = this._format) {
        if (name) return `${this._path}/${name}${format}`
    }

    _stop (audio) {
        if (!audio) return

        try {
            const isLoading =  !audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2
            if (isLoading) return

            audio.pause()
            audio.currentTime = 0

        } catch (_) { /**/ }
    }

    constructor (format = '.mp3', path = './src/assets') {
        this._path = path
        this._format = format
    }

    dispose () {
        this._stop(this._music)
        this._stop(this._sound)
        this._music = null
        this._sound = null
    }

    playMusic (name, loop = false) {
        this._stop(this._music)
        this._music = new Audio(this._pathTo(name))

        if (loop) this._music.addEventListener('ended', function () {
            this.currentTime = 0
            this.play()
        })

        this._music.play()
    }

    playMusicList (musicList, loop = true) {
        let i = 0

        const playNext = () => {
            const next = musicList[i++]
            if (next) {
                this.playMusic(next)
                this._music.addEventListener('ended', playNext)

            } else if (loop) {
                this.playMusicList(musicList, true)
            }
        }

        playNext()
    }

    playSound (name) {
        this._stop(this._sound)
        this._sound = new Audio(this._pathTo(name))
        this._sound.play()
    }
}

export default Sounds