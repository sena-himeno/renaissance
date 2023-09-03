class FileController {
    constructor(path) {
        this.path = path;
        this.audioSegments = []
        this.key_song_info = []


    }

    init() {
        this.audioSegments = []
        this.key_song_info = FileController.text_to_json_key_info(this.path)

    }


    // preloadAudio(key_song_path, song_key_sound_postfix) {
    //     const audioPromises = [];
    //     this.key_song_info.forEach(info => {
    //         let sound_name = info.sound_name;
    //         const audioSrc = key_song_path + sound_name + song_key_sound_postfix;
    //         const audioPromise = new Promise((resolve) => {
    //             const audio = new Audio(audioSrc);
    //             audio.addEventListener('loadeddata', () => {
    //                 this.audioSegments.push(audio);
    //                 resolve();
    //             });
    //             audio.load();
    //         });
    //         audioPromises.push(audioPromise);
    //     });
    //     return Promise.all(audioPromises);
    // }


    // preloadAudio(key_song_path, song_key_sound_postfix) {
    //     const promises = this.key_song_info.then(info => {
    //         const sound_name = info.sound_name;
    //         const src = key_song_path + sound_name + song_key_sound_postfix;
    //         return new Promise((resolve) => {
    //             let audio = new Audio(src);
    //             audio.addEventListener('loadeddata', () => {
    //                 resolve(audio);
    //             });
    //             audio.load();
    //         });
    //     });
    //
    //     return Promise.all(promises)
    //         .then(audioSegments => {
    //             this.audioSegments = audioSegments;
    //         });
    // }

    get_current_key_sound(index) {
        if (index >= 0 && index < this.audioSegments.length) {
            return this.audioSegments[index];
        } else {
            console.error('Resource error: Invalid index');
            return null;
        }
    }

    free_file() {
        this.audioSegments.forEach(audio => {
            audio.remove();
        });
        this.audioSegments = [];
    }


    static async text_to_json_key_info(txt_path) {
        console.log(txt_path)
        const result_key_info = []
        const text = await fetch(txt_path).then(response => response.text());
        let prev_key_time = null;
        let key_sound_name = [];
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
    static async text_to_json_lyrics(txt_path,language) {
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


}
