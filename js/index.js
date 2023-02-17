const outputSoundEl = document.getElementById("key_output");
const musicEl = document.getElementById("music");
const txt_path = "key.txt"

async function main(){
    let sound_name = "bell1001"
    let key_sound = await txt_to_json(txt_path)
    //let count = 0;
    let gameContext = {
        "sheetData": key_sound,
        "count": 0,
        "keyPressed": ""
    }

    document.onkeyup = function (event) {
        if (!musicEl.paused) {
            gameContext.keyPressed = event.key;

            sound_controller(gameContext);
        }
    }
}

function sound_controller(gameContext) {
    const {sheetData, _count, keyPressed} = gameContext;
    const currentTime = musicEl.currentTime
    let keyPressedTime = Math.floor(currentTime * 10) / 10
    clog(`${keyPressedTime}  ${keyPressed}`)

    if (currentTime > parseFloat(sheetData[gameContext.count].keytime)) {
        sound_name = test_json[gameContext.count].sound_name;
        gameContext.count++;
        outputSoundEl.setAttribute("src", `./song/SR01/Key/${sound_name}.ogg`)
        outputSoundEl.play();
    } else {
        clog("You missed the key.");
    }

    // clog(sound_name)
    clog(`Next key: ${sheetData[gameContext.count].keyPressed}, Time: ${sheetData[gameContext.count].keytime}`)
    

}

async function txt_to_json(txt_path) { //出现未知原因 无法直接引用 拿来当生成

    let result= [];
    let text = await fetch(txt_path)
        .then(response => response.text())

    let lineCount = 0;
    text.split("\n").forEach(line => {
        let fields = [];
        let inlineIndex = 0;


        line.split(",").forEach(info => {
            if (inlineIndex <= 3) {
                fields[inlineIndex] = info;
            }
            inlineIndex++;
        })

        //let accurate_key = {};
        let key_time = String(Math.floor(fields[1] * 10) / 10)
        
        result[lineCount] = {
                "keytime": key_time,
                "sound_name": fields[2],
                "keyPressed": fields[3],
        }
        lineCount++;
        //result.push(accurate_key);
    })

    // clog(result)
    return result
}

function clog(text) {
    let currentdate = new Date(); 
    let datetime = "[" +  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "] ";
    //console.log('[index.js]' + datetime + text);
    console.log(text);

}

const test_json = [
    {
        "key_time": "9.8",
        "sound_name": "bell1001",
        "key": "o"
    },
    {
        "key_time": "10",
        "sound_name": "bell1002",
        "key": "i"
    },
    {
        "key_time": "10.2",
        "sound_name": "bell1003",
        "key": "u"
    },
    {
        "key_time": "10.9",
        "sound_name": "bell1004",
        "key": "r"
    },
    {
        "key_time": "11.5",
        "sound_name": "bell1005",
        "key": "w"
    },
    {
        "key_time": "12.4",
        "sound_name": "bell1006",
        "key": "e"
    },
    {
        "key_time": "13",
        "sound_name": "bell1007",
        "key": "r"
    },
    {
        "key_time": "13.7",
        "sound_name": "bell1008",
        "key": "q"
    },
    {
        "key_time": "20.5",
        "sound_name": "pian1001",
        "key": "h"
    },
    {
        "key_time": "22.2",
        "sound_name": "pian1002",
        "key": "g"
    },
    {
        "key_time": "23.5",
        "sound_name": "pian1003",
        "key": "s"
    },
    {
        "key_time": "23.7",
        "sound_name": "pian1004",
        "key": "d"
    },
    {
        "key_time": "23.9",
        "sound_name": "pian1005",
        "key": "d"
    },
    {
        "key_time": "25.2",
        "sound_name": "pian1006",
        "key": "k"
    },
    {
        "key_time": "25.4",
        "sound_name": "pian1007",
        "key": "l"
    },
    {
        "key_time": "25.7",
        "sound_name": "pian1008",
        "key": ";"
    },
    {
        "key_time": "26.3",
        "sound_name": "pian1009",
        "key": "l"
    },
    {
        "key_time": "26.9",
        "sound_name": "pian1010",
        "key": "d"
    },
    {
        "key_time": "27.4",
        "sound_name": "pian1011",
        "key": "h"
    },
    {
        "key_time": "28.7",
        "sound_name": "pian1012",
        "key": "a"
    },
    {
        "key_time": "28.9",
        "sound_name": "pian1013",
        "key": "l"
    },
    {
        "key_time": "29.1",
        "sound_name": "pian1014",
        "key": "g"
    },
    {
        "key_time": "29.9",
        "sound_name": "pian1015",
        "key": "s"
    },
    {
        "key_time": "30.2",
        "sound_name": "pian1016",
        "key": "d"
    },
    {
        "key_time": "30.4",
        "sound_name": "pian1017",
        "key": "g"
    },
    {
        "key_time": "30.8",
        "sound_name": "pian1018",
        "key": "d"
    },
    {
        "key_time": "31.9",
        "sound_name": "pian1019",
        "key": "s"
    },
    {
        "key_time": "32.1",
        "sound_name": "pian1020",
        "key": "d"
    },
    {
        "key_time": "32.3",
        "sound_name": "pian1021",
        "key": "f"
    },
    {
        "key_time": "32.5",
        "sound_name": "pian1022",
        "key": "k"
    },
    {
        "key_time": "34.2",
        "sound_name": "pian1023",
        "key": "a"
    },
    {
        "key_time": "34.4",
        "sound_name": "pian1024",
        "key": "s"
    },
    {
        "key_time": "34.7",
        "sound_name": "pian1025",
        "key": "d"
    },
    {
        "key_time": "34.9",
        "sound_name": "pian1026",
        "key": "f"
    },
    {
        "key_time": "35.1",
        "sound_name": "pian1027",
        "key": "j"
    },
    {
        "key_time": "35.3",
        "sound_name": "pian1028",
        "key": "k"
    },
    {
        "key_time": "35.5",
        "sound_name": "pian1029",
        "key": "l"
    },
    {
        "key_time": "35.7",
        "sound_name": "pian1030",
        "key": ";"
    },
    {
        "key_time": "35.9",
        "sound_name": "pian1031",
        "key": "l"
    },
    {
        "key_time": "36.6",
        "sound_name": "pian1032",
        "key": "k"
    },
    {
        "key_time": "37.4",
        "sound_name": "pian1033",
        "key": "p"
    },
    {
        "key_time": "37.7",
        "sound_name": "pian1034",
        "key": "o"
    },
    {
        "key_time": "38.3",
        "sound_name": "pian1035",
        "key": "i"
    },
    {
        "key_time": "38.7",
        "sound_name": "pian1036",
        "key": "e"
    },
    {
        "key_time": "39.1",
        "sound_name": "pian1037",
        "key": "i"
    },
    {
        "key_time": "39.4",
        "sound_name": "pian1038",
        "key": "r"
    },
    {
        "key_time": "41.1",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "41.9",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "42.6",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "42.8",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "43.7",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "44.5",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "45.4",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "46",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "46.2",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "47.1",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "47.9",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "48.8",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "49.4",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "49.7",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "50.5",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "51.4",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "52.2",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "52.9",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "53.1",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "53.9",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "54.8",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "55.7",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "56.3",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "56.5",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "57.4",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "58.2",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "59.1",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "59.7",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "59.9",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "60.8",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "61.7",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "62.5",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "63.2",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "63.4",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "64.2",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "65.1",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "65.9",
        "sound_name": "rims1001",
        "key": "k"
    },
    {
        "key_time": "66.8",
        "sound_name": "bdbd1001",
        "key": "c"
    },
    {
        "key_time": "67.2",
        "sound_name": "sdrf1001",
        "key": "j"
    },
    {
        "key_time": "67.4",
        "sound_name": "tomt1001",
        "key": "k"
    },
    {
        "key_time": "67.9",
        "sound_name": "tomt1002",
        "key": "l"
    },
    {
        "key_time": "68.1",
        "sound_name": "tomt1003",
        "key": ";"
    },
    {
        "key_time": "68.5",
        "sound_name": "bell2001",
        "key": "u"
    },
    {
        "key_time": "70.2",
        "sound_name": "bell2002",
        "key": "r"
    },
    {
        "key_time": "71.9",
        "sound_name": "bell2003",
        "key": "e"
    },
    {
        "key_time": "75.4",
        "sound_name": "bell2004",
        "key": "u"
    },
    {
        "key_time": "77.1",
        "sound_name": "bell2005",
        "key": "o"
    },
    {
        "key_time": "78.8",
        "sound_name": "bell2006",
        "key": "e"
    },
    {
        "key_time": "79.9",
        "sound_name": "bell2007",
        "key": "a"
    },
    {
        "key_time": "80.1",
        "sound_name": "bell2008",
        "key": "s"
    },
    {
        "key_time": "80.3",
        "sound_name": "bell2009",
        "key": "d"
    },
    {
        "key_time": "80.5",
        "sound_name": "bell2010",
        "key": "k"
    },
    {
        "key_time": "81.2",
        "sound_name": "bell2011",
        "key": "j"
    },
    {
        "key_time": "81.8",
        "sound_name": "bell2012",
        "key": "d"
    },
    {
        "key_time": "82.2",
        "sound_name": "bell2013",
        "key": "u"
    },
    {
        "key_time": "83.9",
        "sound_name": "bell2014",
        "key": "r"
    },
    {
        "key_time": "85.7",
        "sound_name": "bell2015",
        "key": "e"
    },
    {
        "key_time": "89.1",
        "sound_name": "bell2016",
        "key": "i"
    },
    {
        "key_time": "90.8",
        "sound_name": "bell2017",
        "key": "o"
    },
    {
        "key_time": "92.5",
        "sound_name": "bell2018",
        "key": "p"
    },
    {
        "key_time": "95.9",
        "sound_name": "stri1001",
        "key": "a"
    },
    {
        "key_time": "97.7",
        "sound_name": "stri1002",
        "key": "j"
    },
    {
        "key_time": "100.2",
        "sound_name": "stri1003",
        "key": "k"
    },
    {
        "key_time": "101.1",
        "sound_name": "stri1004",
        "key": "f"
    },
    {
        "key_time": "101.9",
        "sound_name": "stri1005",
        "key": "s"
    },
    {
        "key_time": "102.8",
        "sound_name": "bell3001",
        "key": "y"
    },
    {
        "key_time": "103.2",
        "sound_name": "bell3002",
        "key": "q"
    },
    {
        "key_time": "103.7",
        "sound_name": "bell3003",
        "key": "q"
    },
    {
        "key_time": "104.1",
        "sound_name": "bell3004",
        "key": "i"
    },
    {
        "key_time": "104.3",
        "sound_name": "bell3005",
        "key": "t"
    },
    {
        "key_time": "106.2",
        "sound_name": "bell3006",
        "key": "t"
    },
    {
        "key_time": "106.7",
        "sound_name": "bell3007",
        "key": "y"
    },
    {
        "key_time": "107.1",
        "sound_name": "bell3008",
        "key": "i"
    },
    {
        "key_time": "107.5",
        "sound_name": "bell3009",
        "key": "y"
    },
    {
        "key_time": "109.7",
        "sound_name": "bell3001",
        "key": "y"
    },
    {
        "key_time": "110.1",
        "sound_name": "bell3002",
        "key": "q"
    },
    {
        "key_time": "110.5",
        "sound_name": "bell3003",
        "key": "q"
    },
    {
        "key_time": "110.9",
        "sound_name": "bell3004",
        "key": "i"
    },
    {
        "key_time": "111.2",
        "sound_name": "bell3005",
        "key": "t"
    },
    {
        "key_time": "113.1",
        "sound_name": "bell3006",
        "key": "t"
    },
    {
        "key_time": "113.5",
        "sound_name": "bell3007",
        "key": "y"
    },
    {
        "key_time": "113.9",
        "sound_name": "bell3008",
        "key": "i"
    },
    {
        "key_time": "114.4",
        "sound_name": "bell3010",
        "key": "o"
    },
    {
        "key_time": "116.1",
        "sound_name": "bell3011",
        "key": "e"
    },
    {
        "key_time": "116.3",
        "sound_name": "bell3012",
        "key": "t"
    },
    {
        "key_time": "116.5",
        "sound_name": "bell3001",
        "key": "y"
    },
    {
        "key_time": "116.9",
        "sound_name": "bell3002",
        "key": "q"
    },
    {
        "key_time": "117.4",
        "sound_name": "bell3003",
        "key": "q"
    },
    {
        "key_time": "117.8",
        "sound_name": "bell3004",
        "key": "i"
    },
    {
        "key_time": "118",
        "sound_name": "bell3005",
        "key": "t"
    },
    {
        "key_time": "119.9",
        "sound_name": "bell3006",
        "key": "t"
    },
    {
        "key_time": "120.4",
        "sound_name": "bell3007",
        "key": "y"
    },
    {
        "key_time": "120.8",
        "sound_name": "bell3008",
        "key": "i"
    },
    {
        "key_time": "121.2",
        "sound_name": "bell3009",
        "key": "y"
    },
    {
        "key_time": "123.4",
        "sound_name": "stri2001",
        "key": "l"
    },
    {
        "key_time": "124.4",
        "sound_name": "stri2002",
        "key": "a"
    },
    {
        "key_time": "124.7",
        "sound_name": "stri2003",
        "key": "s"
    },
    {
        "key_time": "124.9",
        "sound_name": "stri2004",
        "key": "f"
    },
    {
        "key_time": "125.1",
        "sound_name": "stri2005",
        "key": "j"
    },
    {
        "key_time": "125.7",
        "sound_name": "stri2006",
        "key": "k"
    },
    {
        "key_time": "126.2",
        "sound_name": "stri2007",
        "key": "l"
    },
    {
        "key_time": "126.8",
        "sound_name": "stri2008",
        "key": "l"
    },
    {
        "key_time": "127.9",
        "sound_name": "stri2009",
        "key": "s"
    },
    {
        "key_time": "128.1",
        "sound_name": "stri2010",
        "key": "j"
    },
    {
        "key_time": "128.3",
        "sound_name": "stri2011",
        "key": "k"
    },
    {
        "key_time": "128.5",
        "sound_name": "stri2012",
        "key": "l"
    },
    {
        "key_time": "128.7",
        "sound_name": "stri2013",
        "key": "k"
    },
    {
        "key_time": "129.2",
        "sound_name": "stri2014",
        "key": "j"
    },
    {
        "key_time": "129.6",
        "sound_name": "stri2015",
        "key": "f"
    },
    {
        "key_time": "129.8",
        "sound_name": "stri2016",
        "key": "d"
    },
    {
        "key_time": "130",
        "sound_name": "stri2017",
        "key": "s"
    },
    {
        "key_time": "130.2",
        "sound_name": "stri2018",
        "key": "j"
    },
    {
        "key_time": "131.3",
        "sound_name": "stri2019",
        "key": "s"
    },
    {
        "key_time": "131.5",
        "sound_name": "stri2020",
        "key": "d"
    },
    {
        "key_time": "131.7",
        "sound_name": "stri2021",
        "key": "f"
    },
    {
        "key_time": "131.9",
        "sound_name": "stri2022",
        "key": "j"
    },
    {
        "key_time": "132.6",
        "sound_name": "stri2023",
        "key": "k"
    },
    {
        "key_time": "133.2",
        "sound_name": "stri2024",
        "key": "l"
    },
    {
        "key_time": "133.7",
        "sound_name": "stri2025",
        "key": "l"
    },
    {
        "key_time": "135.4",
        "sound_name": "stri2026",
        "key": ";"
    },
    {
        "key_time": "137.1",
        "sound_name": "ride1001",
        "key": "z"
    },
    {
        "key_time": "137.9",
        "sound_name": "ride1001",
        "key": "z"
    },
    {
        "key_time": "138.8",
        "sound_name": "ride1001",
        "key": "z"
    },
    {
        "key_time": "139.7",
        "sound_name": "ride1001",
        "key": "z"
    },
    {
        "key_time": "140.5",
        "sound_name": "ride1001",
        "key": "z"
    },
    {
        "key_time": "141.4",
        "sound_name": "ride1001",
        "key": "z"
    },
    {
        "key_time": "142.2",
        "sound_name": "ride1001",
        "key": "z"
    },
    {
        "key_time": "143.1",
        "sound_name": "ride1001",
        "key": "z"
    },
    {
        "key_time": "143.9",
        "sound_name": "ride1001",
        "key": "z"
    },
    {
        "key_time": "144.8",
        "sound_name": "ride1001",
        "key": "z"
    },
    {
        "key_time": "145.7",
        "sound_name": "ride1001",
        "key": "z"
    },
    {
        "key_time": "146.5",
        "sound_name": "ride1001",
        "key": "z"
    },
    {
        "key_time": "147.4",
        "sound_name": "cras1001",
        "key": "c"
    },
    {
        "key_time": "147.4",
        "sound_name": "stri3001",
        "key": ";"
    },
    {
        "key_time": "148",
        "sound_name": "cras1002",
        "key": "d"
    },
    {
        "key_time": "148",
        "sound_name": "stri3002",
        "key": "h"
    },
    {
        "key_time": "148.7",
        "sound_name": "cras1001",
        "key": "c"
    },
    {
        "key_time": "148.7",
        "sound_name": "stri3003",
        "key": "l"
    },
    {
        "key_time": "149.5",
        "sound_name": "cras1001",
        "key": "c"
    },
    {
        "key_time": "149.5",
        "sound_name": "stri3004",
        "key": "k"
    },
    {
        "key_time": "150.2",
        "sound_name": "cras1002",
        "key": "d"
    },
    {
        "key_time": "150.2",
        "sound_name": "stri3005",
        "key": "j"
    },
    {
        "key_time": "150.8",
        "sound_name": "bdbd1001",
        "key": "v"
    },
    {
        "key_time": "151.7",
        "sound_name": "sdsd2001",
        "key": "n"
    },
    {
        "key_time": "152.3",
        "sound_name": "bdbd1001",
        "key": "v"
    },
    {
        "key_time": "152.5",
        "sound_name": "bdbd1001",
        "key": "v"
    },
    {
        "key_time": "153.4",
        "sound_name": "sdsd2001",
        "key": "n"
    },
    {
        "key_time": "154.2",
        "sound_name": "bdbd1001",
        "key": "v"
    },
    {
        "key_time": "155.1",
        "sound_name": "sdsd2001",
        "key": "n"
    },
    {
        "key_time": "155.7",
        "sound_name": "bdbd1001",
        "key": "v"
    },
    {
        "key_time": "155.9",
        "sound_name": "bdbd1001",
        "key": "v"
    },
    {
        "key_time": "156.8",
        "sound_name": "sdsd2001",
        "key": "n"
    },
    {
        "key_time": "157.7",
        "sound_name": "bdbd1001",
        "key": "v"
    },
    {
        "key_time": "158.5",
        "sound_name": "sdsd2001",
        "key": "n"
    },
    {
        "key_time": "159.2",
        "sound_name": "bdbd1001",
        "key": "v"
    },
    {
        "key_time": "159.4",
        "sound_name": "bdbd1001",
        "key": "v"
    },
    {
        "key_time": "160.2",
        "sound_name": "sdsd2001",
        "key": "n"
    },
    {
        "key_time": "161.1",
        "sound_name": "bdbd1001",
        "key": "v"
    },
    {
        "key_time": "161.9",
        "sound_name": "sdsd2001",
        "key": "n"
    },
    {
        "key_time": "162.6",
        "sound_name": "bdbd1001",
        "key": "v"
    },
    {
        "key_time": "162.8",
        "sound_name": "bdbd1001",
        "key": "v"
    },
    {
        "key_time": "163.4",
        "sound_name": "toml2001",
        "key": "e"
    },
    {
        "key_time": "163.4",
        "sound_name": "tomr2002",
        "key": "i"
    },
    {
        "key_time": "163.7",
        "sound_name": "toml2001",
        "key": "e"
    },
    {
        "key_time": "163.7",
        "sound_name": "tomr2002",
        "key": "i"
    },
    {
        "key_time": "163.9",
        "sound_name": "toml2001",
        "key": "e"
    },
    {
        "key_time": "163.9",
        "sound_name": "tomr2002",
        "key": "i"
    },
    {
        "key_time": "164.1",
        "sound_name": "toml2001",
        "key": "e"
    },
    {
        "key_time": "164.1",
        "sound_name": "tomr2002",
        "key": "i"
    },
    {
        "key_time": "164.5",
        "sound_name": "bell2001",
        "key": "u"
    },
    {
        "key_time": "166.2",
        "sound_name": "bell2002",
        "key": "r"
    },
    {
        "key_time": "167.9",
        "sound_name": "bell2003",
        "key": "e"
    },
    {
        "key_time": "171.4",
        "sound_name": "bell2004",
        "key": "u"
    },
    {
        "key_time": "173.1",
        "sound_name": "bell2005",
        "key": "o"
    },
    {
        "key_time": "174.8",
        "sound_name": "bell2006",
        "key": "e"
    },
    {
        "key_time": "175.9",
        "sound_name": "bell2007",
        "key": "a"
    },
    {
        "key_time": "176.1",
        "sound_name": "bell2008",
        "key": "s"
    },
    {
        "key_time": "176.3",
        "sound_name": "bell2009",
        "key": "d"
    },
    {
        "key_time": "176.5",
        "sound_name": "bell2010",
        "key": "k"
    },
    {
        "key_time": "177.2",
        "sound_name": "bell2011",
        "key": "j"
    },
    {
        "key_time": "177.8",
        "sound_name": "bell2012",
        "key": "d"
    },
    {
        "key_time": "178.2",
        "sound_name": "bell2013",
        "key": "u"
    },
    {
        "key_time": "179.9",
        "sound_name": "bell2014",
        "key": "r"
    },
    {
        "key_time": "181.7",
        "sound_name": "bell2015",
        "key": "e"
    },
    {
        "key_time": "185.1",
        "sound_name": "bell2016",
        "key": "i"
    },
    {
        "key_time": "186.8",
        "sound_name": "bell2017",
        "key": "o"
    },
    {
        "key_time": "188.5",
        "sound_name": "bell2018",
        "key": "p"
    },
    {
        "key_time": "191.9",
        "sound_name": "cras1001",
        "key": "w"
    },
    {
        "key_time": "191.9",
        "sound_name": "bdbd1001",
        "key": "o"
    },
    {
        "key_time": "191.9",
        "sound_name": "bdbd1001",
        "key": "o"
    },
    {
        "key_time": "191.9",
        "sound_name": "bdbd1001",
        "key": "o"
    }
]

main();