let font, didot, courier;
let tests = [];
let h, w, sdown;
let unsaid = []; //will be array of classes
let haunted, ball, test; //classes
let old;
let gpw; //global paragraph width;
let tsize = 14;
let tLeading = 0;
let lineLength;
let alltheheights = [];
let canvas2, canvas3, canvas4;
let gravityMod = 0;
let gravity = 0;


function preload() {
    courier = loadFont('Fonts/CourierPrime-Regular.ttf')
    didot = loadFont('Fonts/Didot-01.ttf');

};

function setup() {
    createCanvas(windowWidth, (windowWidth / 1.77777778) * 3); //keeps a 16*9 ratio but is 3 screens long

    font = courier;
    w = width;
    h = height;
    sdown = width / 1920;

    tLeading = round(tsize * 1.2);

    push();
    noStroke();
    fill(255);
    textSize(tsize * sdown);
    textLeading(tLeading);
    textFont(font);
    lineLength = textWidth('manipulated me to stay and because of ');
    print (textSize())

    pop();





    // for (let i = 0; i < 5; i++) {
    //     tests[i] = new Test(width / 11 + (width / 5 * i), height / 6, random(height / 24))
    // }

    for (let i = 0; i < blocks.length; i++) {

        //create an instance of Unseen for ever element of Blocks
        //with random initial seed values and increments  for their noise-based placement
        //for each instance decrease their alpha so that they come in one by one
        //set it so that !hit and the initial values of displacement(from interaction) to 0
        unsaid[i] = new Unsaid_slow(random(width), random(height), random(0.0005, 0.001), random(0.0005, 0.001), 0 - (100 * i), false, 0, 0);

        //this calculates the paragraph height of all the elements of the blocks array.
        push()
        textFont(font);
        textSize(tsize * sdown);
        textLeading(tLeading);
        alltheheights[i] = textHeight(blocks[i], tLeading);
        pop();

    }

    old = new Unsaid_fast;
    ball = new Ball;
    haunted = new Haunted;
    clerp = new CLerp;
    test = new Test(width / 6, height / 6);


}



function draw() {
    background(0);
    clerp.show(); //gradient

    //reticle();
    push();
    gravity = lerp(gravity, gravityMod, 0.04)
    translate(0, map(gravity, 0, blocks.length, 0, height / 12.8))
    haunted.show();
    //CleanButSlow();
    FastButMessy();
    pop();


    appropos();


}

function appropos() {

    //window.pageYOffset is an HTML DOM variable that tracks 
    //... the window's position relative to the page
    push()
    fill(255);
    textSize(14 * sdown);
    textFont(font);
    text('the words we never said', width * 1 / 9, windowHeight / 2 + window.pageYOffset);
    pop();

}

//calls the code for the clean but slow version of the code
function CleanButSlow() {
    for (let i = 0; i < blocks.length; i++) {
        push();
        textFont(font)
        unsaid[i].move(i);
        push();
        //this.sway();
        unsaid[i].appear(1);
        unsaid[i].words(blocks[i], i);
        pop();
        pop();

    }
}

//calls the code for the Fast but messy version of the code
function FastButMessy() {
    old.show();
}


// some antiquated code :P (can just ignore, but gives you idea of what I was going for before)
class Unsaid_fast {

    //I had all this... and I realized that I could just do all this with a different way of using classes.... kill me .

    constructor() {

        //first as singular block aka text set one as a test.
        this.a = 255;
        this.deltaA = 0.1;

        //positions and values for noise
        this.xInitial = random(width / 24, width - width / 24);
        this.yInitial = random(height / 24, height - height / 24);

        this.xoff = random(0.003, 0.01);
        this.yoff = random(0.005, 0.01);



        //text set 2, real deal ish.

        this.txts = blocks; //we can just change the text later if needed.




        // so for the variables, I need:
        // a seed value
        // a delta/offset value
        // a value that represents the output of the noise
        // a value that is the noise output but mapped to the width or height
        //     this value can be condensed with the above


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


        //a hit value for each block for collide 2D
        this.hit = []


        //initial area that height is lock into.
        this.hlock = [];
        this.lerpIncrement = [];


        //based on ratio derived from mouse clicks :P
        //these are all constants
        this.xMin = (0.40401785714285715 * width)+(lineLength/2.2); //left 
        this.xMax = (0.59765625 * width)-(lineLength/2.2); //right 



        //these variables have different values for each block
        this.yMax = []; //botom
        this.yMin = []; //top

        //for the interactivity
        this.px = [];
        this.py = [];
        this.pYsign = [];
        this.tx = [];
        this.ty = [];




        this.bf = 5; //blur factor

        //I'll take a dozen of everything at 0 :P
        for (this.i = 0; this.i < blocks.length; this.i++) {

            this.txtAlpha[this.i] = 0 - (50 * this.i); //appear one at a time lol

            //seed values are random (only run once so that they are preserved)
            //min/maxes don't really matter here aslong as they are spread out.
            //later this will be += to the deltas.
            this.xSeed[this.i] = random(0, height);
            this.ySeed[this.i] = random(0, height);

            //same here except these values have to be small as larger values = more random
            this.deltaX[this.i] = random(0.008, 0.02) //since x position is also being affected by hlock, this needs to be bigger to acccomodate for the velocity of y
            this.deltaY[this.i] = random(0.001, 0.02)

            //here for continuity really since they'll need to be called later
            //mapped later
            this.y[this.i] = 0
            this.x[this.i] = 0


            this.hlock[this.i] = 2 / 3
            this.lerpIncrement[this.i] = 0.0000005

            //delta x of the final position, used for rotation calculation
            this.dnx[this.i] = 0
            this.dnx[this.i] = 0

            this.swayN[this.i] = random(0, height);


            this.yMin[this.i] = (0.0939153439153439 * height) + (alltheheights[this.i]);
            this.yMax[this.i] = (0.904100529100529 * height) - (alltheheights[this.i] / 2);




            //for interactivity
            //a separate hit for each block
            this.hit[this.i] = false
            this.px[this.i] = 0
            this.py[this.i] = 0
            this.pYsign[this.i] = 0
            this.tx[this.i] = 0
            this.ty[this.i] = 0


            //for proof of concept
            // console.log('The value for this.x at ' + this.i+ ' is: ' + this.x[this.i]);
            // console.log('The value for this.y at ' + this.i+ ' is: ' + this.x[this.i]);
            // console.log('The value for this.xSeed at ' + this.i+ ' is: ' + this.xSeed[this.i]);
            // console.log('The value for this.ySeed at ' + this.i+ ' is: ' + this.ySeed[this.i]);
            // console.log('The value for this.deltaX at ' + this.i+ ' is: ' + this.deltaX[this.i]);
            // console.log('The value for this.deltaY at ' + this.i+ ' is: ' + this.deltaY[this.i]);



        };



    }



    re() { //refresh this "sequence" basically
        this.xInitial = random(width / 24, width - width / 24);
        this.yInitial = random(height / 24, height - height / 24);


        console.log('Refreshed');

    }


    show() {
        push();
        this.words();
        pop();
    }


    // logic here should is that put this text here at this random vertex 
    // designated by noise function and move it along this noise function.

    // Each text block, their initial position is chosen by the corresponding
    // initial points designated by the initial x and initial y arrays.
    // ...(I know I could probably use vectors here, but that makes a lot
    // ...of things a lot messier.)

    // Each text block also has their corresponding alphas so that they can
    // fade in as needed.

    // So the ultimate algorithm should be pick the first element of the
    // text, position, velocity and alpha arrays and match/use them 
    // correspondingly.

    // Then wait 5 (or however many) seconds and pick the next. Do this 
    // until all memebers of the text 'blocks' array are displayed.


    words() {


        push();

        this.tformating();
        for (this.i = 0; this.i < blocks.length; this.i++) {
            //where all the magic happens :P

            push();
            this.place_and_move();
            //print(this.x[0])

            translate(this.x[this.i], this.y[this.i] - alltheheights[this.i] / 2); //this translate has some issues. one is that the mapping of it to the region based on the 
            //minus half pwidth so rotation happens at center of paragraph.

            push();
            rectMode(CENTER);
            textAlign(LEFT, CENTER);

            //rotate aound ^ central point.
            //double push so placement isn't affect by translate
            this.sway();
            fill(255, this.txtAlpha[this.i]);

            //rect(0,0, lineLength, alltheheights[0])



            //baseline blur
            text(this.txts[this.i], this.tx[this.i], this.ty[this.i], lineLength);
            text(this.txts[this.i], this.tx[this.i] + this.bf / 2, this.ty[this.i], lineLength);
            text(this.txts[this.i], this.tx[this.i] - this.bf / 2, this.ty[this.i], lineLength);
            //y shift blur
            text(this.txts[this.i], this.tx[this.i] + this.bf, this.ty[this.i] + this.bf / 2, lineLength);
            text(this.txts[this.i], this.tx[this.i] - this.bf, this.ty[this.i] + this.bf / 2, lineLength);
            //-yshift blur
            text(this.txts[this.i], this.tx[this.i] + this.bf, this.ty[this.i] - this.bf / 2, lineLength);
            text(this.txts[this.i], this.tx[this.i] - this.bf, this.ty[this.i] - this.bf / 2, lineLength);



            pop();
            pop();


            this.appear(1, 25); //rate, max;

        }
        pop();


    }


    tformating() {

        noStroke();
        fill(255);
        textSize(tsize * sdown);
        textLeading(tLeading);
        textFont(font);

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

        //console.log(this.swayfactor[1])


        rotate(this.swayfactor[this.i] + map(noise(this.swayN[this.i]), 0, 1, -5, 5));
        this.swayN[this.i] += 0.005


    }


    place_and_move() {

        this.yMax[this.i] = (0.904100529100529 * height) - (this.hlock[this.i] * height) + alltheheights[this.i] / 2;

        //these are the outputs of the noise mapped to the region within the I
        this.y[this.i] = map(noise(this.ySeed[this.i]), 0, 1, this.yMin[this.i], this.yMax[this.i]) - alltheheights[this.i] / 2;
        this.x[this.i] = map(noise(this.xSeed[this.i]), 0, 1, this.xMin, this.xMax);


        //these are the inputs of the noise function
        //moving throught the noise graph at the speed of delta x  y
        this.ySeed[this.i] += this.deltaY[this.i];
        this.xSeed[this.i] += this.deltaX[this.i];


        //region is linelength * paragraph height
        //collide point to rect()

        if (this.txtAlpha[this.i] === 25) {
            this.hit[this.i] = collidePointRect(mouseX, mouseY, this.x[this.i] - lineLength / 2, this.y[this.i] - alltheheights[this.i] / 2, lineLength, alltheheights[this.i]);

        };


        //horizontal push
        this.px[this.i] = this.x[this.i] - mouseX;

        //vertical push orientation
        this.pYsign[this.i] = (this.y[this.i] - mouseY) / (abs(this.y[this.i] - mouseY));

        //vertical push 
        this.py[this.i] = sqrt(((dist(mouseX, mouseY, this.x[this.i], this.y[this.i])) ** 2) - (this.px[this.i] ** 2)) * this.pYsign[this.i];



        //assumes rectMode(CORNER);
        //so we need to "translate" the rect by - rect.width/2 and - rect.height/2
        if (this.hit[this.i]) {
            this.tx[this.i] = lerp(this.tx[this.i], this.px[this.i], 0.3);
            this.ty[this.i] = lerp(this.ty[this.i], this.py[this.i], 0.3);
        } else {
            this.tx[this.i] = lerp(this.tx[this.i], 0, 0.3);
            this.ty[this.i] = lerp(this.ty[this.i], 0, 0.3);
        };


        //lets me limit the initial Y values to only the within frame
        //if this.hlock[this.i] is greater than 0 lerp it to 0
        //as this.hlock[this.i] -> the maximum y value -> ~0.9*height
        if(this.txtAlpha[this.i] > 0){
            if (this.hlock[this.i] > 0) {
                this.hlock[this.i] = lerp(this.hlock[this.i], 0, this.lerpIncrement[this.i]); //the curb to 1 will be excrutiating.
                this.lerpIncrement[this.i] += 0.000005 //
            };
        }


    }

    appear(_a, _b) { //where _a is the amount to increas my and _b is the max alpha value I want. 

        if (this.txtAlpha[this.i] < _b) {
            this.txtAlpha[this.i] = this.txtAlpha[this.i] + (_a);

            if (this.txtAlpha[this.i] === _b) {
                gravityMod++;
            };
            //print(gravity)
        };
    };






}


class Unsaid_slow {
    constructor(_xseed, _yseed, _xoff, _yoff, _alpha, _hit, _x, _y) {

        //all of these need to initialed as designated for each instance of unsaid[i]
        //if they aren't all the instances will appear at the same time and do the same thing.
        this.xseed = _xseed;
        this.yseed = _yseed;
        this.xoff = _xoff;
        this.yoff = _yoff;
        this.alpha = _alpha;
        this.hit = _hit;
        this.x = _x;
        this.y = _y;
        this.hblock = [];
        //this.yMax = []
        this.yMax = (0.904100529100529 * height)


        for (let v = 0; v < blocks.length; v++) {
            this.hblock[v] = height * 2 / 3
            //this.yMax [v]= (0.904100529100529 * height)

        }




        this.bf = 2 //blur factor


    }

    move(_i) {
        push();
        rectMode(CENTER);
        textSize(14 * sdown)
        textAlign(LEFT, CENTER);
        this.pyCenter = alltheheights[_i] / 2;
        this.yMin = 0.0939153439153439 * height + this.pyCenter; //top
        this.xMin = 0.40401785714285715 * width; //left 
        this.xMax = 0.59765625 * width - (this.ll / 2); //right 

        // print(this.xMax- this.xMin);
        // print( (0.59765625  * width) -(0.40401785714285715 * width))
        // print (lineLength);
        pop();

        //this.yMax [_i] = (0.904100529100529 * height)  - this.hblock[_i];

        this.xOut = map(noise(this.xseed), 0, 1, this.xMin, this.xMax);
        this.yOut = map(noise(this.yseed), 0, 1, this.yMin, height / 3);


        this.hit = collidePointCircle(mouseX, mouseY, this.xOut, this.yOut, this.ll / 2);

        //this.dx and this.dy form the coordinates for the point to lerp to if(this.hit);
        this.dx = this.xOut - mouseX; //horizontal distance from mouse
        this.ySign = (this.yOut - mouseY) / (abs(this.yOut - mouseY)); //this gives the right orientation for dy.
        this.dy = sqrt(((dist(mouseX, mouseY, this.xOut, this.yOut)) ** 2) - (this.dx ** 2)) * this.ySign;
        //vertical distance from mouse based on dx so that the line from dx dy to mouse is always passing through point at this.xOut and this.yOut;


        if (this.hit) {
            this.x = lerp(this.x, this.dx, 0.3);
            this.y = lerp(this.y, this.dy, 0.3);
        } else {
            this.x = lerp(this.x, 0, 0.1);
            this.y = lerp(this.y, 0, 0.1);
        }



        translate(this.xOut, this.yOut);

        this.xseed += this.yoff;
        this.yseed += this.xoff;
        this.hblock[_i] = lerp(this.hblock[_i], 0, 0.00005);

        //this.

    }

    words(_a, _i) { //_a = what to type. the many many texts so blurred.
        rectMode(CENTER);
        textSize(14 * sdown)
        textAlign(LEFT, CENTER);
        this.pyCenter = alltheheights[_i] / 2;


        push();

        fill(255, this.alpha / 4)
        // upper row
        text(_a, this.x + 3, this.y - this.pyCenter + 2);
        text(_a, this.x - 3, this.y - this.pyCenter + 2);

        // bottom row
        text(_a, this.x + 3, this.y - this.pyCenter - 2);
        text(_a, this.x - 3, this.y - this.pyCenter - 2);
        pop();

        for (let i = 0; i < this.bf; i++) {
            text(_a, this.x - i * 5, this.y - this.pyCenter);
        }

        //rect(0,0, this.ll, 100)
        //print(lineLength)
        //print(this.pyCenter);
    }

    appear(_inc) { //where _inc is the speed of showing up basically.
        noStroke();

        if (this.alpha < 75) {
            this.alpha += _inc;
            //console.log('The value for this.alpha is: ' + this.alpha);

        }
        fill(255, this.alpha);

    }

}