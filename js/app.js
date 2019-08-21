'use strict';

var container = document.getElementById('image-container');
var thisSet = {};
var previousSet = {};
var allProducts = [];

function Products(name, src) {
  this.name = name;
  this.src = src;
  this.displayed = 0;
  this.clicked = 0;
  allProducts.push(this);
}

Products.prototype.updateDisplayed = function() {
  this.displayed++;
};

Products.prototype.updateClicked = function() {
  this.clicked++;
};

function loadProducts() {
  new Products('Luggage', '/img/bag.jpg');
  new Products('Banana Cutter', '/img/banana.jpg');
  new Products('Toilet Paper Holder Stand', '/img/bathroom.jpg');
  new Products('Rain Boots', '/img/boots.jpg');
  new Products('Breakfast Machine', '/img/breakfast.jpg');
  new Products('Meatball Bubblegum', '/img/bubblegum.jpg');
  new Products('Chair', '/img/chair.jpg');
  new Products('Cthulhu', '/img/cthulhu.jpg');
  new Products('Dog-Duck', '/img/dog-duck.jpg');
  new Products('Dragon Meat', '/img/dragon.jpg');
  new Products('Utensil Pen', '/img/pen.jpg');
  new Products('Pet Sweep', '/img/pet-sweep.jpg');
  new Products('Pizza Scissors', '/img/scissors.jpg');
  new Products('Shark Sleeping Bag', '/img/shark.jpg');
  new Products('Baby Sweep', '/img/sweep.png');
  new Products('Taun Taun', '/img/tauntaun.jpg');
  new Products('Unicorn Meat', '/img/unicorn.jpg');
  new Products('USB', '/img/usb.gif');
  new Products('Water Can', '/img/water-can.jpg');
  new Products('Wine Glass', '/img/wine-glass.jpg');
}

function setupImageContainers(numImages) {
  for (var i = 1; i <= numImages; i++) {
    var img = document.createElement('img');
    var caption = document.createElement('figcaption');
    img.id = `image-${i}`;
    img.src = 'http://placehold.it/200x200';
    container.appendChild(img);
    container.appendChild(caption);
  }
}

function setupListener() {
  container.addEventListener('click', clickHandler);
}

function clickHandler(e) {
  var imageName = e.target.alt;
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === imageName) {
      allProducts[i].updateClicked();
    }
  }
  display3(3);
}

function display3(threeNums) {
  thisSet = {};

  for (var i = 1; i <= threeNums; i++) {
    var id = `image-${i}`;
    var img = document.getElementById(id);
    var caption = document.getElementsByTagName('figcaption')[i-1];

    var imageObject = unique3();

    img.src = imageObject.src;
    img.alt = imageObject.name;
    caption.textContent = imageObject.name;
  }

  previousSet = thisSet;
  console.log(allProducts);
}

function unique3() {
  var found = false;

  while (!found) {
    var n = Math.floor(Math.random() * allProducts.length);
    if (!thisSet[n] && !previousSet[n]) {
      found = allProducts[n];
      allProducts[n].updateDisplayed();
      thisSet[n] = true;
    }
  }
  return found;
}

function countClicked() {
  var sum = 0;
  for (var i = 0; i < allProducts.length; i++) {
    sum+= allProducts[i].clicked;
    console.log(sum);
  }
}


loadProducts();
setupImageContainers(3);
setupListener();
display3(3);

countClicked();
