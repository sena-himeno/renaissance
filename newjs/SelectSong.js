class SelectSong{
    constructor(song_info) {
        this.song_info = song_info;
        this.init()
    }

    init(){
        this.current_index = 0;
        this.song_info_length = 0;
        this.txt_path = null;
        this.song_path = null;
        this.key_soung_path = null;
        this.song_key_sound_postfix = null;
        this.song_img_src = null;
    }

    getSongInfoLength(){
        let length = 0;
        for (length in this.song_info){
            length++;
        }
        return length;
    }

    changeSongInfo(){
        console.log("cur_index " + this.current_index + " and length " + this.song_info_length)
        console.log(this.current_index + " " + this.song_info[this.current_index].song_name)
        this.txt_path = this.song_info[this.current_index].song_key_info_path;
        this.song_img_src = this.song_info[this.current_index].song_title_img_path;
        this.song_path = this.song_info[this.current_index].song_path;
        this.key_soung_path = this.song_info[this.current_index].song_key_sound_path;
        this.song_key_sound_postfix = this.song_info[this.current_index].song_key_sound_postfix;
    }
    changeRule() {
        if (this.current_index <= 1) {
            prev_song.style.display = "none";
        } else {
            prev_song.style.display = "block";
        }
        if (this.current_index >= this.song_info_length) {
            next_song.style.display = "none";
        } else {
            next_song.style.display = "block";
        }

    }

    getTextPath(){
        return this.txt_path;
    }
    getSongPath(){
        return this.song_path;
    }
    getKeySoundPath(){
        return this.key_soung_path;
    }
    getSongKeySoundPostfix(){
        return this.song_key_sound_postfix;
    }
    getSongImgSrc(){
        return this.song_img_src;
    }




}