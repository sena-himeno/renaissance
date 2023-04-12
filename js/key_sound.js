class Key_Sound {
    constructor(key_info, outputSoundEl, audio_player, musicEl, key_soung_path) {
        this.key_info = key_info;
        this.outputSoundEl = outputSoundEl;
        this.audio_player = audio_player;
        this.musicEl = musicEl;
        this.sound_name;
        this.next_count;
        this.keyPressedTime;
        this.keyPressed;
        this.currentTime;
        this.key_soung_path = key_soung_path;

    }
    init() {
        this.sound_name = this.key_info[0].sound_name;
        this.next_count = 0;

    }
    run() {
        let interval = setInterval(() => {

            if (audio_player.paused) {
                clearInterval(interval)
            }
            document.onkeyup = (event) => {
                this.keyPressed = event.key;
                keyPressed = this.keyPressed
                this.key_sound()
                // 输出结果


            }
            this.sync_key_sound()
        }, 100)
    }
    key_sound() {
        outputSoundEl.load()
        outputSoundEl.setAttribute("src", this.key_soung_path + this.sound_name + ".ogg")
        outputSoundEl.play();
    }
    sync_key_sound() {
        this.currentTime = musicEl.currentTime
        this.keyPressedTime = Math.floor(this.currentTime * 10) / 10
        if (count < this.key_info.length) {
            if (this.keyPressedTime == parseFloat(this.key_info[this.next_count].keytime)) {
                this.sound_name = this.key_info[this.next_count].sound_name;
                this.next_count++;
                clog("sync_key_sound,cur_key_sound_name " + sound_name);
                this.key_sound()

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

function clog(text) {
    let currentdate = new Date();
    let datetime = "[" +
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds() + "] ";
    //console.log('[index.js]' + datetime + text);
    console.log(text);

}