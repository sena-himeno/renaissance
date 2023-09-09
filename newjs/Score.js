class Score{
    constructor(keyboard) {
        this.keyboard = keyboard;
        this.baseline = 10;
        this.milestone_value = 7;
        this.current_milestone_value = 7;
        this.multiplier = 1;
        this.current_combo = 0;
        this.max_combo = 0;
        this.score = 0;
        this.current_time = 0;


    }

    init() {
        this.multiplier = 1;
        this.current_combo = 0;
        this.max_combo = 0;
        this.score = 0;
    }

    rule(){

    }
    calculateScore(song,key_song_info,current_count,key) {
        this.current_time = String(Math.floor(song.currentTime * 10) / 10);
        if(this.current_time === key_song_info[current_count].key_time){

        }else{
            (this.milestone_value > 0) ? this.milestone_value-- : 0 ;
        }
    }

    calculateScoreByArray(key_array , key_press_time_array , key_info) {


    }


    
}