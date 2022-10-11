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
    console.log('=7c211e=', numIndex, index)
    initOne(
        () => {
            // video = Variable.setRef()
        }
    )

    return (

        <div class="video_container">
            {/* <video playsinline poster={images["video_background"]} preload="metadata" onended="playerEnded(event, this)" onplay="playerPlay(event, this)" onpause="playerPause(event, this)" oncanplay="playerCanplay(event, this)" ontimeupdate="playerTimeupdate(event, this)" onclick="controlPlayerClick(event, this)" ondblclick="openFullscreenThis(event, this)" src={path + item.name}></video> */}
            <video playsinline poster={images["video_background"]} preload="metadata" src={path + item.name} ref={elem[numIndex][index]}></video>

            <div class="controls">
                <img src={svg["player_play"]} class="playpause paused"
                    onclick={() => {
                        console.log('=437f84=', elem, numIndex, index)
                        console.log('=920446=', elem[numIndex][index], elem[numIndex][index]())
                        // console.log('=24e535=', elem[numIndex][index]().paused)
                        elem[numIndex][index]().play()
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