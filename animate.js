console.log("animate");

/*--------------------------- Initialization -----------------------------*/

//Get the canvas and prep it for 2d drawing
var c = document.getElementById("animator");
var ctx = c.getContext("2d");

//Set color
ctx.strokeStyle = "#60CFD0";
ctx.fillStyle = "#60CFD0";

var requestID; //To store the current animation frame ID

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
   
    //Current x and y velocities of the ball
    var xvel = 1;
    var yvel = 1;
    
    return {
	getx : function(){ return x; },
	gety : function(){ return y; ),
	getr : function(){ return r; },

	//We don't need set functions - we only need to move the ball's 
	//position by its velocity, which we do with increment functions
	incx : function(){ x += xvel; },
	incy : function(){ y += yvel; },

	getxv : function(){ return xvel; },
	getyv : function(){ return yvel; },

	//Velocities will never have a magnitude > 1 (hard to do collision)
	//Therefore we only need to negate them when the ball bounces
	negxv : function(){ xvel *= -1; },
	negyv : function(){ yvel *= -1; },
    }
};

/*------------------------- Making the Balls Bounce -------------------------*/

var bounceBall = function(){
    var rad = getRandomInt(2,5)*5;
    var bouncer = ball(getRandomInt(rad, c.width-rad), 
		       getRandomInt(rad, c.height-rad), rad); 
};
