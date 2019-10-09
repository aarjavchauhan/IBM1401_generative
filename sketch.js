let result
function preload() {
  result = loadStrings('manual.txt')
}

var wordsArray = []
var partsOfSpeech = []

function setup() {

  createCanvas(600,600)
  background(50)
  textSize(20)
  noStroke()

  for (var i = 0; i < result.length-1; i++) {
    var words = RiTa.tokenize(result[i])
    for (var j=0; j < words.length; j++) {
      wordsArray.push(words[j])
      partsOfSpeech.push(RiTa.getPosTags(words[j]))
    }
  }
}
