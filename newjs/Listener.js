class Listener{
    constructor(key_board,file_controller,sound_controller,view,song,rule) {
        this.keyboard = key_board;
        this.file_controller = file_controller;
        this.sound_controller = sound_controller;
        this.view = view;
        this.song =  song
        this.rule = rule
        this.frames = 1000/60;

    }

    init(){
        this.keyboard.init();
    }

    listenerTimeline(){

    }

    listenerSoundController(){
        this.sound_controller.sync_key_sound(this.sound_controller.current_count, this.song);

    }


    listenerKeyDown(key){
        this.sound_controller.audio_play(this.sound_controller.audio_segments[this.sound_controller.current_count]);
        console.log(`------------ ${key} -------------`)
        // if (this.rule.easy_module_status){
        //     this.rule.matchKeyEasy()
        // }else {
        //     this.rule.matchKeyNormal()
        // }
    }

    async main() {
        let last_timestamp = performance.now();
        const loop = (timestamp) => {
            if (!this.song.paused) {
                const elapsed_time = timestamp - last_timestamp;
                if (elapsed_time >= 10) {
                    this.listenerSoundController();


                    last_timestamp = timestamp;
                }
                requestAnimationFrame(loop);
            } else {
                cancelAnimationFrame(loop)
                this.keyboard.cancelKeyEvent();
            }
        }

        requestAnimationFrame(loop);
    }




}