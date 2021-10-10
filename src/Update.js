function updateHTML(){
    //halfPoints displays
    document.getElementById("halfPointDisplay").innerHTML = `You have ${format(data.halfPoints)} Half Points`
    document.getElementById("halfPointGainDisplay").innerHTML = `You are gaining ${format(data.halfPointGain)} Half Points every second`
    //producer displays
    let numWords = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven"]
    for(let x=0;x<4;x++){
      let a = x==0?`Half Point${destabPower(x).eq(1)?"":"s"}`:`Destabilizer ${x}`
        document.getElementById("destab"+numWords[x]).innerHTML = `Destabilizer ${x+1}<br>Cost: ${format(destabCost(x))}<br>Produces ${format(destabPower(x))} ${a}/sec<br>Currently producing ${format(destabProduction(x))} ${x==0?`Half Point${destabProduction(x).eq(1)?"":"s"}`:`Destabilizer ${x}`}<br>Amount: ${format(data.destabAmounts[x].amt)}`
        document.getElementById("destab"+numWords[x]).className = "destabilizer can"+(data.halfPoints.gte(destabCost(x))?"":"t")+"Buy"
    }
  // energizer display
    for(let x=0;x<11;x++){
      document.getElementById("upgrade"+numWords[x]).style.color = data.hasUpgrade[x]?`gold`:``
      document.getElementById("upgrade"+numWords[x]).className = "upgrade "+(data.hasUpgrade[x]?"can":(data.halfPoints.gte(upgradeCosts[x]||1e309)?"mid":"cant"))+"Buy"
    }
    //halfJump display
    if (data.canHalfJump) document.getElementById("halfJump").innerHTML = "Half Jump."
    else document.getElementById("halfJump").innerHTML = "1e18 Half Points and Destabilizing IV are required to unlock Half Jump"
    //misc displays
    document.getElementById("versionText").innerHTML = `[Beta v${data.updateIDs[0]}.${data.updateIDs[1]}.${data.updateIDs[2]}]`

    showAndHideStuff()
}
function upgradeTextUpdate(i){
    //upgrades 1-4
    let txt = `Currently: ${format(data.upgradeEffects[i])}x<br>Cost: ${format(upgradeCosts[i])} Half Points`
    if(i<4)txt = `D${i+1} gains a small multiplier based on the amount of D4 you have<br>${txt}`
    switch(i){
      case 4:
        txt = `All destabilizers gain a small multiplier based on the amount of half points you have<br>${txt}`
    }
    document.getElementById("upgradesText").innerHTML = txt
}
function showAndHideStuff(){
    let numWords = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven"]
    //destabilizers tab
    let destabilizers = document.getElementsByClassName("destabilizer")
    for (let i = 0; i < destabilizers.length; i++) {
        destabilizers[i].style.display = data.currentTab===1 ? 'flex' : 'none'
    }
    //upgrades tab
    let upgrades = document.getElementsByClassName("upgrade")
    let upText = document.getElementById("upgradesText")
    let upText2 = document.getElementById("upgradesTopText")
    for (let i = 0; i < upgrades.length; i++) {
        upgrades[i].style.display = data.currentTab===3 ? 'flex' : 'none'
    }
    upText.style.display = data.currentTab===3 ? 'flex' : 'none'
    upText2.style.display = data.currentTab===3 ? 'flex' : 'none'
    // half jump
    let halfJumpElements = document.getElementsByClassName("halfJumpThings")
    for (let i=0; i<halfJumpElements.length; i++){
        halfJumpElements[i].style.display = data.currentTab===4 ? 'flex' : 'none'
    }
    //settings
    let settingsElements = document.getElementsByClassName("settingsElement")
    for (let i=0; i<settingsElements.length; i++){
        settingsElements[i].style.display = data.currentTab===2 ? 'flex' : 'none'
    }
    //nav buttons
    document.getElementById("halfJumpNav").style.display = data.timesHalfJumped.gte(1)||data.canHalfJump ? '' : 'none'
    document.getElementById("upgradesNav").style.display = data.destabAmounts[3].amt.gte(1)||data.hasUpgrade[0]||data.timesHalfJumped.gte(1)
    for(let x=0;x<11;x++){
      let max = ()=>{
        switch(data.timesHalfJumped.toNumber()){
          case 0:
            return 5
            break;
          case 1:
            return 7
            break;
        }
      }
        document.getElementById("upgrade"+numWords[x]).style.display=(x==0||data.hasUpgrade[x-1])&&data.currentTab==3&&x<max()?'flex':'none'
    }
}