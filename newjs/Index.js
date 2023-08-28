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