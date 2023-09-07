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

