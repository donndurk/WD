(function() {
	var canvas;
    var context;
    var width;
    var height;
    var score=0;
    var size=10;
    var speed=0;
    var x=195;
    var y=590;
    var interval_id;
    var enemy_image =new Image()
    var tank=new Image()
    var moveLeft=false;
    var moveRight=false;
    var gameState=1;
    var enemies=[   {x : 10, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 60, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 110, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 160, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 210, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 260, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 310, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 360, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size }
	];
	var missiles=[];

	document.addEventListener('DOMContentLoaded', init, false);

	function init() {    
        canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;
        enemy_image.src='angry_react.png'
        tank.src='tank.png'
		window.addEventListener('keydown', activate, false);
		window.addEventListener('keyup', deactivate, false);
		window.addEventListener('keydown', fire, false);
		window.addEventListener('keydown', restart, false);
		function activate(event) {
			var keyCode=event.keyCode;
			if (keyCode===65) {
				moveLeft=true;
			} else if (keyCode===68) {
					moveRight=true;
			}
		}
		function deactivate(event) {
			var keyCode=event.keyCode;
			if (keyCode===65) {
				moveLeft=false;
			} else if (keyCode===68) {
				moveRight=false;
			}
		}
		function fire() {
			var keyCode=event.keyCode;
			if (keyCode===32) {
				missiles.push({x : x, y : y-12, width : 2, height : 7});
			}
		}

		var easy=document.getElementById("easy");
		var normal=document.getElementById('normal');
		var hard=document.getElementById('hard');
		easy.addEventListener('click', easy_diff, false);
		normal.addEventListener('click', normal_diff, false);
		hard.addEventListener('click', hard_diff, false);

		function easy_diff() {
			speed=3;
		}

		function normal_diff() {
			speed=4;
		}
		
		function hard_diff() {
			speed=5;
		}

		function restart(event) {
			var keyCode=event.keyCode;
			if (keyCode===82 && gameState===0) {
				interval_id = window.setInterval(draw, 33);
				gameState=1;
			}
		}		

		interval_id = window.setInterval(draw, 33);
	}

	function spawn_enemies() {
		for (var i=0; i<enemies.length; i+=1){
			var e=enemies[i];
			context.drawImage(enemy_image, e.x, e.y+=speed);
			if (e.y>=570) {
				lose()
			}
		}
	}

	function render_missiles() {
		for (var i=0; i<missiles.length; i+=1) {
			var m=missiles[i];
			context.fillStyle='#42f1f4';
			context.fillRect(m.x+4, m.y-=5, m.width, m.height);
			collides(m, i)
			if (m.y<0) {
				missiles.splice(i, 1)
			}
		}
	}

	function collides(m, m_index) {
		for (var i=0; i<enemies.length; i+=1) {
			var e = enemies[i];
			if (m.x+m.width>=e.x && m.x<=e.x+e.width && m.y>=e.y && m.y<=e.y+e.height) {
				missiles.splice(m_index, 1)
				enemies.splice(i, 1)
				enemies.push({x : e.x, y : getRandomNumber(-30, -100), width : 3*size, height : 3*size})
				score+=1
			}
		}
	}

    function draw() {
    	context.clearRect(0, 0, width, height);
    	context.drawImage(tank, x-13, y-18);
	    if (moveRight && x<width-15) {
	    	x+=5
	    } else if (moveLeft && x>5) {
	    	x-=5
	    }
    	spawn_enemies();
    	render_missiles();
    	context.fillStyle='white';
    	context.font='16px sans-serif';
    	context.fillText("Score: " + score, 1, 15)
    }

    function lose() {
    	context.fillStyle='#42f1f4';
    	context.font='32px sans-serif';
    	context.fillText("You lost", 150, 200);
    	context.fillText("Your final score is " + score, 50, 250);
    	context.fillText("Press \"R\" to restart", 60, 300);
    	enemies=[   {x : 10, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 60, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 110, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 160, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 210, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 260, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 310, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size },
    				{x : 360, y: getRandomNumber(-30, -300), width : 3*size, height : 3*size }
		];
		speed=0;
		missiles=[];
		score=0;
		gameState=0;
		clearInterval(interval_id);
    }

    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }

})();