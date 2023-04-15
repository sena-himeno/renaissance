
class Select_Soung {
    constructor(song_info) {
        this.song_info = song_info;
        this.cur_indext
        this.song_info_length
        this.txt_path
        this.song_path
        this.key_soung_path
        this.song_key_sound_postfix
    }
    init() {
        this.cur_index = 1;
        this.song_info_length = this.get_song_info_length()
        prev_song.style.display = "none";
        this.txt_path = this.song_info[this.cur_index].song_key_info_path;
        this.song_path = this.song_info[this.cur_index].song_path;
        this.key_soung_path = this.song_info[this.cur_index].song_key_sound_path;
    }
    get_song_info_length() {
        var length = 0;
        for (var i in this.song_info) {
            length++
        }
        return length;
    }
    change_song_info() {
        // clog(txt_path)
        clog("cur_index " + this.cur_index + " and length " + this.song_info_length)
        console.log(this.cur_index + " " + this.song_info[this.cur_index].song_name)
        this.txt_path = this.song_info[this.cur_index].song_key_info_path;
        song_img.src = this.song_info[this.cur_index].song_title_img_path;
        this.song_path = this.song_info[this.cur_index].song_path;
        this.key_soung_path = this.song_info[this.cur_index].song_key_sound_path;
        this.song_key_sound_postfix = this.song_info[this.cur_index].song_key_sound_postfix;;
        song_key_sound_postfix = this.song_info[this.cur_index].song_key_sound_postfix;;
    }
    rule() {
        if (this.cur_index <= 1) {
            prev_song.style.display = "none";
        } else {
            prev_song.style.display = "block";
        }
        if (this.cur_index >= this.song_info_length) {

            next_song.style.display = "none";
        } else {
            next_song.style.display = "block";
        }
    }
    async run() {
        prev_song.onclick = () => {
            this.cur_index--;
            this.rule();
            this.change_song_info();
        }
        next_song.onclick = () => {
            this.cur_index++;
            this.rule();
            this.change_song_info();

        }
        this.change_song_info();
    }
    get_txt_path() {
        clog(this.txt_path)
        return this.txt_path;
    }
    get_song_path() {
        clog(this.song_path)
        return this.song_path;
    }
    get_key_soung_path() {
        clog(this.key_soung_path)
        return this.key_soung_path;
    }
    get_song_key_sound_postfix(){
        clog(this.song_key_sound_postfix)
        return this.song_key_sound_postfix;
    }


}


