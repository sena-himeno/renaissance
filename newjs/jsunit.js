//----------------------------------------------------
// javascript util testing (迫真
//----------------------------------------------------

// ----------- file controller test ------------
// async function main() {
//     const fc = new FileController("./AS06/song.txt");
//     await fc.init()
//     console.log("---------")
//     console.log(fc.key_song_info);
//
//     const key_song_path = './AS06/Key/';
//     const song_key_sound_postfix = '.ogg';
//
//     await fc.preloadAudio(key_song_path, song_key_sound_postfix);
//
//
//     let count = 0;
//     setInterval(() => {
//         console.log(count);
//         const au = fc.audioSegments[count];
//         au[0].play();
//         if(au.length === 2) {
//
//             au[1].play();
//         }
//         count++;
//     }, 500)
//
// }
//
// // main();


// ---------------------- sound controller test
// async function main() {
//     const fc = new FileController("./AS06/song.txt");
//     await fc.init();
//     const key_song_path = './AS06/Key/';
//     const song_key_sound_postfix = '.ogg';
//     await fc.preloadAudio(key_song_path, song_key_sound_postfix);
//     const sc = new SoundController(fc.key_song_info, fc.audio_segments);
//     sc.init();
//     let song = await fc.loadSong("./AS06/", "SONG", ".ogg");
//     console.log(song)
//     await song.play();
//     let lastTimestamp = performance.now();
//     function loop(timestamp) {
//         const elapsedTime = timestamp - lastTimestamp;
//         if (elapsedTime >= 25) {
//             sc.sync_key_sound(sc.current_count, song);
//             lastTimestamp = timestamp;
//         }
//         requestAnimationFrame(loop);
//     }
//     requestAnimationFrame(loop);
//
// }
//
//


// ----------------------- test Rule and Keyboards --------------------

// console.log(Rule.easy_module("Q"))
// console.log(Rule.easy_module("Z"))
// console.log(Rule.easy_module("A"))
// console.log(Rule.easy_module("^"))
async function main() {

    const fc = new FileController("./AS06/song.txt")
    const key_song_path = './AS06/Key/';
    const song_key_sound_postfix = '.ogg';

    await fc.init()
    await fc.preloadAudio(key_song_path, song_key_sound_postfix);

    const sc = new SoundController(fc.key_song_info, fc.audio_segments);
    sc.init();

    const kb = new KeyBoard(sc)
    kb.init()

    const song = await new Song("./AS06/SONG.ogg");
    await song.init()
    song.play();



    const listener = new Listener(kb,fc,sc,null,song.song)
    console.log(listener.sound_controller)
    await listener.main()

    kb.keyEvent();

}



// -----------------------


