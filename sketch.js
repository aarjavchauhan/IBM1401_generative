let result
let song;
let amplitude;
function preload() {
  result = loadStrings('manual.txt')
  soundFormats('mp3');
  song = loadSound('assets/IBM1402.mp3');
}

var wordsArray = []
var partsOfSpeech = []
let points = []
const rate = 14
var distinctPartsOfSpeech = []

var transparencyCounter = 0
var opaque = false
var textTransparency = 100
var artistString = "Jóhann Jóhannsson"
var artistArray = []
var textShown = 0
var textCheck = []
var artistShown = false
var albumString = "ibm 1401, a user's manual"
var albumArray = []
var albumTransparency = 0
var textX = 0
var textY = 0
var numberArray = [4, 5, 6, 7, 8, 9]
var numberRepeatArray = []

var highestAmplitude = 0.00000

function setup() {
  createCanvas(600,600)
  background(255)

  createRitaArrays()
  setTextInformation()
  soundSetup()
}

//create arrays which contains words and their parts of speech
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
  showArtist()
  showNumbers()
  soundPlay()
}

//calculate the transparency of points
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

//plot points on the canvas
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
    showNumbers()
  }

  for (var i = points.length-1; i > 0; i--) {
    if (!points[i].hasBeenDisplayed){
      points[i].display()
    }
  }

}

// create point object
function makePoint(x,y,word,pos){
  points.push(new Point(x, y, word, pos[0]))
  if (distinctPartsOfSpeech.indexOf(pos[0]) == -1) {
    distinctPartsOfSpeech.push(pos[0])
  }
}

//count the parts of speech
function countPOS(a)
{
  var result = { };
  for(var i = 0; i < a.length; ++i) {
    if(!result[a[i]])
    result[a[i]] = 0;
    ++result[a[i]];
  }
}

//display artist and album information on canvas
function showArtist(){
  push()
  var textToShow = artistArray[Math.round(points.length/10)]
  textAlign(LEFT)
  textSize(20)
  textFont('Courier New')
  textStyle(ITALIC)
  fill(0,0,0, textTransparency)
  for (var i = 0; i < textCheck.length; i++) {
    if(textCheck[i] == 0 && Math.round(points.length/10) == i){
      text(textToShow, textX+(i*10), textY)
      textCheck[i] = 1
      break
    }
  }
  if(Math.round(points.length/10) == 16)
  {
    fill(0,0,0, albumTransparency)
    textSize(10)
    text(albumString, textX+20, textY+25)
    if(albumTransparency<=10)
    albumTransparency += 2
  }
  pop()
}

//create text arrays for album and artist
function setTextInformation()
{
  textX = random(width-160)
  textY = random(height-50)
  artistArray = artistString.split('')
  textCheck.length = artistArray.length
  textCheck.fill(0)
  albumArray = albumString.split('')
  for (var i = 0; i < numberArray.length; i++) {
    numberRepeatArray[i] = Math.floor(random(40, 70))
  }
}

//show numbers on album art
function showNumbers()
{
  push()
  textSize(10)
  textStyle(NORMAL)
  fill(0,0,0, random(50, 100))
  var number = numberArray[Math.floor(Math.random()*numberArray.length)]
  var repeatState = numberArray.indexOf(number)
  if(numberRepeatArray[repeatState] > 0){
    translate(width-5-(points.length*20), height-10-(repeatState*20))
    rotate(PI)
    text(number, 0, 0)
    numberRepeatArray[repeatState] --
  }
  pop()
}

//setup function for sound
function soundSetup(){
  amplitude = new p5.Amplitude()
  song.play()

}

//play sound and return radius for points
function soundPlay(){
  var level = amplitude.getLevel()
  if (level >= highestAmplitude) {
    highestAmplitude = level
  }
  var radius = Math.round(map(level, 0, 1, 3, 15))
  return radius
}
