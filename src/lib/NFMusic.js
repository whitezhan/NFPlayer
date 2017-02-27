import less from "../styles/index.less";

const html5 = window.applicationCache ? true : false;
let NFMusic = class {
    constructor(attr) {
        this.Attr = 'Attr';
        html5 ? this.init(attr) : console.log('NOT IS HTML5 => NOT IE9+');
    }

    //初始化
    init(attr = 'NFMusic Error') {
        if (attr === 'NFMusic Error') {
        } else {
            this.Attr = attr.NFMusic;
        }
        this.Html();
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
    Action() {

    };

    //html生成
    Html() {
        let body = document.body;
        let NFMusic = document.createElement('div');
        NFMusic.id = 'NFMusic';
        body.appendChild(NFMusic);
    }
};

window.NFMusic = NFMusic;