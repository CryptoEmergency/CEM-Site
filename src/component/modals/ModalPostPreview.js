import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi,
    init
} from '@betarost/cemserver/cem.js';
import svg from "@assets/svg/index.js";
import images from '@assets/images/index.js';
import { fn } from '@src/functions/index.js';
import { Input } from '@component/element/index.js';
import { BlockLentaUsers } from '@component/blocks/index.js';

// let Static = {}


const ModalPostPreview = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })
    let close = true
    init(
        () => {
            Static.elShowTextFull = {}
            Static.elShowTextShort = {}
            Static.elMedia = {}
            Static.elNumberSwiper = {}
            // console.log('=828ffb=', Static)
        },
        () => {
            return (
                <div
                    class="c-modal c-modal--open c-modal--fullscreen c-modal--menu"
                    id="userPost"
                    onclick={function (e) {
                        if (close) {

                            fn.modals.close(ID)
                        }
                    }}
                >
                    <section class="c-modal__dialog" onmouseover={function () {

                        close = false

                    }}
                        onmouseleave={function () {

                            close = true

                        }}>
                        <div class="c-modal__body" >
                            <div class="user_post_container">
                                <div class="user_news_block">
                                    <div class="user_post_header">
                                        <a
                                            class="close_modal_link"
                                            onclick={() => {
                                                Variable.DelModals("ModalPostPreview");
                                                initReload("modals");
                                            }}
                                        >
                                            <img class="go_back_icon" src={svg.go_back_icon} />
                                            <span class="full_news_go_back">{Variable.lang.span.back}</span>
                                        </a>
                                        {/* {{ #arrayWhile list_records }} */}
                                        {/* <div class="comment_icon_type-1 answer_additionally_toggle"> ...</div> */}
                                        {/* {{/ arrayWhile}} */}
                                    </div>
                                    <BlockLentaUsers
                                        Static={Static}
                                        item={data}
                                    // ElemVisible={() => {
                                    //     fn.recordsView(data._id, "setPost")
                                    // }}
                                    />
                                </div >
                            </div >
                        </div>
                    </section>
                </div >
            )
        }, ID
    )
}

export default ModalPostPreview;