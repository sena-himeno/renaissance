class View{
    constructor(main_canvas,ctx,img_key) {
        this.main_canvas = main_canvas
        this.ctx = ctx;
        this.img_key = img_key;
        this.frames = 1000/100;

        this.vaild_key_pool = [];
        this.current_vaild_key_count = 0;


    }
    init(){
        this.vaild_key_pool = [];
        this.current_vaild_key_count = 0;
    }

    addKeyInCanvas(key){
        this.vaild_key_pool.push(key);
        this.current_vaild_key_count ++;

    }
    updateKeyInCanvas(key){

        this.vaild_key_pool.forEach((key) =>{
            key.updateKey();
            if(key.status === 0){
                this.removeKeyInCanvas(key);
            }
            key.draw(this.img_key);
        })

    }
    removeKeyInCanvas(key){
        const index = this.vaild_key_pool.indexOf(key);
        if (index !== -1) {
            this.vaild_key_pool.splice(index, 1);
            this.current_vaild_key_count--;
        }
    }
    async refresh() {
        let last_timestamp = 0;
        const animate = (timestamp) => {
            const elapsed = timestamp - last_timestamp;

            if (elapsed >= this.frames) {
                this.ctx.clearRect(0, 0, this.main_canvas.width, this.main_canvas.height);
                this.updateKeyInCanvas();

                last_timestamp = timestamp;
            }

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }




}