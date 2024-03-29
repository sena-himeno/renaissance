class Play {
    constructor(key_info, musicEl, audio_player) {
        this.key_info = key_info;
        this.musicEl = musicEl;
        this.audio_player = audio_player;
        this.print_content = "";

    }
    toggleElementsVisibility(show) {
        const elementsToToggle = [
            'launcher', 'select_Song', 'auto_key_sound', 'easy_model', 'img_box'
        ];
        for (const elementId of elementsToToggle) {
            const element = document.getElementById(elementId);
            if (element) {
                element.style.display = show ? 'block' : 'none';
            }
        }

        const remakeButton = document.getElementById('remake_button');
        if (remakeButton) {
            remakeButton.style.display = show ? 'block' : 'none';
        }

        const countElements = ['successed_count', 'failed_count'];
        for (const countElementId of countElements) {
            const countElement = document.getElementById(countElementId);
            if (countElement) {
                countElement.style.display = show ? 'block' : 'none';
            }
        }
    }

    init() {
        this.audio_player.load()
        success_count = 0;
        count = 0;
        this.print_content = "";
        sound_name = this.key_info[0].sound_name;

        luncher.classList.add('launcher-hidden');
        select_Song.classList.add('select-song-hidden');
        img_box.classList.add('img-box-visible');
        remake_button.classList.add('remake-button-hidden');
        auto_key_sound.classList.add('auto-key-sound-hidden');
        easy_model.classList.add('easy-model-hidden');
        floot_img.classList.add('img-chr130');


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
