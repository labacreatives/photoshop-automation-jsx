var doc = app.activeDocument;
var images = fetchImages (doc.path + "/images");

images.forEach(placeImages);

function placeImages(image) {
    var newDocument = openNewDocument(image);
    //var imageCopyLayer = copyActiveLayer(newDocument);
    //doc.paste();
    //newDocument.close ();
}
function copyImage(document){
    if(document){
        document.selection.selectAll().copy();
    }
}
function closeDocument(document, options = SaveOptions.DONOTSAVECHANGES) {
    document.close(options);
}
function openNewDocument() {
    app.open(image);
}
function fetchImages(path){
    var imagesFolder = new Folder(path);
    return imagesFolder.getFiles("*.jpg");
}
function pasteImage(layer) {
    
}
