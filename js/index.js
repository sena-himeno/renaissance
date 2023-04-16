const outputSoundEl = document.getElementById("key_output1");
const outputSoundE2 = document.getElementById("key_output2");
const luncher = document.getElementById("game_start");
const key_print = document.getElementById("key_print");
const song_img = document.getElementById("song_img");
const prev_song = document.getElementById("prev_song");
const next_song = document.getElementById("next_song");
const remake_button = document.getElementById("remake_button");
const easy_model = document.getElementById("easy_model");
const auto_key_sound = document.getElementById("auto_key_sound");
const successed_count = document.getElementById("successed_count");
const failed_count = document.getElementById("failed_count");

var song_info;
var song_key_sound_postfix;
var next_count;
var txt_path;
var key_info;

var keyPressed = "";
var sound_name;
var count = 0;
var print_content;

var success_count;
var easy_model_value;
var auto_key_sound_value;

var audio_player = new Audio();
var musicEl = audio_player;

async function main() {

    window.addEventListener("load", function () {
        draw_line(ctx, 30, 10);
        // draw_flag(ctx, 100)
        // draw_flag(ctx, 50)
        console.log(song_info);
        var song = new Select_Soung(song_info);

        song.init();
        song.run();
        luncher.onclick = async () => {

            let key_soung_path = song.get_key_soung_path();
            txt_path = song.get_txt_path();
            audio_player.src = song.get_song_path();
            // key_info = await txt_to_json(txt_path)
            key_info = await txt_to_json_pro(txt_path)

            
            var player = new Play(key_info, musicEl, audio_player);
            player.run();

            var print_result = new Print_Result(key_info,musicEl);
            print_result.init();
            print_result.run();
            
            clog(key_info)
            var key_sound_controler = new Key_Sound(key_info, outputSoundEl, outputSoundE2,audio_player, musicEl, key_soung_path)
            key_sound_controler.init();
            key_sound_controler.run();
        }

    })
}



main();

window.onload=function(){
    remake_button.onclick = () => {
        luncher.style.display = "block";
        select_Song.style.display = "block";
        auto_key_sound.style.display = "block";
        easy_model.style.display = "block";
        img_box.style.display = "none";
        successed_count.style.display = "none";
        failed_count.style.display = "none";
    }
    clog(1)
    easy_model_value = 0;
    easy_model.innerHTML ='简单模式:关闭'
    easy_model.onclick = () => {
        if(easy_model_value == 0){
            easy_model_value = 1;
            easy_model.innerHTML='简单模式:打开'
        }
        else{
            easy_model_value = 0;
            easy_model.innerHTML='简单模式:关闭'
        }
        clog(easy_model_value)
    }

    auto_key_sound_value = 1;
    auto_key_sound.innerHTML ='自动触发:打开'
    auto_key_sound.onclick = () => {
        if(auto_key_sound_value == 0){
            auto_key_sound_value = 1;
            auto_key_sound.innerHTML='自动触发:打开'
        }
        else{
            auto_key_sound_value = 0;
            auto_key_sound.innerHTML='自动触发:关闭'
        }

    }

}

