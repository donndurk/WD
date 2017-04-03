(function() {
    var canvas;
    var context;
    var width;
    var height;
    var size=20;
    var x=100;
    var y=100;
    var xChange=10;
    var yChange=10;
    var score=0;
    var food = {
        x : getRandomNumber(0, 800),
        y : getRandomNumber(0, 900),
    }
    
    var interval_id;
    
    var moveLeft=false;
    var moveRight=false;
    var moveUp=false;
    var moveDown=false;
    
    document.addEventListener('DOMContentLoaded', init, false);

    function init() {    
        canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;
        window.addEventListener('keydown', activate, false);
        function activate(event) {
            var keyCode=event.keyCode;
            if (keyCode===37) {
                moveLeft=true;
                moveUp=false;
                moveRight=false;
                moveDown=false;
            } else if (keyCode===38) {
                moveLeft=false;
                moveUp=true;
                moveRight=false;
                moveDown=false;
            } else if (keyCode===39) {
                moveLeft=false;
                moveUp=false;
                moveRight=true;
                moveDown=false;
            } else if (keyCode===40) {
                moveLeft=false;
                moveUp=false;
                moveRight=false;
                moveDown=true;
            }
        }

        interval_id = window.setInterval(draw, 33);
    }
    
    function draw() {
        context.clearRect(0, 0, width, height);
        context.fillStyle='red';
        context.fillRect(x, y, size, size);
        context.fillStyle='green';
        context.fillRect(food.x, food.y, size, size)
        if (moveRight) {
            x+=xChange;
        } else if (moveLeft) {
            x-=xChange;
        } else if (moveUp) {
            y-=yChange;
        } else if (moveDown) {
            y+=yChange;
        }
        lose()
    }
    
    function lose() {
        if (x<0) {
            stop()
            window.alert('You lost :( Your score is ' + score);
        } else if (x>800-size) {
            stop()
            window.alert('You lost :( Your score is ' + score);
        } else if (y<0) {
            stop()
            window.alert('You lost :( Your score is ' + score);
        } else if (y>900-size) {
            stop()
            window.alert('You lost :( Your score is ' + score);
        }
    }
    
    function stop() {
        clearInterval(interval_id);
    }
    
    function eat() {
        
    }
    
    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
})();