const outputSoundEl = document.getElementById("key_output");
const luncher = document.getElementById("game_start");
const key_print = document.getElementById("key_print");


var success_count;
var next_count;

var sound_name;
var count = 0;
var print_content;
var audio_player = new Audio();
var musicEl = audio_player;

const song_info = {

}

const txt_path = "./SR01/key.txt";
audio_player.src = "/page/SR/SR01/song.ogg"


class Play {
    constructor(key_info, musicEl, audio_player, gameContext,print_content) {
        this.key_info = key_info;
        this.musicEl = musicEl;
        this.audio_player = audio_player;
        this.gameContext = gameContext;
        this.print_content = "";

    }
    init() {
        this.audio_player.load()
        success_count = 0;
        count = 0;
        this.print_content = "";
        sound_name = this.key_info[0].sound_name;
    }
    run() {
        this.init();
        audio_player.play();
        this.play_main();
        luncher.style.display = "none";
    }
    end() {
        luncher.style.display = "block";
    }
    async play_main() {
        let interval = setInterval(() => {
            if (count == this.key_info.length) {
                clearInterval(interval)
                this.end()
            }

            // print key
            this.print_key();
            console.log(this.print_content)
            clog(count)


        }, 100)
    }
    print_key() {
        if (Math.floor(this.musicEl.currentTime * 10) / 10 + 4 == Math.floor(parseFloat(this.key_info[count].keytime) * 10) / 10) {
            new Output_Key(this.key_info[count].keyPressed.toUpperCase().charAt(0)).draw(img_print_key)
            this.print_content += (this.key_info[count].keyPressed)
            count++;
        }
        else {
            this.print_content += '_';
        }
    }


}

class Key_Sound{
    constructor(){

    }
    init(){

    }
    run(){

    }

}

async function main() {
    // sound_name = "bell1001";
    let key_info = await txt_to_json(txt_path)
    luncher.onclick = () => {
        console.log("1")
        var temp =  new Play(key_info, musicEl, audio_player,gameContext);
        temp.run();
    }
    let gameContext = {
        "sheetData": key_info,
        "count": 0,
        "keyPressed": ""
    }
    draw_line(ctx, 30, 10);
    // print_key(key_info)
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

        // let accurate_key = {};
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



