function destabCost(x){
  return new Decimal([10,100,3000,1e6][x]).times(new Decimal(1.2).pow(data.destabAmounts[x].t))
}

function buyDestab(x){
    let i = new Decimal(x-1)
    let cost = destabCost(i)
    if (data.halfPoints.gte(cost)){
        data.halfPoints = data.halfPoints.sub(cost)
        data.destabAmounts[i].amt = data.destabAmounts[i].amt.plus(1)
        data.destabAmounts[i].t = data.destabAmounts[i].t.add(1)
        updateHTML()
    }
}
function produceDestabs(diff){
    for (let a = 0; a < data.destabAmounts.length-1; a++) {
        data.destabAmounts[a].amt = data.destabAmounts[a].amt.plus(destabProduction(a+1).times(diff))
    }
}
function destabProduction(x){
  return data.destabAmounts[x].amt.times(destabPower(x))
}
function destabPower(x){
  let base = new Decimal(1)
  base = base.times(data.hasUpgrade[x]?data.upgradeEffects[x]:1).times(data.destabAmounts[x].t.times(0.01).add(1))
  return base
}
const upgradeCosts = [1e10,3e11,5e12,1e14,1e15]
function buyUpgrade(x){
    let i = new Decimal(x-1)
    if (data.halfPoints.gte(upgradeCosts[i]) && !data.hasUpgrade[i]){
        data.hasUpgrade[i] = true
        data.halfPoints = data.halfPoints.sub(upgradeCosts[i])
        upgradeReset()
    }
}
function upgradeEffects(){
    for (let i=0; i<4; i++){
        data.upgradeEffects[i] = data.destabAmounts[3].t.root(i+2).add(1).times(2).times(data.hasUpgrade[4]?data.upgradeEffects[4]:1)
    }
    data.upgradeEffects[4] = data.halfPoints.add(1).log10().sqrt().add(1)
}
function upgradeReset(){
    data.halfPoints = new Decimal(10)
    data.halfPointGain = new Decimal(0)
    for (let i = 0; i < data.destabAmounts.length; i++) {
        data.destabAmounts[i] = {t:new Decimal(0),amt:new Decimal(0)}
    }
}