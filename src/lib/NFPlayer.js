import less from "../styles/Main.less";

const html5 = window.applicationCache ? true : false;

let NFPlayer = class {
    constructor(attr) {
        this.Main = this.toThis();
        this.MusicList = this.toThis();
        this.Video = this.toThis();
        this.Cover = this.toThis();
        this.Interval = this.toThis();
        this.Bar = this.toThis();
        this.Switchs = this.toThis();
        this.Progress = this.toThis();
        this.Voice = this.toThis();
        html5 ? this.init(attr) : console.log('NOT IS HTML5 => NOT IE9+');
    }

    toThis() {
        return 'nf';
    }

    //初始化
    init(attr = 'NFPlayer Error') {
        if (attr === 'NFPlayer Error') {
        } else {
            this.MusicList = attr.NFPlayer;
        }
        this.Html();
        this.Code();
    };


    /**
     * 设置音乐
     * music:
     * */
    setMusic(music) {

    };

    //下一首
    Next() {

    };

    //上一首
    Prev() {

    };

    //暂停
    Stop() {

    };

    //开始
    toSwitch() {
        if (this.Video.paused) {
            this.toClassStop(this.Switchs, ' stop', 0);
            this.Video.play();
            this.Interval = setInterval(() => {
                let Percentage = (this.Video.currentTime / this.Video.duration * 100);
                if (Percentage > 100) {
                    Percentage = 100;
                }
                this.toBarWidth(Percentage);
            }, 1000);
        } else {
            this.toClassStop(this.Switchs, ' stop', 1);
            this.Video.pause();
            window.clearInterval(this.Interval);
        }
    };

    toBarWidth(bf) {
        this.Bar.style.width = bf.toFixed(2) + "%";
    }

    toEvent() {
        this.Switchs.onclick = () => {
            this.toSwitch();
        };
        this.Progress.onclick = (event) => {
            let x = event.offsetX;
            let w = this.Main.clientWidth;
            this.toBarWidth((x / w * 100));
            this.Video.currentTime = (x / w * this.Video.duration).toFixed(5);
        };
        this.Voice.onclick = () => {
            if (!this.Video.muted) {
                this.toClassStop(this.Voice, ' stop', 1);
                this.Video.muted = true;
            } else {
                this.toClassStop(this.Voice, ' stop', 0);
                this.Video.muted = false;
            }
        }
    }

    toClassStop(o, c, n) {
        if (!n) {
            o.className = o.className.replace(c, '');
        } else {
            o.className += ' stop';
        }
    }

    //html生成
    Html() {
        // let body = document.body;
        // let thisPlayer = document.createElement('div');
        // thisPlayer.id = 'thisMusic';
        // body.appendChild(thisPlayer);
    }

    setCover(num) {
        this.Cover.style.backgroundImage = "url('" + this.MusicList[num].cover + "')";
    }

    Code() {
        this.Main = document.getElementById('NFPlayer');
        this.Video = document.getElementById('NFPlayerVideo');
        this.Cover = document.getElementById('NFPlayerCover');
        this.Bar = document.getElementById('NFPlayerBar');
        this.Switchs = document.getElementById('NFPlayerSwitch');
        this.Progress = document.getElementById('NFPlayerProgress');
        this.Voice = document.getElementById('NFPlayerVoice');

        this.Video.src = this.MusicList[0].musicUrl;
        this.setCover(0);
        this.toSwitch(0);
        this.toEvent();

        // var num = 0;
        // audio.addEventListener('ended', function () {
        //
        //     with (currentIndex == num) {
        //         num = GetRandomNum(msrc.length);
        //     }
        //     currentIndex = num;
        //     num = currentIndex;
        //     audio.src = msrc[currentIndex];
        //     btn.attr("title", mlist[currentIndex]);
        //     Song();
        // }, false);

    }

};

window.NFPlayer = NFPlayer;