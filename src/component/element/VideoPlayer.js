import {
    jsx,
    jsxFrag,
    Variable,
    initOne
} from "@betarost/cemjs";
import { checkAnswerApi } from "@src/functions.js";

import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
// let video
const VideoPlayer = function ({ item, numIndex, index, path, elem }) {
    initOne(
        () => {
            // video = Variable.setRef()
        }
    )

    return (

        <div class="video_container"
            onclick={(e) => {
                e.stopPropagation();
                if (elem[numIndex][index]().paused) {
                    elem[numIndex][index]().play()
                } else {
                    elem[numIndex][index]().pause()
                }

            }}
        >
            {/* <video playsinline poster={images["video_background"]} preload="metadata" onended="playerEnded(event, this)" onplay="playerPlay(event, this)" onpause="playerPause(event, this)" oncanplay="playerCanplay(event, this)" ontimeupdate="playerTimeupdate(event, this)" onclick="controlPlayerClick(event, this)" ondblclick="openFullscreenThis(event, this)" src={path + item.name}></video> */}
            <video
                playsinline
                poster={images["video_background"]}
                preload="metadata"
                src={path + item.name} ref={elem[numIndex][index]}
            >

            </video>

            <div class="controls">
                <img src={svg["player_play"]} class="playpause paused"
                    onclick={(e) => {
                        e.stopPropagation();
                        if (elem[numIndex][index]().paused) {
                            elem[numIndex][index]().play()
                        } else {
                            elem[numIndex][index]().pause()
                        }
                    }}
                //  onclick="controlPlaypause(event, this)"
                />
                <span class="progress_player">
                    <span class="total_player"
                    // onclick="controlTotalClick(event, this)"
                    >
                        <span class="current">​</span>
                    </span>
                </span>
                <span class="time">
                    <span class="currentTime">00:00:00</span> /
                    <span class="duration">00:00:00</span>
                </span>
                <span class="volume">
                    <img src={svg["player_dynamic_on"]} class="dynamic"
                    //  onclick="controlDynamicClick(event, this)" 
                    />
                </span>
                <span class="player_fullsize" style="display: none;">
                    <img src={svg["player_fullsize_on"]}
                    //  onclick="openFullscreen(event, this)" 
                    />
                </span>
            </div>
        </div>
    )
}





export { VideoPlayer }