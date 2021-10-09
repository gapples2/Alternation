function canHalfJump(){
    if (data.timesHalfJumped == 0 && data.hasUpgrade[4] && data.halfPoints.gte(1e18)) data.canHalfJump = true
    else data.canHalfJump = false
    //future requirements will go here
}
function halfJumpReset(){
    if (data.canHalfJump){
        data.halfPoints = new Decimal(10)
        data.halfPointGain = new Decimal(0)
        for (let i = 0; i < data.destabAmounts.length; i++) {
            data.destabAmounts[i] = {t:new Decimal(0),amt:new Decimal(0)}
        }
        data.timesHalfJumped = data.timesHalfJumped.plus(1)
    }
}