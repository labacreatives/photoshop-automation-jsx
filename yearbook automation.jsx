﻿#include json2.js
var doc = app.activeDocument;
var layer = doc.activeLayer;

var sourcePath = doc.path
var images = getFiles(sourcePath);
var templateDocument = doc; 

var saveName = "";
var destPath = sourcePath;

var folders = Folder(sourcePath).getFiles (function(f) { return f instanceof Folder; });

for(var i=0 ; i < folders.length ; i++){
    var casualPhoto = Folder(folders[i]).getFiles("casual.PNG")
    var gownPhoto = Folder(folders[i]).getFiles("gown.PNG")
    var babyPicture = Folder(folders[i]).getFiles("baby.PNG")
    var lastword = loadJson (sourcePath + "/lastword.json")
    Init();
    doc = app.open(casualPhoto);
    resizeImage(null, 3627);
    copyImage();
    doc.close(SaveOptions.DONOTSAVECHANGES);
    doc = templateDocument;
    setActiveLayer ("casual");
    moveLayer(pasteIntoLayer(), 600, 0);
    
    savePSD (saveName);
    saveJPEG (saveName);
}



function copyImage(){
    doc.activeLayer.copy ()
    saveName = doc.name;
}

function moveLayer(layer , x , y){
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



