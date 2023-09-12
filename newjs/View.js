class View{
    constructor(ctx) {
        this.ctx = ctx;
        this.frames = 1000/60;

    }

    addKeyInCanvas(key){

    }
    removeKeyInCanvas(key){

    }

    async refresh() {

        let last_timestamp = 0;

        function animate(timestamp) {
            const elapsed = timestamp - last_timestamp;

            if (elapsed >= frames) {



                last_timestamp = timestamp;
            }

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }




}