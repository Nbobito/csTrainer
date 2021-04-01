let offset, interval, currentTime, timerReady = false
let isKeyDown, isTimerRunning = false

function startTimer() {
    offset = Date.now()
}

function getTimerValue(format = true) {
    let output
    if (format) {
        output = (Math.round(((Date.now() - offset) / 1000 + Number.EPSILON) * 100) / 100).toFixed(2)
    } else {
        output = Date.now() - offset
    }
    return output
}

function updateTimer(displayTime) {
    $("timer").innerHTML = displayTime || getTimerValue()
}

function setInnerHtml(ele, dat) {
    $(ele).innerHTML = dat
}
let timeoutReady
let n = 30
let type = "free"
function timerHandler(keyType) {
    if (keyType) { //Is key up or down?
        if (isTimerRunning) { //Check if timer is already running
            currentTime = getTimerValue()
            clearInterval(interval)
            updateTimer(currentTime)
            isTimerRunning = false
            storeTime(currentTime, type)
            quickTimes(n)
        } else { //If it isn't get the timer ready
            timerReady = false
            $("timer").style.color = "#ED2800"
            timeoutReady = setTimeout(() => {
                timerReady = true
                $("timer").style.color = "#00E000"
            }, 500);
        }
    } else {
        if (!isTimerRunning) { //If timer isn't running, either start it or reset.
            if (timerReady) {
                isTimerRunning = true
                timerReady = false
                startTimer()
                interval = setInterval(updateTimer, 10);
                $("timer").style.color = "#000000"
            } else {
                clearTimeout(timeoutReady)
                $("timer").style.color = "#000000"
            }
        }
    }
}

document.addEventListener("keydown", function (event) {
    let key = event.key
    if (!isKeyDown) {
        isKeyDown = true
        switch (key) {
            case " ":
                timerHandler(true)
                break
            default:

        }
    }
})

function quickTimes(n){
    let display
    if(getTimes().length < n){
        display = getTimes().reverse()
    } else {
        display = getTimes().slice(-n).reverse()
    }
    $("recents").innerHTML = ""
    for(let i = 0; i<display.length; i++){
        let newElement = document.createElement("span")
        newElement.innerText = display[i][0]
        newElement.className = display[i][1]
        newElement.style.backgroundColor = "#5e7c88"
        newElement.style.borderRadius = "5px"
        newElement.style.margin = "2px"
        newElement.style.boxShadow = "1px 1px 3px rgba(0, 0, 0, 0.15)"
        $("recents").appendChild(newElement)
    }
}

document.addEventListener("keyup", function (event) {
    let key = event.key
    if (isKeyDown) {
        isKeyDown = false
        switch (key) {
            default:
                timerHandler(false)
                break
        }
    }
})

document.body.onload = () => {
    quickTimes(n)
}