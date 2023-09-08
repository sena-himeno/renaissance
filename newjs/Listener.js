class Listener{
    constructor(key_board,file_controller,sound_controller,view) {
        this.keyboard = key_board;
        this.file_controller = file_controller;
        this.sound_controller = sound_controller;
        this.view = view;

    }

    async  main() {
        const fc = new FileController("./AS06/song.txt");
        await fc.init();
        const key_song_path = './AS06/Key/';
        const song_key_sound_postfix = '.ogg';
        await fc.preloadAudio(key_song_path, song_key_sound_postfix);
        const sc = new SoundController(fc.key_song_info, fc.audio_segments);
        sc.init();
        let song = await fc.loadSong("./AS06/", "SONG", ".ogg");
        console.log(song)
        await song.play();
        let lastTimestamp = performance.now();
        function loop(timestamp) {
            const elapsedTime = timestamp - lastTimestamp;
            if (elapsedTime >= 25) {
                sc.sync_key_sound(sc.current_count, song);
                lastTimestamp = timestamp;
            }
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);

    }





}