class Key_Sound {
    constructor(key_info, outputSoundEl,outputSoundE2, audio_player, musicEl, key_song_path) {
        this.key_info = key_info;
        this.outputSoundEl = outputSoundEl;
        this.outputSoundE2 = outputSoundE2;
        this.audio_player = audio_player;
        this.musicEl = musicEl;
        this.sound_name = [];
        this.next_count;
        this.keyPressedTime;
        this.keyPressed;
        this.currentTime;
        this.key_song_path = key_song_path;

    }
    init() {
        this.sound_name = this.key_info[0].sound_name;
        this.next_count = 0;

    }
    run() {
        let interval = setInterval(() => {
            keyPressed = "";
            if (audio_player.paused) {
                clearInterval(interval)
            }
            document.onkeyup = (event) => {
                this.keyPressed = event.key;
                keyPressed = this.keyPressed
                this.key_sound()
            }
            this.sync_key_sound()
        }, 100)
    }
    key_sound() {
        // clog(  this.sound_name  + " type is "+ typeof(this.sound_name)  + " , length is " + this.sound_name.length);
        if(sound_name == 2){
            // this.outputSoundE2.load()
            this.outputSoundE2.setAttribute("src", this.key_soung_path + this.sound_name[1] + song_key_sound_postfix)
            this.outputSoundE2.play();
        }
        // outputSoundEl.load()
        outputSoundEl.setAttribute("src", this.key_song_path + this.sound_name[0] + song_key_sound_postfix)
        outputSoundEl.play();
    }
    sync_key_sound() {
        this.currentTime = musicEl.currentTime
        this.keyPressedTime = Math.floor(this.currentTime * 10) / 10
        if (count < this.key_info.length) {
            if (this.keyPressedTime == parseFloat(this.key_info[this.next_count].keytime)) {
                this.sound_name = this.key_info[this.next_count].sound_name;
                this.next_count++;
                clog("sync_key_sound,cur_key_sound_name " + this.sound_name);

                if(auto_key_sound_value){

                    this.key_sound()
                }

            }
        }
        clog("Next key: " + this.key_info[this.next_count].keyPressed + ", Time: " + this.key_info[this.next_count].keytime);
    }

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
 
async function txt_to_json_pro(txt_path) {
    let result = [];
    let text = await fetch(txt_path)
        .then(response => response.text())
    let lineCount = 0;
    let prev_key_time;
    let key_sound_name = [];
    text.split("\n").forEach(line => {
        let fields = [];
        let inlineIndex = 0;
        line.split(",").forEach(info => {


            if (inlineIndex <= 3) {
                fields[inlineIndex] = info;
            }
            inlineIndex++;
        })
        let key_time = String(Math.floor(fields[1] * 10) / 10)
        if(prev_key_time == key_time && lineCount >0){
            result[lineCount-1].sound_name.push(fields[2])
        
        }else{
            key_sound_name[0] = fields[2];
            prev_key_time = key_time;
            result[lineCount] = {
                "keytime": key_time,
                "sound_name": key_sound_name,
                "keyPressed": fields[3],
            }
            key_sound_name = [];
            lineCount++;
        }
    })
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