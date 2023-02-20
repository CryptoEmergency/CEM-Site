import {
    jsx,
    jsxFrag,
    load,
    initReload,
    Variable
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
// import Swiper from 'swiper/bundle';
import { Swiper } from '@component/element/index.js';
import svg from '@assets/svg/index.js';
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


const filterUser = (Static, item) => {
    if (Static.filterText.length !== 0) {
        return (
            <div class="planning-user_item"
                onClick={() => {
                    if (!Static.user.includes(item)) {
                        Static.user.push(item)
                        Static.isValid = true
                    }
                    Static.elInput.value = null
                    Static.filterText = null
                    initReload()
                }}
            >
                <div class="planning-user_avatar">
                    <img
                        class="planning-user_avatar-preview"
                        src={`/assets/upload/avatar/${item.avatar.name}`}
                    />
                </div>

                <span class="planning-user_name"> {item.nickname} </span>
            </div>
        )
    } else {
        null
    }
}

const swiperOptions = {
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
            spaceBetween: 0
        },
        500: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        620: {  //600
            slidesPerView: 4,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        910: {  //800
            slidesPerView: 5,
            spaceBetween: 30,
        },
        1240: {
            slidesPerView: 7,
            spaceBetween: 50,
        },
    },
    spaceBetween: 20
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
                                        Static.activeTask.title = Static.elTitle.textContent
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
                                        Static.activeTask.text = Static.elText.textContent
                                    }}
                                >
                                </div>
                                <p class="user-title">Список группы</p>
                                <div class="user-list">
                                    {Static.dataUsers.list_records.map((user) => {
                                        if (Static.userListDuplicate.includes(user._id)) {
                                            return (
                                                <div class="user-list-avatar"
                                                    onClick={() => {
                                                        if (!Static.user.includes(user)) {
                                                            Static.user.push(user)
                                                            let index = Static.userListDuplicate.indexOf(user._id)
                                                            if(index >= 0) {
                                                                Static.userListDuplicate.splice(index, 1);
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
                                <p class="user-title">
                                    Список добавленных
                                </p>
                                <div class="user-list">

                                    {
                                        () => {
                                            if (Array.isArray(Static.user) && Static.user.length) {
                                                    return Static.user.map((item) => {
                                                        console.log(item)
                                                        return (
                                                            <div class="user-list-avatar"
                                                                onClick={() => {
                                                                    if (!Static.userListDuplicate.includes(item._id)) {
                                                                        Static.userListDuplicate.push(item._id)
                                                                        let index = Static.user.indexOf(item)
                                                                        if(index >= 0) {
                                                                            Static.user.splice(index, 1);
                                                                        }
                                                                    }
                                                                    initReload()
                                                                }}
                                                            >
                                                                <img src={`/assets/upload/avatar/${item.avatar.name}`} />
                                                            </div>
                                                        )
                                                    })
                                            }
                                        }
                                    }

                                </div>
                                <div class="tasking-media">
                                    <div class="tasking-media-button"
                                        onClick={() => {
                                            Static.elInputImg.click()
                                        }}
                                    >
                                        <img src={svg["post_photo"]} />
                                        <input 
                                            type="file"
                                            hidden
                                            multiple
                                            Element={($el) => { Static.elInputImg = $el }}
                                            onchange={async function (e) {
                                                e.stopPropagation();
                                                Array.from(this.files).forEach((item) => {

                                                    fn.uploadMedia (
                                                        item,
                                                        "gallery",
                                                        async function () {
                                                            if (!this.response) {
                                                                alert("Произошла ошибка Попробуйте еще раз")
                                                                return
                                                            }
                                                            let response = JSON.parse(this.response);
                                                            Static.activeFiletype = response.mimetype.includes("image") ? "image" : "video"

                                                            initReload()

                                                            let data = {
                                                                type: response.mimetype,
                                                                name: response.name
                                                            }
                                                            console.log(data)

                                                            Static.activeTask.media.push(data)
                                                            console.log(Static.activeTask.media)

                                                        }
                                                    )
                                                })
                                                initReload()
                                            }}
                                        />
                                    </div>
                                </div>

                                {
                                    () => {
                                        if (Array.isArray(Static.activeTask.media) && Static.activeTask.media.length) {
                                            return (
                                                <div class="tasking-media_list">
                                                    {Static.activeTask.media.map((item, index) => {
                                                        return (
                                                            <div class="tasking-media_list-wrapper">
                                                                <img 
                                                                    class="tasking-media_list-preview" 
                                                                    src={`/assets/upload/gallery/${item.name}`}
                                                                    width="60"
                                                                    height="60"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
                                                                        fn.modals.ModalViewPhoto({
                                                                            path: item.name,
                                                                        });
                                                                    }}
                                                                />
                                                                <div
                                                                    class="tasking-media-delete"
                                                                    onClick={() => {
                                                                        Static.activeTask.media.splice(index, 1);
                                                                        initReload()
                                                                    }}
                                                                >
                                                                    <img src={svg["delete_icon"]} />
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        } else {
                                            null
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
    } else if (Static.modalUser == true) {
        return (
            <div>
                <div class="c-modal c-modal--open">
                    <section class="c-modal__dialog">
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">Новый участник</h2>
                            <button
                                type="button"
                                class="c-modal__close"
                                onclick={() => {
                                    Static.activeNotes = null
                                    Static.modalUser = false
                                    Static.isValid = false
                                    initReload()
                                }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div class="create_post_container">
                                <div class="planning-users">
                                    <input class="planning-users-search" type="search" placeholder={Variable.lang.placeholder.findFriends}
                                        Element={($el) => {
                                            Static.elInput = $el
                                        }}
                                        oninput={() => {

                                            Static.filterText = Static.elInput.value.trim().toLowerCase()
                                            if (Static.timerChange) {
                                                clearTimeout(Static.timerChange)
                                            }
                                            Static.timerChange = setTimeout(() => {
                                                initReload()
                                            }, 500)
                                        }}
                                    />
                                    <div class={[Static.user.length === 0 ? null : "planning-user_group"]}>
                                        {Static.user.map((item, index) => {
                                            return (
                                                <div class="planning-user_group-name">
                                                    <span>
                                                        {item.nickname}
                                                    </span>
                                                    <img src={svg["close_group"]}
                                                        onClick={() => {
                                                            Static.user.splice(index, 1)
                                                            initReload()
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div class="planning-user">
                                        {Static.dataUsers.list_records.map((user) => {
                                            if (Static.filterText !== 0 && Static.filterText !== "" && user.nickname.toLowerCase().includes(Static.filterText)) {
                                                return (
                                                    <div class="planning-user_list">
                                                        {filterUser(Static, user)}
                                                    </div>
                                                )
                                            } else {
                                                null
                                            }
                                        })}
                                    </div>
                                </div>
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
                                        if (Static.user) {
                                            Static.user.map((item) => {
                                                Static.tmp.list_records[0].users.push(item._id)
                                            })
                                        }
                                        Static.modalUser = false
                                        initReload()
                                    }}
                                >
                                    <span class="c-button__text">Добавить</span>
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
    Static.userListDuplicate = null
    Static.modal = null
    Static.modalUser = null
    Static.elTitle = null
    Static.elText = null
    Static.elInputImg = null
    Static.elInput = null
    Static.filterText = null
    Static.user = []
    Static.activeTask = {
        title: null,
        text: null,
        media: []
    }

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

    load({
        ID,
        fnLoad: async () => {
            Static.tmp = await fn.restApi.getUserPlanning({ filter: { _id: "63ecd99622bc0bd4296a0be2" } })
            Static.dataUsers = await fn.restApi.getUsers({ name: Static.nameRecords, filter: Static.apiFilter, limit: 10 })
        },
        fn: () => {
            console.log('=2def43=', Static.tmp.list_records[0].users)
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
                                        <div class="tasking-user">
                                            <h3>Участники комнаты</h3>
                                            <div class="tasking-user-append">
                                                    <div 
                                                        class="tasking-user-append-add"
                                                        onClick={() => {
                                                            Static.modalUser = true
                                                            Static.user = []
                                                            initReload()
                                                        }}
                                                    >
                                                        <img src={svg["message_add_file"]} />
                                                    </div>
                                            </div>
                                            {/* <div class="tasking-user-wrapper"> */}
                                                {/* <div class="tasking-user_container"> */}
                                                    <Swiper
                                                        options={swiperOptions}
                                                        slide={
                                                            Static.dataUsers.list_records.map((user) => {
                                                                if (Static.userList.includes(user._id)) {
                                                                    console.log(user._id)
                                                                    return (
                                                                        <a class="tasking-user_item swiper-slide">
                                                                            <div class="tasking-user_avatar">
                                                                                <img
                                                                                    class="tasking-user_avatar-preview"
                                                                                    src={`/assets/upload/avatar/${user.avatar.name}`}
                                                                                />
                                                                                <img class="tasking-user_avatar-delete" src={svg["delete_notes"]}
                                                                                    onclick={() => {
                                                                                        // fn.modals.ModalConfirmAction({
                                                                                        //     action: async () => {
                                                                                                if (Static.userList.includes(user._id)) {
                                                                                                    
                                                                                                    let index = Static.userList.indexOf(user._id)
                                                                                                    if(index >= 0) {
                                                                                                        Static.userList.splice(index, 1);
                                                                                                        initReload()
                                                                                                        console.log(Static.userList)
                                                                                                    }
                                                                                                }
                                                                                                
                                                                                                // deleteNote(Static, { _id: Static.activeNotes._id, active: false })
                                                                                                
                                                                                        //         fn.modals.close("ModalConfirmAction")
                                                                                        //     },
                                                                                        //     text: Variable.lang.p.deleteNotesConfirm,
                                                                                        //     button: Variable.lang.button.yes
                                                                                        // })
                                                                                    }} 
                                                                                />
                                                                            </div>
                                                                            <span class="tasking-user_name"> {user.nickname} </span>
                                                                        </a>
                                                                    )
                                                                } else {
                                                                    null
                                                                }
                                                            })
                                                        }
                                                    />
                                                    {/* {Static.dataUsers.list_records.map((user) => {
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
                                                    })} */}
                                                {/* </div> */}
                                            {/* </div> */}
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
                                        Static.userListDuplicate = Array.from(Static.userList)
                                        Static.user = []
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
