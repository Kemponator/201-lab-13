"use strict";
console.log("Duck Go Flap");

// global varaibles
// querySelector returns the first element in the document that matches
const productContainer = document.querySelector("section");
const resultsButton = document.querySelector("section + div");
const image1 = document.querySelector("section img:first-child");
const image2 = document.querySelector("section img:nth-child(2)");

let clicks = 0;
const maxClicksAllowed = 9;

let allProducts = [];

function getRandomNumber() {
  return Math.floor(Math.random() * allProducts.length);
}

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

function renderProducts() {
  // we need to generate a number to reference the goat we want to render onto the page
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();

  // how could we prevent goat1 being the same number a goat2?
  while (product1 === product2) {
    product2 = getRandomNumber();
  }

  // now we have two random numbers lets set the attributes of our images in the document.
  image1.src = allProducts[product1].src;
  image2.src = allProducts[product2].src;
  image1.alt = allProducts[product1].name;
  image2.alt = allProducts[product2].name;
  allProducts[product1].views++;
  allProducts[product2].views++;
}

function handleProductClick(event) {
  if (event.target === productContainer) {
    alert("Please click on an image");
  } else {
    clicks++;
    // console.log(clicks);
    let clickedProduct = event.target.alt;
    for (let i = 0; i < allProducts.length; i++) {
      if (clickedProduct === allProducts[i].name) {
        allProducts[i].clicks++;
        break;
      }
    }
    if (clicks === maxClicksAllowed) {
      productContainer.removeEventListener("click", handleProductClick);
      productContainer.className = "no-voting";
      resultsButton.addEventListener("click", renderChart);
      resultsButton.className = "clicks-allowed";
    } else {
      renderProducts();
    }
  }
}

function renderResults() {
  // console.log("Your results are in!");
  let ul = document.querySelector("ul");
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
    ul.appendChild(li);
  }
}

const bag = new Product("Bag", "assets/bag.jpg");
const banana = new Product("Banana Cutter", "assets/banana.jpg");
const bathroom = new Product("Bathroom", "assets/bathroom.jpg");
const boots = new Product("Boots", "assets/boots.jpg");
const breakfast = new Product("Breakfast", "assets/breakfast.jpg");
const bubblegum = new Product("Bubblegum", "assets/bubblegum.jpg");
const chair = new Product("Chair", "assets/chair.jpg");
const cthulhu = new Product("Cthulhu", "assets/cthulhu.jpg");
const dogDuck = new Product("Dog Duck", "assets/dog-duck.jpg");
const dragon = new Product("Dragon", "assets/dragon.jpg");
const pen = new Product("Pen", "assets/pen.jpg");
const petSweep = new Product("Pet Sweep", "assets/pet-sweep.jpg");
const scissors = new Product("Scissors", "assets/scissors.jpg");
const shark = new Product("Shark", "assets/shark.jpg");
const sweep = new Product("Sweep", "assets/sweep.png");
const tauntaun = new Product("Tauntaun", "assets/tauntaun.jpg");
const unicorn = new Product("Unicorn", "assets/unicorn.jpg");
const wateringCan = new Product("Watering Can", "assets/water-can.jpg");
const wineGlass = new Product("Wine Glass", "assets/wine-glass.jpg");

renderProducts();

productContainer.addEventListener("click", handleProductClick);

function renderChart() {
  const productNames = [];
  const productViews = [];
  const productClicks = [];

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }

  // console.log(goatNames);
  // console.log(goatViews);
  // console.log(goatClicks);

  const data = {
    labels: productNames,
    datasets: [
      {
        label: "clicks",
        data: productClicks,
        backgroundColor: ["#42032C"],
        borderColor: ["#D36B00"],
        borderWidth: 1,
      },
      {
        label: "views",
        data: productViews,
        backgroundColor: ["#D36B00"],
        borderColor: ["#42032C"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
  };

  const productChart = document.getElementById("chart");
  const myChart = new Chart(productChart, config);
}
