class Key {
    constructor(key) {
        this.key = key;

    }

}

class SoundController {
    constructor(key_sound_info, audio_segments) {
        this.key_sound_info = key_sound_info;
        this.audio_segments = audio_segments;
        this.current_sound = null;
        this.current_count = 0;
        this.current_time = 0;

    }

    init() {
        this.current_count = 0;
        this.current_sound = this.key_sound_info[this.current_count].sound_name
        this.current_time = 0;
    }

    end() {

    }

    sync_key_sound(current_count, song) {
        this.current_time = String(Math.floor(song.currentTime * 10) / 10);
        console.log(this.current_sound)
        console.log(`${this.current_count} :  ${this.current_time}  / ${this.key_sound_info[this.current_count]?.key_pressed} sound name is ${this.current_sound} `)
        if (!song.paused) {

            if (this.current_count < this.audio_segments.length) {
                console.log(`${this.current_time} / ${this.key_sound_info[current_count].key_time}`)
                if (this.key_sound_info[current_count].key_time === this.current_time) {
                    this.current_sound = this.key_sound_info[current_count].sound_name;
                    console.log("syncing")
                    console.log(this.current_sound)
                    if (1) { // --------------------------
                        this.audio_play(this.audio_segments[this.current_count]);

                    }
                    this.current_count++;
                }

            }
        }

    }

    audio_play(current_sound) {
        console.log(current_sound[0])

        const audio1 = new Audio();
        audio1.src = current_sound[0].src;
        if (current_sound === 2){
            const audio2 = new Audio();
            audio2.src = current_sound[1].src;
            audio2.play()
        }
        audio1.play()



    }


}

