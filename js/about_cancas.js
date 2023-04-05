var img_print_key = new Image();
img_print_key.src = "/img/SongAlphabet.png"

// ------------------------------------

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
function draw_line(ctx,height,item){
    ctx.beginPath();
    for(var i = 0; i <= item; i ++){
        ctx.moveTo(0,i * height);
        ctx.lineTo(ctx.canvas.width, i*height);
    }
    ctx.stroke()
}