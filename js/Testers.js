//functions and classes used for testing purposes


function reticle() {
    push();
    fill(255, 200)
    ellipseMode(CENTER);
    circle(mouseX, mouseY, 50);
    point(mouseX, mouseY);
    line(mouseX, mouseY - 25, mouseX, mouseY + 25);
    line(mouseX - 25, mouseY, mouseX + 25, mouseY);
}

function mouseReleased() {

    //let me click on the area to get the mouse x value as a ratio of the width.
    console.log(
        'Mouse X / width is: ' + mouseX / width +
        '\nMouse Y / height is: ' + mouseY / height +
        '\nWindow Height is: ' + windowHeight

    );
}





class Test {
    constructor(_x, _y, _r) {


        this.x = _x

        this.y = _y
        this.bounds = _y

        this.range = _r

        this.alpha = 0


    }

    show() { //_a = what to type, _b = xIn for noise, _c= yIn for noise

        ellipse(this.x, this.y, 50)

    }

    appear() {

        if (this.alpha < 100) {
            this.alpha += _a;
            console.log('The value for this.alpha is: ' + this.alpha);

        }
        fill(255, this.alpha);

    }

    upDown() { //a sets the upper bound, b sets the lower bound.


        if (this.y < this.bounds - this.range) {
            this.t = true

        } else if (this.y > this.bounds + this.range) {
            this.t = false
        }

        if (this.t) {
            this.y = lerp(this.y, this.bounds + this.range + 10, 0.1)
        }
        if (!this.t) {
            this.y = lerp(this.y, this.bounds - this.range - 10, 0.1)
        }
        //print('this.bounds - _a = ' + (this.bounds - height / 24) + '\nthis.y = ' + this.y + '\nthis.bounds+_a= '+ (this.bounds+height / 24))

    }

    test2() {

        for (let i = 0; i < 5; i++) {
            text('hi', 25 + (50 * i), height / 2)
        }
    }




}

class Ball { //really just a tester
    constructor() {
        this.cx = width / 2 //will equal whatever is being translated
        this.cy = windowHeight / 2 //^

        this.lpx = 0 //still need to be zero because text is going to be placed at 0
        this.lpy = 0 // ^

        //will need to initialize all of the following as arrays, which will have blocks.length elements.
        // this.dy
        // this.dx
        // this.lpx
        // this.lpy




    }
    show() {

        //these are the points to lerp to 
        if (dist(mouseX, mouseY, this.cx, this.cy) < 50 && dist(mouseX, mouseY, this.cx, this.cy) > 3) {

            this.dx = this.cx - mouseX;
            //pythagorean theorem gives base value
            //call this.cy-mouseY  A. A/abs(A) gives sign(+-)
            this.ysign = (this.cy - mouseY) / abs(this.cy - mouseY);
            this.dy = sqrt(((dist(mouseX, mouseY, this.cx, this.cy)) ** 2) - (this.dx ** 2)) * this.ysign;

            this.lpx = lerp(this.lpx, this.dx, 0.3);
            this.lpy = lerp(this.lpy, this.dy, 0.3);

        } else {
            this.lpx = lerp(this.lpx, 0, 0.1);
            this.lpy = lerp(this.lpy, 0, 0.1);
        }





        noStroke();
        ellipse(this.cx, this.cy, 100);
        push()
        translate(this.cx, this.cy);
        fill(255, 0, 0);
        ellipse(this.lpx, this.lpy, 10)
        pop()


        text('x dist= ' + this.dx, 100, windowHeight / 2)
        text('y dist= ' + this.dy, 100, windowHeight / 2 + 50)
        //print((this.ydist)/abs(this.ydist))


    }


}