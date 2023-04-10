const outputSoundEl = document.getElementById("key_output");
const luncher = document.getElementById("game_start");
const key_print = document.getElementById("key_print");
const song_img = document.getElementById("song_img");
const prev_song = document.getElementById("prev_song");
const next_song = document.getElementById("next_song");


var success_count;
var next_count;

var txt_path;

var sound_name;
var count = 0;
var print_content;
var audio_player = new Audio();
var musicEl = audio_player;

// const txt_path = "./SR01/key.txt";
// audio_player.src = "/page/SR/SR01/song.ogg"


const song_info = {
    1:{
        "song_title_img_path":"/page/SR/SR01/img/songtitle.jpg",
        "song_number":"SR01",
        "song_name":" unknown ",
        "song_key_info_path":"/page/SR/SR01/key.txt",
        "song_key_sound_path":"/page/SR/SR01/Key",
        "song_path":"/page/SR/SR01/song.ogg",
        "song_img_path": "/page/SR/SR01/img"
    },
    2:{
        "song_title_img_path":"/page/SR/SR01/img/songtitle.jpg",
        "song_number":"SR01",
        "song_name":" unknown 2 ",
        "song_key_info_path":"/page/SR/SR01/key.txt",
        "song_key_sound_path":"/page/SR/SR01/Key",
        "song_path":"",
        "song_img_path": "/page/SR/SR01/img"
    },
    3:{
        "song_title_img_path":"/page/SR/SR01/img/songtitle.jpg",
        "song_number":"SR01",
        "song_name":" unknown 3 ",
        "song_key_info_path":"/page/SR/SR01/key.txt",
        "song_key_sound_path":"/page/SR/SR01/Key",
        "song_path":"/page/SR/SR01/song.ogg",
        "song_img_path": "/page/SR/SR01/img"
    },
    4:{
        "song_title_img_path":"/page/SR/SR01/img/songtitle.jpg",
        "song_number":"SR01",
        "song_name":" unknown 3 ",
        "song_key_info_path":"/page/SR/SR01/key.txt",
        "song_key_sound_path":"/page/SR/SR01/Key",
        "song_path":"/page/SR/SR01/song.ogg",
        "song_img_path": "/page/SR/SR01/img"
    }
}


class Play {
    constructor(key_info, musicEl, audio_player) {
        this.key_info = key_info;
        this.musicEl = musicEl;
        this.audio_player = audio_player;
        this.print_content = "";

    }
    init() {
        this.audio_player.load()
        success_count = 0;
        count = 0;
        this.print_content = "";
        sound_name = this.key_info[0].sound_name;


    }
    run() {
        this.init();
        audio_player.play();
        this.play_main();
        luncher.style.display = "none";
        select_Song.style.display="none";
        img_box.style.display="block";
    }
    end() {
        luncher.style.display = "block";
        select_Song.style.display="block";
        img_box.style.display="none";

    }
    async play_main() {
        let interval = setInterval(() => {
            if (musicEl.paused) {
                this.end()
                clearInterval(interval)
            }
            // print key
            if(count < this.key_info.length){
                this.print_key();
            }
            console.log(this.print_content)
            clog(count)
        }, 100)
    }
    print_key() {
        if (Math.floor(this.musicEl.currentTime * 10) / 10 + 4 == Math.floor(parseFloat(this.key_info[count].keytime) * 10) / 10) {
            console.log(this.key_info[count].keyPressed + " " + this.key_info[count].keyPressed == ';')
            if(this.key_info[count].keyPressed == ';' || this.key_info[count].keyPressed == '<' || 
            this.key_info[count].keyPressed == '>' || this.key_info[count].keyPressed == '?'){
                new Output_Key(this.key_info[count].keyPressed).draw(img_print_key)
            }
            else{
            new Output_Key(this.key_info[count].keyPressed.toUpperCase().charAt(0)).draw(img_print_key)
            }
            this.print_content += (this.key_info[count].keyPressed)
            count++;
        }
        else {
            this.print_content += '_';
        }
    }


}

class Key_Sound {
    constructor(key_info, outputSoundEl, audio_player, musicEl) {
        this.key_info = key_info;
        this.outputSoundEl = outputSoundEl;
        this.audio_player = audio_player;
        this.musicEl = musicEl;
        this.sound_name;
        this.next_count;
        this.keyPressedTime;
        this.keyPressed;
        this.currentTime;

    }
    init() {
        this.sound_name = this.key_info[0].sound_name;
        this.next_count = 0;

    }
    run() {
        let interval = setInterval(() => {

            if (musicEl.paused) {
                clearInterval(interval)
            }
            document.onkeyup = (event) => {
                this.keyPressed = event.key;
                this.key_sound()
            }
            this.sync_key_sound()
        }, 100)
    }
    key_sound() {
        outputSoundEl.load()
        outputSoundEl.setAttribute("src", "./SR01/Key/"+this.sound_name+".ogg")
        outputSoundEl.play();
    }
    sync_key_sound() {
        this.currentTime = musicEl.currentTime
        this.keyPressedTime = Math.floor(this.currentTime * 10) / 10
        if(count < this.key_info.length){
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

class Select_Soung{
    constructor(song_info){
        this.song_info = song_info;
        this.cur_indext
        this.song_info_length
        this.txt_path
        this.song_path
    }
    init(){
        this.cur_index = 1;
        this.song_info_length = this.get_song_info_length()
        prev_song.style.display="none";
        this.txt_path = this.song_info[this.cur_index].song_key_info_path;
        this.song_path = this.song_info[this.cur_index].song_path;
    }
    get_song_info_length(){
        var length = 0;
        for(var i in this.song_info){
            length++
        }
        return length;
    }
    change_song_info(){
        // clog(txt_path)
        clog( "cur_index " + this.cur_index + " and length " + this.song_info_length)
        console.log(this.cur_index + " " + this.song_info[this.cur_index].song_name)
        this.txt_path  = this.song_info[this.cur_index].song_key_info_path;
        song_img.src = this.song_info[this.cur_index].song_title_img_path;
        this.song_path = this.song_info[this.cur_index].song_path;
    }
    rule(){
        if(this.cur_index <= 1){
            prev_song.style.display="none";
        }else{
            prev_song.style.display="block";
        }
        if(this.cur_index >= this.song_info_length){
            
            next_song.style.display="none";
        }else{
            next_song.style.display="block";
        }
    }
    async run(){
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
    get_txt_path(){
        clog(this.txt_path)
        return this.txt_path;
    }
    get_song_path(){
        clog(this.song_path)
        return this.song_path;
    }

    
}

async function main() {
    
    var song = new Select_Soung(song_info);
    song.init();
    song.run();

    luncher.onclick = async() => {
        txt_path = song.get_txt_path();
        audio_player.src = song.get_song_path();
        let key_info = await txt_to_json(txt_path)
        var player = new Play(key_info, musicEl, audio_player);
        player.run();
        var key_sound_controler = new Key_Sound(key_info, outputSoundEl, audio_player, musicEl)
        key_sound_controler.init();
        key_sound_controler.run();
        
    }   
    window.addEventListener("load",function(){
        draw_line(ctx, 30, 10);
    })
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

main();



