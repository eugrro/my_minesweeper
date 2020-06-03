class boom {

  constructor() {
    this.clicked = false;
    this.boom = true;
		this.x = 100;
    this.y = 100;
    this.size = 30;
    this.flagged = false;
    this.flag= loadImage('flag.png');
    this.image = loadImage('download.png');
  }
  set_cord(cord) {
    this.x = cord % 16;
    this.y = floor(cord / 16);

  }
  show() {
    textAlign(CENTER);
    if(this.flagged==true){
     image(this.flag, this.x*this.size+1, this.y*this.size+1, this.size-2, this.size-2) 
    }
    if (this.clicked == true) {
      fill(0);
    	image(this.image, this.x*this.size+1, this.y*this.size+1, this.size-2, this.size-2);  
    }
  }



}