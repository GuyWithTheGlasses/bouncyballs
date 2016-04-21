console.log("animate");
var ballArr = [];

/*--------------------------- Initialization -----------------------------*/

//Get the canvas and prep it for 2d drawing
var c = document.getElementById("playground");
var ctx = c.getContext("2d");

/*------------------------ Random Number Generator ------------------------*/

//Found this code online
//"Returns a random integer between min (inclusive) and max (inclusive)"
//Thanks stackoverflow
var getRandomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*------------------------- The Ball Object Class -------------------------*/

var ball = function(startx,starty,radius){
    //Current x and y coords of the ball
    var x = startx;
    var y = starty;
    //Radius of the ball
    var r = radius;

    //Also generate a random color to spice things up
    var red = getRandomInt(0,255);
    var green = getRandomInt(0,255);
    var blue = getRandomInt(0,255);
   
    //Current x and y velocities of the ball
    var xvel = 1;
    var yvel = 1;
    
    return {
	getx : function(){ return x; },
	gety : function(){ return y; },
	getr : function(){ return r; },

	//We don't need set functions - we only need to change the ball's 
	//position by its velocity, which we can do with increment functions
	incx : function(i){ x += i; },
	incy : function(j){ y += j; },

	getre : function(){ return red; },
	getgr : function(){ return green; },
	getbl : function(){ return blue; },

	getxv : function(){ return xvel; },
	getyv : function(){ return yvel; },

	setxv : function(xv){ xvel = xv; },
	setyv : function(yv){ yvel = yv; }
    }
};

/*------------------------- Making the Balls Bounce -------------------------*/

var appendBall = function(){
    console.log("appendBall");
    //Instantiate a new ball with random radius and x/y components 
    var rad = getRandomInt(2,5)*5;
    var b = ball(getRandomInt(rad, c.width-rad), 
		 getRandomInt(rad, c.height-rad), rad); 
    ballArr.push(b);
};

//In here is where the animation happens
var bouncy = function(){
    console.log("bouncy");
    //Clear the square where the ball used to be 
    //-1's and +2's because otherwise it doesn't cover the whole ball
    ctx.clearRect(0,0,c.width,c.height);
    
    var i=0;
    while (i<ballArr.length){
	var b = ballArr[i];

	//Increment the ball's position
	b.incx(b.getxv()); 
	b.incy(b.getyv());

	var rad = b.getr();
	
	//Check collision with borders or other balls
	//Border check
	if(b.getx() < rad || b.getx() > c.width - rad){
	    b.setxv(-1*b.getxv());
	}
	if(b.gety() < rad || b.gety() > c.height - rad){
	    b.setyv(-1*b.getyv());
	}

	var i2 = 0;
	while (i2<ballArr.length && i!=i2 ){
	    var c = ballArr[i2];
	    if ( (c.getx()-b.getx())*(c.getx()-b.getx()) + (c.gety()-b.gety())*(c.gety()-b.gety()) < (c.getr()+b.getr()) * (c.getr() + b.getr()) ) {
		//collided //http://gamedevelopment.tutsplus.com/tutorials/when-worlds-collide-simulating-circle-circle-collisions--gamedev-769
		newVelX1 = (b.getxv() * (b.mass – secondBall.mass) + (2 * secondBall.mass * secondBall.getxv())) / (b.mass + secondBall.mass);
		newVelY1 = (b.speed.y * (b.mass – secondBall.mass) + (2 * secondBall.mass * secondBall.speed.y)) / (b.mass + secondBall.mass);
		newVelX2 = (secondBall.getxv() * (secondBall.mass – b.mass) + (2 * b.mass * b.getxv())) / (b.mass + secondBall.mass);
		newVelY2 = (secondBall.speed.y * (secondBall.mass – b.mass) + (2 * b.mass * b.speed.y))
		
	//Actually draw the ball 
	ctx.fillStyle = "rgb("+b.getre()+","+b.getgr()+","+b.getbl()+")";
	ctx.beginPath();
	ctx.arc(b.getx(),b.gety(),b.getr(),0,2*Math.PI);
	ctx.stroke();
	ctx.fill();	
	i++;
    }
    //Call the function again
    window.requestAnimationFrame(bouncy);
};

/*Algorithm:
  compare two circles
  if square(x1-x2)+aquare(y1-y2) < square(radius1+radius2):
     Collided
  

//add ball should add a ball to the array of balls
// function that loops through the array and moves it

//Link "Add Ball" button to ball creation function
var addbtn = document.getElementById("balls");
addbtn.addEventListener("click", appendBall);
bouncy();
