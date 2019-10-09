let result
function preload() {
  result = loadStrings('manual.txt')
}

function setup() {

  createCanvas(200,200)
  background(50)
  textSize(20)
  noStroke()

  for (var i = 0; i < result.length-1; i++) {
    var words = RiTa.tokenize(result[i])
    for (var j=0; j < words.length; j++) {
      console.log(words[j])
    }
  }
}
