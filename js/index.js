const outputSoundEl = document.getElementById("key_output");
const musicEl = document.getElementById("music");
const txt_path = "./SR01/key.txt";
const key_print = document.getElementById("key_print");
var sound_name;
var count = 0;
var print_content = "________________________________________________________________________________________________________o_i_u______r_____w________e_____r______q___________________________________________________________________h________________g____________s_d_d____________k_l__;_____l_____d____h____________a_l_g_______s__d_g___d__________s_d_f_k________________a_s__d_f_j_k_l_;_l______k_______p__o_____i___e___i__r________________c_______k______c_c________k_______c________k_____c_c________k_______c________k_____c__c_______k________c_______k______c_c_______k________c________k_____c_c________k_______c________k_____c_c________k________c_______k______c_c_______k________c_______k________c___j_k____l_;___u________________r________________e__________________________________u________________o________________e__________a_s_d_k______j_____d___u________________r_________________e_________________________________i________________o________________p_________________________________a_________________j________________________k________f_______s________y___q____q___i_t__________________t____y___i___y_____________________y___q___q___i__t__________________t___y___i____o________________e_t_y___q____q___i_t__________________t____y___i___y_____________________l_________a__s_f_j_____k____l_____l__________s_j_k_l_k____j___f_d_s_j__________s_d_f_j______k_____l____l________________;________________z_______z________z________z_______z________z_______z________z_______z________z________z_______z________c_____d______c_______c______d_____v________n_____v_v________n_______v________n_____v_v________n________v_______n______v_v_______n________v_______n______v_v_____e__e_e_e___u________________r________________e__________________________________u________________o________________e__________a_s_d_k______j_____d___u________________r_________________e_________________________________i________________o________________p_________________________________w_______________________________________________________________";
async function print_key(key_sound){ //生成key文本用
    setInterval(function() {
        if(Math.floor(musicEl.currentTime * 10) / 10 == Math.floor(parseFloat(key_sound[count].keytime) * 10)/ 10){
            print_content+=(key_sound[count].keyPressed)
            count++;
        }
        else{
            print_content += "_";
        }
        clog(Math.floor(musicEl.currentTime * 10) / 10)
        clog(Math.floor(parseFloat(key_sound[count].keytime) * 10)/ 10)
        clog(count)
        clog(print_content)
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
    if(musicEl.paused){
        key_print.append(print_content)
    }
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