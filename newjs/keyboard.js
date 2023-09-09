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
        this.key_array = [];
        this.sound_controller = sound_controller;

    }

    init(){
        this.key_array = [];
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

    keyEvent() {
        document.addEventListener('keydown', (event)  => {
            const key_pressed = event.key;
            const mappedKey = KeyBoard.checkKey(key_pressed);

            if (mappedKey !== undefined) {
                console.log(`valid key：${key_pressed}`);
                console.log(this);
                this.sound_controller.audio_play(this.sound_controller.audio_segments[this.sound_controller.current_count]);
                this.key_array.push(mappedKey);
            } else {
                console.log(`invalid key：${key_pressed}`);
            }
        });
    }



}