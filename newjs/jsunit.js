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
// async function main() {
//
//     const fc = new FileController("../page/SR/SR01/song.txt")
//     const key_song_path = '../page/SR/SR01/Key/';
//     const song_key_sound_postfix = '.ogg';
//
//     await fc.init()
//     await fc.preloadAudio(key_song_path, song_key_sound_postfix);
//
//     const sc = new SoundController(fc.key_song_info, fc.audio_segments);
//     sc.init();
//
//     const kb = new KeyBoard(sc)
//     kb.init()
//
//     const song = await new Song("../page/SR/SR01/song.ogg");
//     await song.init()
//     song.play();
//
//     const score = new Score(kb);
//
//
//
//     const listener = new Listener(kb,fc,sc,null,song.song)
//     console.log(listener.sound_controller)
//     await listener.main()
//
//     kb.keyEvent((key) =>{
//         listener.listenerKeyDown(key);
//         score.calculateScore(song,fc.key_song_info,sc.current_count,key)
//
//     } );
//
//
// }
//
//
//
// // ---------------------- test key
// window.addEventListener("load", function () {
//
//     const key1 =  new PrintKey('A',null,null)
//     key1.init()
//     console.log(key1)
//     const key2 =  new PrintKey('B',null,null)
//     key2.init()
//     console.log(key2)
//     const key3 =  new PrintKey('W',null,null)
//     key3.init()
//     console.log(key3)
//
// })

// ---------------- test view





// async function main(){
//
//     const img_key = new Image();
//     img_key.src = "/img/SongAlphabet.png"
//
//     const canvas_main = document.getElementById("main_canvas");
//     canvas_main.width = 1200;
//     canvas_main.height = 600;
//     const ctx = canvas_main.getContext('2d');
//
//     const view = new View(canvas_main,ctx,img_key);
//     view.init();
//
//     await view.refresh()
//
//
//     // console.log(key)
//     // key.draw(img_key);
//     setInterval(() => {
//     let key = new PrintKey('D',canvas_main,null);
//         view.addKeyInCanvas(key);
//         console.log(view.current_vaild_key_count)
//
//     },500)
//
// }
//

// test print key
async function main(){
    const img_key = new Image();
    img_key.src = "/img/SongAlphabet.png"

    const canvas_main = document.getElementById("main_canvas");
    canvas_main.width = 800;
    canvas_main.height = 600;
    const ctx = canvas_main.getContext('2d');

    const view = new View(canvas_main,ctx,img_key);
    view.init();

    await view.refresh()

    const fc = new FileController("../page/SR/SR01/song.txt")
    const key_song_path = '../page/SR/SR01/Key/';
    const song_key_sound_postfix = '.ogg';

    await fc.init()
    await fc.preloadAudio(key_song_path, song_key_sound_postfix);

    const sc = new SoundController(fc.key_song_info, fc.audio_segments);
    sc.init();

    const kb = new KeyBoard(sc)
    kb.init()

    const song = await new Song("../page/SR/SR01/song.ogg");
    await song.init()
    song.play();

    const score = new Score(kb);



    const listener = new Listener(kb,fc,sc,view,song.song)
    console.log(listener.sound_controller)

    await listener.main()

    kb.keyEvent((key) =>{
        listener.listenerKeyDown(key);
        score.calculateScore(song,fc.key_song_info,sc.current_count,key)

    } );

}
