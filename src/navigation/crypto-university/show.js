import {
    jsx,
    jsxFrag,
    Variable,
    init,
    initReload,
    load,
    Data,
    CEM
} from "@betarost/cemserver/cem.js";

// import { fn } from '@src/functions/index.js';
// import svg from '@assets/svg/index.js';
// import images from "@assets/images/index.js";
import { Avatar, LentaMedia, Evaluation, ItemsMenu, ButtonShowMore, ButtonSubmit, TextArea, NotFound, Comment } from "@elements/element/index.js";
import { BlockError404 } from '@elements/blocks/index.js';
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

const { images, svg, fn } = CEM

const Tags = function ({ Static, classActive, text, type }) {
    return (
        <div class={["tag_button", classActive]}
            onclick={async () => {
                if (Static.activeCategory == type) {
                    return;
                }
                Static.activeCategory = type;
                Static.apiFilter = makeFilter(Static)
                await fn.restApi.getNews({ name: Static.nameRecords, filter: Static.apiFilter })
            }}>
            <span>{text}</span>
        </div>
    )
}

const makeFilter = function (Static) {
    let objReturn = { type: Static.type }
    if (Static.type == "university") {
        objReturn["languages.code"] = Static.activeCategory
    } else {
        if (Static.activeCategory != "All") {
            objReturn["category.name"] = Static.activeCategory
        }
    }
    return objReturn
}

const start = function (data, ID) {
    let [Static, item] = fn.GetParams({ data, ID, initData: "cryptouniversity_show" })

    Variable.HeaderShow = true;

    const swiperGo = function (numIndex) {
        let swiperitem = new Swiper(".swiper-post_authors", {
            // effect: "cube",
            grabCursor: true,
            // cubeEffect: {
            //     shadow: true,
            //     slideShadows: true,
            //     shadowOffset: 20,
            //     shadowScale: 0.94,
            // },
            loop: true,
            autoplay: {
                delay: 3000,
            },
            pagination: {
                el: '.swiper-pagination-post_media',
            },
            scrollbar: {
                el: '.swiper-scrollbar-post_media',
            },
            // slidesPerView: 1,
            breakpoints: {
                100: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                620: {  //600
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 50
                },
                910: {  //800
                    slidesPerView: 3,
                    spaceBetween: 46,
                },
                1240: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
            spaceBetween: 20
        });
    }

    load({
        ID,
        fnLoad: async () => {
            if (Variable.dataUrl.params) {
                Static.item = await fn.socket.get({
                    method: "CryptoUniversities",
                    _id: Variable.dataUrl.params,
                    params: {
                        populate: {
                            path: "teachers courses",
                            select: {
                                name: 1,
                                image: 1,
                                description: 1,
                                cost: 1,
                                duration: 1,

                            }
                        }
                    }
                })
                console.log('=9ebbf7=', Static.item)
            }
        },

        fn: async () => {
            console.log('=9ebbf7=', Static.item)
            if (!item._id) { return (<div><BlockError404 /></div>) }

            return (
                <div class="page-main">
                    <div class="page-main__container">
                        <div class="page-main__content">
                            
                        </div>

                    </div>
                </div>
            )
        },
    })
    return
};

export default start;