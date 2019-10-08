function setup() {

    createCanvas(200,200);
    background(50);
    textSize(20);
    noStroke();

    var words = RiTa.tokenize("The elephant took a bite!")
    for (var i=0, j = words.length; i<j; i++) {
        text(words[i], 50, 50 + i*20);
    }
  }
