let unsaid;
let s

let blocks = ['w1', 'w2', '3', '4', '5'];




function setup() {
    unsaid = new Unsaid;
    createCanvas(windowWidth, windowHeight);
    s = second();

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

        this.txts = blocks;

        this.x;
        this.y;
        this.rfactor;

        this.txtAlpha = [];

        for (this.i = 0; this.i < this.txts.length; this.i++) {
            this.txtAlpha[this.i] = 0
        } //this way there are immediately 10 alphas set at 0


        this.w2counter = 0;

        this.indivsway = new MoveIndv

    }



    re() { //refresh this "sequence" basically
        this.xInitial = random(width / 24, width - width / 24);
        this.yInitial = random(height / 24, height - height / 24);
        console.log('Refreshed');
    }



    show() {
        this.weights();
        this.w2();

    }




    weights() {

        push();
        this.move();

        push();
        this.turn();

        noStroke();
        fill(255);
        text(this.txt, 0, 0);

        pop();
        pop();

    }


    w2() {


        noStroke();

        for (this.i = 0; this.i < this.txts.length; this.i++) {
            push();

            if (this.w2counter < 5) {

                fill(255, this.txtAlpha);
                //this.move();
                this.Sway(this.i);
                text(this.txts[this.i], width / 12 + (noise(this.i) * width), height / 2);

                this.w2counter += 1 / frameRate();

            } else {
                this.w2counter = 0
            }
            pop();
        }

    }



    Sway(_a) {
        this.indivsway.move(_a);
    }



    turn() {

        angleMode(DEGREES)
        this.rfactor = -1 * map(noise(this.xInitial), 0, 1, -35, 35)

        rotate(this.rfactor);

    }


}


//move this back into the initial text doc and have it directly affected by this.i 
//cleaner that way (although ill probably get 500 lines of code lol (can just linebreak)) 


this.mIyoff = map(this.mIyfeed, //like so:
    this.txts.length - 1 * 100, this.txts.length - 1 * 200, 0, 0.003);


class MoveIndv {
    constructor(_a) {

        this.txts = blocks;
        this.a = _a

        //for the move individual function
        //I have to feed the text for loop's this.i into this move function. the this.i needs to affect both the x and the y
        //It has to achieve the affect of both spacing them out and having them have different move rates
        //here _a == this.i 

        this.mIxfeed = map(_a, 0, this.txts.length - 1, 0, this.txts.length - 1 * 100); // this distrubtes this.i over a larger space.
        this.mIyFeed = map(_a, 0, this.txts.length - 1, this.txts.length - 1 * 100, this.txts.length - 1 * 200); //same here, just that y can never be == to x 

        this.mIxoff = map(this.mIxfeed, 0, this.txts.length - 1 * 100, 0, 0.003); // feeding the feed into the offset
        this.mIyoff = map(this.mIyfeed, this.txts.length - 1 * 100, this.txts.length - 1 * 200, 0, 0.003);

    }



    move() {

        this.mIx = noise(this.mIxfeed);
        this.mIy = noise(this.mIyFeed);
        this.mIyFeed += this.mIyoff;
        this.mIxFeed += this.mIxoff
    }



}