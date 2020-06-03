class Thing {

  constructor() {
    this.clicked = false;
    this.number = 0;
    this.flag = false;
    this.flagged=false;
    this.boom = false;
    this.toUnload = false;
    this.x = 0;
    this.y = 0;
    this.size = 30;
    this.flag= loadImage('flag.png');
  }
  show(pos) {
    if(this.flagged==true){
     image(this.flag, (pos % 16) * this.size+1, floor(pos / 16) * this.size+1, this.size-2, this.size-2) 
    }
    
    else if (this.clicked != false) {
      if (!this.toUnload)
        fill(255);
      else {
        fill(125, 125, 200)
      }
      rect(pos % 16 * this.size, floor(pos / 16) * this.size, this.size, this.size);
      fill(0);
      if (this.number != 0) {
        text(this.number, (pos % 16) * this.size, floor(pos / 16) * this.size + 8, this.size, this.size);
      }
    }


  }


}