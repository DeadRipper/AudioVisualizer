var canvas = document.getElementById('audio_visualizer_id')
var ctx = canvas.getContext('2d')
var ctxLines = canvas.getContext('2d')
var height = canvas.clientHeight, width = canvas.clientWidth

const DARK_GRAY = "rgb(48,48,48)"

var context = new AudioContext()
var analyser = context.createAnalyser()

var audio = new Audio()
audio.src = 'Vanic - Too Soon ft. Maty Noyes (Heroless Remix)_j2IybhV3EL0_youtube.mp3'
audio.controls = true
audio.autoplay = true
audio.loop = true

audio.crossOrigin = 'anonymous'

var source = context.createMediaElementSource(audio)
source.connect(analyser)
analyser.connect(context.destination)

var time = 1

function Play() {
    audio.play()
}

function Stop() {
    audio.pause()
    //audio.currentTime = 0
}

function DrawTimeLine() {
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = DARK_GRAY
    ctx.fillRect(0, height-2.5, audio.currentTime, 2.5)
    console.log(audio.currentTime)
}

function Run() {
    mainGameCycle = setInterval(function() {
        DrawTimeLine()
    },time)
}

Run()
