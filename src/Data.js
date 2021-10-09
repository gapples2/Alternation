//legacy
/*
//decimal serializing
let tagged_classes = new Map();
const register_tag = clazz => tagged_classes.set(clazz.name, clazz);
register_tag(Decimal);
function tagging(k, v) {
    let cName = this[k]?.constructor?.name;
    return !(k == 'v' && this.hasOwnProperty ('#tag')) && tagged_classes.has(cName) ? {'#tag': cName, v} : v;
}
const untagging = (_, v) => (v?.hasOwnProperty('#tag')) ? new (tagged_classes.get(v['#tag']))(v.v) : v;
 */
/*
function dataFixer(obj1,obj2){
    if(typeof obj2 == "object" && !(obj2 instanceof Decimal)){
        Object.keys(obj2).forEach(o=>obj1[o] = dataFixer(obj1[o]||obj2[o],obj2[o]))
    }
    return obj1
}
function load(){
    let newdata = {}
    Object.assign(newdata, JSON.parse(window.localStorage.getItem('alternationSave'), untagging));
    data = dataFixer(newdata,data)
    loaded = true
}
 */
//create all the variables in a data object for saving
function getDefaultObject() {
    return {
        //halfPoints
        halfPoints: new Decimal(10),
        halfPointGain: new Decimal(0),
        //destabs
        destabAmounts: [{t:new Decimal(0),amt:new Decimal(0)}, {t:new Decimal(0),amt:new Decimal(0)}, {t:new Decimal(0),amt:new Decimal(0)}, {t:new Decimal(0),amt:new Decimal(0)}],
        //upgrades
        hasUpgrade: [false, false, false, false, false],
        upgradeEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
        //half jump related
        timesHalfJumped: new Decimal(0),
        canHalfJump: false,
        //misc
        currentTab: 1,
        updateIDs: [0, 6, 0],
        timeSinceUpdate: Date.now()
    }
}
let data = getDefaultObject()
//saving and loading
function save(){
    window.localStorage.setItem('alternationSave', JSON.stringify(data))
}
function load() {
    let savedata = JSON.parse(window.localStorage.getItem('alternationSave'))
    if (savedata !== undefined) fixSave(data, savedata)
}
//fix saves
function fixSave(main=getDefaultObject(), data) {
    if (typeof data === "object") {
        Object.keys(data).forEach(i => {
            if (main[i] instanceof Decimal) {
                main[i] = new Decimal(data[i]!==null?data[i]:main[i])
            } else if (typeof main[i]  == "object") {
                fixSave(main[i], data[i])
            } else {
                main[i] = data[i]
            }
        })
        return main
    }
    else return getDefaultObject()
}
function fixOldSaves(){
    //fix important things from old versions
    if (data.updateIDs[1] === 3) fullReset()
    if (data.updateIDs[1] === 4) fullReset()
    if (data.updateIDs[1] !== 6) data.updateIDs[1] = 6
}
function exportSave(){
    save()
    let exportedData = btoa(JSON.stringify(data));
    const exportedDataText = document.createElement("textarea");
    exportedDataText.value = exportedData;
    document.body.appendChild(exportedDataText);
    exportedDataText.select();
    exportedDataText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(exportedDataText);
}
function importSave(){
    let importedData = prompt("Paste your save data here!")
    data = Object.assign(getDefaultObject(), JSON.parse(atob(importedData)))
    save()
    location.reload()
}
window.setInterval(function(){
    save()
}, 10000);
window.onload = function (){
    load()
    fixOldSaves()
}
//full reset
function fullReset(){
    window.localStorage.removeItem('alternationSave')
    location.reload()
}

