var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFed;



//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
   feed=createButton("Feed The Dog");
   feed.position(910,95);
   feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 

  fill("white");
  textSize(20);
   //write code to display text lastFed time here
 if(lastFed>=12){
   //show time in PM format when last is greater than 12
   text("Last Feed : "+lastFed+ "AM",200,10);
 }else if(lastFed==00){
   text("Last Feed : 12 AM", 350,350)
 }else{
   //showtime in AM format when lastFed is less than 12
   text("Last Feed : "+lastFed+ "PM",200,20);
 }




  feed.mousePressed(function(){
    hour();
    feedDog();
    database.ref('/').update
    database.ref(lastFed).update

 
  });
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
 
  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


async function hour(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  
}
