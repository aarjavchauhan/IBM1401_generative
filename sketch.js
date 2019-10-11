let result
function preload() {
  result = loadStrings('manual.txt')
}

var wordsArray = []
var partsOfSpeech = []
let points = []
const rate = 25
var distinctPartsOfSpeech = []

var transparencyCounter = 0
var opaque = false

function setup() {

  createCanvas(600,600)
  background(255)

  createRitaArrays()
}

function createRitaArrays(){
  for (var i = 0; i < result.length-1; i++) {
    var words = RiTa.tokenize(result[i])
    for (var j=0; j < words.length; j++) {
      wordsArray.push(words[j])
      partsOfSpeech.push(RiTa.getPosTags(words[j]))
    }
  }
  countPOS(partsOfSpeech)
}

function draw() {

  determinePointTransparency()
  drawPoints()
}

function determinePointTransparency(){
  if(transparencyCounter < 255 && !opaque)
  {
    transparencyCounter++
  }
  else if (transparencyCounter == 255) {
    opaque = true
    transparencyCounter--
  }
  else if (transparencyCounter < 255 && transparencyCounter != 0 && opaque) {
    transparencyCounter--
  }
  else if (transparencyCounter == 0 && opaque) {
    transparencyCounter++
    opaque = false
  }
}

function drawPoints()
{
  if(points.length == 0){
    makePoint(width/2, height/2, wordsArray[0], partsOfSpeech[0])
    points[0].display()
  }
  if(frameCount%rate == 0 && frameCount/rate < wordsArray.length){
    var x = Math.ceil(random(width) / 10) * 10
    var y = Math.ceil(random(height) / 10) * 10
    makePoint(x, y, wordsArray[frameCount/rate], partsOfSpeech[frameCount/rate])
  //line(x, y, x+frameCount/25, y+frameCount/25);
  //text(wordsArray[frameCount/100], random(width), random(height))
  }

  for (var i = points.length-1; i > 0; i--) {
    if (!points[i].hasBeenDisplayed)
     points[i].display()
    //console.log(i);
  }
}

function makePoint(x,y,word,pos){
  points.push(new Point(x, y, word, pos[0]))
//  console.log(pos);
  // for (var i = 0; i < distinctPartsOfSpeech.length; i++) {
  //   if(distinctPartsOfSpeech[i]
  // }
  if (distinctPartsOfSpeech.indexOf(pos[0]) == -1) {
    distinctPartsOfSpeech.push(pos[0])
  }
}

function countPOS(a)
{
  var result = { };
for(var i = 0; i < a.length; ++i) {
    if(!result[a[i]])
        result[a[i]] = 0;
    ++result[a[i]];
}
console.log(result);
}
