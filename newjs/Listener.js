class Listener{
    constructor(key_board,file_controller,sound_controller,view,song) {
        this.keyboard = key_board;
        this.file_controller = file_controller;
        this.sound_controller = sound_controller;
        this.view = view;
        this.song =  song

    }

    init(){

    }

    async main() {

        let last_timestamp = performance.now();
        const loop  = (timestamp) => {
            const elapsed_time = timestamp - last_timestamp;
            if (elapsed_time >= 25) {
                this.sound_controller.sync_key_sound(this.sound_controller.current_count, this.song);
                last_timestamp = timestamp;
            }
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);

    }





}