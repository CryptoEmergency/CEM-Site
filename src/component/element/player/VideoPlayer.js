import {
    jsx,
    jsxFrag,
    Variable,
} from "@betarost/cemjs";
// check
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';

const lead0 = function (val, n) {
    var nz = "" + val
    while (nz.length < n) {
        nz = "0" + nz
    }
    return nz
}
const formatTime = function (time) {
    let h = Math.floor(time / 3600)
    time = time - h * 3600
    let m = Math.floor(time / 60)
    let s = Math.floor(time % 60)
    return lead0(h, 2) + ":" + lead0(m, 2) + ":" + lead0(s, 2)
}

const VideoPlayer = function ({ item, path }) {
    let Static = Variable.State(item._id)
    return (
        <div class="video_container">
            <video
                playsinline
                poster={images["video_background"]}
                preload="metadata"
                src={path + item.name}
                Element={($el) => { Static.el = $el; }}
                onclick={function (e) {
                    e.stopPropagation();
                    this.paused ? this.play() : this.pause();
                }}
                onplay={function (e) {
                    Static.play = true
                    Static.controlsPause.src = svg["player_pause"]
                    Static.controlsPause.classList.remove("paused");
                }}
                onpause={function (e) {
                    Static.play = false
                    Static.controlsPause.src = svg["player_play"]
                    Static.controlsPause.classList.add("paused");
                }}
                oncanplay={function (e) {
                    Static.controlsDuration.innerText = formatTime(this.duration)
                }}
                onended={function (e) {
                    Static.play = false
                    Static.controlsPause.src = svg["player_play"]
                    Static.controlsPause.classList.add("paused");
                }}
                ontimeupdate={function (e) {
                    Static.controlsCurrentTime.innerText = formatTime(this.currentTime)
                    let progress = Math.floor(this.currentTime) / Math.floor(this.duration);
                    Static.controlsProgressLine.style.width = progress * 100 + '%'
                }}
                ondblclick={function (e) {
                    if (this.requestFullscreen) {
                        this.requestFullscreen()
                    } else if (this.webkitRequestFullscreen) {
                        this.webkitRequestFullscreen()
                    } else if (this.msRequestFullscreen) {
                        this.msRequestFullscreen()
                    }
                }}
            ></video>
            <div class="controls">
                <img
                    src={svg["player_play"]}
                    class="playpause paused"
                    Element={($el) => { Static.controlsPause = $el; }}
                    onclick={function (e) {
                        e.stopPropagation();
                        Static.el.paused ? Static.el.play() : Static.el.pause();
                    }}
                />
                <span class="progress_player">
                    <span
                        class="total_player"
                        onclick={function (e) {
                            e.stopPropagation()
                            let elem
                            if (e.target.className === "current") {
                                elem = e.target.parentElement
                            } else {
                                elem = e.target
                            }
                            let progress = Math.floor(e.offsetX) / Math.floor(elem.clientWidth);
                            Static.controlsProgressLine.style.width = progress * 100 + '%'
                            Static.el.currentTime = Static.el.duration * progress
                        }}
                    >
                        <span
                            Element={($el) => { Static.controlsProgressLine = $el; }}
                            class="current"
                        >​</span>
                    </span>
                </span>
                <span class="time">
                    <span
                        class="currentTime"
                        Element={($el) => { Static.controlsCurrentTime = $el; }}
                    >00:00:00</span> /
                    <span
                        class="duration"
                        Element={($el) => { Static.controlsDuration = $el; }}
                    >00:00:00</span>
                </span>
                <span class="volume">
                    <img
                        src={svg["player_dynamic_on"]}
                        class="dynamic"
                        onclick={function (e) {
                            e.stopPropagation();
                            Static.el.muted = !Static.el.muted
                            if (Static.el.muted) {
                                this.src = svg["player_dynamic_off"];
                                this.classList.add("off");
                            } else {
                                this.src = svg["player_dynamic_on"];
                                this.classList.remove("off");
                            }
                        }}
                    />
                </span>
                <span class="player_fullsize">
                    <img
                        src={svg["player_fullsize_on"]}
                        onclick={function (e) {
                            e.stopPropagation();
                            if (Static.el.requestFullscreen) {
                                Static.el.requestFullscreen()
                            } else if (Static.el.webkitRequestFullscreen) {
                                Static.el.webkitRequestFullscreen()
                            } else if (Static.el.msRequestFullscreen) {
                                Static.el.msRequestFullscreen()
                            }
                        }}
                    />
                </span>
            </div>
        </div>
    )
}
export { VideoPlayer }