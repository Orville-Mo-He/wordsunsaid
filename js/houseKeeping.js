let blocks = ["I didn’t leave because there was \nsomething wrong with you or \nbecause I found someone else, I left \nbecause I wasn’t in love with you \n\n    anymore. \n\nWe simply were not a good match. \n\nIt took me so long to leave, \nbecause you made it impossible. \nYou guilted me and \nmanipulated me to stay and because of \nthat I seemed like the bad guy but \nwe were both wrong in our own ways.", "I just wanted to know: \nwhat were you thinking? \nWhere were you this whole time?", "WHAT?", "Your problem isn't us, \n    it's your commitment.", "My patron saint, Rose of Lima, was so \nbeautiful, and received so much\ninterest in suiters, even though she \npromised herself to God, that she\nrubbed her face with salt until blisters\nformed to mutilate. Every Friday, my \nschool would attend church, and one\nday in the ripe grade of kindergarten I \nprayed, \“God, Please make me \nbeautiful— the type of beautiful \nthat is most desiring to men, so that I \ncan fall in love.\” I felt this need to be \ndesired in a way that I didn\’t even \nunderstand at the time, which is\ndisturbing to me now. I now realize \nthough that it was not me wanting\nsexual conquests, but a symptom of\ngrowing up in community that\npraised me from a young age for how\nI looked, and nothing else. A \nsymptom of growing up in a\nhousehold where I didn\’t feel heard or\nrespected. A symptom of being\nsilenced and ignored. It was not\nsexual conquests that I wanted, but to \nfeel wanted myself. I wanted\nsomeone to see me and I \nwanted to feel special. Being pretty is\nthe only \“prayer\” I think \“God\” ever \nheard me ask. And maybe it was not \nGod who answered it, because being\n\“pretty,\” if it\’s not vain of me to say so,\nand caring about being pretty and\nnothing else has become the biggest\ncause of pain in my life right now. I\nhave been bleeding for almost a\nmonth and a half without missing a \nday, I have chronic spinal pain, and I\nhit myself with a hammer if I can\’t\nhandle the mental abuse in my house, \nbut being pretty somehow hurts me\nthe most. And because I learned to be\nquiet, and I begged God to make me\npretty, I didn\’t learn how to say \“no,\” or\n\“stop that,\” or \“Fuck off.\” I just learned\nhow to be silent and obedient.\nSometimes I think about rubbing salt\non my face, but I still cannot kick the\naddiction of feeling desired, even\nwhen it causes pain.", "the proud and the shameful.\nthe \“i\” that i hesitate to own as the \nsubject.the cheeriness that force lifts \neverything but destined to falter, everytime. \n\nit is ok, it is ok, it is ok \nwhen the mind is strong.\nit is not, it is not, it is not\n      pride, worthy \nworthy pride", "I know now,\n 	that which haunts me. I know now:\n\n  	fear.\nYou taught me,\nthe oblivion and eternity\nthat sit on\n			my chair and lies\nin my head\n		with self and sense\n\n  	gone,\n\nI just sat there—processing none but\n oblivion with the occasional twitch\nor tremble, a sensation // a state\nI had yet to know. I\nthere was nothing there. anymore.\neverything let go. everything but the\nghosts.", ", and I can\’t sleep. I…\nIt\’s hard to walk into the bedroom. I\n tremble. Even when in thought only.\nThe right word is somewhere between\ndread, fear, history. They flash\nbefore my eyes. Images of nights\nspent 2 inches from the wall; of\nnights spent in a back-and-forth\n		of 4 inches between wall\n 						and forehead,\n	and then no inches.\n\nit oozes solemn and sombre history.\na history that entices a primordial fear\nonelike trauma.", "I would find and learn I, if only I\ncould forget that which I call I.", "for all the aftermath, I feel oddly\ngrounded for the first time truly.", "To you\n    	I must always be weightless.", "In the worst of ways, you keep me here.", "I can\’t leave because of you, but it\nno longer feels quite right to say\nthat I live for you or that I don\’t\nlive for myself\n	*I suppose I\’ll leave this thought,\nthis revelation, this permission,\nthis passage: un-ended*", "“We could have just danced.", "I couldn\’t make you feel loved when\nyou needed it most.\n\nWhen I needed it most.", "I remember now my future. For it\n\nseems that memory is the equivalent\nand enabler of futures. Those without\nmemory can imagine no future. \”Like\nfinding a chair in an empty room.\”\n\nYet we must also forget to unburden the\ndiving bell of yesteryears.\n\nWe must thus carve and mold, with firm\nand delicate hands, the wet clay of\nthe stories we say we are, the\nstories we believe we are."];

function re() { //refresh
}

function keyPressed() {
    //console.log('hi');

    if (keyCode === 32) { //spacebar = refresh
    }
    // unsaid.re();

}



function windowResized() {
    resizeCanvas(windowWidth, (windowWidth / 1.77777778) * 3);
    w = width;
    h = height;
    sdown = width / 1920;


}

//stolen from < https://gist.github.com/studioijeoma/942ced6a9c24a4739199#file-p5-textheight-js >
//(modified a little)
// function textHeight(_text, maxWidth, _textLeading) { 
//     var werds = _text.split(' ');
//     var lyne = '';
//     var h = _textLeading;

//     for (var i = 0; i < werds.length; i++) {
//         var testLine = lyne + werds[i] + ' ';
//         var testWidth = drawingContext.measureText(testLine).width;

//         if (testWidth > maxWidth && i > 0) {
//             lyne = werds[i] + ' ';
//             h += _textLeading;
//         } else {
//             lyne = testLine;
//         }
//     }

//     return h;
// }

//modified to splice by linebbreaks and 

function textHeight(_text, _textLeading){
    var lnes = _text.split('\n');
    var h;
    var ta = textSize();
    
    if ( ta < _textLeading){
        if  (lnes.length > 1){
            h = (_textLeading) * (lnes.length);
        }
        else {
            h = _textLeading;
        }

    } else {
        if  (lnes.length > 1){
            h = lnes.length * ta;
        }
        else {
            h = ta;
        }
    }


    return h



}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
