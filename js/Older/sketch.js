let unsaid;






function setup() {
    unsaid = new Unsaid;
    createCanvas(windowWidth, windowHeight);

}

function re() { //refresh
    unsaid.re();
}

function keyPressed() {
    //console.log('hi');

    if (keyCode === 32) { //spacebar = refresh
        re();
    }
    // unsaid.re();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}



function draw() {
    background(0);

    unsaid.show();


}


class Unsaid {

    constructor() {
        //first as singular block


        this.a = 255;
        this.deltaA = 0.1;

        //positions and values for noise
        this.xInitial = random(width / 24, width - width / 24);
        this.yInitial = random(height / 24, height - height / 24);

        this.xoff = random(0.003, 0.01);
        this.yoff = random(0.005, 0.01);

        //breaking the placement and movement of blocks into a function separate from the actual showing of the blocks might have merit here.
        this.txt = '(words unsaid)'

        this.x;
        this.y;
        this.rfactor;
    }



    re() { //refresh this "sequence" basically
        this.xInitial = random(width / 24, width - width / 24);
        this.yInitial = random(height / 24, height - height / 24);
        console.log('Refreshed');
    }







    show() {


        //move with noise
        // this.x = map(noise(this.xInitial) * width, 0, width, width * 1 / 24, width * 23 / 24);
        // this.y = map(noise(this.yInitial) * height, 0, height, height * 1 / 24, height * 23 / 24);
        // this.xoff = random(0.0005, 0.0025);
        // this.yoff = random(0.0005, 0.0025);
        // this.yInitial += this.yoff;
        // this.xInitial += this.xoff;

        this.move();
        //

        //translate to point then have text at 0, 0 so it can rotate around its own axis while moving.
        push();
        translate(this.x, this.y)



        push();

        // rotate(random(-0.01 * PI, 0.01 * PI))
        // textAlign(CENTER, CENTER);
        this.turn();

        noStroke();
        fill(255);
        text(this.txt, 0, 0);

        pop();



        pop();




    }

    move() {
        //move with noise
        this.x = map(noise(this.xInitial) * width, 0, width, width * 1 / 24, width * 23 / 24);
        this.y = map(noise(this.yInitial) * height, 0, height, height * 1 / 24, height * 23 / 24);
        this.xoff = random(0.0005, 0.0025);
        this.yoff = random(0.0005, 0.0025);
        this.yInitial += this.yoff;
        this.xInitial += this.xoff;
        //
    }

    turn(){
        angleMode(DEGREES)
        this.rfactor = map(this.x,  width * 1 / 24, width * 23 / 24, -35, 35)

        rotate(this.rfactor);

    }


}