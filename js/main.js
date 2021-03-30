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

function timerHandler(keyType) {
    if (keyType) {
        if (isTimerRunning) {
            currentTime = getTimerValue()
            clearInterval(interval)
            updateTimer(currentTime)
            isTimerRunning = false
        } else {
            timerReady = false
            $("timer").style.color = "#ED2800"
            timeoutReady = setTimeout(() => {
                timerReady = true
                $("timer").style.color = "#00E000"
            }, 500);
        }
    } else {
        if (!isTimerRunning) {
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