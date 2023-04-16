const canvas_main = document.getElementById("draw_all");
canvas_main.width = 1200;
canvas_main.height = 300;
var ctx = canvas_main.getContext('2d');
var img_print_key = new Image();
img_print_key.src = "/img/SongAlphabet.png"



// part 2
const draw_result = document.getElementById("draw_result");
draw_result.width = 1000;
draw_result.height = 200;

var draw_result_ctx = draw_result.getContext('2d');

function draw_result_table(ctx, height, width, row, col) {
    var i;
    for (i = 0; i <= row; i++) {
        ctx.moveTo(0, i * height);
        ctx.lineTo(ctx.canvas.width, i * height);
    }
    for (i = 0; i <= col; i++) {
        ctx.moveTo(i * width, 0);
        ctx.lineTo(i * height, ctx.canvas.height);
    }
    ctx.stroke()

}
class Print_Result {
    constructor(key_info, musicEl) {
        this.musicEl = musicEl;
        this.width = 20
        this.height = 20
        this.row = 10
        this.col = 45
        this.key_info = key_info
        this.cur_count
        this.cur_result
    }
    init() {
        this.cur_count = 0
        draw_result_ctx.clearRect(0, 0, draw_result.width, draw_result.height);
        // draw_result_table(draw_result_ctx, 20, 20, 10, 45)

    }
    output() {
        let cur_output_row = Math.floor(this.cur_count % 10);
        let cur_output_col = Math.floor(this.cur_count / 10);
        draw_result_ctx.fillStyle = this.cur_result
        draw_result_ctx.fillRect(cur_output_col * this.width, cur_output_row * this.height, this.width, this.height)
    }
    run() {
        let interval = setInterval(() => {
            // clog("---------------------------------------")
            // clog(this.cur_count)
            clog(keyPressed.toUpperCase() + " and " + this.key_info[this.cur_count].keyPressed.toUpperCase().charAt(0))
            if (Math.floor(this.musicEl.currentTime * 10) / 10 == Math.floor(parseFloat(this.key_info[this.cur_count].keytime) * 10) / 10) {
                this.cur_result = "red";
                if(easy_model_value){
                    if(keyPressed.toUpperCase() == easy_model_mapper(this.key_info[this.cur_count].keyPressed.toUpperCase().charAt(0))){
                        clog("success")
                        this.cur_result = "green";
                        success_count ++;        
                    }
                }else{
                    if (keyPressed.toUpperCase() == this.key_info[this.cur_count].keyPressed.toUpperCase().charAt(0)) {
                        clog("success")
                        this.cur_result = "green";
                        success_count ++;
                    }
                }
                this.output()
                this.cur_count++;
            }
            // clog("---------------------------------------")
            if (this.cur_count >= this.key_info.length -1) {
                clearInterval(interval)
            }
            
        }, 100)
    }
    end(){
        
    }

}


// part 2 end 

var img_position_y_map = {
    'A': 10, 'Q': 10, 'Z': 10,
    'S': 9, 'W': 9, 'X': 9,
    'D': 8, 'E': 8, 'C': 8,
    'F': 7, 'R': 7, 'V': 7,
    'G': 6, 'T': 6, 'B': 6,
    'H': 5, 'Y': 5, 'N': 5,
    'J': 4, 'U': 4, 'M': 4,
    'K': 3, 'I': 3, '<': 3,
    'L': 2, 'O': 2, '>': 2,
    ';': 1, 'P': 1, '?': 1,
}

// ------------------------------------

function draw_line(ctx, height, item) {
    ctx.beginPath();
    for (var i = 0; i <= item; i++) {
        ctx.moveTo(0, i * height);
        ctx.lineTo(ctx.canvas.width, i * height);
    }
    ctx.stroke()
}
function draw_flag(ctx, x,) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);
    ctx.stroke()
}
function easy_model_mapper(key){
    if(img_position_y_map[key] == 10){
        return 'A';
    }
    if(img_position_y_map[key] == 9){
        return 'S';
    }
    if(img_position_y_map[key] == 8){
        return 'D';
    }
    if(img_position_y_map[key] == 7){
        return 'F';
    }
    if(img_position_y_map[key] == 6){
        return 'G';
    }
    if(img_position_y_map[key] == 5){
        return 'H';
    }
    if(img_position_y_map[key] == 4){
        return 'J';
    }
    if(img_position_y_map[key] == 3){
        return 'K';
    }
    if(img_position_y_map[key] == 2){
        return 'L';
    }
    if(img_position_y_map[key] == 1){
        return ';';
    }
}
class Output_Key {
    constructor(key) {
        this.color = 'black'
        this.frames = 1000 / 60
        this.draw_key = key;
        this.cur_x = canvas_main.width;
        this.vx = - 5
        this.vy = 0
        // ------------------------------
        this.arr_index = 0;
        this.print_size_x = 28
        this.print_size_y = 28
        this.img_size_y = 35
        this.img_size_x = 35
        this.arr_index = 0;
        this.cur_y = 1 + (img_position_y_map[this.draw_key] - 1) * 30;
        if (this.draw_key == 'A' || this.draw_key == 'S' || this.draw_key == 'D' || this.draw_key == 'F' ||
            this.draw_key == 'J' || this.draw_key == 'K' || this.draw_key == 'L' || this.draw_key == ';' ||
            this.draw_key == 'G' || this.draw_key == 'H'
        ) {
            this.arr = ['A', 'S', 'D', 'F', 'J', 'K', 'L', ';', 'G', 'H']
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i] == this.draw_key) {
                    this.arr_index = i;
                    break;
                }
                i
            }
            this.img_position_y = 0
            this.img_position_x = this.arr_index * 41
        }
        if (this.draw_key == 'Q' || this.draw_key == 'W' || this.draw_key == 'E' || this.draw_key == 'R' ||
            this.draw_key == 'U' || this.draw_key == 'I' || this.draw_key == 'O' || this.draw_key == 'P' ||
            this.draw_key == 'T' || this.draw_key == 'Y'
        ) {
            this.arr = ['Q', 'W', 'E', 'R', 'U', 'I', 'O', 'P', 'T', 'Y']
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i] == this.draw_key) {
                    this.arr_index = i;
                    break;
                }
            }
            this.img_position_y = 35
            this.img_position_x = this.arr_index * 41
        }
        if (this.draw_key == 'Z' || this.draw_key == 'X' || this.draw_key == 'C' || this.draw_key == 'V' ||
            this.draw_key == 'M' || this.draw_key == '<' || this.draw_key == '>' || this.draw_key == '?' ||
            this.draw_key == 'B' || this.draw_key == 'N'
        ) {
            this.arr = ['Z', 'X', 'C', 'V', 'M', '<', '>', '?', 'B', 'N']
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i] == this.draw_key) {
                    this.arr_index = i;
                    break;
                }
            }
            this.img_position_y = 70
            this.img_position_x = this.arr_index * 41
        }

    }
    draw(img_key) {
        var callbackFn = () => {
            if (this.cur_x >= -35) {
                // console.log(this.cur_x)
                ctx.clearRect(this.cur_x + 5, this.cur_y, this.print_size_x, this.print_size_y);
                ctx.drawImage(img_key, this.img_position_x, this.img_position_y, this.img_size_x, this.img_size_y, this.cur_x, this.cur_y, this.print_size_x, this.print_size_y);
                this.cur_x = this.cur_x + this.vx;
                window.requestAnimationFrame(callbackFn)
            }
        }
        window.requestAnimationFrame(callbackFn)
    }
    
    normal(){
        var callbackFn = () => {
            if (this.cur_x >= -35) {

                ctx.clearRect(this.cur_x + 5, this.cur_y, this.print_size_x, this.print_size_y);
                ctx.drawImage(img_key, this.img_position_x, this.img_position_y, this.img_size_x, this.img_size_y, this.cur_x, this.cur_y, this.print_size_x, this.print_size_y);
                this.cur_x = this.cur_x + this.vx;
                window.requestAnimationFrame(callbackFn)
            }
        }
        window.requestAnimationFrame(callbackFn)


    }

}
