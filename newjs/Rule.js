class Rule {
    static key_map_easy_module = {
        'A': 10, 'Q': 10, 'Z': 10,
        'S': 9, 'W': 9, 'X': 9,
        'D': 8, 'E': 8, 'C': 8,
        'F': 7, 'R': 7, 'V': 7,
        'G': 6, 'T': 6, 'B': 6,
        'H': 5, 'Y': 5, 'N': 5,
        'J': 4, 'U': 4, 'M': 4,
        'K': 3, 'I': 3, '<': 3,
        'L': 2, 'O': 2, '>': 2,
        ';': 1, 'P': 1, '?': 1,
    }
    static reverse_module = {
    10: 'A', 9: 'S', 8: 'D', 7: 'F', 6: 'G',
    5: 'H', 4: 'J', 3: 'K', 2: 'L', 1: ';',
}

    constructor(keyboard,score,view) {
        this.keyboard = keyboard;
        this.score = score;
        this.view = view;
    }
    init(){
        this.easy_module_status = 0;
     }

    static easyModule(key) {
        if(this.key_map_easy_module[key] === undefined){
            return "baka"; // -------------------
        }
        return this.reverse_module[this.key_map_easy_module[key]];
    }

    matchKeyNormal(song, key_song_info, current_count, key){
        console.log(`current press key: ${key} , you should press ${key_song_info[current_count].key_pressed}`);
        this.current_time = String(Math.floor(song.current_time * 10) / 10);
        if (this.current_time === key_song_info[current_count].key_time) {
            this.score.ruleValid();
            this.score.calculateScoreByKey();
        } else {
            this.score.ruleInvalid();
        }
    }
    matchKeyEasy(song, key_song_info, current_count, key){
        console.log(`current press key: ${key} , you should press ${key_song_info[current_count].key_pressed}`);
        this.current_time = String(Math.floor(song.current_time * 10) / 10);
        if (this.current_time === key_song_info[current_count].key_time
            && Rule.easyModule(key) === key_song_info[current_count].key_pressed
        ) {
            this.score.ruleValid();
            this.score.calculateScoreByKey();
        } else {
            this.score.ruleInvalid();
        }
    }





}