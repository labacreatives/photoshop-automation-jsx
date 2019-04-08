#include json2.js
var doc = app.activeDocument;
var layer = doc.activeLayer;

var sourcePath = doc.path
var images = getFiles(sourcePath);
var templateDocument = doc; 

var saveName = "";
var destPath = sourcePath;

var folders = Folder(sourcePath).getFiles (function(f) { return f instanceof Folder; });

for(var i=0 ; i < folders.length ; i++){
    var casualPhoto = Folder(folders[i]).getFiles("casual.*")
    var gownPhoto = Folder(folders[i]).getFiles("gown.*")
    var babyPicture = Folder(folders[i]).getFiles("baby.*")
    var list = loadJson (folders[i]+ "/lastword.json")
    var casualGroup = doc.layerSets.getByName ("casual group")
    var gownGroup = doc.layerSets.getByName ("gown group")
    var babyGroup = doc.layerSets.getByName ("baby group")
     var textGroup = doc.layerSets.getByName ("texts");
    //Init();
    //-----------------------------------------------------------
    doc = app.open(casualPhoto[0]);
    resizeImage(null, 3627);
    copyImage();
    doc.close(SaveOptions.DONOTSAVECHANGES);
    doc = templateDocument;
    var casualLayer = pasteIntoLayer()
    translateLayer(casualLayer, 600, 0);
    casualLayer.move(casualGroup, ElementPlacement.PLACEATEND)

    //-----------------------------------------------------------
    doc = app.open(gownPhoto[0]);
    resizeImage(null, 963);
    copyImage();
    doc.close(SaveOptions.DONOTSAVECHANGES);
    doc = templateDocument;
    var gownLayer = pasteIntoLayer ();
    gownLayer.move(gownGroup, ElementPlacement.PLACEATBEGINNING)
    moveLayer(gownLayer, 300, 220);

    //-----------------------------------------------------------
    doc = app.open(babyPicture[0]);
    resizeImage(null, 675);
    copyImage();
    doc.close(SaveOptions.DONOTSAVECHANGES);
    doc = templateDocument;
    var babyLayer = pasteIntoLayer ();
    babyLayer.move(babyGroup, ElementPlacement.PLACEATBEGINNING)
    moveLayer(babyLayer, 500, 1110)

    //-----------------------------------------------------------
    replaceText ("fullname", list["Name"])
    replaceText ("nickname", list[1])
    replaceText ("frequent words", list[2])
    replaceText ("role model", list[4])
    replaceText ("phobia", list[5])
    replaceText ("ambition", list[7])
    replaceText ("obsessed", list[3])
    replaceText ("10 years", list[7])
    replaceText ("quote", list[6])
    replaceText ("phone", list["phone"])
    replaceText ("email", list["email"])
    replaceText ("last word", list[10])
    
    //-----------------------------------------------------------
    destPath = folders[i]
    //savePSD ("");
    saveJPEG ("");
    casualLayer.remove()
    gownLayer.remove()
    babyLayer.remove()
}


function moveLayer(layer,targetX,targetY ){
    var Position = layer.bounds;
    Position[0] = targetX- Position[0];
    Position[1] = targetY - Position[1];
    
    layer.translate(-Position[0],-Position[1]);
}
function copyImage(){
    doc.activeLayer.copy ()
    saveName = doc.name;
}

function translateLayer(layer , x , y){
    layer.translate (600 , 0)
}

function resizeImage(width, height){
    var heightValue = height ? UnitValue(height,"px") : null;
    var widthValue = width ? UnitValue(width,"px") : null;
    doc.resizeImage (widthValue, heightValue, null, ResampleMethod.BICUBIC)
}

function savePSD(name){
    var savePath = new File(destPath+name);
    var PSDSaveOptions = new PhotoshopSaveOptions();
    doc.saveAs(savePath, PSDSaveOptions, true);
}
function saveJPEG(name){
    var savePath = new File(destPath+name);
    var JPEGSaveOpts = new JPEGSaveOptions();
    doc.saveAs(savePath, JPEGSaveOptions, true);
}
function getFiles(path){
    return Folder(path).getFiles("*.png");
}
function pasteIntoLayer(){
   layer = doc.artLayers.getByName ("casual");
   doc.selection.selectAll()
   return doc.paste ()
}
function Init(){
     //doc = app.documents.getByName ("template.psd")
     layer = doc.artLayers.getByName ("casual")
     var selection01 = doc.selection.selectAll()
     doc.selection.clear();
     doc.selection.deselect();
     app.preferences.rulerUnits = Units.PIXELS;  
}
function setActiveLayer(layerName){
    layer = doc.artLayers.getByName (layerName);
}
function loadJson(path){
    var jsonFile = new File(path);
    jsonFile.open ('r');
    var jsonStr = jsonFile.read ();
    jsonFile.close();
    return JSON.parse(jsonStr);
}
function replaceText (layerName, text){
   textGroup.artLayers.getByName (layerName).textItem.contents = text;
}




