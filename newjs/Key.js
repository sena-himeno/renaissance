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
    constructor(key,current_time,ctx) {
        this.key = key;
        this.current_time = current_time;
        this.ctx = ctx;

        this.img_position_x = 0;
        this.img_position_y = 0;

        this.img_key_size_x = 0;
        this.img_key_size_y = 0;

        this.img_key_size_x = 0;
        this.img_key_size_y = 0;

        this.init_print_x = 0;
        this.init_print_y = 0;

        this.vx = -5;
        this.vy = 0

    }

    init(){
        this.img_key_size_x = 41;
        this.img_key_size_y = 35;

        this.initKeyAtImgPosition()
        this.initPrintKeyPosition();


    }

    initKeyAtImgPosition(){
        let row_index = Math.floor( PrintKey.img_key_map[this.key] / 10) -1
        let col_index = PrintKey.img_key_map[this.key] % 10

        this.img_position_x = col_index * this. img_key_size_x;
        this.img_key_size_y = row_index * this.img_key_size_y;



    }
    initPrintKeyPosition(){
        // this.init_print_x = ctx.width;
        this.init_print_y = (PrintKey.init_position_y_map[this.key]) * 30 + 1
    }



    end(){

    }



}
