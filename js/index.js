const outputSoundEl = document.getElementById("key_output");
const musicEl = document.getElementById("music");
const txt_path = "key.txt";
var sound_name;

async function main(){
    sound_name = "bell1001";
    let key_sound = await txt_to_json(txt_path)
    //let count = 0;
    let gameContext = {
        "sheetData": key_sound,
        "count": 0,
        "keyPressed": ""
    }
    
    document.onkeyup = function (event) {
        if (!musicEl.paused) {
            gameContext.keyPressed = event.key;
            
            sound_controller(gameContext);
        }
    }
}

function sound_controller(gameContext) {
    const {sheetData, _count, keyPressed} = gameContext;
    const currentTime = musicEl.currentTime
    let keyPressedTime = Math.floor(currentTime * 10) / 10
    clog(`${keyPressedTime}  ${keyPressed}`)

    if (currentTime > parseFloat(sheetData[gameContext.count].keytime)) {
        sound_name = sheetData[gameContext.count].sound_name;
        gameContext.count++;
    } else {
        clog("You missed the key.");
    }
    
    console.log(sound_name)
    outputSoundEl.setAttribute("src", `./song/SR01/Key/${sound_name}.ogg`)
    outputSoundEl.play();
    // clog(sound_name)
    clog(`Next key: ${sheetData[gameContext.count].keyPressed}, Time: ${sheetData[gameContext.count].keytime}`)
    

}

async function txt_to_json(txt_path) { //出现未知原因 无法直接引用 拿来当生成

    let result= [];
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