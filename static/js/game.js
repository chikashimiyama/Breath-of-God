/*jshint esversion: 6 */

var game = null;

function setup(){
	createCanvas(800, 400);
	game = new Game();
}

function draw(){
	game.draw();
}

class Game{

	constructor(){
		this.amp = new p5.Amplitude(0.1);
		this.audioIn = new p5.AudioIn();
		this.xPos = 0.0;
		this.yPos = 0.0;
		this.finished = false;
		this.result = false;
		this.img = loadImage("img/airplane.png");  
		this.audioIn.start();
		this.amp.setInput(this.audioIn);
		textSize(32);
	}

	draw(){
		background(200, 230, 255);
		if(this.finished){
			this.showResult();
			return;
		}
		this.checkPos();
		image(this.img, this.xPos, this.yPos);
		rect(600, 300, 200 , 10);
		this.xPos += 1.0;
		this.yPos = this.yPos + 2.0 - this.amp.getLevel()*20.0;
	}

	showResult(){
		fill(0);
		if(!this.result){
			text("Game Over", 20, 200);
		}else{
			text("You win", 20, 200); 
		}
	}

	checkPos(){
		if(this.yPos > 350.0){
			this.finished = true;
			this.result = false;
			return;
		}

		if(this.xPos > 800.0){
			this.finished = true;
			this.result = false;
			return;
		}

		if(600 <= this.xPos && this.xPos < 800 && 200 <= this.yPos && this.yPos < 250){
			this.finished = true;
			this.result = true;
			return;
		}
	}

}