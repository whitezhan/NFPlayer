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
        this.Current = this.toThis(-2);
        this.Max = this.toThis();
        this.BNext = this.toThis();
        this.BPrev = this.toThis();
        this.Title = this.toThis();
        this.Author = this.toThis();
        this.Pattern = this.toThis();
        this.Tree = this.toThis();
        html5 ? this.init(attr) : console.log('NOT IS HTML5 => NOT IE9+');
    }

    toThis(v) {
        return v != null && v != undefined ? v : 'nf';
    }

    init(attr = 'NFPlayer Error') {
        this.setMusic(attr);
        this.toPattern(attr.Pattern);
        this.Html();
        this.Code();
    };

    toPattern(pat) {
        if (pat === "random") {
            this.Pattern = 'random';
        } else {
            this.Pattern = 'loop';
        }
    }

    setMusic(music) {
        if (music === 'NFPlayer Error') {
        } else {
            this.MusicList = new Array();
            for (let m of music.NFPlayer) {
                if (m.musicUrl) {
                    this.MusicList.push(m);
                }
            }
            this.Max = this.MusicList.length;
        }
    };

    getRandom(max) {
        let n = this.Current;
        while (n == this.Current) {
            n = (Math.random() * max).toFixed(0);
            if (n == 0)
                n = this.Current;
        }
        return n;
    }

    //下一首
    Next() {

        if (this.Max > 1 && this.Pattern === 'random') {
            this.Current = this.getRandom(this.Max);
            this.setUC();
            return;
        }

        if (this.Max > 1) {
            this.Current++;
            if (this.Current > this.Max) {
                this.Current = 1;
            }
            this.setUC();
        }
    };

    Prev() {

        if (this.Max > 1 && this.Pattern === 'random') {
            this.Current = this.getRandom(this.Max);
            this.setUC();
            return;
        }

        if (this.Max > 1) {
            this.Current--;
            if (this.Current == 0) {
                this.Current = this.Max;
            }
            this.setUC();
        }
    };

    toSwitch() {
        window.clearInterval(this.Interval);
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
        };
        this.BNext.onclick = () => {
            this.Next();
        };
        this.BPrev.onclick = () => {
            this.Prev();
        };
        this.Video.addEventListener('ended', () => {
            this.Next();
        }, false);
        this.Tree.onclick = () => {
            this.toClassStop(this.Tree, ' hide', 1);
            this.toClassStop(this.Main, ' show', 1);
        }
    }

    toClassStop(o, c, n) {
        if (!n) {
            o.className = o.className.replace(c, '');
        } else {
            o.className += c;
        }
    }

    Html() {
        // let body = document.body;
        // let thisPlayer = document.createElement('div');
        // thisPlayer.id = 'thisMusic';
        // body.appendChild(thisPlayer);
    }

    setUrl(num) {
        this.Video.src = this.MusicList[num].musicUrl;
    }

    setCover(num) {
        this.Cover.style.backgroundImage = "url('" + this.MusicList[num].cover + "')";
    }

    setUC() {
        this.setUrl(this.Current - 1);
        this.setCover(this.Current - 1);
        this.Title.innerHTML = this.MusicList[this.Current - 1].title;
        this.Author.innerHTML = this.MusicList[this.Current - 1].author;
        this.toBarWidth(0);
        this.toSwitch();
    }

    Code() {
        this.Main = document.getElementById('NFPlayer');
        this.Video = document.getElementById('NFPlayerVideo');
        this.Cover = document.getElementById('NFPlayerCover');
        this.Bar = document.getElementById('NFPlayerBar');
        this.Switchs = document.getElementById('NFPlayerSwitch');
        this.Progress = document.getElementById('NFPlayerProgress');
        this.Voice = document.getElementById('NFPlayerVoice');
        this.BNext = document.getElementById('NFPlayerNext');
        this.BPrev = document.getElementById('NFPlayerPerv');
        this.Title = document.getElementById('NFPlayerTitle');
        this.Author = document.getElementById('NFPlayerAuthor');
        this.Tree = document.getElementById('NFPlayerTree');
        this.toEvent();
        this.Current = this.getRandom(this.Max);
        this.setUC();
    }

};

window.NFPlayer = NFPlayer;