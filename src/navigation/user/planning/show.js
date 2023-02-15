import {
    jsx,
    jsxFrag,
    load,
    initReload,
    Variable
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import Swiper from 'swiper/bundle';
import { BlockShowNews, BlockError404 } from '@component/blocks/index.js';

import 'swiper/css/bundle';

const renderUser = (Static, user) => {
    if (Static.userList.includes(user._id)) {
        
    } else {
        null
    }
}

const start = function (data, ID) {
    let [Static, item] = fn.GetParams({ data, ID })

    Static.userList = null

    const swiperGo = function (index) {
        let swiperItem = new Swiper(".tasking-user", {
            grabCursor: true,
            spaceBetween: 30,
            // autoplay: {
            //     delay: 3000,
            // },
            pagination: {
                el: '.swiper-pagination',
            },
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
                    slidesPerView: 2,
                    spaceBetween: 50
                },
                910: {  //800
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1240: {
                    slidesPerView: 6,
                    spaceBetween: 50,
                },
            },
            spaceBetween: 20
        })
    }

    load({
        ID,
        fnLoad: async () => {
            Static.tmp = await fn.restApi.getUserPlanning({ filter: { _id: "63ecd99622bc0bd4296a0be2" } })
            Static.dataUsers = await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter, limit: 10 })
        },
        fn: () => {
            console.log('=2def43=', Static.dataUsers.list_records)
            if (!item._id) { return (<div><BlockError404 /></div>) }
            return (
                <div class="blog_page_container c-main__body">
                    <div class="tasking">
                        <div class="tasking_container">
                            {Static.tmp.list_records.map((item) => {
                                Static.userList = item.users
                                return (
                                    <div class="tasking-item">
                                        <h2 class="tasking-title">
                                            {item.title}
                                        </h2>
                                        <div class="tasking-description">
                                            <p>
                                                {item.text}
                                            </p>
                                        </div>
                                        <div class="tasking-user" After={() => swiperGo()}>
                                            <h3>Участники комнаты</h3>
                                            <div class="tasking-user_container swiper-wrapper">
                                                {Static.dataUsers.list_records.map((user) => {
                                                    if (Static.userList.includes(user._id)) {
                                                        return (
                                                            <div class="tasking-user_item swiper-slide">
                                                                <div class="tasking-user_avatar">
                                                                    <img
                                                                        class="tasking-user_avatar-preview"
                                                                        src={`/assets/upload/avatar/${user.avatar.name}`}
                                                                    />
                                                                </div>
                                                                <span class="tasking-user_name"> {user.nickname} </span>
                                                            </div>
                                                        )
                                                    } else {
                                                        null
                                                    }
                                                })}
                                            </div>
                                            <div class="swiper-pagination"></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        }
    })
}
export default start;
