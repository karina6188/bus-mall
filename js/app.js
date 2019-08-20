'use strict';

function Products(name, src) {
  this.name = name;
  this.src = src;
  this.displayed = [];
  this.clicked = [];
  Products.list.push(this);
}

Products.list = [];

new Products('Luggage', '/img/bag.jpg');
new Products('Banana Cutter', '/img/banana.jpg');
new Products('Toilet Paper Holder Stand', '/img/bathroom.jpg');
new Products('Rain Boots', '/img/boots.jpg');
new Products('Breakfast Machine', '/img/breakfast.jpg');
new Products('Bubblegum', '/img/bubblegum.jpg');
new Products('Chair', '/img/chair.jpg');
new Products('Cthulhu', '/img/cthulhu.jpg');
new Products('Dog-Duck', '/img/dog-duck.jpg');
new Products('Dragon Meat', '/img/dragon.jpg');
new Products('Pen', '/img/pen.jpg');
new Products('Pet Sweep', '/img/pet-sweep.jpg');
new Products('Pizza Scissors', '/img/scissors.jpg');
new Products('Shark Sleeping Bag', '/img/shark.jpg');
new Products('Baby Sweep', '/img/sweep.png');
new Products('Tauntaun', '/img/tauntaun.jpg');
new Products('Unicorn Meat', '/img/unicorn.jpg');
new Products('USB', '/img/usb.gif');
new Products('Water Can', '/img/water-can.jpg');
new Products('Wine Glass', '/img/wine-glass.jpg');

console.log(Products.list);

function unique3() {

  var random3Num = [];

  for (var i = 0; i < 3; i ++) {
    var randomNum = Math.floor(Math.random()* Products.list.length);

    while (random3Num.includes(randomNum)) {
      randomNum = Math.floor(Math.random()* Products.list.length);
    }
    random3Num.push(randomNum);
  }
  return random3Num;
}

var imgAll = [];

function display3(threeNums) {
  for (var i = 0; i < threeNums.length; i++) {
    var loadImage = document.getElementsByTagName('img')[i];
    var loadCaption = document.getElementsByTagName('figcaption')[i];

    var img = threeNums[i];
    loadImage.src = Products.list[img].src;
    loadCaption.textContent = Products.list[img].name;
    imgAll.push(img);
  }
  return img;
}


// When call the function unique3, this returns an array of three random numbers, then make this array a new variable named listNum.
function initiate() {

  var listNum = unique3();

  // To transfer the array of 3 random numbers now stored in variable listNum, make function display3 to take in an argument that is listNum. Therefore the array has been transferred into function display3 with a new name threeNums.
  display3(listNum);
}

initiate();


if (imgAll.length <75+1) {
  var img1 = document.getElementById('first');
  img1.addEventListener('click', initiate);

  var img2 = document.getElementById('second');
  img2.addEventListener('click', initiate);

  var img3 = document.getElementById('third');
  img3.addEventListener('click', initiate);
}
else {
  var imgAll1 = document.getElementById('first');
  imgAll1.removeEventListener('click', initiate);
}


