
const song_info = {
    1: {
        "song_title_img_path": "/page/SR/SR01/img/songtitle.jpg",
        "song_number": "SR01",
        "song_name": " unknown ",
        "song_key_info_path": "/page/SR/SR01/key.txt",
        "song_key_sound_path": "./SR01/Key/",
        "song_path": "/page/SR/SR01/song.ogg",
        "song_img_path": "/page/SR/SR01/img"
    },
    2: {
        "song_title_img_path": "/page/SR/SR02/img/songtitle_zh.jpg",
        "song_number": "SR02",
        "song_name": " unknown 2 ",
        "song_key_info_path": "/page/SR/SR02/key.txt",
        "song_key_sound_path": "./SR02/Key/",
        "song_path": "/page/SR/SR02/song.ogg",
        "song_img_path": "/page/SR/SR02/img"
    },
    3: {
        "song_title_img_path": "/page/SR/SR03/img/songtitle_zh.jpg",
        "song_number": "SR03",
        "song_name": " unknown 3 ",
        "song_key_info_path": "/page/SR/SR03/key.txt",
        "song_key_sound_path": "./SR03/Key/",
        "song_path": "/page/SR/SR03/song.ogg",
        "song_img_path": "/page/SR/SR03/img"
    },
    4: {
        "song_title_img_path": "/page/SR/SR04/img/songtitle_zh.jpg",
        "song_number": "SR04",
        "song_name": " unknown 4 ",
        "song_key_info_path": "/page/SR/SR04/key.txt",
        "song_key_sound_path": "./SR04/Key/",
        "song_path": "/page/SR/SR04/song.ogg",
        "song_img_path": "/page/SR/SR04/img"
    },
    5: {
        "song_title_img_path": "/page/SR/SR05/img/songtitle_zh.jpg",
        "song_number": "SR05",
        "song_name": " unknown 5 ",
        "song_key_info_path": "/page/SR/SR05/key.txt",
        "song_key_sound_path": "./SR05/Key/",
        "song_path": "/page/SR/SR05/song.ogg",
        "song_img_path": "/page/SR/SR05/img"
    },
    6: {
        "song_title_img_path": "/page/SR/SR06/img/songtitle_zh.jpg",
        "song_number": "SR06",
        "song_name": " unknown 6 ",
        "song_key_info_path": "/page/SR/SR06/key.txt",
        "song_key_sound_path": "./SR06/key/",
        "song_path": "/page/SR/SR06/song.ogg",
        "song_img_path": "/page/SR/SR06/img"
    },
    7: {
        "song_title_img_path": "/page/SR/SR07/img/songtitle_zh.jpg",
        "song_number": "SR07",
        "song_name": " unknown 7 ",
        "song_key_info_path": "/page/SR/SR07/key.txt",
        "song_key_sound_path": "./SR07/key/",
        "song_path": "/page/SR/SR07/song.ogg",
        "song_img_path": "/page/SR/SR07/img"
    },
    8: {
        "song_title_img_path": "/page/SR/SR08/img/songtitle_zh.jpg",
        "song_number": "SR08",
        "song_name": " unknown 8 ",
        "song_key_info_path": "/page/SR/SR08/key.txt",
        "song_key_sound_path": "./SR08/key/",
        "song_path": "/page/SR/SR08/song.ogg",
        "song_img_path": "/page/SR/SR08/img"
    },
    9: {
        "song_title_img_path": "/page/SR/SR09/img/songtitle_zh.jpg",
        "song_number": "SR09",
        "song_name": " unknown 9 ",
        "song_key_info_path": "/page/SR/SR09/key.txt",
        "song_key_sound_path": "./SR09/key/",
        "song_path": "/page/SR/SR09/song.ogg",
        "song_img_path": "/page/SR/SR09/img"
    },
    10: {
        "song_title_img_path": "/page/SR/SR10/img/songtitle_zh.jpg",
        "song_number": "SR10",
        "song_name": " unknown 10 ",
        "song_key_info_path": "/page/SR/SR10/key.txt",
        "song_key_sound_path": "./SR10/key/",
        "song_path": "/page/SR/SR10/song.ogg",
        "song_img_path": "/page/SR/SR10/img"
    }
}

class Select_Soung {
    constructor(song_info) {
        this.song_info = song_info;
        this.cur_indext
        this.song_info_length
        this.txt_path
        this.song_path
        this.key_soung_path
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


}


