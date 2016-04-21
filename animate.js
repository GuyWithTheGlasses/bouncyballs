console.log("animate");

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

	getxv : function(){ return xvel; },
	getyv : function(){ return yvel; },

	setxv : function(xv){ xvel = xv; },
	setyv : function(yv){ yvel = yv; }
    }
};

/*------------------------- Making the Balls Bounce -------------------------*/

var bounceBall = function(){
    console.log("bounceBall");
    //Instantiate a new ball with random radius and x/y components 
    var rad = getRandomInt(2,5)*5;
    var b = ball(getRandomInt(rad, c.width-rad), 
		       getRandomInt(rad, c.height-rad), rad); 

    //Also generate a random color to spice things up
    var red = getRandomInt(0,255);
    var green = getRandomInt(0,255);
    var blue = getRandomInt(0,255);
    
    //In here is where the animation happens
    var bouncy = function(){
	console.log("bouncy");
	//Clear the square where the ball used to be 
	//-1's and +2's because otherwise it doesn't cover the whole ball
	ctx.clearRect(b.getx()-rad-1, b.gety()-rad-1, rad*2+2, rad*2+2);
	
	//Increment the ball's position
	b.incx(b.getxv()); 
	b.incy(b.getyv());

	//Check collision with borders or other balls
	//Border check
	if(b.getx() < rad || b.getx() > c.width - rad){
	    b.setxv(-1*b.getxv());
	}
	if(b.gety() < rad || b.gety() > c.height - rad){
	    b.setyv(-1*b.getyv());
	}

	//Actually draw the ball 
	ctx.fillStyle = "rgb("+red+","+green+","+blue+")";
	ctx.beginPath();
	ctx.arc(b.getx(),b.gety(),b.getr(),0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	
	//Call the function again
	window.requestAnimationFrame(bouncy);
    };
    bouncy();
};

/*---------- Helper Functions ----------*/

//Border check - checks if ball is bumping into border of canvas
var borderCheck = function(b){
   
};

//Link "Add Ball" button to ball creation function
var addbtn = document.getElementById("balls");
addbtn.addEventListener("click", bounceBall);
