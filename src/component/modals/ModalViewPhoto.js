import {
    jsx,
    jsxFrag,
    Variable,
    init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import {
    VideoPlayer,
} from '@component/element/index.js';



const ModalViewPhoto = function ({ fullPath = false, path, arrMedia = null }, ID) {
    let [Static] = fn.GetParams({ data: { path } })
    let [mainStatic] = fn.GetParams({ actual: true })
    let close = true
    init(
        () => {
            console.log('=3e2bc4=', path, arrMedia, mainStatic)
            Static.elMedia = {}
        },
        () => {
            return (
                <div
                    class="c-modal c-modal--open" id="test2"
                    After={
                        () => {
                            for (let key in Static.elMedia) {
                                if (Static.elMedia[key].el.src.includes(path)) {
                                    Static.elMedia[key].el.play()

                                    const container = document.getElementById('test2');
                                    const el = document.getElementById(`${path}`);
                                    container.scrollTop = el.offsetTop
                                    console.log('=4732e1=', el.offsetTop)
                                }

                            }

                        }
                    }
                    onclick={function (e) {
                        if (close) {

                            fn.modals.close(ID)
                        }
                    }}
                >
                    <section class="c-modal__dialog c-modal__dialog--lg" onmouseover={function () {

                        close = false

                    }}
                        onmouseleave={function () {

                            close = true

                        }}>
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">{arrMedia ? Variable.lang.h.modal_viewFile : ''}</h2>
                            <button
                                class="c-modal__close"
                                onclick={() => {
                                    fn.modals.close(ID)
                                }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            {() => {
                                if (!arrMedia) {
                                    return (
                                        <img src={fullPath ? path : `/assets/upload/orig/${path}`} width="100%" height="" />
                                    )
                                } else {
                                    return (
                                        <ul class="c-viewarrmedia">
                                            {
                                                arrMedia.map((item) => {
                                                    console.log('=1c4edf=', item, path)

                                                    if (item.type == "image") {
                                                        return (
                                                            <li id={item.name} class="c-viewarrmedia__item">
                                                                <img
                                                                    class="c-viewarrmedia__image"
                                                                    src={`/assets/upload/chat/${item.name}`}
                                                                    width="100%"
                                                                    height=""
                                                                    onLoad={path == item.name ? () => {
                                                                        const container = document.getElementById('test2');
                                                                        const el = document.getElementById(`${path}`);
                                                                        container.scrollTop = el.offsetTop
                                                                    } : null}
                                                                />
                                                            </li>
                                                        )
                                                    } else if (item.type == "video") {
                                                        return (
                                                            <li id={item.name} class="c-viewarrmedia__item">
                                                                <VideoPlayer
                                                                    className={"c-viewarrmedia__image"}
                                                                    Static={Static}
                                                                    item={item}
                                                                    path={`/assets/upload/chat/`}
                                                                    onLoad={
                                                                        //работает вряд ли. Чем заменить?
                                                                        path == item.name ? () => {
                                                                            const container = document.getElementById('test2');
                                                                            const el = document.getElementById(`${path}`);
                                                                            container.scrollTop = el.offsetTop
                                                                            console.log('=2d2033=', '!!!')
                                                                        } : null
                                                                    }
                                                                />
                                                            </li>
                                                        )
                                                    }
                                                })
                                            }
                                        </ul>
                                    )
                                }
                            }}
                        </div>
                        <div class="c-modal__footer"></div>
                    </section >
                </div >
            );
        }, ID
    )


};

export default ModalViewPhoto;