// create a variable to hold our world object
let world;


// create a variable to hold our marker
let marker1;
let marker2;
let marker3;
let marker4;

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  marker1 = world.getMarker('M1');
 
  

  // create some geometry to add to our marker
  let model1 = new GLTF({
    asset: "S1",
    x: 0,
    y: 0.5,
    z: 0,
    scaleX: 3,
    scaleY: 3,
    scaleZ: 3,
    rotationX: -90,
  });



  // add the cube to our marker
  marker1.add( model1 );



 marker2 = world.getMarker('M2');
 let model2 = new GLTF({
    asset: "S2",
    x: 0,
    y: 0.5,
    z: 0,
    scaleX: 3,
    scaleY: 3,
    scaleZ: 3,
    rotationX: -90,
  });

  marker2.add( model2 );


marker3 = world.getMarker('M3');

let model3 = new GLTF({
    asset: "S3",
    x: 0,
    y: 0.5,
    z: 0,
    scaleX: 3,
    scaleY: 3,
    scaleZ: 3,
    rotationX: -90,
  });
 marker3.add( model3 );


// marker4 = world.getMarker('hiro');
//  let model4 = new GLTF({
//     asset: "bird",
//     x: 3,
//     y: 0.5,
//     z: 0,
//     scaleX: 0.005,
//     scaleY: 0.005,
//     scaleZ: 0.005,
//   });



  // add the cube to our marker
  // marker4.add( model1 );


  // console.log(marker);
  let tagid1 = model3.tag.id;
  document.getElementById(tagid1).setAttribute("animation-mixer","loop:repeat");

  let tagid2 = model2.tag.id;
  document.getElementById(tagid2).setAttribute("animation-mixer","loop:repeat");

  let tagid3 = model1.tag.id;
  document.getElementById(tagid3).setAttribute("animation-mixer","loop:repeat");

}


function draw() {

}
