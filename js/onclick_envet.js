



window.onload=function(){
    floot_img.src = "/img/chr090.webp";
    remake_button.onclick = () => {
        luncher.style.display = "block";
        select_Song.style.display = "block";
        auto_key_sound.style.display = "block";
        easy_model.style.display = "block";
        img_box.style.display = "none";
        successed_count.style.display = "none";
        failed_count.style.display = "none";
    }
    clog(1)
    easy_model_value = 0;
    easy_model.innerHTML ='简单模式:关闭'
    easy_model.onclick = () => {
        if(easy_model_value == 0){
            easy_model_value = 1;
            easy_model.innerHTML='简单模式:打开'
        }
        else{
            easy_model_value = 0;
            easy_model.innerHTML='简单模式:关闭'
        }
        clog(easy_model_value)
    }

    auto_key_sound_value = 1;
    auto_key_sound.innerHTML ='自动触发:打开'
    auto_key_sound.onclick = () => {
        if(auto_key_sound_value == 0){
            auto_key_sound_value = 1;
            auto_key_sound.innerHTML='自动触发:打开'
        }
        else{
            auto_key_sound_value = 0;
            auto_key_sound.innerHTML='自动触发:关闭'
        }

    }
    home_button.onclick = () => {
        window.location.href = '/index.html'
    }

}

