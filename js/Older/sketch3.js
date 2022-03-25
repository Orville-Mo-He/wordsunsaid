let unsaid;
let s ;
let blocks = ["I didn’t leave because there was \nsomething wrong with you or \nbecause I found someone else, \nI left because I wasn’t in love with you \n\n    anymore. \n\nWe simply were not a good match. \n\nIt took me so long to leave, because \nyou made it impossible. \nYou guilted me and \nmanipulated me to stay and because of \nthat I seemed like the bad guy but \nwe were both wrong in our own ways.", "I just wanted to know: \nwhat were you thinking? \nWhere were you this whole time?", "WHAT?", "Your problem isn't us, \n    it's your commitment."];
let bodoni= [];
let h, w, sdown;

function setup() {

    createCanvas(windowWidth, windowHeight);

    w = windowWidth;
    h = windowHeight;
    sdown = 1920/width;
    s = second();

    bodoni [1] = loadFont ('Fonts/Bodoni72Book.ttf')
    bodoni [2] = loadFont ('Fonts/Bodoni72Bold.ttf')
    unsaid = new Unsaid;

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
    w = windowWidth;
    h = windowHeight;
    sdown = 1920/width;


}



function draw() {
    background(0);

    unsaid.show();


}


class Unsaid {

    constructor() {

        //first as singular block aka text set one as a test.
        this.a = 255;
        this.deltaA = 0.1;

        //positions and values for noise
        this.xInitial = random(width / 24, width - width / 24);
        this.yInitial = random(height / 24, height - height / 24);

        this.xoff = random(0.003, 0.01);
        this.yoff = random(0.005, 0.01);
        this.txt = '(words unsaid)'



        //text set 2, real deal ish.

        this.txts = blocks; //we can just change the text later if needed.

        /*
        so for the variables, I need:
        a seed value
        a delta/offset value
        a value that represents the output of the noise
        a value that is the noise output but mapped to the width or height
            this value can be condensed with the above
        */

        this.txtAlpha = [];

        //initial x and y seeds
        this.xSeed = []
        this.ySeed = []

        //delta x and delta y
        this.deltaX = []
        this.deltaY = []

        //end xy
        this.x = [];
        this.y = [];


        //I'll take a dozen of everything at 0 :P
        for (this.i = 0; this.i < this.txts.length; this.i++) {

            this.txtAlpha[this.i] = 0 - (50 * this.i); //appear one at a time lol

            //seed values are random (only run once so that they are preserved)
            //min/maxes don't really matter here aslong as they are spread out.
            //later this will be += to the deltas.
            this.xSeed[this.i] = random(0, width);
            this.ySeed[this.i] = random(0, height);

            //same here except these values have to be small
            this.deltaX[this.i] = random(0.0002, 0.00035)
            this.deltaY[this.i] = random(0.0002, 0.0004)

            //here for continuity really since they'll need to be called later
            //mapped later
            this.y[this.i] = 0
            this.x[this.i] = 0


            //for proof of concept
            // console.log('The value for this.x at ' + this.i+ ' is: ' + this.x[this.i]);
            // console.log('The value for this.y at ' + this.i+ ' is: ' + this.x[this.i]);
            // console.log('The value for this.xSeed at ' + this.i+ ' is: ' + this.xSeed[this.i]);
            // console.log('The value for this.ySeed at ' + this.i+ ' is: ' + this.ySeed[this.i]);
            // console.log('The value for this.deltaX at ' + this.i+ ' is: ' + this.deltaX[this.i]);
            // console.log('The value for this.deltaY at ' + this.i+ ' is: ' + this.deltaY[this.i]);

        };


        //counter
        this.counter = 0;

        this.g = 0
    }



    re() { //refresh this "sequence" basically
        this.xInitial = random(width / 24, width - width / 24);
        this.yInitial = random(height / 24, height - height / 24);


        console.log('Refreshed');

    }



    show() {
        // push();
        // this.test();
        // pop();
        push();
        fill(255);
        textAlign(CENTER, TOP);
        textFont(bodoni[1]);
        textSize(width*3.5);
        text ('I', width/2, -height*1.3*sdown);
        pop();

        push();
        this.words();
        pop();

    }


    //test 1
    test() {

        push();
        this.move();
        translate(this.mIx, this.mIy);

        push();
        this.turn();

        noStroke();
        fill(255);
        text(this.txt, 0, 0);

        pop();
        pop();

    }

    turn() {

        angleMode(DEGREES)
        this.rfactor = -1 * map(noise(this.xInitial), 0, 1, -35, 35)

        rotate(this.rfactor);

    }



    move() {

        this.mIx = noise(this.xInitial) * width;
        this.mIy = noise(this.yInitial) * height;
        this.xInitial += this.yoff;
        this.yInitial += this.xoff
    }
    //test end



        /* 
            logic here should is that put this text here at this random vertex 
            designated by noise function and move it along this noise function.

            Each text block, their initial position is chosen by the corresponding
            initial points designated by the initial x and initial y arrays.
                (I know I could probably use vectors here, but that makes a lot
                of things a lot messier.)
            
            Each text block also has their corresponding alphas so that they can
            fade in as needed.

            So the ultimate algorithm should be pick the first element of the
            text, position, velocity and alpha arrays and match/use them 
            correspondingly.

            Then wait 5 (or however many) seconds and pick the next. Do this 
            until all memebers of the text 'blocks' array are displayed.
        */

    words() {

        push();
        noStroke();
        fill(255)

        this.gravity(0.07);



        for (this.i = 0; this.i < this.txts.length; this.i++) {

            noStroke();

            //where all the magic happens :P
            push();
            this.place_and_move();
            translate(this.x[this.i], this.y[this.i]);

            //double push so placement isn't affect by translate
            push();

            //rotate
            this.sway();

            fill(255, this.txtAlpha[this.i]);
            text(this.txts[this.i], 0, 0);

            pop();
            pop();



            //reset and move on
            this.counter = 0

            this.appear(0.5);

            



        }
        pop();

    }


    //basically rotating based on x output
    //puts the horizontal plane in primacy of control of sway.
    sway() {

        angleMode(DEGREES)
        this.swayfactor = -1 * map(noise(this.xSeed), 0, 1, -35, 35)
        rotate(this.swayfactor);
    }

    place_and_move() {
        this.y[this.i] = map (noise(this.ySeed[this.i]), 0, 1, 0, height);
        this.x[this.i] = map (noise(this.xSeed[this.i]), 0 , 1, 0, width);
        this.ySeed[this.i] += this.deltaY[this.i];
        this.xSeed[this.i] += this.deltaX[this.i];
    }

    gravity(_a){

        translate(0, this.g)
        this.g += _a 

        //console.log(this.g)

        //tester for gravity
        //text ('hi', width/3, height/2)
    }

    appear(_a){

        this.txtAlpha[this.i] = this.txtAlpha[this.i] + (_a);
        //console.log('The value for this.txtAlpha at ' + this.i+ ' is: ' + this.txtAlpha[this.i]);

    }

    placeholderFunction() {

        
    }





}