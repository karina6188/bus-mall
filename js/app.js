'use strict';

var maxSelected = 25;
var figure1 = document.getElementById('figure1');
var figure2 = document.getElementById('figure2');
var figure3 = document.getElementById('figure3');
var thisSet = {};
var previousSet = {};
var allProducts = [];
var selected = 0;
console.log(allProducts);


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

function readData() {
  var products = JSON.parse(localStorage.getItem('allProducts'));
  if (!products) {
    loadProducts();
  }
  else {
    allProducts = products;
  }
}

function saveData() {
  localStorage.setItem('allProducts', JSON.stringify(allProducts));
}

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
    caption.id = `fig${i}`;
    img.id = `image${i}`;
    img.src = 'http://placehold.it/200x200';

    if (i === 1) {
      figure1.appendChild(img);
      figure1.appendChild(caption);
    }
    else if (i === 2) {
      figure2.appendChild(img);
      figure2.appendChild(caption);
    }
    else {
      figure3.appendChild(img);
      figure3.appendChild(caption);
    }
  }
}

function setupListener() {
  figure1.addEventListener('click', clickHandler);
  figure2.addEventListener('click', clickHandler);
  figure3.addEventListener('click', clickHandler);
}

function removeListener() {
  figure1.removeEventListener('click', clickHandler);
  figure2.removeEventListener('click', clickHandler);
  figure3.removeEventListener('click', clickHandler);
}

function clickHandler(e) {
  var imageName = e.target.alt;
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === imageName) {
      allProducts[i].clicked++;
      selected++;
      console.log(selected);
    }
  }
  saveData();
  display3(3);
}

function display3(threeNums) {
  thisSet = {};

  for (var i = 1; i <= threeNums; i++) {
    var id = `image${i}`;
    var capId = `fig${i}`;
    var img = document.getElementById(id);
    var caption = document.getElementById(capId);

    var imageObject = uniqueImage();

    img.src = imageObject.src;
    img.alt = imageObject.name;
    caption.textContent = imageObject.name;
  }

  previousSet = thisSet;

  //Put this here because everytime you click, display3 function is run and this will be checked everytime you click.

  if (selected === maxSelected) {
    removeListener();
    showResults();
  }
}

function uniqueImage() {
  var found = false;

  while (!found) {
    var n = Math.floor(Math.random() * allProducts.length);
    if (!thisSet[n] && !previousSet[n]) {
      found = allProducts[n];
      allProducts[n].displayed++;
      thisSet[n] = true;
    }
  }
  return found;
}


function showResults() {
  var thead = document.getElementById('thead');
  var trh = document.createElement('tr');

  var tableHead = ['Product Name', 'Images Displayed', 'Images Selected'];
  for (var x = 0; x < tableHead.length; x++) {
    var th = document.createElement('th');
    th.textContent = tableHead[x];
    trh.appendChild(th);
    thead.appendChild(trh);
  }

  var tbody = document.getElementById('tbody');
  for (var i = 0; i < allProducts.length; i++) {
    var tr = document.createElement('tr');
    var td = document.createElement('td');

    td.textContent = allProducts[i].name;
    tr.appendChild(td);

    var td2 = document.createElement('td');
    td2.textContent = allProducts[i].displayed;
    tr.appendChild(td2);

    var td3 = document.createElement('td');
    td3.textContent = allProducts[i].clicked;
    tr.appendChild(td3);

    tbody.appendChild(tr);
  }


  var ctx = document.getElementById('myChart').getContext('2d');

  var labels = [];
  var data = [];
  var colors = [];

  for (var y = 0; y < allProducts.length; y++) {
    labels.push(allProducts[y].name);
    data.push(allProducts[y].clicked);
    var randomColorCode = '#' + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColorCode);
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Product Votes',
        data: data,
        backgroundColor: colors,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

readData();

setupImageContainers(3);
setupListener();
display3(3);


