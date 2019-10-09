let result
function preload() {
  result = loadStrings('manual.txt')
}

var wordsArray = []
var partsOfSpeech = []

function setup() {

  createCanvas(600,600)
  background(255)

  for (var i = 0; i < result.length-1; i++) {
    var words = RiTa.tokenize(result[i])
    for (var j=0; j < words.length; j++) {
      wordsArray.push(words[j])
      partsOfSpeech.push(RiTa.getPosTags(words[j]))
    }
  }
}

function draw() {
  //
  drawPoints()
}

function drawPoints()
{

  if(frameCount%100 == 0 && frameCount/100 < wordsArray.length){
    var x = random(width)
    var y = random(height)
    drawFromPoint(x, y)
  //  line(x, y, x+frameCount/25, y+frameCount/25);
    //text(wordsArray[frameCount/100], random(width), random(height))
  }
}

function drawFromPoint(x,y,length,pos){
  push()
  noStroke()
  fill(0, 0, 0, 125)
  circle(x, y, 20)
  pop()
}

function darken(transparency)
{
  // if
  // return
}
