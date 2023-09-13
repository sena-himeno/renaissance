const BASELINE_EASY = 10;
const BASELINE_NORMAL = 30;
const MILESTONE_VALUE = 7;
class Score {
    constructor(keyboard) {
        this.keyboard = keyboard;
        this.baseline = BASELINE_NORMAL;
        this.milestone_value = MILESTONE_VALUE;
        this.init();
    }

    init() {
        this.current_milestone_value = 0;
        this.multiplier = 1;
        this.current_combo = 0;
        this.max_combo = 0;
        this.score = 0;
        this.current_time = 0;
    }

    static setDifficulty(difficulty) {
        this.baseline = difficulty === "easy" ? BASELINE_EASY : BASELINE_NORMAL;
    }

    ruleValid() {
        console.log("Valid Key")
        this.current_milestone_value++;
        if (this.current_milestone_value >= this.milestone_value) {
            this.current_milestone_value = 0;
            this.multiplier++;
        }
        if (this.current_combo >= this.max_combo) {
            this.max_combo = this.current_combo;
        }
    }

        ruleInvalid() {
        console.log("Invalid Key");
        this.current_milestone_value > 0 ? this.current_milestone_value-- : 0;
        if (this.current_combo >= this.max_combo) {
            this.max_combo = this.current_combo;
        }
        this.current_combo = 0;
    }

    calculateScoreByKey() {
        const score = this.baseline * this.milestone_value + (this.current_combo / 10) * this.baseline;
        this.score += score;
        console.log(`current score : ${this.score}`);
    }

    calculateScore(song, key_song_info, current_count, key) {
        this.current_time = String(Math.floor(song.current_time * 10) / 10);
        // if (this.current_time === key_song_info[current_count].key_time && key === key_song_info[current_count].key_pressed) {
        if (1) {
            this.ruleValid();
            this.calculateScoreByKey();
        } else {
            this.ruleInvalid();
        }
    }

    calculateScoreByArray(keyArray, keyPressTimeArray, keyInfo) {

    }
}