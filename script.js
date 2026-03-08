const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let combo = 1;

const scoreEl = document.getElementById("score");
const comboEl = document.getElementById("combo");

const car = {
x: canvas.width/2,
y: canvas.height/2,
angle:0,
speed:0,
drift:false
}

const keys = {};

document.addEventListener("keydown", e=>{
keys[e.key]=true;
});

document.addEventListener("keyup", e=>{
keys[e.key]=false;
});

canvas.addEventListener("touchstart", ()=>keys["ArrowUp"]=true);
canvas.addEventListener("touchend", ()=>keys["ArrowUp"]=false);

function drawRoad(){

for(let i=0;i<canvas.height;i+=40){

ctx.strokeStyle="rgba(0,255,255,0.2)";
ctx.beginPath();
ctx.moveTo(0,i);
ctx.lineTo(canvas.width,i);
ctx.stroke();

}

}

function drawCar(){

ctx.save();

ctx.translate(car.x,car.y);
ctx.rotate(car.angle);

ctx.fillStyle="#ff0077";
ctx.shadowColor="#ff0077";
ctx.shadowBlur=20;

ctx.fillRect(-20,-10,40,20);

ctx.restore();

}

function update(){

if(keys["ArrowUp"]){
car.speed +=0.05;
}

if(keys["ArrowLeft"]){
car.angle -=0.05;
car.drift=true;
}

if(keys["ArrowRight"]){
car.angle +=0.05;
car.drift=true;
}

car.speed *=0.98;

car.x += Math.cos(car.angle)*car.speed*5;
car.y += Math.sin(car.angle)*car.speed*5;

if(car.drift){
score += combo;
combo +=0.01;
}else{
combo=1;
}

car.drift=false;

scoreEl.innerText = Math.floor(score);
comboEl.innerText = combo.toFixed(1);

}

function gameLoop(){

ctx.fillStyle="black";
ctx.fillRect(0,0,canvas.width,canvas.height);

drawRoad();
update();
drawCar();

requestAnimationFrame(gameLoop);

}

gameLoop();
