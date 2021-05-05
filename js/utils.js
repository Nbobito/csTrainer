function $(ele) {
    return document.getElementById(ele)
}

function _(ele){
    return document.getElementsByTagName(ele)
}

function setInnerHtml(ele, dat) {
    $(ele).innerHTML = dat
}

function storeTime(time, type){
    let times = getTimes()
    times.push([time, type])
    //console.log(times)
    localStorage.removeItem("times")
    localStorage.setItem("times", JSON.stringify(times))
    return times
}

function getTimes(){
    return JSON.parse(localStorage.getItem("times")) || []
}

function clearTimes(){
    return localStorage.removeItem("times")
}

function getMean(arr) {
    let out = 0

    for (i = 0; i < arr.length; i++) {
        out += arr[i]
    }

    out /= arr.length

    return out
}

function getAverage(arr) {
    arr.pop()
    arr.shift()

    let out = 0

    for (i = 0; i < arr.length; i++) {
        out += arr[i]
    }

    out /= arr.length

    return out
}

function getVariance(arr) {
    let popmean = getMean(arr)
    let diffsum = 0

    for (i = 0; i < arr.length; i++) {
        diffsum += Math.pow((arr[i] - popmean), 2)
    }

    diffsum /= arr.length

    return diffsum
}

function getDeviation(arr) {
    return Math.sqrt(getVariance(arr))
}