let size = 16;
let square = 30;
let expand = false;
let flag_counter =0; 
let number_of_boom = 35;

obj_arr = new Array(size * size)

function setup() {
  carch = loadImage('carch.jpg');
  createCanvas(size * square, size * square);
  start();
  frameRate(15);
  generate();
  background(150);

}

function draw() {
  lines();
  board();
  if (gameWin()) {

    background(150, 220, 13);
    text("YOU WIN", width / 2, height / 2);
    image(carch, 0, 0, 160, 160);
    image(carch, 160, 0, 160, 160);
    image(carch, 320, 0, 160, 160);
    image(carch, 0, 160, 160, 160);
    image(carch, 0, 320, 160, 160);
    image(carch, 160, 320, 160, 160);
    image(carch, 320, 160, 160, 160);
    image(carch, 320, 320, 160, 160);

  }
}

function lines() {
  strokeWeight(2);
  for (i = 0; i < width; i++) {
    line(i * square, 0, i * square, height);
  }
  for (i = 0; i < height; i++) {
    line(0, i * square, width, i * square);
  }
}

function mousePressed() {
  let cord_x = floor(mouseX / 30);
  let cord_y = floor(mouseY / 30);
  if (mouseButton === LEFT) {
    if (obj_arr[cord_x + cord_y * 16].flagged == false) {
      obj_arr[cord_x + cord_y * 16].clicked = true;
      if (obj_arr[cord_x + cord_y * 16].boom) {
        display_the_booms();
      }
      goThrough();
    }
  }
  if (mouseButton === CENTER) {
    if(flag_counter<=number_of_boom){                        
    if (obj_arr[cord_x + cord_y * 16].clicked == false) {
      if (obj_arr[cord_x + cord_y * 16].flagged == true) {
        obj_arr[cord_x + cord_y * 16].flagged = false;
        counter--;
        background(150);
      } else if (obj_arr[cord_x + cord_y * 16].flagged == false) {
        obj_arr[cord_x + cord_y * 16].flagged = true;
        counter++;
      }
      obj_arr[cord_x + cord_y * 16].redraw = true;
    }
  }
  }
  // prevent default
  return false;
}

function board() {
  for (i = 0; i < size * size; i++) {
    obj_arr[i].show(i);
  }
}

function start() {
  for (i = 0; i < 256; i++) {
    obj_arr[i] = new Thing();
  }
}

function generate() {
  r = floor(random(256));
  counter = 0;
  while (counter < number_of_boom) {
    if (obj_arr[r].boom == false) {
      obj_arr[r] = new boom();
      obj_arr[r].set_cord(r)
      counter++;
    } else {
      r = floor(random(256));
    }
  }

  for (i = 0; i < 16; i++) {
    for (j = 0; j < 16; j++) {
      for (side = 1; side < 9; side++) {
        if (test_bomb(i * 16 + j, side)) {
          obj_arr[i * 16 + j].number += 1;
        }
      }
    }

  }

}

function test_bomb(pos, side) {
  let offSet;
  switch (side) {
    case 1:
      if (pos < 17 || pos % 16 == 0) return false;
      pos -= 17;
      break;
    case 2:
      if (pos < 16) return false
      pos -= 16;
      break;
    case 3:
      if (pos < 16 || ((pos + 1) % 16) == 0) return false;
      pos -= 15;
      break;
    case 4:
      if (pos % 16 == 0) return false
      pos -= 1;
      break;
    case 5:
      if ((pos + 1) % 16 == 0 && pos != 0) return false;
      pos += 1;
      break;
    case 6:
      if (pos % 16 == 0 || pos > 240) return false
      pos += 15;
      break;
    case 7:
      if (pos >= 240) return false;
      pos += 16;
      break;
    case 8:
      if (pos >= 239 || (pos + 1) % 16 == 0) return false;
      pos += 17;
      break;
  }
  if (obj_arr[pos].boom == true) {
    return true;
  }
  return false;
}

function display_the_booms() {
  for (i = 0; i < size * size; i++) {
    if (obj_arr[i].boom) {
      obj_arr[i].clicked = true;
    }
  }

}


function goThrough() {
  for (e = 0; e < 20; e++) {
    for (i = 0; i < size * size - 1; i++) {
      if (((i % 16) != 15) && obj_arr[i].clicked == false && obj_arr[i + 1].clicked == true && obj_arr[i + 1].number == 0) {
        obj_arr[i].clicked = true;
      } //right
      if (i < 240 && obj_arr[i].clicked == false && obj_arr[i + 16].clicked == true && obj_arr[i + 16].number == 0) {
        obj_arr[i].clicked = true;
      } //down
      if (i > 15 && obj_arr[i].clicked == false && obj_arr[i - 16].clicked == true && obj_arr[i - 16].number == 0) {
        obj_arr[i].clicked = true;
      } //up
      if (((i % 16) != 0) && obj_arr[i].clicked == false && obj_arr[i - 1].clicked == true && obj_arr[i - 1].number == 0) {
        obj_arr[i].clicked = true;
      } //left

      if (((i % 16) != 0) && i < 240 && obj_arr[i].clicked == false && obj_arr[i + 15].clicked == true && obj_arr[i + 15].number == 0) {
        obj_arr[i].clicked = true;
      } //bottom left
      if (((i % 16) != 15) && i < 240 && obj_arr[i].clicked == false && obj_arr[i + 17].clicked == true && obj_arr[i + 17].number == 0) {
        obj_arr[i].clicked = true;
      } //bottom right
      if (i > 15 && (i % 16 != 15) && obj_arr[i].clicked == false && obj_arr[i - 15].clicked == true && obj_arr[i - 15].number == 0) {
        obj_arr[i].clicked = true;
      }
      if (((i % 16) != 0) && (i > 15) && obj_arr[i].clicked == false && obj_arr[i - 17].clicked == true && obj_arr[i - 17].number == 0) {
        obj_arr[i].clicked = true;
      }

    }
  }
  if (obj_arr[238].number == 0 && obj_arr[238].clicked == true || obj_arr[239].number == 0 && obj_arr[239].clicked == true || obj_arr[254].number == 0 && obj_arr[254].clicked == true) {
    obj_arr[255].clicked = true;
  }

}

function gameWin() {
  for (i = 0; i < size * size; i++) {
    if (obj_arr[i].boom == false && obj_arr[i].clicked == false)
      return false;
  }
  return true;

}