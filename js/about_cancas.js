const canvas_main = document.getElementById("draw_all");
canvas_main.width = 1200;
canvas_main.height = 300;
var ctx = canvas_main.getContext('2d');
var img_print_key = new Image();
img_print_key.src = "/img/SongAlphabet.png"



var img_position_y_map = {
    'A':10,'Q':10,'Z':10,
    'S':9,'W':9,'X':9,
    'D':8,'E':8,'C':8,
    'F':7,'R':7,'V':7,
    'G':6,'T':6,'B':6,
    'H':5,'Y':5,'N':5,
    'J':4,'U':4,'M':4,
    'K':3,'I':3,'<':3,
    'L':2,'O':2,'>':2,
    ':':1,'P':1,'?':1,
}



// ------------------------------------

function draw_line(ctx,height,item){
    ctx.beginPath();
    for(var i = 0; i <= item; i ++){
        ctx.moveTo(0,i * height);
        ctx.lineTo(ctx.canvas.width, i*height);
    }
    ctx.stroke()
}
class Output_Key{
    constructor(key){
        this.color = 'black'
        this.frames = 1000 / 60
        this.draw_key = key;
        this.cur_x = canvas_main.width;
        this.vx = - 5
        this.vy = 0
        // ------------------------------
        this.arr_index = 0;
        this.print_size_x=28
        this.print_size_y=28
        this.img_size_y=35
        this.img_size_x=35
        this.arr_index = 0;
        this.cur_y = 1 +  (img_position_y_map[this.draw_key] - 1 )* 30 ;
        if(this.draw_key == 'A' || this.draw_key == 'S' || this.draw_key == 'D' || this.draw_key == 'F' ||
            this.draw_key == 'J' || this.draw_key == 'K' || this.draw_key == 'L' || this.draw_key == ':' ||
            this.draw_key == 'G' || this.draw_key == 'H'
        ){
            this.arr = ['A','S','D','F','J','K','L',':','G','H']
            for(var i = 0; i < this.arr.length; i++){
                if(this.arr[i] == this.draw_key){
                    this.arr_index = i;
                    break;
                }
            }
            this.img_position_y = 0
            this.img_position_x=this.arr_index * 41
        }
        if(this.draw_key == 'Q' || this.draw_key == 'W' || this.draw_key == 'E' || this.draw_key == 'R' ||
            this.draw_key == 'U' || this.draw_key == 'I' || this.draw_key == 'O' || this.draw_key == 'P' ||
            this.draw_key == 'T' || this.draw_key == 'Y'
        ){
            this.arr = ['Q','W','E','R','U','I','O','P','T','Y']
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
        draw(img_key){
            var callbackFn =  () =>{
                if (this.cur_x >= -35) {
                // console.log(this.cur_x)
                ctx.clearRect(this.cur_x + 5 ,this.cur_y ,this.print_size_x, this.print_size_y);
                ctx.drawImage(img_key,this.img_position_x,this.img_position_y,this.img_size_x,this.img_size_y,this.cur_x,this.cur_y,this.print_size_x,this.print_size_y);
                this.cur_x =  this.cur_x + this.vx;
                window.requestAnimationFrame(callbackFn)
            }
        }
        window.requestAnimationFrame(callbackFn)
    }
}
