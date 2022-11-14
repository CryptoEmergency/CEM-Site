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
        <div class="c-mediabtn create_post_control_block">
            {
                typeof onclickText == "function"
                    ?
                    <div
                        class="c-mediabtn__action create_post_control_item"
                        onclick={onclickText}
                    >
                        <img class="c-mediabtn__icon" src={svg["post_text"]} />
                    </div>
                    :
                    null
            }
            {
                typeof onclickPhoto == "function"
                    ?
                    <div class="c-mediabtn__action createPostImageCreator create_post_control_item" onclick={() => {
                        inputImg().click();
                    }}>
                        <img class="c-mediabtn__icon" src={svg["post_photo"]} />
                        <input
                            style="display: none;"
                            class="c-mediabtn__hidefield createPostImageInput"
                            onchange={onclickPhoto}
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif"
                            ref={inputImg}
                        // multiple="multiple"
                        />
                    </div>
                    :
                    null
            }
            {
                typeof onclickVideo == "function"
                    ?
                    <div class="c-mediabtn__action createPostVideoCreator create_post_control_item" onclick={() => {
                        inputVideo().click();
                    }}>
                        <img class="c-mediabtn__icon" src={svg["post_video"]} />
                        <input
                            style="display: none;"
                            class="c-mediabtn__hidefield createPostVideoInput"
                            onchange={onclickVideo}
                            type="file"
                            accept=".mp4,.avi,.mov,.mkv,.avi,.flv"
                            ref={inputVideo}
                        />
                    </div>
                    :
                    null
            }
            {
                typeof onclickAudio == "function"
                    ?
                    <div class="c-mediabtn__action createPostAudioCreator create_post_control_item" onclick={() => {
                        inputAudio().click();
                    }}>
                        <img class="c-mediabtn__icon" src={svg["post_audio"]} />
                        <input
                            style="display: none;"
                            class="c-mediabtn__hidefield createPostAudioInput"
                            onchange={onclickAudio}
                            type="file"
                            accept=".mp3,.wav,.aiff,.aac,.ogg,.wma"
                            ref={inputAudio}
                        />
                    </div>
                    :
                    null
            }
            {
                typeof onclickMic == "function"
                    ?
                    <button data-page_type="posts" data-type="voiceline" class="c-mediabtn__action createPostAudioCreator create_post_control_item" onclick={onclickMic}></button>
                    :
                    null
            }
        </div>
    )
}
export { MediaButton }
// OK