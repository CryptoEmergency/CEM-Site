import {
    jsx,
    jsxFrag,
    Variable,
    init,
    initReload,
    sendApi
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { Avatar } from '@component/element/index.js';

let newFrame = null;

const changeFrame = async function (frame) {
    newFrame = frame.name;

    let data = {
        value: {
            "frame.name": newFrame
        }
    }

    let tmpRes = await sendApi.create("setUsers", data);


    if (tmpRes.status === 'ok') {
        Variable.DelModals("ModalChangeFrame")
        initReload()
    } else {
        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[tmpRes.error] } }, true);

    }
    return
}

const ModalChangeFrame = function ({ author }, ID) {
    let [Static] = fn.GetParams({ data: { author } })
    let close = true
    // console.log('=7637ad=', Static)
    // console.log('=b20eed=', Variable)

    let frames = [];

    init(
        async () => {
            Static.frames = []
            let data = await fn.restApi.getFrames({ cache: true, name: "getFrames", filter: {} })
            data.list_records.forEach((frame) => {
                Static.frames.push(frame);
            })
            Static.activeFrame = Variable.myInfo.frame.name;
        },
        () => {
            return (
                <div class="c-modal c-modal--open" id="addFrame" onclick={function (e) {
                    if (close) {

                        fn.modals.close(ID)
                    }
                }}>
                    <section class="c-modal__dialog" onmouseover={function () {

                        close = false

                    }}
                        onmouseleave={function () {

                            close = true

                        }}>
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">{Variable.lang.h.modal_changeFrame}</h2>
                            <button
                                class="c-modal__close"
                                onclick={() => {
                                    fn.modals.close(ID)
                                }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div class="frames_list">
                                {
                                    Static.frames.map((item, index) => {
                                        return (
                                            <Avatar
                                                author={author}
                                                frame={item}
                                                parent={'chooseFrame'}
                                                activeFrame={Static.activeFrame}
                                                toggleActiveFrame={function (newFrameName) {
                                                    Static.activeFrame = newFrameName
                                                    initReload()
                                                }}
                                            />
                                        )
                                    })
                                }
                            </div>
                            <div
                                class="add_avatar_button_container"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    let frame = {
                                        name: Static.activeFrame
                                    }
                                    changeFrame(frame)
                                }}
                            >
                                <div class="add_avatar_button">
                                    <span>Выбрать</span>
                                </div>
                            </div>
                        </div>
                        <div class="c-modal__footer"></div>
                    </section>
                </div>
            );
        }, ID
    )


};

export default ModalChangeFrame;