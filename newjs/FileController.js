class FileController {
    constructor(path) {
        this.path = path;
        this.audioSegments = [];
        this.key_song_info = [];
        this.key_song_info_length = 0;

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
        const audioSegments = [];
        for (const info of this.key_song_info) {
            console.log(`loading resources： ${audioSegments.length}  /  ${this.key_song_info_length} `)
            const sound_name = info.sound_name;
            let audio = new Audio();
            await new Promise(async (resolve) => {
                const src = key_song_path + sound_name + song_key_sound_postfix;
                audio.src = src;
                audio.addEventListener('loadeddata', () => {
                    audioSegments.push(audio);
                    resolve();
                });
                audio.addEventListener('error', (event) => {
                    console.error('audio resource error', event);
                    audioSegments.push(new Audio());
                    resolve();
                });

                try {
                    await audio.load();
                } catch (error) {
                    console.log('audio load error', error);
                    console.log(`audio loading exception：${src}`);
                    resolve();
                }
            });
        }
        console.log(audioSegments);
        this.audioSegments = audioSegments;
        return audioSegments;
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
        let key_sound_name ;
        text.split("\n").forEach(line => {
            let [_, key_time, sound_name, keyPressed] = line.split(",");
            key_time = String(Math.floor(parseFloat(key_time) * 10) / 10);
            if (prev_key_time === key_time) {
                key_sound_name.push(sound_name);
            } else {
                result_key_info.push({
                    key_time: key_time,
                    sound_name: [sound_name],
                    keyPressed: keyPressed,
                });
                prev_key_time = key_time;
                key_sound_name = [sound_name];
            }
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


}
