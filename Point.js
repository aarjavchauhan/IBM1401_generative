class Point {
  constructor(pointX, pointY, word, pos) {
    this.x = pointX
    this.y = pointY
    this.hasReachedOpacity = false
    this.hasBeenDisplayed = false
    this.word = word
    this.pos = pos
  }

  display(){
    //console.log(this.pos)
    push()
  //  console.log(this.pos);
    let colorThis = color(0,0,0,transparencyCounter)
    if (this.pos == "nn") {
      colorThis = color(165, 184, 128, transparencyCounter)
    } else if (this.pos == "nnp") {
      colorThis = color(155, 78, 110, transparencyCounter)
    } else if (this.pos == "nns") {
      colorThis = color(94, 111, 122, transparencyCounter)
    } else if (this.pos == ";") {
      colorThis = color(104, 121, 21, transparencyCounter)
    } else if (this.pos == ".") {
      colorThis = color(170, 144, 44, transparencyCounter)
    }

    noStroke()
      fill(colorThis)
      circle(this.x, this.y, soundPlay())
      stroke(colorThis)
      line(this.x, this.y, this.x+this.word.length*3, this.y+this.word.length*3)
      this.hasBeenDisplayed = true
    pop()
  }

  color()
  {

  }
}
