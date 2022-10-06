// create a variable to hold our world object
let world;

// create a variable to hold our marker
let marker;

// create some geometry to add to our marker
let cube = new Box({
    x:0,
    y:0.5,
    z:0,
    red:255,
    green:255,
    blue:255,
    width:1,
    height:1,
    depth:1,
    opacity: 0.2,
});


let pick_buffer;

let particles = [];

function setup() {
  //create another webgl canvas
  createCanvas(800, 600, WEBGL);
  pick_buffer = createGraphics(800, 600, WEBGL);
  pick_buffer.clear();
  pick_buffer.background(0);
  pick_buffer.style("position", "absolute");
  pick_buffer.style("top", "0px");
  pick_buffer.style("left", "0px");
  pick_buffer.style("z-index", "102");
  //pick_buffer.show();

  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  marker = world.getMarker('hiro');

  // add the cube to our marker
  marker.add( cube );

  for(let i=0; i<50; i++){
    particles[i] = new Spline(0, 0, 0, 
               random(-200, 200), random(-200, 200), random(100));
  }
}


function draw() {
  clear();
  pick_buffer.clear();
  pick_buffer.background(0);
  
  if(marker.isVisible()==true){
    let mk_pos = new THREE.Vector3();
    mk_pos.setFromMatrixPosition(marker.tag.object3D.matrixWorld);
    let x = mk_pos.x * width ;
    let y = mk_pos.y * -height;
    let z = mk_pos.z * width/2;
    let mk_rot = marker.tag.object3D.rotation;

    /*
    translate(x, y, z);
    rotateX(-mk_rot.x);
    rotateY(mk_rot.y);
    rotateZ(-mk_rot.z);
    translate(0, -box_height/2, 0);
    fill(255, 0, 0);
    box(200, box_height, 200);
    */

    //render pick_buffer
    pick_buffer.push();
    
    pick_buffer.translate(x, y, z);
    console.log(x, y, z);
    pick_buffer.scale(3.5, 3.5, 3.5);
    pick_buffer.rotateX(-mk_rot.x);
    pick_buffer.rotateY(mk_rot.y);
    pick_buffer.rotateZ(-mk_rot.z);
    pick_buffer.rotateX(HALF_PI); 

    for(let i=0; i < 50; i++){
      particles[i].update();
      particles[i].dispalyBuffer(i, 50);
    }
    pick_buffer.pop();

    let hoveredObjIndex = checkHoverIndex(mouseX, mouseY, 50);

    //render canvas
    push();
    translate(x, y, z);
    scale(3.5, 3.5, 3.5);
    rotateX(-mk_rot.x);
    rotateY(mk_rot.y);
    rotateZ(-mk_rot.z);
    rotateX(HALF_PI);    
    ambientLight(200, 200, 200);
    pointLight(100, 150, 100, -500, -500, 50);
    for(let i=0; i < 50; i++){
      if(i == hoveredObjIndex){
        particles[i].displayCanvas(true);
      }else{
       particles[i].displayCanvas(false);
      }
    }
    pop();
  }
}

function getPixels() {
  let gl = pick_buffer.elt.getContext('webgl');
  let pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
  gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  return (pixels);
}

function checkHoverIndex(mx, my, indexTotal){
  //console.log(mx, my);
  mx = floor(mx);
  my = floor(my);
  let objIndex = -1;
  //console.log(mx, my);
  if(mx > width || my > height){
    return -1;
  } else {
    let gl = pick_buffer.elt.getContext('webgl');
    let pix = getPixels();
    let pixIndex = 4 * ((gl.drawingBufferHeight-my) * gl.drawingBufferWidth + mx);
    //console.log(pixIndex);

    let redValue = pix[pixIndex];
    //let greenValue = pix[pixIndex + 1];
    //not using blue and alpha.
    //let blueValue = pix[pixIndex + 2];
    //let alphaValue = pix[pixIndex + 3];

    //console.log(redValue);
    let objIndexFromRed = redValue / 4 - 1;
    //let objIndexFromGreen = floor((255 - greenValue) / (255/indexTotal));
    //console.log(objIndexFromRed, "red");

    //if(objIndexFromRed == objIndexFromGreen){
      objIndex = objIndexFromRed;
    //}
  }
  //console.log(objIndex);
  return objIndex;
}

class Spline{
  constructor(from_x, from_y, from_z, to_x, to_y, to_z){
    this.from_x = from_x;
    this.from_y = from_y;
    this.from_z = from_z;
    this.to_x = to_x;
    this.to_y = to_y;
    this.to_z = to_z;

    //position
    this.px = from_x;
    this.py = from_y;
    this.pz = from_z;

    //control point for path curve
    this.cp1_x = this.from_x + random(1)*(this.to_x-this.from_x);
    this.cp1_y = this.from_y + random(1)*(this.to_y-this.from_y);
    this.cp1_z = this.from_z + random(50, 350);
    this.cp2_x = this.from_x + random(1)*(this.to_x-this.from_x);
    this.cp2_y = this.from_y + random(1)*(this.to_y-this.from_y);
    this.cp2_z = this.from_z + random(50, 350);

    //life controller
    this.t = 0.0;
    this.speed = random(0.005, 0.01);
    this.radius = 0;

    //color controller
    this.r = 0;
    this.g = 100+random(155);
    this.b = 100+random(155);
  }

  update(){   
    this.px = bezierPoint(this.from_x, this.cp1_x, 
          this.cp2_x, this.to_x, this.t);
    this.py = bezierPoint(this.from_y, this.cp1_y, 
          this.cp2_y, this.to_y, this.t);
    this.pz = bezierPoint(this.from_z, this.cp1_z, 
          this.cp2_z, this.to_z, this.t);

    this.radius = sin(this.t*PI) * 10;
    this.r = sin(this.t*TWO_PI) * 100 + 155;

    this.t += this.speed;
    if(this.t > 1.0){
      this.t = 0.0;
    }
  }

  displayCanvas(show_path){
    
    if(show_path == true){
      push();
      stroke(255);
      strokeWeight(1);
      noFill();
      bezier(this.from_x, this.from_y, this.from_z, 
        this.cp1_x, this.cp1_y, this.cp1_z,
        this.cp2_x, this.cp2_y, this.cp2_z,
        this.to_x, this.to_y, this.to_z);
        pop();
    }
    

    push();
    //fill(this.r, this.g, this.b);
    ambientMaterial(this.r, this.g, this.b);
    noStroke();
    translate(this.px, this.py, this.pz);
    sphere(this.radius);
    pop();
  }

  dispalyBuffer(index){
    pick_buffer.push();
    pick_buffer.fill(4 * (index+1), 255 - 4*index, 255);
    pick_buffer.noStroke();
    pick_buffer.translate(this.px, this.py, this.pz);
    pick_buffer.sphere(this.radius);
    //console.log("buffer");
    pick_buffer.pop();
  }
}
