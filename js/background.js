
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

// class CLerp {

//     constructor() {
//         this.ca = color(100, 100, 100);
//         this.cb = color(10, 10, 20);
//         this.cc = [];
//         this.cc[0] = this.ca;
//         this.gdb = [];

//         push();
//         noFill();


//         for (this.y = 0; this.y < height; this.y++) {
//             this.interp = map(this.y, 0, height, 0, 1);
//             this.cc [this.y] = lerpColor(this.ca, this.cb, this.interp);


//             //console.log (this.ca)
//         }

//         pop();


//     }
//     show() {
//         for  ( let i = 0; i < this.gdb.length; i++){
//             stroke(this.cc[i]);
//             line(0, i, width, i);        
//         }



//     }



// }

class CLerp {

    constructor() {

        this.gradient =[];
        push();
        colorMode(HSB)
        this.ca = color(200, 21, 20);
        this.cb = color(210, 80, 7);
        pop();

        //should save some processing speed since this color lerp should only be calculated once
        for (this.y = 0; this.y < height; this.y++) {
            this.interp = map(this.y, 0, height, 0, 1);
            this.gradient[this.y] = lerpColor(this.ca, this.cb, this.interp);
        };

    };
    show() {
        push();
        noFill();


        for (this.y = 0; this.y < height; this.y++) {
            stroke(this.gradient[this.y]);
            line(0, this.y, width, this.y);
            //console.log (this.ca)
        };

        pop();




    };



};
