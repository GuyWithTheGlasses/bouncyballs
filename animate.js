console.log("animate");
var ballArr = [];

/*--------------------------- Initialization -----------------------------*/

//Get the canvas and prep it for 2d drawing
var c = document.getElementById("playground");
var ctx = c.getContext("2d");

//Array for storing all generated balls 
var ballArr = [];

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
    var xvel = getRandomInt(0,10) - 5;
    if (xvel < 2 && xvel >= 0){
	xvel += 2;
    } else if (xvel > -2 && xvel < 0){
	xvel -= 2;
    }
    var yvel = getRandomInt(0,10) - 5;
    if (yvel < 2 && yvel >= 0){
	yvel += 2;
    } else if (yvel > -2 && yvel < 0){
	yvel -= 2;
    }
    xvel=xvel/10;
    yvel = yvel/10;
    return {
	//Coordinates & radius of the ball
	getx : function(){ return x; },
	gety : function(){ return y; },
	getr : function(){ return r; },
	setx : function(newx){ x = newx; },
	sety : function(newy){ y = newy; },

	//Color of the ball
	getre : function(){ return red; },
	getgr : function(){ return green; },
	getbl : function(){ return blue; },
	setre : function(re){ red = re; },
	setgr : function(gr){ green = gr; },
	setbl : function(bl){ blue = bl; },

	//x and y velocities of the ball
	getxv : function(){ return xvel; },
	getyv : function(){ return yvel; },
	setxv : function(xv){ xvel = xv; },
	setyv : function(yv){ yvel = yv; },

	//To increment by the ball's velocities
	movex : function(){ x += xvel; },
	movey : function(){ y += yvel; },
    }
};

/*------------------------- Making the Balls Bounce -------------------------*/

var appendBall = function(){
    console.log("appendBall");
    //Instantiate a new ball with random radius and x/y components 
    var rad = 25;
    var b = ball(getRandomInt(rad, c.width-rad), 
		 getRandomInt(rad, c.height-rad), rad); 
    var j = 0;
    while (j<ballArr.length){
	var other = ballArr[j];
	    if ( (other.getx()-b.getx())*(other.getx()-b.getx()) + 
		 (other.gety()-b.gety())*(other.gety()-b.gety()) < 
		 (other.getr()+b.getr()) * (other.getr() + b.getr()) -2 ) {
		j=0;
		b = ball(getRandomInt(rad, c.width-rad), 
	 		     getRandomInt(rad, c.height-rad), rad); 
	    }
	j++;
    }
    ballArr.push(b);
};

//In here is where the animation happens
var bouncy = function(){
    console.log("bouncy");
    ballArr.filter(function(ball){
    	if ( ball.getx() - ball.getr() < -1 ){ //left
	    ball.setx( Math.abs( ball.getx() ) );
	    ball.setxv( Math.abs( ball.getxv() ) );   
    	} if (ball.gety() - ball.getr() < -1 ){ //too high
            ball.sety( Math.abs( ball.gety() )) ;
	    ball.setyv( Math.abs( ball.getyv() ) );   
    	} if ( ball.getx() + ball.getr() > c.width ){ //right
	    ball.setx( ball.getx() + (c.width - ball.getx()-ball.getr() ) );
	    ball.setxv( Math.abs(ball.getxv()) * -1 );   
    	} if (ball.gety() + ball.getr() > c.height ){ //too low
	    ball.sety( ball.gety() + (c.height - ball.gety() - ball.getr() ) );
	    ball.setyv( Math.abs(ball.getxv()) * -1 );
    	}
    }); 

    //Clear the square where the ball used to be 
    //-1's and +2's because otherwise it doesn't cover the whole ball
    ctx.clearRect(0,0,c.width, c.height);

    var i=0;
    while (i<ballArr.length){

	var b = ballArr[i];

	//Change the ball's position according to its velocities
	b.movex();
	b.movey();

	//Check collision with borders or other balls
	//Border check
	if(b.getx() < b.getr() || b.getx() > c.width - b.getr()){
	    b.setxv(-1*b.getxv());
	}
	if(b.gety() < b.getr() || b.gety() > c.height - b.getr()){
	    b.setyv(-1*b.getyv());
	}

	//Ball collision check
	var j = 0;
	while (j<ballArr.length && i != j ){
	    var other = ballArr[j];
	    if ( (other.getx()-b.getx())*(other.getx()-b.getx()) + 
		 (other.gety()-b.gety())*(other.gety()-b.gety()) < 
		 (other.getr()+b.getr()) * (other.getr() + b.getr()) ) {
		//balls have collided 
		//http://gamedevelopment.tutsplus.com/tutorials/when-worlds-collide-simulating-circle-circle-collisions--gamedev-769
		var newxvb = (b.getxv() * (b.getr() - other.getr()) + (2 * other.getr() * other.getxv())) / (b.getr() + other.getr());
		var newyvb = (b.getyv() * (b.getr() - other.getr()) + (2 * other.getr() * other.getyv())) / (b.getr() + other.getr());
		var newxvo = (other.getxv() * (other.getr() - b.getr()) + (2 * b.getr() * b.getxv())) / (b.getr() + other.getr());
		var newyvo = (other.getyv() * (other.getr() - b.getr()) + (2 * b.getr() * b.getyv())) / (b.getr() + other.getr());
		b.setxv(newxvb);
		b.setyv(newyvb);
		other.setxv(newxvo);
		other.setyv(newyvo);
	    }
	    j++;
	} 
        ctx.fillStyle = "rgb("+b.getre()+","+b.getgr()+","+b.getbl()+")";
	ctx.beginPath();
	ctx.arc(b.getx(),b.gety(),b.getr(),0,2*Math.PI);
	ctx.stroke();
	ctx.fill();	
	i++;
    } //while for
    //Call the function again
    window.requestAnimationFrame(bouncy);
};

//Using mapping to make cool things happen
//Change the color of each ball to another random color
var colorChange = function(){
    ballArr = ballArr.map(function(ball){
	ball.setre(getRandomInt(0,255));
	ball.setgr(getRandomInt(0,255));
	ball.setbl(getRandomInt(0,255));
	return ball;
    });
};

var disco  = function(){
    setInterval(function(){ colorChange; }, 1000);
    console.log("HI");
};

//Link "Spice it up!" button to color change function
var colorbtn = document.getElementById("colorful");
colorbtn.addEventListener("click", colorChange);

//Link "Disco" button to continuously change the color
var discobtn = document.getElementById("disco");
discobtn.addEventListener("click", function(){
	setInterval( colorChange, 100 ); 
	console.log("hi"); });

//Link "Add Ball" buttons to ball creation function
var addbtn = document.getElementById("balls");
addbtn.addEventListener("click", appendBall);
//And the "Add 10 Balls" button
var addmorebtn = document.getElementById("moreballs");
addmorebtn.addEventListener("click", function(){
    for(var x=0; x<10; x++){ appendBall(); }
});
bouncy();
bouncy();
bouncy();
bouncy();
bouncy();
bouncy();
bouncy();
bouncy();




