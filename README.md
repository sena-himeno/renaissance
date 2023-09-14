# Renaissance

文艺复兴

# 基础说明

该仓库内容目前以能够使用工画堂黑猫组的音游为方向，所制作的一个web音游。
至于之所以使用工画堂黑猫组的音游资源，因为它包含几部官方创作和民间创作，总的来说有不少现成资源，但也因此部分逻辑被资源所局限，后续改动应该不难，但这也是未来可期的事件了。
所以如果你想使用仓库内容，你必须自备所需要的资源(资源不难找，请你自己搜索)。

当然并不是直接拿到对应的资源就能用，有被一些操作难以实现和自己的一些想法所进行了一点调整
1. song.txt中Key的信息和Lyrics应该是要分离的，所以你需要把song.txt中的Lyrics进行删除
2. song.txt中的第一个Key不能太早，因为全局的时间参照是歌曲的播放时间，listener中提前对应的秒数读取打印Key和歌曲播放时间有关
3. 



目前阶段还在探索阶段，虽然之前搞了一个，但它太低劣了.....
目前ui还处于待定状态，
相关逻辑正在用js实现中。

如果你想看低劣版本的效果，你只需要准备相关文件并文件按照放置到对应的目录，目录及文件信息在SongInfo.js中。
目前新编写js内容都在newjs目录下，关于目前的内容如何使用，你可以参考newjs/jsunit.js (请看该文件最下面(最新)的调用 ，页面是newjs/test.html ，如果你用vscode可以直接使用live server扩展直接打开查看。

关于UI的想法会在/ui.drawio中画出，如果你使用vscode的话只需要安装它的扩展即可查看。

值得一提本人前端萌新，如果丑陋的写法让你高血压了那么请见谅，如果你对它也有兴趣那么期待你的加入。
(不过会有陌生人能看到这个吗，如果能的话那我.... ε=ε=ε=┏(゜ロ゜;)┛ (逃げろよ!   

# 如何使用

 1. 准备相关资源文件并把它们放进对应的目录下

 2. 安裝 Node.js

 https://nodejs.org/en/

 3. 安裝依赖

```bash
npm install
```

 4. 运行本機服務器

```bash
npm start
```

然後打開 http://localhost:3000


# Schedule

## UI


| name           | status  | description |
| -------------- | ------- | ----------- |
| index          | pending | home page   |
| sog page       | pending | play page   |
| page structure | pending |             | 
| page elements  | pending |             |
|                |         |             |


## JS


| name           | status          | description                |
| -------------- |-----------------|----------------------------|
| FileControoler | Done(basic        | load file                  |
| KeyBoard       | to be continued | key event                  |
| KeySound       | Done(basic      | key sound controller       | 
| Score          | to be continued | score calculator           |
| Onclick        | pending         | button onclick event       |
| SelectSong     | to be continued | song selection operation   |
| Rule           | to be continued | score calculation standard |
| Listener       | to be continued | global event handling      |
| DOM            | pending         | DOM and  variable          |
| View           |  to be continued         | canvas -> print key        |
| Lyrics         | unknown         |                            |
|                |                 |                            |



