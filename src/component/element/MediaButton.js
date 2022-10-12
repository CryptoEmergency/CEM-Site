import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";
import { If, Map } from '@component/helpers/All.js';

let inputImg = Variable.setRef();
let inputVideo = Variable.setRef();
let inputAudio = Variable.setRef();

const MediaButton = function ({ onclickText, onclickPhoto, onclickVideo, onclickAudio, onclickMic }) {

    return (
        <div class="create_post_control_block">
            <If
                data={onclickText && typeof onclickText == "function"}
                dataIf={
                    <div
                        class="create_post_control_item"
                        onclick={onclickText}
                    >
                        <img src={svg["post_text"]} />
                    </div>
                }
            />
            <If
                data={onclickPhoto && typeof onclickPhoto == "function"}
                dataIf={
                    <div class="createPostImageCreator create_post_control_item" onclick={() => {
                        inputImg().click();
                    }}>
                        <img src={svg["post_photo"]} />
                        <input
                            style="display: none;"
                            class="createPostImageInput"
                            onchange={onclickPhoto}
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif"
                            ref={inputImg}
                        // multiple="multiple"
                        />
                    </div>
                }
            />
            <If
                data={onclickVideo && typeof onclickVideo == "function"}
                dataIf={
                    <div class="createPostVideoCreator create_post_control_item" onclick={() => {
                        inputVideo().click();
                    }}>
                        <img src={svg["post_video"]} />
                        <input
                            style="display: none;"
                            class="createPostVideoInput"
                            onchange={onclickVideo}
                            type="file"
                            accept=".mp4,.avi,.mov,.mkv,.avi,.flv"
                            ref={inputVideo}
                        />
                    </div>
                }
            />
            <If
                data={onclickAudio && typeof onclickAudio == "function"}
                dataIf={
                    <div class="createPostAudioCreator create_post_control_item" onclick={() => {
                        inputAudio().click();
                    }}>
                        <img src={svg["post_audio"]} />
                        <input
                            style="display: none;"
                            class="createPostAudioInput"
                            onchange={onclickAudio}
                            type="file"
                            accept=".mp3,.wav,.aiff,.aac,.ogg,.wma"
                            ref={inputAudio}
                        />
                    </div>
                }
            />
            <If
                data={onclickMic && typeof onclickMic == "function"}
                dataIf={
                    <button data-page_type="posts" data-type="voiceline" class="createPostAudioCreator create_post_control_item" onclick={onclickMic}></button>
                }
            />
        </div>
    )
}
//I check
export { MediaButton }