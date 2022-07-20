//#region SECTION morning challenge
let coffeeCup = {
  color: "brown",
  temp: "hot",
  state: "liquid",
  packaging: "paper",
  consumed: true
}

let fruitSnack = {
  color: {
    color: "green",
    color: "red",
    color: "yellow"},
  temp: "cold",
  state: "solid",
  packaging: "plastic",
  consumed: false
} 

// console.log(`The packaging of the fruit snack is ${fruitSnack.packaging} and the temperature of the coffee is ${coffeeCup.temp}`);
//#endregion

const packages = [{
  heavy: true,
  priority: false,
  fragile: false,
  to: 'Harrington',
  trackingNumber: '1324kjs'
},
{
  heavy: false,
  priority: true,
  fragile: true,
  to: 'Mark',
  trackingNumber: '1325sdk'

},
{
  heavy: true,
  priority: false,
  fragile: true,
  to: 'Mick',
  trackingNumber: 'jffd147'

},
{
  heavy: false,
  priority: false,
  fragile: false,
  to: 'Jake',
  trackingNumber: 'acdc145'
  
},
{
  heavy: true,
  priority: true,
  fragile: true,
  to: 'Brittany',
  trackingNumber: "09348758"
},
{
  heavy: false,
  priority: true,
  fragile: false,
  to: 'Zach',
  trackingNumber: '8081baz'
  
},
{
  heavy: true,
  priority: false,
  fragile: true,
  to: 'Jeremy',
  trackingNumber: 'suz2367'
  
}
]

// GAME START

let timeRemaining = 0
let gameLength = 5000
let clockId = 0

function startGame(){
  document.getElementById("start-button").classList.add("d-none")
  document.getElementById("count-down").classList.remove('d-none')
  document.getElementById("reset-button").classList.remove('d-none')
  document.getElementById("packages").classList.remove('d-none')
  startClock()
  setTimeout(stopClock, gameLength)
  
}

function startClock(){
  timeRemaining = gameLength
  drawClock()
  clockId = setInterval(drawClock, 1000)

}

function drawClock(){
  let countDownElem = document.getElementById("count-down")
  console.log(timeRemaining);
  countDownElem.innerText = (timeRemaining / 1000).toString()
  timeRemaining -= 1000
  if(timeRemaining <= -1000){
    window.alert("game over")
    drawPackage()
  }
}
console.log(timeRemaining);

function stopClock(){
  clearInterval(clockId)
}

function resetGame(){
  stopClock()
  missingPackage()
  document.getElementById("start-button").classList.remove("d-none")
  document.getElementById("reset-button").classList.add("d-none")
}



// GAME FUNCTION
function missingPackage(){
  let missingPackage = packages[Math.floor(Math.random()* packages.length)]
  console.log(missingPackage);
  missingPackage.missing = true
}

missingPackage()

let currentPackages = packages
let allPackages = packages

function drawPackage(){
  let packageTemplate = ""
  
  currentPackages.forEach(p => packageTemplate += `<div id="${p.to}" class="col-5 btn btn-primary m-2" onclick="findMissing('${p.to}')">${p.to}</div>`
    );
    
  let packageElem = document.getElementById("packages")

  packageElem.innerHTML = packageTemplate;
}

drawPackage()

// function resetPackage(){
//   let packageTemplate = ""
//   allPackages.forEach(p => packageTemplate += `<div class="col-5 btn btn-primary m-2">${p.to}</div>`);
//   let packageElem = document.getElementById("packages")
//   packageElem.innerHTML = packageTemplate;
// }

function findMissing(to){
  let findMissing = currentPackages.find(p => p.to == to)

  if(findMissing.missing == true){
    window.alert("You found the Missing Package!")
    document.getElementById("winner-image").classList.remove("d-none") 
    stopClock()

  } else{ 
    window.alert("Keep Looking")
    document.getElementById(findMissing.to).classList.add("d-none")
    console.log(findMissing.to);
  }
}


function filterDescriptions(property){
  let foundPackage = allPackages.find(p => p.missing == true)

  currentPackages = currentPackages.filter(p => p[property] == foundPackage[property])
  drawPackage()
}

