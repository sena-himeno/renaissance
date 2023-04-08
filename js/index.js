const outputSoundEl = document.getElementById("key_output");
const luncher = document.getElementById("game_start");
const musicEl = document.getElementById("music");
const txt_path = "./SR01/key.txt";
const key_print = document.getElementById("key_print");
var sound_name;
var count = 0;
var print_content = "";

var audio_player = new Audio();
audio_player.src = "/page/SR/SR01/song.ogg"


const song_info = {

}
class Play{
    constructor(
        // song_name,
        key_sound) {
        // this.song_name = song_name;
        this.key_sound = key_sound;
    }
    init(){
        count = 0;
        sound_name = "bell1001";
    }
    run() {
        this.init();
        audio_player.play();
        this.print_key();
    }
    async print_key(key_sound) { //生成key文本用
        clog(key_sound);
        let interval = setInterval(function () {
            if (count == key_sound.length) {
                clearInterval(interval)
            }
            if (Math.floor(musicEl.currentTime * 10) / 10 + 4 == Math.floor(parseFloat(key_sound[count].keytime) * 10) / 10) {
                console.log(key_sound[count].keyPressed)
                console.log(typeof (key_sound[count].keyPressed))
                clog(key_sound[count].keyPressed.toUpperCase().charAt(0))
                new Output_Key(key_sound[count].keyPressed.toUpperCase().charAt(0)).draw(img_print_key)
                print_content += (key_sound[count].keyPressed)
                
                count++;
            }
            else {
                print_content += '_';
            }
        }, 100)
    
    
    }

}


async function print_key(key_sound) { //生成key文本用
    clog(key_sound);
    let interval = setInterval(function () {
        if (count == key_sound.length) {
            clearInterval(interval)
        }
        // clog(Math.floor(musicEl.currentTime * 10) / 10 + 4 + " seconds" + Math.floor(parseFloat(key_sound[count].keytime) * 10) / 10);
        if (Math.floor(musicEl.currentTime * 10) / 10 + 4 == Math.floor(parseFloat(key_sound[count].keytime) * 10) / 10) {
            clog("---------------------------")
            clog(Math.floor( ( Math.floor(parseFloat(key_sound[count].keytime) * 10) / 10) - (musicEl.currentTime * 10) / 10)  );
            clog("---------------------------")
            console.log(key_sound[count].keyPressed)
            console.log(typeof (key_sound[count].keyPressed))
            clog(key_sound[count].keyPressed.toUpperCase().charAt(0))
            new Output_Key(key_sound[count].keyPressed.toUpperCase().charAt(0)).draw(img_print_key)
            print_content += (key_sound[count].keyPressed)

            count++;
        }
        // if (Math.floor(musicEl.currentTime * 10) / 10 >= Math.floor(parseFloat(key_sound[count].keytime) * 10) / 10) {
            // print_content += (key_sound[count].keyPressed)
        //     count++;
        // }
        else {
            print_content += '_';
        }
        clog(Math.floor(musicEl.currentTime * 10) / 10)
        clog(Math.floor(parseFloat(key_sound[count].keytime) * 10) / 10)
        clog(count)
        clog(print_content)
        clog(key_sound.length)

    }, 100)


}
async function main() {
    // sound_name = "bell1001";
    let key_sound = await txt_to_json(txt_path)
    // luncher.onclick=function(){ new Play(key_sound).init() };
    //let count = 0;
    let gameContext = {
        "sheetData": key_sound,
        "count": 0,
        "keyPressed": ""
    }
    draw_line(ctx, 30, 10);
    print_key(key_sound)
    document.onkeyup = function (event) {
        if (!musicEl.paused) {
            gameContext.keyPressed = event.key;

            sound_controller(gameContext);
        }
    }
}

function sound_controller(gameContext) {
    const { sheetData, _count, keyPressed } = gameContext;
    const currentTime = musicEl.currentTime
    let keyPressedTime = Math.floor(currentTime * 10) / 10
    clog(`${keyPressedTime}  ${keyPressed}`)

    if (currentTime >= parseFloat(sheetData[gameContext.count].keytime)) {
        sound_name = sheetData[gameContext.count].sound_name;
        gameContext.count++;
    } else {
        clog("You missed the key.");
    }
    outputSoundEl.setAttribute("src", `./SR01/Key/${sound_name}.ogg`)
    outputSoundEl.play();
    // clog(sound_name)
    clog(`Next key: ${sheetData[gameContext.count].keyPressed}, Time: ${sheetData[gameContext.count].keytime}`)
}

async function txt_to_json(txt_path) {

    let result = [];
    let text = await fetch(txt_path)
        .then(response => response.text())

    let lineCount = 0;
    text.split("\n").forEach(line => {
        let fields = [];
        let inlineIndex = 0;


        line.split(",").forEach(info => {
            if (inlineIndex <= 3) {
                fields[inlineIndex] = info;
            }
            inlineIndex++;
        })

        //let accurate_key = {};
        let key_time = String(Math.floor(fields[1] * 10) / 10)

        result[lineCount] = {
            "keytime": key_time,
            "sound_name": fields[2],
            "keyPressed": fields[3],
        }
        lineCount++;
        //result.push(accurate_key);
    })

    // clog(result)
    return result
}

function clog(text) {
    let currentdate = new Date();
    let datetime = "[" +
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds() + "] ";
    //console.log('[index.js]' + datetime + text);
    console.log(text);

}

main();