class FileController {
    constructor(path) {
        this.path = path;
        this.audioSegments = [];
        this.key_song_info = [];
        this.key_song_info_length = 0;
        this.img_position_y_map = {
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


    }

    static get_img_position(key){
        return img_position_y_map[key]
    }



    async init() {
        this.audioSegments = [];
        this.key_song_info = await FileController.textToJsonKeyInfo(this.path);
        this.key_song_info_length = this.key_song_info.length;
        console.log(this.key_song_info_length);
        console.log(this.key_song_info);
    }

    async preloadAudio(key_song_path, song_key_sound_postfix) {
        console.log(this.key_song_info);
        const audio_sequence = [];
        for (const info of this.key_song_info) {
            console.log(info);
            const audio_array = [];
            for (let index in info.sound_name) {
                const sound_name = info.sound_name[index];
                const audio = new Audio();
                const src = key_song_path + sound_name + song_key_sound_postfix;
                try {
                    await audio.load();
                    audio.src = src;
                    await new Promise((resolve) => {
                        audio.addEventListener('loadeddata', () => {
                            audio_array.push(audio);
                            console.log(`loading resources: ${audio_sequence.length} / ${this.key_song_info_length}`);
                            resolve();
                        });
                        audio.addEventListener('error', (event) => {
                            console.error('audio resource error', event);
                            console.log(`audio loading exception: ${src}`);
                            // audio_array.push(new Audio());
                            resolve();
                        });
                    });
                } catch (error) {
                    console.log('audio load error', error);
                    console.log(`audio loading exception: ${src}`);
                    audio_array.push(new Audio());
                }
            }
            audio_sequence.push(audio_array);
        }
        console.log(audio_sequence);
        console.log("--------------------------------");
        this.audioSegments = audio_sequence;
        return audio_sequence;
    }





    loadSong(key_song_path,song_name,song_key_sound_postfix){
        console.log()
        const song = new Audio();
        song.src = key_song_path + song_name + song_key_sound_postfix
        return song
    }

    getCurrentKeySound(index) {
        if (index >= 0 && index < this.audioSegments.length) {
            return this.audioSegments[index];
        } else {
            console.error('Resource error: Invalid index');
            return null;
        }
    }

    freeFile() {
        console.log("1");
        this.audioSegments.forEach(audio => {
            audio.remove();
        });
        console.log("2");
        this.audioSegments = [];
        return "freeFile success"
    }


    static async textToJsonKeyInfo(txt_path) {
        console.log(txt_path)
        const result_key_info = []
        const text = await fetch(txt_path).then(response => response.text());
        let prev_key_time = null;
        let key_sound_name  = [];
        let count = 0;
        text.split("\n").forEach(line => {
            let [_, key_time, sound_name, keyPressed] = line.split(",");
            key_time = String(Math.floor(parseFloat(key_time) * 10) / 10);
            if (prev_key_time === key_time) {
                console.log(`${prev_key_time} and ${key_time}`)
                console.log(result_key_info)
                result_key_info[count-1].sound_name.push(sound_name);
            } else {
                result_key_info.push({
                    key_time: key_time,
                    sound_name: [sound_name],
                    keyPressed: keyPressed,
                });
                prev_key_time = key_time;
                key_sound_name = [sound_name];
                count++;
            }
            key_sound_name = [];
        });

        return result_key_info;
    }




    // to be continued
    static async textToJsonLyrics(txt_path,language) {
        console.log(txt_path)

        const result_lyrics = []
        const text = await fetch(txt_path).then(response => response.text());
        let prev_key_time = null;
        let key_sound_name = [];
        text.split("\n").forEach(line => {
            let [_, key_time, sound_name, keyPressed] = line.split(",");
            key_time = String(Math.floor(parseFloat(key_time) * 10) / 10);
            if (prev_key_time === key_time) {
                key_sound_name.push(sound_name);
            } else {
                result_lyrics.push({
                    key_time: key_time,
                    sound_name: [sound_name],
                    keyPressed: keyPressed,
                });
                prev_key_time = key_time;
                key_sound_name = [sound_name];
            }
        });

        return result_lyrics;
    }

    static  async textToJsonImgBox(file_path) {


    }

    static audioDisplay(audio) {



    }


}
