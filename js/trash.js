var key_A = {
    img_position_x:0,
    img_position_y:0,
    print_size_x:15,
    print_size_y:28,
    img_size_x:35,
    img_size_y:35,
    cur_x:canvas_main.width,
    cur_y: 5,
    vx: -1,
    vy: 0,
    frames:1000 / 60,
    color: 'black',
    draw: function (img_key) {
        var intervel =  setInterval(function(){
            ctx.beginPath();
            ctx.clearRect(key_A.cur_x+1,key_A.cur_y ,key_A.print_size_x, key_A.print_size_y);
            ctx.drawImage(img_key,key_A.img_position_x,key_A.img_position_y,key_A.img_size_x,key_A.img_size_y,key_A.cur_x,key_A.cur_y,key_A.print_size_x,key_A.print_size_y);
            key_A.cur_x =  key_A.cur_x + key_A.vx;
            console.log(key_A.cur_x)
            if( key_A.cur_x <= -35){
            key_A = null;
            console.log("brake")
            console.log(key_A)
            clearInterval(intervel)
            }
        }
        ,key_A.frames)
    },
    brake: function(){
        
    }
    
};

class Output_Key{
    constructor(key){
        this.color = 'black'
        this.frames = 1000 / 60
        this.draw_key = key;
        this.cur_x = canvas_main.width;
        this.vx = -2
        this.vy = 0
        // ------------------------------
        this.arr_index = 0;
        this.print_size_x=15
        this.print_size_y=28
        this.img_size_y=35
        this.img_size_x=35
        this.arr_index = 0;
        if(this.draw_key == 'A' || this.draw_key == 'S' || this.draw_key == 'D' || this.draw_key == 'F' ||
            this.draw_key == 'J' || this.draw_key == 'K' || this.draw_key == 'L' || this.draw_key == ':' ||
            this.draw_key == 'G' || this.draw_key == 'H'
        ){
            this.arr = ['A','S','D','F','J','K','L',':','G','H']

            this.cur_y= 5
            for(var i = 0; i < this.arr.length; i++){
                if(this.arr[i] == this.draw_key){
                    this.arr_index = i;
                    break;
                }
            }
            this.img_position_y=0
            this.img_position_x=this.arr_index * 41
        }
        if(this.draw_key == 'Q' || this.draw_key == 'W' || this.draw_key == 'E' || this.draw_key == 'R' ||
            this.draw_key == 'U' || this.draw_key == 'I' || this.draw_key == 'O' || this.draw_key == 'P' ||
            this.draw_key == 'T' || this.draw_key == 'Y'
        ){
            this.arr = ['Q','W','E','R','U','I','O','P','T','Y']

            this.cur_y= 5
            for(var i = 0; i < this.arr.length; i++){
                if(this.arr[i] == this.draw_key){
                    this.arr_index = i;
                    break;
                }
            }
            this.img_position_y=35
            this.img_position_x=this.arr_index * 41
        }
        if(this.draw_key == 'Z' || this.draw_key == 'X' || this.draw_key == 'C' || this.draw_key == 'V' ||
            this.draw_key == 'M' || this.draw_key == '<' || this.draw_key == '>' || this.draw_key == '?' ||
            this.draw_key == 'B' || this.draw_key == 'N'
        ){
            this.arr = ['Z','X','C','V','M','<','>','?','B','N']

            this.cur_y= 5
            for(var i = 0; i < this.arr.length; i++){
                if(this.arr[i] == this.draw_key){
                    this.arr_index = i;
                    break;
                }
            }
            this.img_position_y=70
            this.img_position_x=this.arr_index * 41
        }

    }
    // test(img_key){
    //     // console.log("key: " + this.draw_key)
    //     console.log("vx1: " + this.cur_x)
    // }
    // draw(img_key){
    //     var intervel =  setInterval(()=>{
    //         ctx.clearRect(this.cur_x+1,this.cur_y ,this.print_size_x, this.print_size_y);
    //         ctx.drawImage(img_key,this.img_position_x,this.img_position_y,this.img_size_x,this.img_size_y,this.cur_x,this.cur_y,this.print_size_x,this.print_size_y);
    //         this.cur_x =  this.cur_x + this.vx;
    //         // console.log(1)
    //         if( this.cur_x <= -35){
        //         clearInterval(intervel)
        //         }
        //     }
        //     ,
        //     this.frames
        //     // 100
        //     )
        // }
        draw(img_key){
            var callbackFn =  () =>{
                if (this.cur_x >= -28) {
                // console.log(this.cur_x)
                ctx.clearRect(this.cur_x+1,this.cur_y ,this.print_size_x, this.print_size_y);
                ctx.drawImage(img_key,this.img_position_x,this.img_position_y,this.img_size_x,this.img_size_y,this.cur_x,this.cur_y,this.print_size_x,this.print_size_y);
                this.cur_x =  this.cur_x + this.vx;
                window.requestAnimationFrame(callbackFn)
            }
        }
        window.requestAnimationFrame(callbackFn)

    }
}
async function print_key(key_sound){ //生成key文本用
    setInterval(function() {
        if(Math.floor(musicEl.currentTime * 10) / 10 >= Math.floor(parseFloat(key_sound[count].keytime) * 10)/ 10 ){
            print_content+= (key_sound[count].keyPressed)
            count++;
        }
        else{
            print_content += '_';
        }
        clog(Math.floor(musicEl.currentTime * 10) / 10)
        clog(Math.floor(parseFloat(key_sound[count].keytime) * 10)/ 10)
        clog(count)
        clog(print_content)
    },100)
}

async function print_key(key_sound) { //生成key文本用
    clog(key_sound);
    let interval = setInterval(function () {
        if (count == key_sound.length) {
            clearInterval(interval)
        }
        // clog(Math.floor(musicEl.currentTime * 10) / 10 + 4 + " seconds" + Math.floor(parseFloat(key_sound[count].keytime) * 10) / 10);
        if (Math.floor(musicEl.currentTime * 10) / 10 + 4 == Math.floor(parseFloat(key_sound[count].keytime) * 10) / 10) {
            clog("---------------------------")
            clog(Math.floor( ( Math.floor(parseFloat(key_sound[count].keytime) * 10) / 10) - (musicEl.currentTime * 10) / 10)  );
            clog("---------------------------")
            console.log(key_sound[count].keyPressed)
            console.log(typeof (key_sound[count].keyPressed))
            clog(key_sound[count].keyPressed.toUpperCase().charAt(0))
            new Output_Key(key_sound[count].keyPressed.toUpperCase().charAt(0)).draw(img_print_key)
            print_content += (key_sound[count].keyPressed)

            count++;
        }
        // if (Math.floor(musicEl.currentTime * 10) / 10 >= Math.floor(parseFloat(key_sound[count].keytime) * 10) / 10) {
            // print_content += (key_sound[count].keyPressed)
        //     count++;
        // }
        else {
            print_content += '_';
        }
        // clog(Math.floor(musicEl.currentTime * 10) / 10)
        // clog(Math.floor(parseFloat(key_sound[count].keytime) * 10) / 10)
        // clog(count)
        // clog(print_content)
        // clog(key_sound.length)

    }, 100)


}