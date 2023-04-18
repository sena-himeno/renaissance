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
        luncher.style.display = "none";
        select_Song.style.display = "none";
        img_box.style.display = "block";
        remake_button.style.display = "none";
        auto_key_sound.style.display = "none";
        easy_model.style.display = "none";
        floot_img.src = "/img/chr130.webp";


    }
    run() {
        clog(this.key_info.length)
        this.init();
        audio_player.play();
        this.play_main();
    }
    end() {
        remake_button.style.display = "block";
        successed_count.innerHTML = "successed_key_count : "+ success_count
        failed_count.innerHTML = "failed_key_count : "+ (this.key_info.length - success_count)
        successed_count.style.display = "block";
        failed_count.style.display = "block";
        floot_img.src = "/img/chr090.webp";

    }
    remake(){
        luncher.style.display = "block";
        select_Song.style.display = "block";
        auto_key_sound.style.display = "block";
        easy_model.style.display = "block";
        img_box.style.display = "none";
        successed_count.style.display = "none";
        failed_count.style.display = "none";
    }
    async play_main() {
        let interval = setInterval(() => {
            if (audio_player.paused) {
                this.end()
                clearInterval(interval)
            }
            if (count < this.key_info.length) {
                this.print_key();
            }
            console.log(this.print_content)
            clog(count)
            draw_flag(ctx, 45)

        }, 100)
    }
    print_key() {

        if (Math.floor(this.musicEl.currentTime * 10) / 10 + 4== Math.floor(parseFloat(this.key_info[count].keytime) * 10) / 10) {
            if (this.key_info[count].keyPressed == ';' || this.key_info[count].keyPressed == '<' ||
                this.key_info[count].keyPressed == '>' || this.key_info[count].keyPressed == '?') {
                    if(easy_model_value){
                        new Output_Key(easy_model_mapper(this.key_info[count].keyPressed)).draw(img_print_key)
                    }else{
                        new Output_Key(this.key_info[count].keyPressed).draw(img_print_key)
                    }
            }
            else {
                if(easy_model_value){
                     new Output_Key(easy_model_mapper(this.key_info[count].keyPressed.toUpperCase().charAt(0))).draw(img_print_key)
                }else{

                    new Output_Key(this.key_info[count].keyPressed.toUpperCase().charAt(0)).draw(img_print_key)
                }
            }
            this.print_content += (this.key_info[count].keyPressed)
            count++;
        }
        else {
            this.print_content += '_';
        }
        clog(Math.floor(musicEl.currentTime * 10) / 10)
        clog(Math.floor(parseFloat(this.key_info[count].keytime) * 10) / 10)
        clog(count)
        clog(this.print_content)
        clog(this.key_info.length)
    }


}
