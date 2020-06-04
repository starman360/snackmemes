// Anmol Modur
// script.js


// Lets do something with canvas
var canvas = $("canvas");

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    var canvasWidth = $(window).width();
    var canvasHeight = $(window).height()/2;
}
else {
    var canvasWidth = Math.floor( $(window).width() * 0.75 );
    var canvasHeight = Math.floor( $(window).height() * 0.66 );
}


canvas.attr("width", canvasWidth);
canvas.attr("height", canvasHeight);
// canvas.height = 1000;
var c = document.querySelector("canvas").getContext("2d");
c.strokeStyle = 'white';

var STARTING_POINTS = 6;
var SNAKE_LENGTH = 1;

try {
    query = window.location.href.split("?")[1]
    if (query.split('=')[0] == 'sl'){
        let snakel = query.split('=')[1];
        if (snakel < STARTING_POINTS - 1 && snakel > 0){
            SNAKE_LENGTH = snakel;
        }
    }
} catch (error) {
    console.log("No custom snake length")
}


let Points = [
];

class Point {
    constructor() {
        this.x = Math.floor(Math.random() * canvasWidth);
        this.y = Math.floor(Math.random() * canvasHeight);
        this.progress = 0;
        this.snakelength = SNAKE_LENGTH;
    }
}

function generatePoints(i){
    for (j = 0; j < i; j ++) {
        let p = new Point();
        Points.push(p);
    }
}
generatePoints(STARTING_POINTS)


class Circle {
    constructor(p, r) { // Point and radius
        this.x = p.x;
        this.y = p.y;
        this.r = r;
    }

    drawCircle() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.stroke();
    }

}

class Line {
    constructor(p1, p2){
        this.x1 = p1.x;
        this.x2 = p2.x;
        this.y1 = p1.y;
        this.y2 = p2.y;
        this.dx = p2.x-p1.x;
        this.dy = p2.y-p1.y;
        this.m = this.dy/this.dx;
        this.d = Math.sqrt(Math.pow(this.dx,2) + Math.pow(this.dy,2));
    }

    drawLine(start, end) { // percent
        c.beginPath();
        start /= 100;
        end = 1 - (end / 100);
        c.moveTo(this.x1 + (start*this.dx), this.y1 + (start*this.dy));
        c.lineTo(this.x2 - (end*this.dx), this.y2 - (end*this.dy));
        c.stroke();
    }

    drawLineAnimate(step) { // 0-100
        this.drawLine(0, step);
    }

    eraseLineAnimate(step) {
        this.drawLine(step, 100)
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.strokeStyle = 'white';


    // Draw Circles
    for (i = 1; i < Points.length; i++) {
        let p = Points[i]; // Point
        if (p.progress == 0){
            let cir = new Circle(p, 5);
            cir.drawCircle();
        }
    }

    // Draw Lines

    for (i = 1; i < Points.length; i++) {
        let p = Points[i]; // Point
        let pp = Points[i - 1]; // Point Prev
        if (pp.progress < 100){
            // Finish prev line
            pp.progress += 1;
            let l = new Line(pp, p);
            l.drawLineAnimate(pp.progress);
            break;
        }
        if (pp.progress == 100 && pp.snakelength){
            pp.snakelength = p.snakelength - 1;
            let l = new Line(pp, p);
            l.drawLineAnimate(pp.progress);
        }
        if (pp.progress < 200 && !pp.snakelength){
            pp.progress += 1;
            let l = new Line(pp, p);
            l.eraseLineAnimate(pp.progress-100);
        }
        if (pp.progress == 200){
            generatePoints(1);
            Points.shift();
            i--;
        }
    } 
}

animate();

