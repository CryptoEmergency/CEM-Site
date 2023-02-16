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

const showListTasking = function (Static) {
    return Static.listStatus.map((item) => {
        return (
            <div class="tasking-tabs">
                <span>
                    {item.name}
                </span>
            </div>
        )
    })
}

const addForm = function (Static) {
    if (Static.modal == true) {
        return (
            <div>
                <div class="c-modal c-modal--open">
                    <section class="c-modal__dialog">
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">Новая задача</h2>
                            <button
                                type="button"
                                class="c-modal__close"
                                onclick={() => {
                                    Static.activeNotes = null
                                    Static.modal = false
                                    Static.isValid = false
                                    initReload()
                                }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div class="create_post_container">
                                <div
                                    class="create_post_calendar create_post_calendar-title"
                                    contenteditable="true"
                                    data-text="Название"
                                    Element={($el) => {
                                        Static.elTitle = $el
                                    }}
                                    oninput={() => {
                                        Static.activePlanning.title = Static.elTitle.textContent
                                        Static.elTitle.textContent.length > 0 ? Static.isValid = true : Static.isValid = false
                                        initReload()
                                    }}
                                >

                                </div>
                                <div
                                    class="create_post_calendar create_post_calendar-description"
                                    contenteditable="true"
                                    data-text="Текст"
                                    Element={($el) => {
                                        Static.elText = $el
                                    }}
                                    oninput={() => {
                                        Static.activePlanning.text = Static.elText.textContent
                                    }}
                                >
                                </div>
                                <span class="user-append-title">Добавить пользователя</span>
                                <div class="user-append">
                                    {Static.dataUsers.list_records.map((user) => {
                                        if (Static.userList.includes(user._id)) {
                                            return (
                                                <div class="user-append-avatar"
                                                    onClick={() => {
                                                        if (!Static.user.includes(user)) {
                                                            Static.user.push(user)
                                                            let index = Static.userList.indexOf(user._id)
                                                            if(index >= 0) {
                                                                Static.userList.splice(index, 1);
                                                            }
                                                        }
                                                        initReload()
                                                    }}
                                                >
                                                    <img src={`/assets/upload/avatar/${user.avatar.name}`} />
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                {
                                    () => {
                                        if (Static.user) {
                                            return Static.user.map((item) => {
                                                return (
                                                    <div class="user-create-avatar"
                                                        // onClick={() => {
                                                        //     if (!Static.user.includes(user)) {
                                                        //         Static.user.push(user)
                                                        //     }
                                                        //     initReload()
                                                        // }}
                                                    >
                                                        <img src={`/assets/upload/avatar/${item.avatar.name}`} />
                                                    </div>
                                                )
                                            })
                                        }
                                    }
                                }

                            </div>
                        </div>
                        <div class="c-modal__footer">
                            <button
                                class={[
                                    "c-button c-button--gradient2",
                                    !Static.isValid ? "c-button--inactive" : null,
                                ]}
                                type="button"
                                onClick={() => {
                                    // if (Static.isValid) {
                                    //     if (Static.activeNotes) {

                                    //         editNotes(Static)
                                    //         Static.activeNotes = null

                                    //     } else {

                                    //         addNew(Static)
                                    //         initReload()
                                    //     }
                                    //     Static.modal = false
                                    //     Static.isValid = false
                                    // } else {
                                    //     null
                                    // }
                                    testUser(Static)
                                    initReload()
                                }}
                            >
                                <span class="c-button__text">{Variable.lang.button.send}</span>
                            </button>
                        </div>
                    </section>
                </div>
                <div class="c-backdrop c-backdrop--show"></div>
            </div>
        )
    } else {
        null
    }
}

const start = function (data, ID) {
    let [Static, item] = fn.GetParams({ data, ID })

    Static.userList = null
    Static.modal = null
    Static.elTitle = null
    Static.elText = null
    Static.user = []

    Static.listStatus = [
        {
            name: Variable.lang.select.active,
        },
        {
            name: Variable.lang.select.upcoming,
        },
        {
            name: Variable.lang.select.ended,
        },
    ]

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
                    slidesPerView: 7,
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
            // console.log('=2def43=', Static.user)
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
                                                            <a class="tasking-user_item swiper-slide">
                                                                <div class="tasking-user_avatar">
                                                                    <img
                                                                        class="tasking-user_avatar-preview"
                                                                        src={`/assets/upload/avatar/${user.avatar.name}`}
                                                                    />
                                                                </div>
                                                                <span class="tasking-user_name"> {user.nickname} </span>
                                                            </a>
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
                        <div class="tasking-create">
                            <div class="tasking-create_container">
                                <span
                                    onClick={() => {
                                        Static.modal = true
                                        initReload()
                                    }}
                                >
                                    Создать задачу
                                </span>
                            </div>
                        </div>
                        <div class="tasking-list">
                            <div class="tasking-list_tabs">
                                {showListTasking(Static)}
                            </div>
                        </div>
                    </div>
                    <div class="modals-test">
                        {addForm(Static)}
                    </div>
                </div>
            )
        }
    })
}
export default start;
