const outputSoundEl = document.getElementById("key_output");
const musicEl = document.getElementById("music");
const txt_path = "./SR01/key.txt";
const key_print = document.getElementById("key_print");
var sound_name;
var count = 0;
var print_content = "";
key_print.append(print_content)
async function print_key(key_sound){ //生成key文本用
    clog(key_sound);
    let interval =  setInterval(function() {
        if(Math.floor(musicEl.currentTime * 10) / 10 >= Math.floor(parseFloat(key_sound[count].keytime) * 10)/ 10 ){
            print_content+= (key_sound[count].keyPressed)
            count++;
        }
        else{
            print_content += '_';
        }
        clog(Math.floor(musicEl.currentTime * 10) / 10)
        clog(Math.floor(parseFloat(key_sound[count].keytime) * 10)/ 10)
        clog(count)
        clog(print_content) 
        clog( key_sound.length)
        if(count == key_sound.length -1){
            clearInterval(interval)
        }
    },100)


}
async function main() {
    sound_name = "bell1001";
    let key_sound = await txt_to_json(txt_path)
    //let count = 0;
    let gameContext = {
        "sheetData": key_sound,
        "count": 0,
        "keyPressed": ""
    }

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

    if (currentTime > parseFloat(sheetData[gameContext.count].keytime)) {
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