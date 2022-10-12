import { jsx, jsxFrag, init, initReload, Variable, sendApi } from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { NotifyItem } from '@component/element/NotifyItem.js';

import { MediaButton } from '@component/element/index.js';

import { If, Map } from '@component/helpers/All.js';


let formInputs


const start = function () {


    Variable.HeaderShow = false
    Variable.FooterShow = false
    Variable.showUserMenu = true


    const sendAuthorization = async function (e) {
        e.preventDefault();
        if (!formInputs.isValid) {
            return false
        }

    }

    init(
        async () => {
            formInputs = {
                textInputs: {
                    value: "",
                    show: false,
                },
                mediaInputs: {
                    value: [],
                    show: false,
                },
                isValid: false,
            };
        },

        () => {
            return (
                <div class="create_post">
                    <h3>{Variable.lang.h.createPost}</h3>
                    <form id="userPostCreate" onsubmit={sendAuthorization}>
                        <input style="display: none;" type="submit" />
                        <div style="display: flex; justify-content: flex-start;grid-gap: 15px">
                            <label for="">{Variable.lang.label.lang}:</label>
                            <div class="blog_filter_language">
                                {Variable.lang.lang}
                            </div>
                        </div>
                        <div data-type="posts" class="create_post_container">
                            <If
                                data={formInputs.textInputs.show}
                                dataIf={
                                    <div
                                        class="create_post_chapter create_post_main_text"
                                        contenteditable="true"
                                    // oninput={changeTextQuestion}

                                    ></div>

                                }
                            />
                            <If
                                data={formInputs.mediaInputs.show}
                                dataIf={
                                    <div class="create_post_chapter createPostImage">
                                        <Map
                                            data={formInputs.mediaInputs.value}
                                            dataIf={
                                                (item, index) => {
                                                    console.log('=9fe729=', item)
                                                    var reader = new FileReader();
                                                    reader.addEventListener('load', (e) => {
                                                        console.log('=a41a0e=', e.target.result)
                                                    });
                                                    reader.readAsText(item);

                                                    return (
                                                        <div class="create_post_photo_preview">
                                                            <img class="fullsize media" src="" data-type={item.type} />
                                                            <div class="delete_post_media" style="display: block;">
                                                                <img src={svg["delete_icon"]} />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }
                                        />
                                    </div>

                                }
                            />

                        </div>
                        <MediaButton
                            onclickText={
                                () => {
                                    formInputs.textInputs.show = true
                                    initReload()
                                }
                            }
                            onclickPhoto={
                                function () {
                                    if (this.files.lenght == 0) {
                                        return;
                                    }

                                    formInputs.mediaInputs.show = true
                                    formInputs.mediaInputs.value.push(...this.files)
                                    initReload()
                                }
                            }
                            onclickVideo={
                                () => {
                                    console.log('=937776=', "onclickVideo")
                                }
                            }
                            onclickAudio={
                                () => {
                                    console.log('=937776=', "onclickAudio")
                                }
                            }
                            onclickMic={
                                () => {
                                    console.log('=937776=', "onclickMic")
                                }
                            }
                        />

                    </form>
                </div>
            )
        }
    )
};

export default start;