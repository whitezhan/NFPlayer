import less from "../styles/Main.less";

const html5 = window.applicationCache ? true : false;

let NFPlayer = class {
    constructor(attr) {
        this.Main = this.toThis();
        this.MainTheme = this.toThis("Default");
        this.MusicList = this.toThis();
        this.Video = this.toThis();
        this.Cover = this.toThis();
        this.Interval = this.toThis();
        this.Progress = this.toThis();
        this.Bar = this.toThis();
        this.BarBig = this.toThis();
        this.Switchs = this.toThis();
        this.Voice = this.toThis();
        this.Current = this.toThis(-2);
        this.Max = this.toThis();
        this.BNext = this.toThis();
        this.BPrev = this.toThis();
        this.Title = this.toThis();
        this.Author = this.toThis();
        this.Pattern = this.toThis();
        this.Tree = this.toThis();
        this.Close = this.toThis();
        html5 ? this.init(attr) : console.log('NOT IS HTML5 => NOT IE9+');

    }

    toThis(v) {
        return v != null && v != undefined ? v : 'nf';
    }

    init(attr = 'NFPlayer Error') {
        this.Main = document.createElement('div');
        this.setMusic(attr);
        this.toPattern(attr.Pattern);
        this.toMainTheme(attr.Theme);
        this.Html();
        this.Code();
    };

    toMainTheme(n) {
        if (n) {
            this.MainTheme = n;
            this.Main.className = "NFPlayer NFPlayer" + this.MainTheme;
        }
    }

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
            this.toClass(this.Switchs, ' stop', 0);
            this.Video.play();
        } else {
            this.toClass(this.Switchs, ' stop', 1);
            this.Video.pause();
        }
    };

    toBarWidth(bf) {
        this.Bar.style.width = bf.toFixed(2) + "%";
        this.BarBig.style.width = bf.toFixed(2) + "%";
    }

    toMuted() {
        if (!this.Video.muted) {
            this.toClass(this.Voice, ' stop', 1);
            this.Video.muted = true;
        } else {
            this.toClass(this.Voice, ' stop', 0);
            this.Video.muted = false;
        }
    }

    toHideTree(n) {
        if (n) {
            this.toClass(this.Tree, ' none', 1);
        } else {
            this.toClass(this.Tree, ' none', 0);
        }
    }

    toEvent() {
        this.Video.addEventListener("timeupdate", () => {
            let Percentage = (this.Video.currentTime / this.Video.duration * 100);
            if (Percentage > 100) {
                Percentage = 100;
            }
            this.toBarWidth(Percentage);
        });
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
            this.toMuted();
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
            this.toMainShow();
        };
        this.Close.onclick = () => {
            this.toMainHide();
        }
    }

    toMainHide() {
        this.toClass(this.Tree, ' hide', 0);
        this.toClass(this.Main, ' show', 0);
    }

    toMainShow() {
        this.toClass(this.Tree, ' hide', 1);
        this.toClass(this.Main, ' show', 1);
    }

    toClass(o, c, n) {
        if (!n) {
            o.className = o.className.replace(c, '');
        } else {
            if (o.className.indexOf(c) === -1) {
                o.className += c;
            }
        }
    }

    Html() {
        let body = document.body;
        this.Tree = document.createElement('a');
        this.Tree.setAttribute("href", "javascript:;");
        this.Tree.className = "NFPlayerTree";
        body.appendChild(this.Tree);


        let NFPlayerProgress = document.createElement('div');
        NFPlayerProgress.className = "NFPlayerProgress";
        this.BarBig = document.createElement('div');
        this.BarBig.className = "bar";
        NFPlayerProgress.appendChild(this.BarBig);
        body.appendChild(NFPlayerProgress);

        this.Main.className = "NFPlayer NFPlayer" + this.MainTheme;

        this.Video = document.createElement('audio');
        this.Main.appendChild(this.Video);

        this.Cover = document.createElement('div');
        this.Cover.className = "cover";
        this.Main.appendChild(this.Cover);

        this.Progress = document.createElement('div');
        this.Progress.className = "progress";
        this.Bar = document.createElement('div');
        this.Bar.className = "bar";
        this.Progress.appendChild(this.Bar);
        this.Main.appendChild(this.Progress);

        let button = document.createElement('div');
        button.className = "button";
        this.BPrev = document.createElement('div');
        this.BPrev.className = "left";
        this.BNext = document.createElement('div');
        this.BNext.className = "right";
        button.appendChild(this.BPrev);
        button.appendChild(this.BNext);
        this.Main.appendChild(button);

        let info = document.createElement('div');
        info.className = "info";
        this.Title = document.createElement('div');
        this.Title.className = "title";
        this.Author = document.createElement('div');
        this.Author.className = "author";
        info.appendChild(this.Title);
        info.appendChild(this.Author);
        this.Main.appendChild(info);

        let switchDiv = document.createElement('div');
        switchDiv.className = "switch";
        this.Switchs = document.createElement('div');
        this.Switchs.className = "action";
        this.Voice = document.createElement('div');
        this.Voice.className = "voice";
        switchDiv.appendChild(this.Switchs);
        switchDiv.appendChild(this.Voice);
        this.Main.appendChild(switchDiv);

        this.Close = document.createElement('label');
        this.Close.className = "close";
        this.Main.appendChild(this.Close);

        body.appendChild(this.Main);
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
        this.toEvent();
        this.Current = this.getRandom(this.Max);
        this.setUC();
    }

};

window.NFPlayer = NFPlayer;