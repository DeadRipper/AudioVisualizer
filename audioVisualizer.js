var canvas = document.getElementById('audio_visualizer_id')
var ctx = canvas.getContext('2d')
var ctxLines = canvas.getContext('2d')
var height = canvas.clientHeight, width = canvas.clientWidth

const DARK_GRAY = "rgb(48, 48, 48)"
const LIGHT_GRAY = "rgb(224, 224, 224)"
var context = new (window.AudioContext || window.webkitAudioContext)();

var analyser = context.createAnalyser()

var audio = new Audio()
audio.src = 'Vanic - Too Soon ft. Maty Noyes (Heroless Remix).mp3'
audio.controls = true
audio.autoplay = true
audio.loop = true

audio.crossOrigin = 'anonymous'

var source = context.createMediaElementSource(audio)
source.connect(analyser)
analyser.connect(context.destination)

analyser.fftSize = 2048
var bufferLength = analyser.frequencyBinCount
var dataArray = new Uint8Array(bufferLength)

var time = 1
var barHeight = 5

function Play() {
    audio.play()
}

function Stop() {
    audio.pause()
}


function DrawWaves() {
    drawVisual = requestAnimationFrame(DrawWaves)
    ctx.clearRect(0, 0, width, height)
    analyser.getByteTimeDomainData(dataArray)
    ctx.lineWidth = 2
    ctx.fillStyle = DARK_GRAY
    ctx.beginPath()

    var sliceWidth = width/analyser.frequencyBinCount
    var x = 0

    for(var index = 0; index < bufferLength; index++) {
        var element = dataArray[index] / 128.0
        var y = element*height/2

        if(index === 0)
          ctx.moveTo(x, y)
        else
          ctx.lineTo(x, y)

        if(x <= audio.currentTime*width/audio.duration)
            x += sliceWidth
    }
    ctx.fillStyle = LIGHT_GRAY
    ctx.fillRect(audio.currentTime*width/audio.duration, 0, audio.currentTime*width/audio.duration+width, height)
    ctx.stroke()
}
DrawWaves()
