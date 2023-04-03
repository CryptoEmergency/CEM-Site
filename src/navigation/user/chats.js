import {
    jsx,
    jsxFrag,
    Variable,
    init,
    sendApi,
    Helpers,
    initReload
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import images from "@assets/images/index.js";
import {
    Avatar,
    Swiper,
    GroupImage,
    AudioPlayer,
    AudioPlayerCopy,
    LazyImage,
    VideoPlayer,
    TextArea,
    ButtonSubmit,
    MediaButton,
    MediaPreview
} from '@component/element/index.js';

// import EmojiPicker from "rm-emoji-picker";
// import 'rm-emoji-picker/dist/emojipicker.css';
// 
const swiperOptions = {
    loop: false,
    // autoHeight: true, 
    pagination: {
        el: ".swiper-pagination",
    },
    scrollbar: {
        el: ".swiper-scrollbar",
    },
    slidesPerView: 1,
    spaceBetween: 20
};

let Search;

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })

    let el = [];


    Variable.Static.HeaderShow = false
    Variable.Static.FooterShow = false
    Variable.showUserMenu = false

    // const picker = new EmojiPicker.default();
    // const icon = document.getElementById('emoji');
    // const container = document.querySelector('.create_post_container1');
    // const editable = document.querySelector('.create_post_chapter');
    // picker.listenOn(icon, container, editable);

    const loadPhoto = async function (file, type, xhr) {
        let dataURL;
        let fileImg = file[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            // convert image file to base64 string
            dataURL = reader.result;
        }, false);
        if (fileImg) {
            reader.readAsDataURL(fileImg);
        }

        let previewObj = {
            src: dataURL,
            type: file[0].type.split("/")[0],
            upload: 0,
            size: 0
        };
        // console.log('=08e20a Static =', Static)

        Static.mediaInputs.show = true;
        Static.mediaInputs.value.push(previewObj);

        let numItem = Static.mediaInputs.value.length - 1;

        let nameFile = "file.png"
        if (fileImg.name) {
            nameFile = fileImg.name
        }
        const formData = new FormData()
        formData.append('media', fileImg, nameFile);

        xhr = new XMLHttpRequest()
        xhr.open('POST', `/upload/${type}/`)
        xhr.onload = async function () {
            Static.mediaInputs.show = true;
            if (!this.response) {
                return
            }

            let response = JSON.parse(this.response);

            Static.mediaInputs.value[numItem] = {
                aspect: Static.mediaInputs.selectAspect,
                type: response.mimetype.split("/")[0],
                name: response.name
            }
            if (Static.mediaInputs.value.length == 1) {
                Static.mediaInputs.value[0].activePreview = true
            }
            Static.isValid = true;
            // console.log('=af134a=', Static, response)

            initReload();
        }
        xhr.upload.onprogress = async function (e) {
            let contentLength;
            if (e.lengthComputable) {
                contentLength = e.total;
            } else {
                contentLength = parseInt(
                    e.target.getResponseHeader(
                        "x-decompressed-content-length"
                    ),
                    10
                );
            }
            // console.log('=b1106c=', Static.mediaInputs.value.length, Static.mediaInputs.value.filter((item) => {
            //     return item.activePreview
            // }).length)

            if (Static.mediaInputs.value[numItem].upload === Static.mediaInputs.value[numItem].size && Static.mediaInputs.value[numItem].upload !== 0) {
                Static.mediaInputs.value.splice(numItem, 1);
                initReload()
                return
            }
            Static.mediaInputs.value[numItem].upload = e.loaded
            Static.mediaInputs.value[numItem].size = contentLength;
            initReload();
        }

        xhr.send(formData)
    };

    const loadAudio = async function (file, type, xhr) {
        let blob = new Blob([file], { type: 'audio/mpeg' });
        let previewObj = {
            src: URL.createObjectURL(blob),
            type: "audio",
            upload: 0,
            size: 0
        }
        Static.mediaInputs.show = true;
        Static.mediaInputs.value.push(previewObj);
        let numItem = Static.mediaInputs.value.length - 1

        let fileAudio = file[0];
        let nameFile = "file.webm"
        if (fileAudio.name) {
            nameFile = fileAudio.name
        }
        const formData = new FormData()
        formData.append('media', fileAudio, nameFile);

        xhr = new XMLHttpRequest()
        xhr.open('POST', `/upload/${type}/`)
        xhr.onload = async function () {
            Static.mediaInputs.show = true;
            if (!this.response) {
                return
            }

            let response = JSON.parse(this.response);

            Static.mediaInputs.value[numItem] = {
                aspect: Static.mediaInputs.selectAspect,
                type: response.mimetype.split("/")[0],
                name: response.name
            }
            if (Static.mediaInputs.value.length == 1) {
                Static.mediaInputs.value[0].activePreview = true
            }
            Static.isValid = true;
            // console.log('=af134a=', Static, response)

            initReload();
        }
        xhr.upload.onprogress = async function (e) {
            let contentLength;
            if (e.lengthComputable) {
                contentLength = e.total;
            } else {
                contentLength = parseInt(
                    e.target.getResponseHeader(
                        "x-decompressed-content-length"
                    ),
                    10
                );
            }

            if (Static.mediaInputs.value[numItem].upload === Static.mediaInputs.value[numItem].size && Static.mediaInputs.value[numItem].upload !== 0) {
                Static.mediaInputs.value.splice(numItem, 1);
                initReload()
                return
            }
            Static.mediaInputs.value[numItem].upload = e.loaded
            Static.mediaInputs.value[numItem].size = contentLength;
            initReload();
        }

        xhr.send(formData)
    };

    const sendPhoto = async function (e, crooper, index) {
        e.preventDefault();
        e.stopPropagation();

        if (!crooper) {
            return
        }
        let canvas;
        canvas = crooper.getCroppedCanvas({});
        let previewObj = {
            src: canvas.toDataURL(),
            type: "image",
            upload: 0,
            size: 0
        };
        Static.mediaInputs.show = true;
        Static.mediaInputs.value[index] = previewObj;
        initReload();

        await canvas.toBlob(function (blob) {
            fn.uploadMedia(
                blob,
                "posts",
                async function () {
                    Static.mediaInputs.show = true;
                    if (!this.response) {
                        return
                    }
                    let response = JSON.parse(this.response);
                    Static.mediaInputs.value[index] = {
                        aspect: Static.mediaInputs.selectAspect,
                        type: response.mimetype.split("/")[0],
                        name: response.name
                    }
                    Static.isValid = true;
                    initReload();
                },
                async function (e) {
                    let contentLength;
                    if (e.lengthComputable) {
                        contentLength = e.total;
                    } else {
                        contentLength = parseInt(
                            e.target.getResponseHeader(
                                "x-decompressed-content-length"
                            ),
                            10
                        );
                    }

                    if (Static.mediaInputs.value[index].upload === Static.mediaInputs.value[index].size && Static.mediaInputs.value[index].upload !== 0) {
                        Static.mediaInputs.value.splice(index, 1);
                        initReload()
                        return
                    }
                    Static.mediaInputs.value[index].upload = e.loaded
                    Static.mediaInputs.value[index].size = contentLength;
                    initReload();
                }
            );
            initReload();
            Variable.DelModals("ModalCropImage");
        });
        return
    }

    const submitMessage = async function (tmp, el) {
        if (!Static.message.el.value.trim().length && Static.mediaInputs.value.length == 0) {
            return
        }
        let text, media = [];
        if (Static.message.el.value.trim().length) {
            text = Static.message.el.value.trim()
        }
        if (Static.mediaInputs.value.length != 0) {
            Static.mediaInputs.value.forEach(async (file) => {
                // if (file.type == 'audio' && Static.mediaInputs.value.length == 1) {
                //     let response = await fn.restApi.setUserChats.sendMessage({ users: Static.activeUser._id, text, media: file })
                //     console.log('=012098= response audio =', response)
                //     if (Static.mediaInputs.value == 1) {
                //         // debugger
                //         if (response.status === "ok") {
                //             Static.message.el.value = ""
                //             Static.message.value = ""
                //             if (Static.message.adaptive) {
                //                 Static.message.el.style.height = (Static.message.el.dataset.maxHeight / Static.message.adaptive) + 'px';
                //             }
                //             if (response && response.list_records && response.list_records[0]) {
                //                 let newRes = response.list_records[0]

                //                 if (Static.messageList && Static.messageList.list_records[0] && Static.messageList.list_records[0].message) {
                //                     Static.messageList.list_records[0].message.unshift(newRes)
                //                 } else {
                //                     Static.messageList.list_records[0].message = [newRes]
                //                 }
                //                 // console.log('=46ae17 Static.chatsList=', Static.chatsList)
                //                 // console.log('=46ae17 Static.messageList=', Static.messageList)
                //                 // debugger
                //                 if (Static.chatsList && Static.chatsList.list_records) {
                //                     Static.chatsList.list_records.map((item) => {
                //                         let tmp = item.users.filter(item => item._id == Static.activeUser._id)
                //                         if (tmp.length) {
                //                             item.message[0] = newRes
                //                         }
                //                     })
                //                 }
                //                 // Static.chatsList.list_records = [...Static.chatsList.list_records].sort((a, b) => {
                //                 //     new Date(a.message[0].showDate) > new Date(b.message[0].showDate) ? 1 : -1
                //                 // })
                //                 // console.log('=46ae172 Static.chatsList=', Static.chatsList.list_records)

                //                 let i = Static.chatsList.list_records.findIndex(chat => {
                //                     return chat.message[0]._id == response.list_records[0]._id;
                //                 });
                //                 // console.log('=1def2b = i =', i)

                //                 Static.chatsList.list_records.splice(0, 0, Static.chatsList.list_records.splice(i, 1)[0]);

                //                 // console.log('=5dfe89= new = ', Static.chatsList.list_records)
                //                 Static.mediaInputs.value = [];
                //                 initReload()
                //             }
                //         } else {
                //             Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error], }, }, true);
                //         }
                //         return
                //     }
                // } else 
                if (file.type == 'image' || file.type == 'video' || file.type == 'audio') {
                    media.push(file)
                }
            })
        }
        // let data = { value: { users: Static.activeUser._id, message: { text } } }
        // let response = await api({ type: "set", action: "setUserChats", data: data })
        // if (media.length > 0) {
        // debugger
        let response = await fn.restApi.setUserChats.sendMessage({ users: Static.activeUser._id, text, media })
        console.log('=6befba=', response)
        if (response.status === "ok") {
            Static.message.el.value = ""
            Static.message.value = ""
            if (Static.message.adaptive) {
                Static.message.el.style.height = (Static.message.el.dataset.maxHeight / Static.message.adaptive) + 'px';
            }
            if (response && response.list_records && response.list_records[0]) {
                let newRes = response.list_records[0]

                if (Static.messageList && Static.messageList.list_records[0] && Static.messageList.list_records[0].message) {
                    Static.messageList.list_records[0].message.unshift(newRes)
                } else {
                    Static.messageList.list_records[0].message = [newRes]
                }
                // console.log('=46ae17 Static.chatsList=', Static.chatsList)
                // console.log('=46ae17 Static.messageList=', Static.messageList)
                // debugger
                if (Static.chatsList && Static.chatsList.list_records) {
                    Static.chatsList.list_records.map((item) => {
                        let tmp = item.users.filter(item => item._id == Static.activeUser._id)
                        if (tmp.length) {
                            item.message[0] = newRes
                        }
                    })
                }
                // Static.chatsList.list_records = [...Static.chatsList.list_records].sort((a, b) => {
                //     new Date(a.message[0].showDate) > new Date(b.message[0].showDate) ? 1 : -1
                // })
                // console.log('=46ae172 Static.chatsList=', Static.chatsList.list_records)

                let i = Static.chatsList.list_records.findIndex(chat => {
                    return chat.message[0]._id == response.list_records[0]._id;
                });
                // console.log('=1def2b = i =', i)

                Static.chatsList.list_records.splice(0, 0, Static.chatsList.list_records.splice(i, 1)[0]);

                // console.log('=5dfe89= new = ', Static.chatsList.list_records)
                Static.mediaInputs.value = [];
                initReload()
            }
        } else {
            Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error], }, }, true);
        }
        // }
        Static.message.el.focus()
    }

    // Конвертирование времени из секунд в дни : часы : минуты : секунды
    const convertToTime = function (secs) {
        let hh, mmt, mm, ss, dd

        secs = parseInt(secs);
        hh = secs / 3600;
        hh = parseInt(hh);
        mmt = secs - (hh * 3600);
        mm = mmt / 60;
        mm = parseInt(mm);
        ss = mmt - (mm * 60);

        if (hh > 23) {
            dd = hh / 24;
            dd = parseInt(dd);
            hh = hh - (dd * 24);
        } else {
            dd = 0;
        }

        if (ss < 10) {
            ss = "0" + ss;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        if (hh < 10) {
            hh = "0" + hh;
        }
        if (dd == 0) {
            return (hh + ":" + mm + ":" + ss);
        }
        else {
            if (dd > 1) {
                return (dd + " day " + hh + ":" + mm + ":" + ss);
            }
            else {
                return (dd + " day " + hh + ":" + mm + ":" + ss);
            }
        }
    }

    init(
        async () => {
            Static.clickVideo = false;
            Static.message = {
                rows: 1,
                adaptive: 3,
            }
            Static.elMedia = {}
            Static.textInputs = {
                value: "",
                show: false,
            }

            Static.audioInputs = {
                value: [],
                show: false,
            }

            Static.mediaInputs = {
                value: [],
                show: false,
            }

            Static.chatsList = await sendApi.send({
                action: "getUserChats", short: true,
                select: {
                    "message": {
                        "$slice": [
                            0,
                            1
                        ]
                    },
                    "users": 1
                },
                sort: {
                    'message.showDate': -1
                }
            });

            Static.mediaRecorder = null

            // console.log('=08e20a Static =', Static)
            if (Variable.Static.startChatsID) {
                let existingChat = false
                Static.chatsList.list_records.forEach(async (chat) => {
                    if (chat.users[0] && chat.users[0]._id == Variable.Static.startChatsID._id || chat.users[1] && chat.users[1]._id == Variable.Static.startChatsID._id) {
                        existingChat = true
                        Static.activeChat = chat._id
                        Static.messageList = await sendApi.send({
                            action: "getUserChats", short: true,
                            filter: {
                                "$and": [
                                    {
                                        "users": Variable.Static.startChatsID._id
                                    }
                                ]
                            },
                            select: {
                                "message": {
                                    "$slice": [
                                        0,
                                        120
                                    ]
                                },
                                "users": 1
                            }
                        });
                        initReload()
                    }
                })
                if (!existingChat) {
                    Static.activeUser = Variable.Static.startChatsID
                    // console.log(Static.chatsList)
                    Static.chatsList.list_records.unshift({ _id: 1, message: [{}], users: [Variable.Static.startChatsID, Variable.myInfo] })
                    Static.chatsList.list_records.sort((a, b) => {
                        new Date(a.message[0].showDate) > new Date(b.message[0].showDate) ? 1 : -1
                    })
                    Static.activeChat = 1
                    Static.messageList = {
                        list_records: [
                            {
                                message: [],
                                users: [Variable.Static.startChatsID, Variable.myInfo]
                            }
                        ]

                    }
                }
            }
            Variable.Static.startChatsID = null

            Static.filteredChats = Static.chatsList.list_records;
        },
        () => {
            console.log('=da21b3=', Static.chatsList, Variable.Static.startChatsID)

            if (Static.messageList) {
                if (Variable.myInfo._id != Static.messageList.list_records[0].users[0]._id) {
                    Static.activeUser = Static.messageList.list_records[0].users[0]
                } else {
                    Static.activeUser = Static.messageList.list_records[0].users[1]
                }
                Static.messageUser = Static.messageList.list_records[0].message
            }

            // console.log('=633dca=', Static.messageUser, Static.activeUser)
            return (
                <div class="messages_block c-main__body--noheader">
                    <div
                        class={[
                            "messages_left_part",
                            Static.activeChat ? "messages_left_part--inactive" : null
                        ]}
                    >
                        <div class="chats_search">
                            <form id="chatsSearchForm">
                                <a class="goBackFromChatLink" href="/" onclick={(e) => fn.siteLink(e)}>
                                    <img class="goBackFromChat" src={svg.chats_back2} />
                                </a>
                                <input
                                    Element={($el) => {
                                        Search = $el
                                    }}
                                    type="text"
                                    oninput={function (e) {
                                        let arr = Static.chatsList.list_records.filter((item) => {
                                            if (item.users[0].nickname.toLowerCase().includes(this.value.toLowerCase()) || item.users[1].nickname.toLowerCase().includes(this.value.toLowerCase())) {
                                                return item;
                                            }
                                        })
                                        if(this.value.length) {
                                            if(arr.length) {
                                                Static.filteredChats = arr
                                            } else {
                                                Static.filteredChats = []
                                            }
                                        } else {
                                            Static.filteredChats = Static.chatsList.list_records
                                        }
                                        console.log('=e0a96f= users =', Static)
                                        initReload()
                                    }}
                                />
                                <img src={svg.chats_search_icon} />
                            </form>
                        </div>
                        <div class="messages_list">

                            {() => {
                                if (Static.chatsList && Static.chatsList.list_records && Static.chatsList.list_records.length) {
                                    const arrReturn = /*Search && Search.value.length
                                    ? Static.chatsList.list_records.filter((item) => {
                                        console.log('=9ce8e7=',Search.value)
                                        if(item.users[0].nickname.toLowerCase().includes(Search.value.toLowerCase()) || item.users[1].nickname.toLowerCase().includes(Search.value.toLowerCase())) {
                                            return item
                                        }
                                    })
                                    : */Static.filteredChats.sort((a, b) => {
                                        new Date(a.message[0].showDate) > new Date(b.message[0].showDate) ? 1 : -1
                                    })
                                            .map((item, index) => {
                                                let user
                                                let lastMessage = item.message[0]
                                                // console.log('=afa4ec= lastMessage =',lastMessage)
                                                let iconStatus = {
                                                    name: "",
                                                    width: 24,
                                                    height: 23
                                                }

                                                if (lastMessage.status == 0) {
                                                    iconStatus.name = "sent_message_icon"
                                                    iconStatus.width = 21
                                                    iconStatus.height = 21
                                                } else if (lastMessage.status == 1) {
                                                    iconStatus.name = "unread_message_icon"
                                                    iconStatus.height = 22
                                                } else {
                                                    iconStatus.name = "read_message_icon"
                                                }
                                                if (item.users.length < 2) {
                                                    user = item.users[0]
                                                } else {
                                                    if (Variable.myInfo._id != item.users[0]._id) {
                                                        user = item.users[0]
                                                    } else {
                                                        user = item.users[1]
                                                    }
                                                }
                                                // console.log('=2a84c1=', item)

                                                return (
                                                    <div
                                                        class={["messages_list_item", item._id == Static.activeChat ? "active" : null]}
                                                        onclick={async () => {
                                                            Static.activeChat = item._id
                                                            if (item._id == 1) {
                                                                initReload()
                                                                return
                                                            }
                                                            Static.messageList = await sendApi.send({
                                                                action: "getUserChats", short: true,
                                                                filter: {
                                                                    "$and": [
                                                                        {
                                                                            "users": user._id
                                                                        }
                                                                    ]
                                                                },
                                                                select: {
                                                                    "message": {
                                                                        "$slice": [
                                                                            0,
                                                                            120
                                                                        ]
                                                                    },
                                                                    "users": 1
                                                                }
                                                            });
                                                            item.unreadMessage = 0
                                                            // console.log('=b604cf=', Static.messageList)
                                                            initReload()
                                                        }}
                                                    >
                                                        <Avatar author={user} />
                                                        <div class="messages_list_item_info">
                                                            <div class="messages_list_item_info-1">
                                                                <p>{user.nickname}</p>
                                                                {() => {
                                                                    if (lastMessage.text && lastMessage.author == Variable.myInfo._id) {
                                                                        return (
                                                                            <img src={images[iconStatus.name]} width={iconStatus.width} height={iconStatus.height} />
                                                                        )
                                                                    }
                                                                }}
                                                                {() => {
                                                                    if (lastMessage.text) {
                                                                        return (
                                                                            <span>{lastMessage.text}</span>
                                                                        )
                                                                    } else if (lastMessage.media && lastMessage.media.length) {
                                                                        return (
                                                                            <div class="messages_media">
                                                                                {() => {
                                                                                    if (
                                                                                        !lastMessage.text && lastMessage.media.length
                                                                                        && (lastMessage.media[0].type == "audio" || lastMessage.media[0].type == "video" || lastMessage.media[0].type == "image")
                                                                                        && lastMessage.author == Variable.myInfo._id
                                                                                    ) {
                                                                                        return (
                                                                                            <img src={images[iconStatus.name]} width={iconStatus.width} height={iconStatus.height} />
                                                                                        )
                                                                                    }
                                                                                }}
                                                                                <span class="messages_media_content">
                                                                                    <img
                                                                                        class={iconStatus.name == "read_message_icon" ? "messages_media_content_views" : null}
                                                                                        src={svg[`icon/${lastMessage.media[0].type == "audio" ? "microphone" :
                                                                                            lastMessage.media[0].type == "video" ?
                                                                                                "video_camera" :
                                                                                                // lastMessage.media[0].type == "image" ?
                                                                                                "photocamera"}`]}
                                                                                        width="16"
                                                                                        height="16"
                                                                                    />
                                                                                    <span>
                                                                                        {
                                                                                            lastMessage.media[0].type == "audio" ?
                                                                                                Variable.lang.text.lastChatAudio :
                                                                                                lastMessage.media[0].type == "video" ?
                                                                                                    Variable.lang.text.lastChatVideo :
                                                                                                    lastMessage.media[0].type == "image" ?
                                                                                                        Variable.lang.text.lastChatImage :
                                                                                                        null
                                                                                        }
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                }}

                                                            </div>
                                                            <div class="messages_list_item_info-2">
                                                                {lastMessage.author == Variable.myInfo._id
                                                                    ?
                                                                    <p>{lastMessage.showDate ? fn.getDateFormat(lastMessage.showDate, "chatlist") : null}</p>
                                                                    :
                                                                    <p class="message--new">
                                                                        <span>{lastMessage.showDate ? fn.getDateFormat(lastMessage.showDate, "chatlist") : null}</span>
                                                                        {item.unreadMessage ? <i>{item.unreadMessage}</i> : null}

                                                                    </p>
                                                                }

                                                                {/* {lastMessage.author == Variable.myInfo._id ? <img src={svg[iconStatus]} /> : null} */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                    return (arrReturn)
                                }
                            }}
                        </div>
                    </div>
                    <div class="messages_dialog" style={Static.activeChat ? "height: 100%; overflow-y: hidden; display: block;" : "height: 100%; overflow-y: hidden;"}>
                        {() => {
                            if (Static.activeUser) {
                                return (
                                    <section>
                                        <div class="companion">
                                            <Avatar author={Static.activeUser} />
                                            <div class="companion_info">
                                                <p>{Static.activeUser.nickname}</p>
                                                <p></p>
                                            </div>
                                        </div>
                                        <div class="messages_container">
                                            {() => {
                                                if (Static.messageList && Static.messageList.list_records && Static.messageList.list_records[0].message) {
                                                    let days = [];
                                                    let messagesOfDate;
                                                    // console.log('=e76437= Static.messageList.list_records[0].message = ', Static.messageList.list_records[0].message)
                                                    const arrReturn = Static.messageList.list_records[0].message.map((item, index) => {
                                                        // console.log('=2b48b7= message = ', item)
                                                        // console.log('=73f50e= Helpers.moment().format("YYYY-MM-DD") = ',Helpers.moment().format("YYYY-MM-DD"))
                                                        let date = item.showDate ? item.showDate.substr(0, 10) : Helpers.moment().format("YYYY-MM-DD")
                                                        // console.log('=4fc3b6= date = ', date)
                                                        days.push(date)

                                                        return (
                                                            <section class="messages_wrapper">
                                                                {() => {
                                                                    messagesOfDate = Static.messageList.list_records[0].message.filter((mes, i) => {
                                                                        return mes.showDate ?
                                                                            mes.showDate.substr(0, 10) == date
                                                                            : mes.showDate == undefined
                                                                    })
                                                                    // console.log('=82f033= messagesOfDate =', messagesOfDate)
                                                                    // console.log('=91ca45=',item._id, messagesOfDate[messagesOfDate.length - 1]._id, item._id == messagesOfDate[messagesOfDate.length - 1]._id)

                                                                    if (item._id == messagesOfDate[messagesOfDate.length - 1]._id) {
                                                                        return (
                                                                            <h3 class="messages_date">{fn.getDateFormat(date, "chatdate")}</h3>
                                                                        )
                                                                    }
                                                                }}
                                                                <div class={item.author == Variable.myInfo._id ? "your_message_container" : "friend_message_container"}>
                                                                    <div
                                                                        class={[
                                                                            item.author == Variable.myInfo._id ? "your_message" : "friend_message",
                                                                            item.media && item.media.length ? "message--media" : null,
                                                                            Helpers.ifHaveMedia(item.media, "video") && item.media.length < 4 ? "chat_have_video" : null,
                                                                            Helpers.ifHaveMedia(item.media, "audio") ? "chat_have_audio" : null
                                                                        ]}
                                                                    >
                                                                        {fn.editText(item.text, { clear: true, paragraph: true, html: true, notp: true })}

                                                                        {/* {() => {
                                                                        if (item.media && item.media.length) {
                                                                            const arrMedia = item.media.map((item, index) => {

                                                                                if (item.type == "video" && !Array.isArray(item)) {
                                                                                    return (
                                                                                        <div class="swiper-slide">
                                                                                            <VideoPlayer
                                                                                                Static={Static}
                                                                                                item={item}
                                                                                                path={`/assets/upload/chat/`}
                                                                                            />
                                                                                        </div>
                                                                                    );
                                                                                }

                                                                                if (item.type == "audio" && !Array.isArray(item)) {
                                                                                    return (
                                                                                        <div class="swiper-slide">
                                                                                            <AudioPlayer
                                                                                                Static={Static}
                                                                                                item={item}
                                                                                                path={`/assets/upload/chat/`}
                                                                                            />
                                                                                        </div>
                                                                                    );
                                                                                }

                                                                                if (item.type == "image" && !Array.isArray(item)) {
                                                                                    return (
                                                                                        <div class="swiper-slide">
                                                                                            <div class="swiper-post_media_image_container">
                                                                                                <LazyImage
                                                                                                    path={`/assets/upload/chat/` + item.name}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                }

                                                                                if (Array.isArray(item)) {
                                                                                    let i = index;
                                                                                    return (
                                                                                        <div class="swiper-slide user_post_text_background">
                                                                                            {
                                                                                                item.map((itemAudio, index) => {
                                                                                                    return (
                                                                                                        <AudioPlayer
                                                                                                            Static={Static}
                                                                                                            item={itemAudio}
                                                                                                            path={`/assets/upload/chat/`}
                                                                                                        />
                                                                                                    );
                                                                                                })
                                                                                            }
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            })
                                                                            return (
                                                                                <Swiper
                                                                                    className="swiper-chat"
                                                                                    options={swiperOptions}
                                                                                    // replace={changeToogle}
                                                                                    // replace={false}
                                                                                    slide={arrMedia}
                                                                                />
                                                                            )

                                                                            return arrMedia
                                                                        }
                                                                    }} */}

                                                                        {() => {
                                                                            if (item.media && item.media.length) {
                                                                                // console.log(`=6cf50b= item.media = `, item.media)

                                                                                //если вложенных в сообщение файлов менее 4
                                                                                if (item.media.length < 4) {

                                                                                    const arrMedia = item.media.map((item, index) => {

                                                                                        if (item.type == "video" && !Array.isArray(item)) {
                                                                                            return (
                                                                                                // <div class="swiper-slide">
                                                                                                <VideoPlayer
                                                                                                    Static={Static}
                                                                                                    item={item}
                                                                                                    path={`/assets/upload/chat/`}
                                                                                                />
                                                                                                // </div>
                                                                                            );
                                                                                        }

                                                                                        if (item.type == "audio" && !Array.isArray(item)) {
                                                                                            return (
                                                                                                // <div class="swiper-slide">
                                                                                                <AudioPlayer
                                                                                                    Static={Static}
                                                                                                    item={item}
                                                                                                    path={`/assets/upload/chat/`}
                                                                                                />
                                                                                                // </div>
                                                                                            );
                                                                                        }

                                                                                        if (item.type == "image" && !Array.isArray(item)) {
                                                                                            return (
                                                                                                <LazyImage
                                                                                                    className={"your_message_content"}
                                                                                                    path={`/assets/upload/chat/` + item.name}
                                                                                                    onClick={(e) => {
                                                                                                        e.stopPropagation();
                                                                                                        e.preventDefault();
                                                                                                        fn.modals.ModalViewPhoto({
                                                                                                            path: item.name,
                                                                                                        });
                                                                                                    }}
                                                                                                />
                                                                                            );
                                                                                        }

                                                                                        if (Array.isArray(item)) {
                                                                                            let i = index;
                                                                                            return (
                                                                                                <div class="swiper-slide user_post_text_background">
                                                                                                    {
                                                                                                        item.map((itemAudio, index) => {
                                                                                                            return (
                                                                                                                <AudioPlayer
                                                                                                                    Static={Static}
                                                                                                                    item={itemAudio}
                                                                                                                    path={`/assets/upload/chat/`}
                                                                                                                />
                                                                                                            );
                                                                                                        })
                                                                                                    }
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                    })
                                                                                    return arrMedia;

                                                                                    //если вложенных в сообщение файлов 4 и более
                                                                                } else {
                                                                                    const arrMedia = item.media.map((mediafile, index) => {

                                                                                        if (mediafile.type == "video" && !Array.isArray(mediafile)) {
                                                                                            if (index == 3) {
                                                                                                if (item.media.length > 4) {
                                                                                                    return (
                                                                                                        <div
                                                                                                            class="c-groupimage__item c-groupimage__item--more"
                                                                                                            onClick={(e) => {
                                                                                                                e.stopPropagation();
                                                                                                                e.preventDefault();
                                                                                                                console.log('=0372f9=', 'click video item!!! index = ', index, ', item.media.length = ', item.media.length)
                                                                                                                fn.modals.ModalViewPhoto({
                                                                                                                    path: mediafile.name,
                                                                                                                    arrMedia: item.media,
                                                                                                                });
                                                                                                            }}
                                                                                                        >
                                                                                                            <VideoPlayer
                                                                                                                Static={Static}
                                                                                                                item={mediafile}
                                                                                                                path={`/assets/upload/chat/`}
                                                                                                                className={"c-groupimage__img"}
                                                                                                            />
                                                                                                            <span class="c-groupimage__counter">+ {item.media.length - 4}</span>
                                                                                                        </div>
                                                                                                    );
                                                                                                } else if (item.media.length == 4) {
                                                                                                    return (
                                                                                                        <div
                                                                                                            class="c-groupimage__item"
                                                                                                            onClick={(e) => {
                                                                                                                e.stopPropagation();
                                                                                                                e.preventDefault();
                                                                                                                console.log('=0372f9=', 'click video item!!! index = ', index, ', item.media.length = ', item.media.length)
                                                                                                                fn.modals.ModalViewPhoto({
                                                                                                                    path: mediafile.name,
                                                                                                                    arrMedia: item.media,
                                                                                                                });
                                                                                                            }}
                                                                                                        >
                                                                                                            <VideoPlayer
                                                                                                                Static={Static}
                                                                                                                item={mediafile}
                                                                                                                path={`/assets/upload/chat/`}
                                                                                                                className={"c-groupimage__img"}
                                                                                                            />
                                                                                                            <span class="c-groupimage__counter">{item.media.length - 4}</span>
                                                                                                        </div>
                                                                                                    );
                                                                                                }
                                                                                            } else if (index < 3) {
                                                                                                return (
                                                                                                    <div
                                                                                                        class="c-groupimage__item"
                                                                                                        onClick={(e) => {
                                                                                                            e.stopPropagation();
                                                                                                            e.preventDefault();
                                                                                                            console.log('=0372f9=', 'click video item!!! index = ', index, ', item.media.length = ', item.media.length)
                                                                                                            fn.modals.ModalViewPhoto({
                                                                                                                path: mediafile.name,
                                                                                                                arrMedia: item.media,
                                                                                                            });
                                                                                                        }}
                                                                                                    >
                                                                                                        <VideoPlayer
                                                                                                            Static={Static}
                                                                                                            item={mediafile}
                                                                                                            path={`/assets/upload/chat/`}
                                                                                                            className={"c-groupimage__img"}
                                                                                                        />
                                                                                                    </div>
                                                                                                );
                                                                                            }
                                                                                        }

                                                                                        if (mediafile.type == "audio" && !Array.isArray(mediafile)) {
                                                                                            return (
                                                                                                // <div class="swiper-slide">
                                                                                                <AudioPlayer
                                                                                                    Static={Static}
                                                                                                    item={mediafile}
                                                                                                    path={`/assets/upload/chat/`}
                                                                                                />
                                                                                                // </div>
                                                                                            );
                                                                                        }

                                                                                        if (mediafile.type == "image" && !Array.isArray(mediafile)) {
                                                                                            // console.log('=43cdb6=', mediafile)
                                                                                            if (index == 3) {
                                                                                                if (item.media.length > 4) {
                                                                                                    return (
                                                                                                        <LazyImage
                                                                                                            className={"c-groupimage__item c-groupimage__item--more"}
                                                                                                            classImg={"c-groupimage__img"}
                                                                                                            path={`/assets/upload/chat/` + mediafile.name}
                                                                                                            counter={item.media.length - 4}
                                                                                                            onClick={(e) => {
                                                                                                                e.stopPropagation();
                                                                                                                e.preventDefault();
                                                                                                                console.log('=b3699e=', 'click item!!! index = ', index, ', item.media.length = ', item.media.length)
                                                                                                                fn.modals.ModalViewPhoto({
                                                                                                                    path: mediafile.name,
                                                                                                                    arrMedia: item.media
                                                                                                                });
                                                                                                            }}
                                                                                                        />
                                                                                                    );
                                                                                                } else if (item.media.length == 4) {
                                                                                                    return (
                                                                                                        <LazyImage
                                                                                                            className={"c-groupimage__item"}
                                                                                                            classImg={"c-groupimage__img"}
                                                                                                            path={`/assets/upload/chat/` + mediafile.name}
                                                                                                            onClick={(e) => {
                                                                                                                e.stopPropagation();
                                                                                                                e.preventDefault();
                                                                                                                console.log('=b3699e=', 'click item!!! index = ', index, ', item.media.length = ', item.media.length)
                                                                                                                fn.modals.ModalViewPhoto({
                                                                                                                    path: mediafile.name,
                                                                                                                    arrMedia: item.media
                                                                                                                });
                                                                                                            }}
                                                                                                        />
                                                                                                    );
                                                                                                }
                                                                                            } else if (index < 3) {
                                                                                                return (
                                                                                                    <LazyImage
                                                                                                        className={"c-groupimage__item"}
                                                                                                        classImg={"c-groupimage__img"}
                                                                                                        path={`/assets/upload/chat/` + mediafile.name}
                                                                                                        onClick={(e) => {
                                                                                                            e.stopPropagation();
                                                                                                            e.preventDefault();
                                                                                                            console.log('=b3699e=', 'click item!!! index = ', index)
                                                                                                            fn.modals.ModalViewPhoto({
                                                                                                                path: mediafile.name,
                                                                                                                arrMedia: item.media
                                                                                                            });
                                                                                                        }}
                                                                                                    />
                                                                                                );
                                                                                            }
                                                                                        }

                                                                                        // if (Array.isArray(item)) {
                                                                                        //     let i = index;
                                                                                        //     return (
                                                                                        //         <div class="swiper-slide user_post_text_background">
                                                                                        //             {
                                                                                        //                 item.map((itemAudio, index) => {
                                                                                        //                     return (
                                                                                        //                         <AudioPlayer
                                                                                        //                             Static={Static}
                                                                                        //                             item={itemAudio}
                                                                                        //                             path={`/assets/upload/chat/`}
                                                                                        //                         />
                                                                                        //                     );
                                                                                        //                 })
                                                                                        //             }
                                                                                        //         </div>
                                                                                        //     );
                                                                                        // }
                                                                                    })
                                                                                    return (
                                                                                        <GroupImage
                                                                                            className="c-groupimage__item"
                                                                                            image={arrMedia}
                                                                                        />
                                                                                    )
                                                                                }
                                                                            }
                                                                        }}

                                                                        {/* {() => {
                                                                            item.author == Variable.myInfo._id ?
                                                                                <i
                                                                                    class={item.author == Variable.myInfo._id ? "your_message_delete" : "friend_message_delete"}
                                                                                    title="Удалить сообщение"
                                                                                >
                                                                                    <img src={svg["close_group"]} width="10" height="10" />
                                                                                </i>
                                                                                : null
                                                                        }} */}

                                                                        <i
                                                                            class={item.author == Variable.myInfo._id ? "your_message_delete" : "friend_message_delete"}
                                                                            title="Удалить сообщение"
                                                                            hidden={item.author != Variable.myInfo._id}
                                                                        >
                                                                            <img src={svg["close_group"]} width="10" height="10" />
                                                                        </i>
                                                                        <div class={item.author == Variable.myInfo._id ? "your_message_date" : "friend_message_date"}>
                                                                            {/* {Helpers.getDateFormat(item.showDate, "now")} */}
                                                                            {fn.getDateFormat(item.showDate, "chattime")}
                                                                            {/* {item.showDate} */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        )
                                                    })

                                                    // console.log('=95e75f= days = ', days)
                                                    // console.log('=2f64db= unique = ', [...new Set(days)])
                                                    return arrReturn
                                                }
                                            }}

                                        </div>
                                        {
                                            Static.mediaInputs.show && Static.mediaInputs.value.length
                                                ?
                                                <div class="create_post_chapter createPostImage c-loadpicture">
                                                    <div
                                                        class="c-loadpicture__delete"
                                                        title="Удалить все медиа"
                                                        onclick={(e) => {
                                                            console.log('=6f2b56= Static = ', Static)
                                                            Static.mediaInputs.show = false;
                                                            Static.mediaInputs.value = [];
                                                            Static.message.el.value = ""
                                                            Static.message.value = ""
                                                            Static.isValid = false
                                                            initReload();
                                                        }}
                                                    >
                                                        <img src={svg["delete_icon"]} />
                                                    </div>
                                                    {() => {
                                                        let index;
                                                        let activePrev = Static.mediaInputs.value.filter((item, i) => {
                                                            index = i
                                                            return item.activePreview
                                                        });

                                                        console.log('=0cffd5= activePreview.length = ', activePrev.length)

                                                        if (activePrev.length) {
                                                            console.log('=83d5a7= activePrev[0] =', activePrev[0])
                                                            if (activePrev[0].type == "image") {
                                                                return (
                                                                    <div class="c-loadpicture__preview">
                                                                        <img
                                                                            class="c-loadpicture__img"
                                                                            src={
                                                                                activePrev.length ?
                                                                                    `/assets/upload/chat/${activePrev[0].name}`
                                                                                    : null
                                                                            }
                                                                        />
                                                                    </div>
                                                                )
                                                            } else if (activePrev[0].type == "video") {
                                                                return (
                                                                    <VideoPlayer
                                                                        className="c-loadpicture__preview"
                                                                        Static={Static}
                                                                        item={activePrev[0]}
                                                                        path={`/assets/upload/chat/`}
                                                                    />
                                                                )
                                                            } else if (activePrev[0].type == "audio") {
                                                                return (
                                                                    <div class="c-loadpicture__preview">
                                                                        <div class="c-loadpicture__img">
                                                                            <img src={svg["icon/file"]} />
                                                                            <h5 class="c-loadpicture__text">{Variable.lang.h.previewNotAvailable}</h5>
                                                                            <span class="c-loadpicture__format">({activePrev[0].name.split(".")[1]})</span>
                                                                        </div>
                                                                    </div>
                                                                    // <div class="c-loadpicture__preview">
                                                                    //     <AudioPlayerCopy
                                                                    //         item={activePrev[0]}
                                                                    //         index={index}
                                                                    //         path={`/assets/upload/chat/`}
                                                                    //         el={el[index] = Variable.setRef()}
                                                                    //     />
                                                                    // </div>
                                                                )
                                                            }
                                                        } else {
                                                            return (
                                                                <div class="c-loadpicture__preview">
                                                                    <img class="c-loadpicture__img" src={svg["loader_line"]} width="30" height="30" />
                                                                </div>
                                                            )
                                                        }

                                                    }}
                                                    <div class="c-loadpicture__miniatures">
                                                        {
                                                            Static.mediaInputs.value.map((item, index) => {
                                                                console.log('=abffb6= item = ', item)
                                                                if (item.type != "audio") {
                                                                    return (
                                                                        <MediaPreview
                                                                            item={item}
                                                                            index={index}
                                                                            type="chat"
                                                                            Static={Static}
                                                                            // sendPhotoChat={(cropper) => sendPhoto(e, cropper, index)}
                                                                            toggleActive={(e) => {
                                                                                e.preventDefault()
                                                                                e.stopPropagation()
                                                                                Static.mediaInputs.value.map((item) => {
                                                                                    item.activePreview = false;
                                                                                })
                                                                                item.activePreview = true;
                                                                                console.log('=df8f54= Static.mediaInputs.value = ', Static.mediaInputs.value)
                                                                                initReload()
                                                                            }}
                                                                        />
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <MediaPreview
                                                                            item={item}
                                                                            index={index}
                                                                            type="chat"
                                                                            Static={Static}
                                                                            el={el}
                                                                            toggleActive={(e) => {
                                                                                e.preventDefault()
                                                                                e.stopPropagation()
                                                                                Static.mediaInputs.value.map((item) => {
                                                                                    item.activePreview = false;
                                                                                })
                                                                                item.activePreview = true;
                                                                                console.log('=df8f54= Static.mediaInputs.value = ', Static.mediaInputs.value)
                                                                                initReload()
                                                                            }}
                                                                        />
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                null
                                        }
                                        <div class="c-comments__field create_post_container1">
                                            <MediaButton
                                                onclickAll={function () {
                                                    if (this.files.length == 0) {
                                                        return;
                                                    }
                                                    console.log('=ca274b=', this.files)
                                                    if (this.files[0].type.split("/")[0] == "image" || this.files[0].type.split("/")[0] == "video") {
                                                        loadPhoto(this.files, "chat");
                                                    } else if (this.files[0].type.split("/")[0] == "audio") {
                                                        loadAudio(this.files, "chat")
                                                    }


                                                    // fn.modals.ModalCropImage({
                                                    //     file: this.files[0],
                                                    //     typeUpload: 'chat',
                                                    //     arrMedia: Static.mediaInputs.value,
                                                    //     aspectSelect: Static.mediaInputs.selectAspect,
                                                    //     uploadCropImage: async function (cropper) {
                                                    //         await sendPhoto(cropper)
                                                    //         return;
                                                    //     }
                                                    // })
                                                }}

                                                iconPhoto={"message_add_file"}
                                            />

                                            <TextArea
                                                Static={Static.message}
                                                className="text1 create_post_chapter"
                                            />

                                            {/* <div id="emoji">@</div> */}
                                            {Static.mediaInputs.value.length == 0 && (typeof Static.message.value == 'undefined' || Static.message.value == '') ?
                                                <MediaButton
                                                    typeMic={"chat"}
                                                    onclickMic={async function (e) {
                                                        if (e.type == 'mousedown' && e.target.dataset.mobile == 'true') {
                                                            return
                                                        }
                                                        if (e.type == 'touchstart') {
                                                            e.target.dataset.mobile = true
                                                        } else {
                                                            e.target.dataset.mobile = false
                                                        }

                                                        if (!e.target.dataset.timing) {
                                                            e.target.dataset.timing = Date.now()

                                                            // debugger
                                                            let timeoutID = setInterval(function () {
                                                                let diff = Date.now() - e.target.dataset.timing
                                                                let secs = Math.round(diff / 1000)
                                                                let res = convertToTime(secs)
                                                                // debugger
                                                                // console.log('=b62baa=', res, e.target)
                                                                e.target.innerHTML = `<span class="messages_timer">${res}</span>`
                                                                initReload()
                                                            }, 1000)

                                                            await navigator.mediaDevices.getUserMedia({ audio: true })
                                                                .then(stream => {
                                                                    let options = "audio/webm"
                                                                    if (MediaRecorder.isTypeSupported('audio/webm; codecs=vp9')) {
                                                                        options = { mimeType: 'audio/webm; codecs=vp9' };
                                                                    } else if (MediaRecorder.isTypeSupported('audio/webm')) {
                                                                        options = { mimeType: 'audio/webm' };
                                                                    } else if (MediaRecorder.isTypeSupported('audio/mpeg')) {
                                                                        options = { mimeType: 'audio/mpeg' };
                                                                    } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
                                                                        options = { mimeType: 'audio/ogg' };
                                                                    } else if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9')) {
                                                                        options = { mimeType: 'video/webm; codecs=vp9' };
                                                                    } else if (MediaRecorder.isTypeSupported('video/webm')) {
                                                                        options = { mimeType: 'video/webm' };
                                                                    } else if (MediaRecorder.isTypeSupported('video/mp4')) {
                                                                        options = { mimeType: 'video/mp4', videoBitsPerSecond: 100000 };
                                                                    } else {
                                                                        console.error("no suitable mimetype found for this device");
                                                                    }
                                                                    console.log('=5b811c=', options)
                                                                    Static.mediaRecorder = new MediaRecorder(stream, options);

                                                                    var audioChunks = [];
                                                                    Static.mediaRecorder.addEventListener("dataavailable", function (event) {
                                                                        audioChunks.push(event.data);
                                                                    })

                                                                    Static.mediaRecorder.addEventListener("stop", async function () {
                                                                        var audioBlob = new File(audioChunks, "audio.webm", {
                                                                            type: 'audio/mpeg'
                                                                        })

                                                                        fn.uploadMedia(
                                                                            audioBlob,
                                                                            e.target.dataset.page_type,//"chat"
                                                                            async function () {
                                                                                // Static.mediaInputs.show = true;
                                                                                if (!this.response) {
                                                                                    return
                                                                                }
                                                                                let response = JSON.parse(this.response);
                                                                                // console.log('=7dc5fe=', response)
                                                                                Static.mediaInputs.value[0] = {
                                                                                    type: response.mimetype.split("/")[0],
                                                                                    name: response.name
                                                                                }

                                                                                let resp = await fn.restApi.setUserChats.sendMessage({ users: Static.activeUser._id, media: Static.mediaInputs.value[0] })
                                                                                // console.log('=276ae9= resp = ', resp)
                                                                                if (resp.status === "ok") {
                                                                                    if (resp && resp.list_records && resp.list_records[0]) {
                                                                                        let newRes = resp.list_records[0]

                                                                                        if (Static.messageList && Static.messageList.list_records[0] && Static.messageList.list_records[0].message) {
                                                                                            Static.messageList.list_records[0].message.unshift(newRes)
                                                                                        } else {
                                                                                            Static.messageList.list_records[0].message = [newRes]
                                                                                        }
                                                                                        // console.log('=46ae17 Static.chatsList=', Static.chatsList)
                                                                                        // console.log('=46ae17 Static.messageList=', Static.messageList)
                                                                                        if (Static.chatsList && Static.chatsList.list_records) {
                                                                                            Static.chatsList.list_records.map((item) => {
                                                                                                let tmp = item.users.filter(item => item._id == Static.activeUser._id)
                                                                                                if (tmp.length) {
                                                                                                    item.message[0] = newRes
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                        let i = Static.chatsList.list_records.findIndex(chat => {
                                                                                            return chat.message[0]._id == resp.list_records[0]._id;
                                                                                        });
                                                                                        Static.chatsList.list_records.splice(0, 0, Static.chatsList.list_records.splice(i, 1)[0]);
                                                                                        Static.mediaInputs.value = [];
                                                                                        initReload()
                                                                                    }
                                                                                } else {
                                                                                    Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[resp.error], }, }, true);
                                                                                }
                                                                                initReload();
                                                                            },
                                                                            async function (e) {
                                                                                let contentLength;
                                                                                if (e.lengthComputable) {
                                                                                    contentLength = e.total;
                                                                                } else {
                                                                                    contentLength = parseInt(
                                                                                        e.target.getResponseHeader(
                                                                                            "x-decompressed-content-length"
                                                                                        ),
                                                                                        10
                                                                                    );
                                                                                }
                                                                                // if (Static.mediaInputs.value[index].upload === Static.mediaInputs.value[index].size && Static.mediaInputs.value[index].upload !== 0) {
                                                                                //     Static.mediaInputs.value.splice(index, 1);
                                                                                //     initReload()
                                                                                //     return
                                                                                // }
                                                                                // Static.mediaInputs.value[index].upload = e.loaded
                                                                                // Static.mediaInputs.value[index].size = contentLength;
                                                                                initReload();
                                                                            }
                                                                        );

                                                                        audioChunks = [];
                                                                        var track = stream.getTracks()[0]
                                                                        track.stop()
                                                                        if (e.target.hasAttribute("data-timing")) {
                                                                            e.target.removeAttribute("data-timing")
                                                                            e.target.innerHTML = '';
                                                                        }
                                                                        clearTimeout(timeoutID);
                                                                    })
                                                                    Static.mediaRecorder.start();
                                                                    console.log("voicelineStart");
                                                                })
                                                                .catch(err => {
                                                                    console.log('=9b5ca5=', err)
                                                                    if (err = 'DOMException: Requested device not found') {
                                                                        Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div.dontHaveMicrophone, }, }, true);
                                                                    }
                                                                    return
                                                                });
                                                        } else {
                                                            if (e.type == 'mouseup' && e.target.dataset.mobile == 'true') {
                                                                return
                                                            }
                                                            if ((Date.now() - Number(e.target.dataset.timing)) < 300) {
                                                                return
                                                            }
                                                            Static.mediaRecorder.stop();
                                                            console.log('voicelineEnd')
                                                        }

                                                    }}
                                                />
                                                :
                                                <ButtonSubmit
                                                    text={<img class="c-comments__icon" src={svg["message_send"]} />}
                                                    className="c-comments__send button-container-preview"
                                                    onclick={() => { submitMessage(); }}
                                                />
                                            }
                                        </div>

                                    </section>
                                )
                            } else {
                                return (
                                    <div class="empty_message_dialog_block">
                                        {Variable.lang.text.selectChat}
                                    </div>
                                )
                            }
                        }}
                    </div>
                    <img
                        class="messages_goback"
                        src={svg.chats_back2}
                        onClick={() => { Static.activeChat = null; initReload(); }}
                    />
                </div>
            )
        }, ID
    )
}

export default start;