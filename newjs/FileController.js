class FileController{
    constructor(path){
        this.path = path;
    }

    static async text_to_json(path){
        let result_key_info = []
        let result_lyrics = []


        let result = [];
        let text = await fetch(txt_path)
            .then(response => response.text())
        let lineCount = 0;
        let prev_key_time;
        let key_sound_name = [];
        text.split("\n").forEach(line => {
            let fields = [];
            let inlineIndex = 0;
            line.split(",").forEach(info => {


                if (inlineIndex <= 3) {
                    fields[inlineIndex] = info;
                }
                inlineIndex++;
            })
            let key_time = String(Math.floor(fields[1] * 10) / 10)
            if(prev_key_time == key_time && lineCount >0){
                result[lineCount-1].sound_name.push(fields[2])

            }else{
                key_sound_name[0] = fields[2];
                prev_key_time = key_time;
                result[lineCount] = {
                    "keytime": key_time,
                    "sound_name": key_sound_name,
                    "keyPressed": fields[3],
                }
                key_sound_name = [];
                lineCount++;
            }
        })
        return result

    }

    
}
