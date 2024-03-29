class KeyBoard{
    static key_map = {
        'A': 10, 'Q':20, 'Z': 30,
        'S': 9, 'W': 19, 'X': 29,
        'D': 8, 'E': 18, 'C': 28,
        'F': 7, 'R': 17, 'V': 27,
        'G': 6, 'T': 16, 'B': 26,
        'H': 5, 'Y': 15, 'N': 25,
        'J': 4, 'U': 14, 'M': 24,
        'K': 3, 'I': 13, '<': 23,
        'L': 2, 'O': 12, '>': 22,
        ';': 1, 'P': 11, '?': 21,
    }
    constructor(sound_controller) {
        this.sound_controller = sound_controller;
        this.init();
    }

    init(){
        this.key_array = [];
        this.valid_key = 0;
        this.key_count = 0;
    }
    static checkKey(key){
        if(key === ';' || key ==='<' || key === '>' || key === '?'){
            return key
        }
        if( this.key_map[key.toUpperCase().charAt(0)] !== undefined ){

            return key.toUpperCase().charAt(0)

        }
        return undefined
    }

    keyEvent(callback) {
        this.key_event = (event) => {
            const key_pressed = event.key;
            const mapped_key = KeyBoard.checkKey(key_pressed);
            this.key_count++;
            if (mapped_key !== undefined) {
                this.valid_key++;
                console.log(`valid key：${key_pressed}`);
                this.key_array.push(mapped_key);
                // console.log(mapped_key);
                // this.sound_controller.audio_play(this.sound_controller.audio_segments[this.sound_controller.current_count]);
                // if (this.rule.easy_module_status){
                //     this.rule.matchKeyEasy()
                // }else{
                //     this.rule.matchKeyNormal()
                // }
                if (callback) {
                    callback(mapped_key);
                }
            } else {
                console.log(`invalid key：${key_pressed}`);
                if (callback) {
                    callback(undefined);
                }
            }
        };
        document.addEventListener('keydown', this.key_event);
    }
    cancelKeyEvent() {
        document.removeEventListener('keydown', this.key_event);
    }

}