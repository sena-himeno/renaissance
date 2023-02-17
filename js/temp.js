const har_key_sound = {
    113: "./song/YU04/key_sound/har0.mp3",
    97: "./song/YU04/key_sound/har1p.mp3",
    115: "./song/YU04/key_sound/har1l.mp3",
    100: "./song/YU04/key_sound/har1s.mp3",
    102: "./song/YU04/key_sound/har2dxs.mp3",
    103: "./song/YU04/key_sound/har2x.mp3",
    104: "./song/YU04/key_sound/har2pxs.mp3",
    106: "./song/YU04/key_sound/har3pxl.mp3",
    107: "./song/YU04/key_sound/har3x.mp3",
    108: "./song/YU04/key_sound/har3dx.mp3",
    122: "./song/YU04/key_sound/har3pxl.mp3",
    120: "./song/YU04/key_sound/har4l.mp3",
    99: "./song/YU04/key_sound/har4dx.mp3",
    118: "./song/YU04/key_sound/har4pxs.mp3",
    98: "./song/YU04/key_sound/har5x.mp3",
    110: "./song/YU04/key_sound/har5xl.mp3",
    109: "./song/YU04/key_sound/har5xs.mp3",
    119: "./song/YU04/key_sound/har7xs.mp3",
    101: "./song/YU04/key_sound/har7dxs.mp3",
}    

async function main(){
    let output_sound = document.getElementById("key_output");
    let music = document.getElementById("music");

    document.onkeyup = function (event) {
        if (!music.paused) {
            let charCode = event.keyCode;
            sound_controller(music.currentTime, charCode + 32);
        }
    }
    
    function sound_controller(currentTime, key) {
        if (har_key_sound[key]) {

            output_sound.setAttribute("src", har_key_sound[key])
            output_sound.play();
        }

    }

}

main();