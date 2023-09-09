class Song{
    constructor(path) {
        this.path = path;
        this.song = null;

    }

    end(){

    }
    async init(){
        console.log()
        const song = new Audio();
        const src = this.path;
        try {
            await song.load();
            song.src = src;
            await new Promise((resolve) => {
                song.addEventListener('loadeddata', () => {
                    resolve();
                });
                song.addEventListener('error', (event) => {
                    console.error('song resource error', event);
                    console.log(`song loading exception: ${src}`);
                    resolve();
                });
            });
        } catch (error) {
            console.log('song load error', error);
            console.log(`song loading exception: ${src}`);
        }
        this.song = song;
        return song
    }

    play(){
        try {
            this.song.play();
        }catch (error){
            console.log(`song play error : ${error}`)
            console.log(this.song)
        }
    }




}