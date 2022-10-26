import {
    jsx,
    jsxFrag,
    Variable,
    initReload
} from '@betarost/cemjs';

import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { If, Map } from '@component/helpers/All.js';

const MediaPreview = function ({ item, index, type, formInputs }) {

    return (
        <div>
            <If
                data={item.type == "image"}
                dataIf={
                    <div class="create_post_photo_preview">
                        <img
                            class="fullsize media"
                            src={item.src !== undefined ? item.src :
                                `/assets/upload/${type}/${item.name}`}
                        />

                        <If
                            data={item.size !== undefined}
                            dataIf={<div class="circle-wrap">
                                <div class="circle" >
                                    <div class="mask full" style={`transform: rotate( ${((360 / 200) * Math.round((item.upload / item.size) * 100))}deg`}>
                                        <div class="fill" style={`transform: rotate( ${((360 / 200) * Math.round((item.upload / item.size) * 100))}deg`}></div>
                                    </div>
                                    <div class="mask half">
                                        <div class="fill" style={`transform: rotate( ${((360 / 200) * Math.round((item.upload / item.size) * 100))}deg`}></div>
                                    </div>
                                </div>
                            </div>}
                        />

                        <If
                            data={
                                item.size === undefined
                            }
                            dataIf={
                                <div class="delete_post_media" style="display: block;" onClick={() => {
                                    formInputs.mediaInputs.value.splice(index, 1);
                                    if (formInputs.mediaInputs.value.length == 0) {
                                        formInputs.mediaInputs.selectAspect = null;
                                    }
                                    initReload()
                                }}>
                                    <img src={svg["delete_icon"]} />
                                </div>
                            }
                            dataElse={
                                <div class="stop_loading"
                                    onclick={() => {
                                        formInputs.mediaInputs.value[index].upload = formInputs.mediaInputs.value[index].size
                                        formInputs.mediaInputs.value.splice(index, 1);
                                        if (formInputs.mediaInputs.value.length == 0) {
                                            formInputs.mediaInputs.selectAspect = null;
                                        }
                                        initReload()
                                    }}
                                >

                                </div>
                            }
                        />
                    </div>
                }
            />

            <If
                data={item.type == "video"}
                dataIf={
                    <div class="create_post_photo_preview">
                        {/* <img
                            class="fullsize media"
                            src={images["video_background"]}
                        /> */}
                        <If
                            data={item.src !== undefined}
                            dataIf={
                                <img
                                    class="fullsize media"
                                    src={images["video_background"]}
                                />
                            }
                            dataElse={

                                <video
                                    class="fullsize media"
                                    src={`/assets/upload/${type}/${item.name}`}
                                />

                            }
                        />

                        <If
                            data={item.size !== undefined}
                            dataIf={<div class="circle-wrap">
                                <div class="circle" >
                                    <div class="mask full" style={`transform: rotate( ${((360 / 200) * Math.round((item.upload / item.size) * 100))}deg`}>
                                        <div class="fill" style={`transform: rotate( ${((360 / 200) * Math.round((item.upload / item.size) * 100))}deg`}></div>
                                    </div>
                                    <div class="mask half">
                                        <div class="fill" style={`transform: rotate( ${((360 / 200) * Math.round((item.upload / item.size) * 100))}deg`}></div>
                                    </div>
                                </div>
                            </div>}
                        />

                        <If
                            data={
                                item.size === undefined
                            }
                            dataIf={
                                <div class="delete_post_media" style="display: block;" onClick={() => {
                                    formInputs.mediaInputs.value.splice(index, 1);

                                    initReload()
                                }}>
                                    <img src={svg["delete_icon"]} />
                                </div>
                            }
                            dataElse={
                                <div class="stop_loading"
                                    onclick={() => {
                                        formInputs.mediaInputs.value[index].upload = formInputs.mediaInputs.value[index].size
                                        formInputs.mediaInputs.value.splice(index, 1);

                                        initReload()
                                    }}
                                >

                                </div>
                            }
                        />

                        {/* <div class="delete_post_media" style="display: block;" onClick={() => {
                            formInputs.mediaInputs.value.splice(index, 1);
                            if (formInputs.mediaInputs.value.length == 0) {
                                formInputs.mediaInputs.selectAspect = null;
                            }
                            initReload()
                        }}>
                            <img src={svg["delete_icon"]} />
                        </div> */}
                    </div>
                }
            />

            <If
                data={item.type == "audio"}
                dataIf={
                    <div class="create_post_photo_preview">
                        <img
                            class="fullsize media"
                            src={images["video_background"]}
                        />
                        <div class="delete_post_media" style="display: block;" onClick={() => {
                            formInputs.mediaInputs.value.splice(index, 1);
                            if (formInputs.mediaInputs.value.length == 0) {
                                formInputs.mediaInputs.selectAspect = null;
                            }
                            initReload()
                        }}>
                            <img src={svg["delete_icon"]} />
                        </div>
                    </div>
                }
            />
        </div>

    )
}
//I check
export { MediaPreview }