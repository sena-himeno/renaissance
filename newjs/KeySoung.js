class Key_Sound{
    constructor(key) {
        this.key = key;

    }


}

class Sound_Controller {
    constructor(keyboard,key_sound_info,audioSegments) {
        this.keyboard = keyboard;
        this.key_sound_info = key_sound_info;
        this.current_sound = null;
        this.audioSegments = audioSegments;
        this.current_count = 0;
        this.currentTime = 0;

    }

    init(){

    }

    sync_key_sound(current_count) {
        this.current_time = String( Math.floor(musicEl.currentTime * 10) / 10);
        if(current_count < this.audioSegments.length){
            if(this.key_sound_info[current_count].key_time === this.current_time){
                this.current_sound = this.key_sound_info[current_count+1].sound_name;
                if(auto_key_sound_value){
                    this.audio_play(this.current_sound);
                }
                current_count++;

            }

        }

    }
    audio_play(current_count){
        this.audioSegments[current_count][0].play();
        if(this.audioSegments[current_count] === 2) {
            this.audioSegments[current_count][1].play();
       }
    }


}

