let unsaid;
let s;
let blocks = ["I didn’t leave because there was \nsomething wrong with you or \nbecause I found someone else, \nI left because I wasn’t in love with you \n\n    anymore. \n\nWe simply were not a good match. \n\nIt took me so long to leave, because \nyou made it impossible. \nYou guilted me and \nmanipulated me to stay and because of \nthat I seemed like the bad guy but \nwe were both wrong in our own ways.", "I just wanted to know: \nwhat were you thinking? \nWhere were you this whole time?", "WHAT?", "Your problem isn't us, \n    it's your commitment."];
let bodoni = [];
let didot, font;
let h, w, sdown;
let haunted;
let gd;

let canvas2, canvas3, canvas4;


function preload() {
    bodoni[1] = loadFont('Fonts/Bodoni72Book.ttf');
    bodoni[2] = loadFont('Fonts/Bodoni72Bold.ttf');
    font = loadFont('Fonts/Bodoni72Book.ttf');
    didot = loadFont('Fonts/Didot-01.ttf')

};

function setup() {

    createCanvas(windowWidth, (windowWidth / 1.77777778) * 3); //keeps a 16*9 ratio but is 3 screens long

    w = width;
    h = height;
    sdown = width / 1920;
    s = second();
    
    canvas2 = createGraphics(width, height)



    unsaid = new Unsaid;
    haunted = new Haunted;
    clerp = new CLerp;
    //console.log('Width= '+width + '\nHeight formula = ' + (windowWidth / 1.77777778) * 3 + '\nHeight = ' + height);

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
    resizeCanvas(windowWidth, (windowWidth / 1.77777778) * 3);
    w = width;
    h = height;
    sdown = width / 1920;


}



function draw() {
    background(0);
    //clerp.show();

    //unsaid.show();
    haunted.show();


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
        this.xSeed = [];
        this.ySeed = [];

        //delta x and delta y
        this.deltaX = [];
        this.deltaY = [];

        //end xy
        this.x = [];
        this.y = [];

        this.dnx = [];
        this.dny = [];
        this.swayfactor = [];
        this.swayN = []


        //initial area that height is lock into.
        this.hlock = [];


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

            this.hlock[this.i] = 3

            //delta x of the final position, used for rotation calculation
            this.dnx[this.i] = 0
            this.dnx[this.i] = 0

            this.swayN[this.i] = random(0, height);


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



        this.tformating();
        for (this.i = 0; this.i < this.txts.length; this.i++) {

            noStroke();

            //where all the magic happens :P
            push();
            this.place_and_move();
            translate(this.x[this.i] - (this.pwidth / 2), this.y[this.i]);

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

            this.appear(0.5, 200);

        }
        pop();

    }

    tformating() {

        noStroke();
        fill(255);
        textSize(14 * sdown)
        textAlign(LEFT, CENTER)

        //this is the longest line so gives paragraph width
        //put here so it updates with the text size.
        this.pwidth = textWidth('manipulated me to stay and because of ');
    }



    sway() { //lets get really fancy with the real life physics of sway/rotation.



        //horizontal change (so current position minus position of 1 unit back)
        this.dnx[this.i] = (noise(this.xSeed[this.i]) - (noise(this.xSeed[this.i] - this.deltaX[this.i])));

        //vertical change
        //if dX < 0, then swayFactor's sign will be inverse dY's sign and if dX > 0 swayFactor's will be same as dY's sign. 
        //and to avoid clutter I am going to build that right into the dny variable. SO: 

        if (this.dnx[this.i] < 0) {
            this.dny[this.i] = (noise(this.ySeed[this.i]) - (noise(this.ySeed[this.i] - this.deltaY[this.i]))) * -1;
        };
        if (this.dnx[this.i] > 0) {
            this.dny[this.i] = (noise(this.ySeed[this.i]) - (noise(this.ySeed[this.i] - this.deltaY[this.i])));
        };



        angleMode(DEGREES);
        this.swayfactor[this.i] = map((this.dnx[this.i] * -1) + this.dny[this.i], -2, 2, -15, 15);

        console.log(this.swayfactor[1])


        rotate(this.swayfactor[this.i] + map(noise(this.swayN[this.i]), 0, 1, -5, 5));
        this.swayN[this.i] += 0.001


    }


    place_and_move() {
        this.y[this.i] = map(noise(this.ySeed[this.i]), 0, 1, 0, height / this.hlock[this.i]);
        this.x[this.i] = map(noise(this.xSeed[this.i]), 0, 1, 0, width - (this.pwidth / 2));

        this.ySeed[this.i] += this.deltaY[this.i];
        this.xSeed[this.i] += this.deltaX[this.i];

        //using
        if (this.hlock[this.i] > 1) {
            this.hlock[this.i] -= 0.0005;
        };


        //console.log(this.hlock[this.i]);
    }

    gravity(_a) {

        translate(0, this.g)
        this.g += _a

        //console.log(this.g)

        //tester for gravity
        //text ('hi', width/3, height/2)
    }

    appear(_a, _b) {

        if (this.txtAlpha[this.i] < _b) {

            this.txtAlpha[this.i] = this.txtAlpha[this.i] + (_a);
        }
        //console.log('The value for this.txtAlpha at ' + this.i+ ' is: ' + this.txtAlpha[this.i]);

    }

    placeholderFunction() {


    }





}

class Haunted {

    constructor() {

        this.tts = width * 2
        this.f = 0 //feather
        this.weeeeeeee = 'I'

        push();
        textSize(this.tts);
        this.iWidth = textWidth('I');
        this.iYcenter = textAscent() / 2;
        pop();

        this.iTtP = didot.textToPoints(this.weeeeeeee, 0, height, this.tts, {
            sampleFactor: 1,
            simplifyThreshold: 0
        }); //for some reason its saying that it can't read string to glyphs


        push();
        textSize(this.tts);
        this.iWidth = textWidth('I');
        this.iYcenter = textAscent() / 2;
        pop();

    }


    //the hollowed I
    //maybe can use the constructor to control the width and height of it.
    //might be more usefull for the blocks actually.

    show() {
        this.Corinthian2();
    }


    Corinthian() {

        push();
        noFill();
        translate(0, -height / 6)
        textAlign(CENTER, CENTER);
        textFont(bodoni[1]);
        for (this.i = 0; this.i < 20; this.i++) {

            this.f = map(20 - this.i, 0, 20, 0, 100)

            stroke(255, this.f);
            textSize((width * 2) + this.i);
            text('I', width / 2, height / 2);

        }

        pop();
    }

    Corinthian2() {

        push();
        noFill();
        translate(0, -(this.iYcenter / 6))
        textAlign(CENTER, CENTER);

        textFont(didot);
        textSize(this.tts);
        text('I', width/2, height/2);

        //gradient desired so need text to points to have the
        //the text be drawn over and over larger and larger (except
        //horizontally streched as well (this requires textToPoints))
        //need stretch because proportions means inequal scaling
        //so I can't up text size to get gradient.
        // push()

        // for (this.i = 0; this.i < 20; this.i++) {
        //     //need text to points to be drawn 20 times to achieve gradient.

        //     //gradient
        //     this.f = map(20 - this.i, 0, 20, 0, 100)
        //     stroke(255, this.f);


        //     //text to points for I. Text size increases with I, so that vertical 
        //     //height increases as well.
        //     for (this.ii = 0; this.ii < this.iTtP.length; this.ii++) {

        //         push();
        //         //translate(this.iTtP[this.ii].x  - (this.iWidth / 2)+(1 * this.i), this.iTtP[this.ii].y)
        //         translate(this.iTtP[this.ii].x + (this.iWidth / 4.8),  this.iTtP[this.ii].y)
        //         point(0, 0);
        //         pop();
        //     }


        //     // textSize((width*2)+this.i);


        // }

        // pop();
    }
}

class CLerp {

    constructor() {
        this.ca = color(100, 100, 100);
        this.cb = color(10, 10, 20);

        this.cc = this.ca;

    }
    show() {
        push();
        noFill();


        for (this.y = 0; this.y < height; this.y++) {
            this.interp = map(this.y, 0, height, 0, 1)
            this.cc = lerpColor(this.ca, this.cb, this.interp)

            stroke(this.cc);
            line(0, this.y, width, this.y)
            //console.log (this.ca)
        }

        pop();




    }



}