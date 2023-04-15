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
        select_Song.style.display = "none";
        img_box.style.display = "block";
        remake_button.style.display = "none";
    }
    end() {
        remake_button.style.display = "block";
    }
    remake(){
        luncher.style.display = "block";
        select_Song.style.display = "block";
        img_box.style.display = "none";
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
            draw_flag(ctx, 30)

        }, 100)
    }
    print_key() {

        if (Math.floor(this.musicEl.currentTime * 10) / 10 + 4== Math.floor(parseFloat(this.key_info[count].keytime) * 10) / 10) {
            if (this.key_info[count].keyPressed == ';' || this.key_info[count].keyPressed == '<' ||
                this.key_info[count].keyPressed == '>' || this.key_info[count].keyPressed == '?') {
                new Output_Key(this.key_info[count].keyPressed).draw(img_print_key)
            }
            else {
                new Output_Key(this.key_info[count].keyPressed.toUpperCase().charAt(0)).draw(img_print_key)
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
