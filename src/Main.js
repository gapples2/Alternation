function numberIncrease(i) {
    data.halfPoints = data.halfPoints.plus(i)
    updateHTML()
}
function mainLoop(){
    let diff = (Date.now()-data.timeSinceUpdate)/1000
    data.halfPointGain = destabProduction(0)
    numberIncrease(data.halfPointGain.times(diff))
    produceDestabs(diff)
    upgradeEffects()
    canHalfJump()

    data.timeSinceUpdate = Date.now()
}
function switchTab(i){
    data.currentTab = i
    updateHTML()
}
window.setInterval(function(){
    mainLoop()
}, 50);