class PrintKey{
    static init_position_y_map = {
        'A': 0, 'Q': 0, 'Z': 0,
        'S': 1, 'W': 1, 'X': 1,
        'D': 2, 'E': 2, 'C': 2,
        'F': 3, 'R': 3, 'V': 3,
        'G': 4, 'T': 4, 'B': 4,
        'H': 5, 'Y': 5, 'N': 5,
        'J': 6, 'U': 6, 'M': 6,
        'K': 7, 'I': 7, '<': 7,
        'L': 8, 'O': 8, '>': 8,
        ';': 9, 'P': 9, '?': 9,
    }
    static img_key_map = {
        'A': 0, 'Q':10, 'Z': 20,
        'S': 1, 'W': 11, 'X': 21,
        'D': 2, 'E': 12, 'C': 22,
        'F': 3, 'R': 13, 'V': 23,
        'J': 4, 'U': 14, 'M': 24,
        'K': 5, 'I': 15, '<': 25,
        'L': 6, 'O': 16, '>': 26,
        ':': 7, 'P': 17, '?': 27,
        'G': 8, 'T': 18, 'B': 28,
        'H': 9, 'Y': 19, 'N': 29,
    }
    constructor(key,ctx,canvas_main,current_time) {
        this.key = key;
        this.ctx = ctx;
        this.current_time = current_time;
        this.canvas_main = canvas_main;

        this.img_key_src = "/img/SongAlphabet.png" ;

        this.img_position_x = 0;
        this.img_position_y = 0;

        this.img_key_size_x = 0;
        this.img_key_size_y = 0;

        this.print_key_size_x = 0;
        this.print_key_size_y = 0;

        this.init_print_x = 0;
        this.init_print_y = 0;

        this.vx = -3;
        this.vy = 0

        this.status = 1; // invalid / valid

        this.init();

    }

    draw(img_key){
        this.ctx.drawImage(img_key,
            this.img_position_x,this.img_position_y,
            this.img_key_size_x,this.img_key_size_y,
            this.init_print_x,this.init_print_y,
            this.print_key_size_x,this.print_key_size_y
        );
    }
    updateKey(){
        this.init_print_x += this.vx;
        if (this.init_print_x  <= - 250) {
            this.status = 0;
        }
    }

    init(){
        this.img_key_size_x = 35;
        this.img_key_size_y = 35;

        this.initKeyAtImgPosition()
        this.initPrintKeyPosition();
        this.initPrintKeySize();
    }

    initPrintKeySize(){
        this.print_key_size_x = 28;
        this.print_key_size_y = 28;
    }
    initKeyAtImgPosition(){
        let row_index = Math.floor( PrintKey.img_key_map[this.key] / 10)
        let col_index = PrintKey.img_key_map[this.key] % 10

        this.img_position_x = col_index * this. img_key_size_x;
        this.img_position_y = row_index * this.img_key_size_y;



    }
    initPrintKeyPosition(){
        this.init_print_x = this.canvas_main.width;
        console.log(`init_print_x : ${this.init_print_x}`)
        this.init_print_y = (PrintKey.init_position_y_map[this.key] ) * 30 + 1
    }



    end(){

    }



}
