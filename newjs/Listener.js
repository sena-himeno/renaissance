class Listener{
    constructor(key_board,file_controller,sound_controller,view,song,rule) {
        this.keyboard = key_board;
        this.file_controller = file_controller;
        this.sound_controller = sound_controller;
        this.view = view;
        this.song =  song
        this.rule = rule
        this.init()


    }

    init(){
        this.keyboard.init();
        this.print_key_count = 0;
        this.current_time = 0;
        this.current_count = 0;
        this.mark_key_time = 0;
    }

    listenerTimeline(){
        // console.log("-----------------------------")
        this.current_time = String(Math.floor(this.song.currentTime * 10) / 10);
        // console.log(`${ Math.floor(( this.sound_controller.key_sound_info[this.sound_controller.current_count].key_time - 2) * 10 ) / 10  } / ${this.current_time }`)
        // console.log(`${ String(Math.floor(( this.sound_controller.key_sound_info[this.sound_controller.current_count].key_time - 2) * 10 ) / 10)   === this.current_time }`)
        if (!this.song.paused) {

            if (this.sound_controller.current_count <= this.sound_controller.audio_segments.length -1 ) {

                if ( String(Math.floor(( this.sound_controller.key_sound_info[this.print_key_count].key_time - 2) * 10 ) / 10)   === this.current_time) {
                    console.log("-----------------------")
                    // console.log(this.sound_controller.key_sound_info[this.print_key_count].key_pressed)
                    // console.log(KeyBoard.checkKey(this.sound_controller.key_sound_info[this.print_key_count].key_pressed))
                    if (this.mark_key_time !== this.current_time){
                    const printKey = new PrintKey(KeyBoard.checkKey(this.sound_controller.key_sound_info[this.print_key_count].key_pressed));
                    console.log(printKey);
                    this.view.addKeyInCanvas(printKey)
                    this.print_key_count ++;
                    this.mark_key_time = this.current_time

                    }

                }

                //  song current time
                if (this.sound_controller.key_sound_info[this.sound_controller.current_count].key_time === this.current_time) {


                }

            }
        }
    }

    listenerSoundController(){
        this.sound_controller.sync_key_sound(this.sound_controller.current_count, this.song);

    }


    listenerKeyDown(key){
        // console.log(this.sound_controller.audio_segments[this.sound_controller.current_count] )
        this.sound_controller.audio_play(this.sound_controller.audio_segments[this.sound_controller.current_count - 1]);
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
                if (elapsed_time >= 20) {
                    this.listenerSoundController();

                    this.listenerTimeline();

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