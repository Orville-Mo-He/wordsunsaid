let s;
let bodoni = [];
let tests = [];
let didot, font;
let h, w, sdown;
let unsaid, haunted, ball, test; //classes
let alltheheights = [];
let old

let linecalc = [];
let gpw; //global paragraph width;

let canvas2, canvas3, canvas4;


function preload() {
    bodoni[1] = loadFont('Fonts/Bodoni72Book.ttf');
    bodoni[2] = loadFont('Fonts/Bodoni72Bold.ttf');
    font = loadFont('Fonts/Bodoni72Book.ttf');
    didot = loadFont('Fonts/Didot-01.ttf');

};

function setup() {

    createCanvas(windowWidth, (windowWidth / 1.77777778) * 3); //keeps a 16*9 ratio but is 3 screens long

    w = width;
    h = height;
    sdown = width / 1920;
    s = second();

    old = new Unsaid_OLD;

    canvas2 = createGraphics(width, height);
    ball = new Ball;
    unsaid = new Unsaid;
    haunted = new Haunted;
    clerp = new CLerp;
    test = new Test(width / 6, height / 6);

    // for (let i = 0; i < 5; i++) {
    //     tests[i] = new Test(width / 11 + (width / 5 * i), height / 6, random(height / 24))
    // }

    for (let i = 0; i < blocks.length; i++) {

        //create an instance of Unseen for ever element of Blocks
        //with random initial seed values and increments  for their noise-based placement
        //for each instance decrease their alpha so that they come in one by one
        //set it so that !hit and the initial values of displacement(from interaction) to 0

        unsaid[i] = new Unsaid(random(width), random(height), random(0.0005, 0.001), random(0.0005, 0.001), 0 - (100 * i), false, 0, 0);
    }
}






function draw() {
    background(0);
    clerp.show();
    //reticle();

    //this calculates the paragraph height of all the elements of the blocks array.
    for (let i = 0; i < blocks.length; i++){
        alltheheights[i]= textHeight(blocks[i], 17);
    };

    //print (alltheheights[1]);

    //ball.show()
    haunted.show();

    //old.show();

    for (let i = 0; i < blocks.length; i++) {
        push();
        textFont(bodoni[1])
        unsaid[i].move();
        push();
        //this.sway();
        unsaid[i].appear(1);
        unsaid[i].words(blocks[i], i);
        pop();
        pop();

    }


}


// some antiquated code :P (can just ignore, but gives you idea of what I was going for before)
class Unsaid_OLD {

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
        this.txt = '(words unsaid)'



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


        //initial area that height is lock into.
        this.hlock = [];
        this.lerpIncrement = [];

        //line length.
        push();
        textSize(14*sdown);
        textFont(bodoni);
        this.pwidth = textWidth('manipulated me to stay and because of ');
        this.phieght = textAscent();
        pop();

        //based on ratio derived from mouse clicks :P
        //these are all constants
        this.xMin = 0.40401785714285715 * width + (this.pwidth/2);  //left 
        this.xMax = 0.59765625  * width - (this.pwidth/2); //right 
        this.yMin = 0.0939153439153439  * height + (this.phieght*9); //top



        //this is a variable with a different value for each block
        this.yMax = []; //botom

        this.bf = 5; //blur factor

        console.log(windowWidth);

        //I'll take a dozen of everything at 0 :P
        for (this.i = 0; this.i < this.txts.length; this.i++) {

            this.txtAlpha[this.i] = 0 - (50 * this.i); //appear one at a time lol

            //seed values are random (only run once so that they are preserved)
            //min/maxes don't really matter here aslong as they are spread out.
            //later this will be += to the deltas.
            this.xSeed[this.i] = random(0, width);
            this.ySeed[this.i] = random(0, height);

            //same here except these values have to be small as larger values = more random
            this.deltaX[this.i] = random(0.003, 0.005) //since x position is also being affected by hlock, this needs to be bigger to acccomodate for the velocity of y
            this.deltaY[this.i] = random(0.001, 0.0024)

            //here for continuity really since they'll need to be called later
            //mapped later
            this.y[this.i] = 0
            this.x[this.i] = 0

            this.hlock[this.i] = 2/3
            this.lerpIncrement[this.i] = 0.0000005

            //delta x of the final position, used for rotation calculation
            this.dnx[this.i] = 0
            this.dnx[this.i] = 0

            this.swayN[this.i] = random(0, height);


            this.yMax[this.i] = (0.904100529100529 * height)  - (height*2/3)
            //since Y Max needs to start from 1/3 height and go to this max value.
            //((1/this.hlock[this.i]) * height) will start as 2/3
            //remember: this.hlock[this.i] = 3 initially and its limit is 2.


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
        this.yInitial += this.xoff;


    }
    //test end
    


    
    // logic here should is that put this text here at this random vertex 
    // designated by noise function and move it along this noise function.

    // Each text block, their initial position is chosen by the corresponding
    // initial points designated by the initial x and initial y arrays.
    //     (I know I could probably use vectors here, but that makes a lot
    //     of things a lot messier.)
    
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
        for (this.i = 0; this.i < this.txts.length; this.i++) {

            noStroke();

            //where all the magic happens :P
            push();
            this.place_and_move();
            translate(this.x[this.i] - (this.pwidth / 2), this.y[this.i]);
            //minus half pwidth so rotation happens at center of paragraph.

            push();
            //rotate aound ^ central point.
            //double push so placement isn't affect by translate
            this.sway();
            fill(0, this.txtAlpha[this.i]);

            //baseline blur
            text(this.txts[this.i], 0, 0);
            text(this.txts[this.i], this.bf/2, 0);
            text(this.txts[this.i], -this.bf/2, 0);
            //y shift blur
            text(this.txts[this.i], this.bf, this.bf/2);
            text(this.txts[this.i], -this.bf, this.bf/2);
            //-yshift blur
            text(this.txts[this.i], this.bf, -this.bf/2);
            text(this.txts[this.i], -this.bf, -this.bf/2);
            




            pop();
            pop();

            //reset and move on
            this.counter = 0

            this.appear(1, 25)//rate, max;

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

        //console.log(this.swayfactor[1])


        rotate(this.swayfactor[this.i] + map(noise(this.swayN[this.i]), 0, 1, -5, 5));
        this.swayN[this.i] += 0.005


    }


    place_and_move() {

        this.yMax[this.i] = (0.904100529100529 * height)  - (this.hlock[this.i] * height)
        
        this.y[this.i] = map(noise(this.ySeed[this.i]), 0, 1, this.yMin, this.yMax[this.i]);
        this.x[this.i] = map(noise(this.xSeed[this.i]), 0, 1, this.xMin, this.xMax);

        this.ySeed[this.i] += this.deltaY[this.i];
        this.xSeed[this.i] += this.deltaX[this.i];

        //lets me limit the initial Y values to only the within frame

        //if this.hlock[this.i] is greater than 0 lerp it to 0 (it was only after I coded all this 
        //did I realize I don't need separate hlocks but whatever).
        if (this.hlock[this.i] > 0) {
            this.hlock[this.i] = lerp(this.hlock[this.i], 0, this.lerpIncrement[this.i]); //the curb to 1 will be excrutiating.
            this.lerpIncrement[this.i] += 0.0000005
        };

        //console.log(this.hlock[2]+ '\n'+this.y[2]+ '\n'+  this.hlock[this.i] * height);

    }

    gravity(_a) {

        translate(0, this.g)
        this.g += _a

        //console.log(this.g)

        //tester for gravity
        //text ('hi', width/3, height/2)
    }

    appear(_a, _b) { //where _a is the amount to increas my and _b is the max alpha value I want. 

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
        this.weeeeeeee = 'I'

        push();
        textSize(this.tts);
        this.iWidth = textWidth('I');
        this.iYcenter = textAscent() / 2;
        pop();



    }

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
        fill(255, 50);
        translate(0, -(this.iYcenter / 5))
        textAlign(CENTER, CENTER);
        textFont(didot);
        textSize(this.tts);
        text('I', width / 2, height / 2);
        pop();

    }
    //blur this. put it on canvas 2, then mask it out
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

class Unsaid {
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

        
        push()
        textSize(14 * sdown);
        textFont(bodoni[1]);
        this.lineLength = textWidth(pwidthdeciderline);
        pop();
        
        this.xMin = 0.40401785714285715 * width + (this.lineLength/2);  //left 
        this.xMax = 0.59765625  * width - (this.lineLength/2); //right 
        
        this.bf = 2 //blur factor


    }

    move() {

        this.xOut = map(noise(this.xseed), 0, 1, this.xMin, this.xMax);
        print(this.xMin)
        this.yOut = map(noise(this.yseed), 0, 1, 0, height / 3);

        this.hit = collidePointCircle(mouseX, mouseY, this.xOut, this.yOut, this.lineLength/2);

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

    }

    words(_a, _i) { //_a = what to type. the many many texts so blurred.
        rectMode(CENTER);
        textSize(14*sdown)
        textAlign(LEFT, CENTER);
        this.pyCenter = alltheheights[_i]/2; 
        this.pwidth = textWidth(pwidthdeciderline);

        push();

        fill(255, this.alpha / 4)
        // upper row
        text(_a, this.x + 3, this.y - this.pyCenter + 2, this.lineLength);
        text(_a, this.x - 3, this.y - this.pyCenter + 2, this.lineLength);

        // bottom row
        text(_a, this.x + 3, this.y - this.pyCenter - 2, this.lineLength);
        text(_a, this.x - 3, this.y - this.pyCenter - 2, this.lineLength);
        pop();

        for (let i = 0; i < this.bf; i++) {
            text(_a, this.x - i * 5, this.y - this.pyCenter, this.lineLength);
        }

        //rect(0,0, this.lineLength, 100)
        //print(this.pwidth)
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




}