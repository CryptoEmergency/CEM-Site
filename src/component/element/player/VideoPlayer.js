import {
    jsx,
    jsxFrag,
    Variable,
} from "@betarost/cemserver/cem.js";
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
// let Static = Variable.State(item._id)
const VideoPlayer = function ({ Static, item, path, className = false, customClick = false }) {
    if (!Static.elMedia[item._id]) {
        Static.elMedia[item._id] = {}
    }
    let elMedia = Static.elMedia[item._id]
    let playButton, playLoader

    // console.log('=VideoPlayer=', item)
    return (
        <div
            class={[
                "video_container",
                className ? className : null
            ]}
        >
            <div class="video_sign"></div>
            <img
                Element={($el) => { playButton = $el; }}
                style="width: 10%; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)"
                src={svg['play_button']} onclick={function (e) {
                    if (customClick) {
                        customClick()
                    } else {
                        e.stopPropagation();
                        elMedia.el.paused ? elMedia.el.play() : elMedia.el.pause();
                    }
                }}
            />
            <div Element={($el) => { playLoader = $el; }} style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); display: none;" class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <video
                playsinline
                poster={item.previewName ? `/assets/upload/posts/${item.previewName}` : images["video_background"]}
                preload="none"  //metadata
                src={path + item.name}
                Element={($el) => { elMedia.el = $el; }}
                onclick={function (e) {
                    if (customClick) {
                        customClick()
                    } else {
                        e.stopPropagation();
                        this.paused ? this.play() : this.pause();
                    }
                }}
                onplay={function (e) {
                    if (customClick) {
                        customClick()
                    } else {
                        Object.values(Static.elMedia).forEach((audio) => {
                            if (audio.play && audio != elMedia) {
                                audio.el.pause()
                            }
                        })
                        elMedia.play = true
                        playButton.style.display = 'none'
                        if (this.buffered.length == 0) {
                            playLoader.style.display = 'block'
                        }
                        elMedia.controlsPause.src = svg["player_pause"]
                        elMedia.controlsPause.classList.remove("paused");
                    }
                }}
                onpause={function (e) {
                    if (customClick) {
                        customClick()
                    } else {
                        elMedia.play = false
                        playLoader.style.display = 'none'
                        playButton.style.display = 'block'
                        elMedia.controlsPause.src = svg["player_play"]
                        elMedia.controlsPause.classList.add("paused");
                    }
                }}
                oncanplay={function (e) {
                    if (customClick) {
                        customClick()
                    } else {
                        elMedia.controlsDuration.innerText = formatTime(this.duration)
                        playLoader.style.display = 'none'
                    }
                }}
                onended={function (e) {
                    if (customClick) {
                        customClick()
                    } else {
                        elMedia.play = false
                        elMedia.controlsPause.src = svg["player_play"]
                        elMedia.controlsPause.classList.add("paused");
                    }
                }}
                ontimeupdate={function (e) {
                    if (customClick) {
                        customClick()
                    } else {
                        playLoader.style.display = 'none'
                        elMedia.controlsCurrentTime.innerText = formatTime(this.currentTime)
                        let progress = this.currentTime / this.duration;
                        elMedia.controlsProgressLine.style.width = progress * 100 + '%'
                    }

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
                    Element={($el) => { elMedia.controlsPause = $el; }}
                    onclick={function (e) {
                        e.stopPropagation();
                        elMedia.el.paused ? elMedia.el.play() : elMedia.el.pause();
                    }}
                />
                <span class="progress_player">
                    <span
                        class="total_player"
                        onclick={function (e) {
                            customClick ?
                                customClick()
                                :
                                e.stopPropagation()
                            let elem
                            if (e.target.className === "current") {
                                elem = e.target.parentElement
                            } else {
                                elem = e.target
                            }
                            let progress = Math.floor(e.offsetX) / Math.floor(elem.clientWidth);
                            elMedia.controlsProgressLine.style.width = progress * 100 + '%'
                            elMedia.el.currentTime = elMedia.el.duration * progress
                        }}
                    >
                        <span
                            Element={($el) => { elMedia.controlsProgressLine = $el; }}
                            class="current"
                        >​</span>
                    </span>
                </span>
                <span class="time">
                    <span
                        class="currentTime"
                        Element={($el) => { elMedia.controlsCurrentTime = $el; }}
                    >00:00:00</span> /
                    <span
                        class="duration"
                        Element={($el) => { elMedia.controlsDuration = $el; }}
                    >00:00:00</span>
                </span>
                <span class="volume">
                    <img
                        src={svg["player_dynamic_on"]}
                        class="dynamic"
                        onclick={function (e) {
                            e.stopPropagation();
                            elMedia.el.muted = !elMedia.el.muted
                            if (elMedia.el.muted) {
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
                            if (elMedia.el.requestFullscreen) {
                                elMedia.el.requestFullscreen()
                            } else if (elMedia.el.webkitRequestFullscreen) {
                                elMedia.el.webkitRequestFullscreen()
                            } else if (elMedia.el.msRequestFullscreen) {
                                elMedia.el.msRequestFullscreen()
                            }
                        }}
                    />
                </span>
            </div>
        </div>
    )
}
export { VideoPlayer }