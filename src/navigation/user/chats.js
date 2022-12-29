import {
    jsx,
    jsxFrag,
    Variable,
    init,
    sendApi,
    Helpers,
    initReload
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import {
    Avatar,
    Swiper,
    AudioPlayer,
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

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })


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
            type: "image",
            upload: 0,
            size: 0
        };
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
            Static.isValid = true;
            initReload();
            // console.log('=af134a=', response)
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

    const sendPhoto = async function (crooper, index) {
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

    init(
        async () => {
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
                action: "getUserChats", short: true, sort: {
                    "message": {
                        "showDate": -1
                    }
                },
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
            console.log(Static)
            // console.log('=08e20a=', Static.chatsList)
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
        },
        () => {
            // console.log('=da21b3=', Static.chatsList, Variable.Static.startChatsID)

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
                                    <img class="goBackFromChat" src={svg.chats_back} />
                                </a>
                                <input type="text" disabled />
                                <img src={svg.chats_search_icon} />
                            </form>
                        </div>
                        <div class="messages_list">

                            {() => {
                                if (Static.chatsList && Static.chatsList.list_records && Static.chatsList.list_records.length) {
                                    const arrReturn = Static.chatsList.list_records.map((item, index) => {
                                        let user
                                        let lastMessage = item.message[0]
                                        let iconStatus
                                   
                                        if (lastMessage.status == 0) {
                                            iconStatus = "sent_message_icon"
                                        } else if (lastMessage.status == 1) {
                                            iconStatus = "unread_message_icon"
                                        } else {
                                            iconStatus = "read_message_icon"
                                        }
                                         if(item.users.length <2)
                                         {
                                            user = item.users[0]
                                         }else{
                                        if (Variable.myInfo._id != item.users[0]._id) {
                                            user = item.users[0]
                                        } else {
                                            user = item.users[1]
                                        }}
                                 
                                        return (
                                            <div
                                                class={["messages_list_item", item._id == Static.activeChat ? "active" : null]}
                                                onclick={async () => {
                                                    Static.activeChat = item._id
                                                    if(item._id == 1){
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
                                                        {lastMessage.text ? <span>{lastMessage.text}</span> : null}
                                                    </div>
                                                    <div class="messages_list_item_info-2">
                                                        {lastMessage.author == Variable.myInfo._id
                                                            ?
                                                            <p>{lastMessage.showDate ? Helpers.getDateFormat(lastMessage.showDate, "now") : null}</p>
                                                            :
                                                            <p class="message--new">
                                                                <span>{lastMessage.showDate ? Helpers.getDateFormat(lastMessage.showDate, "now") : null}</span>
                                                                {item.unreadMessage ? <i>{item.unreadMessage}</i> : null}

                                                            </p>
                                                        }

                                                        {lastMessage.author == Variable.myInfo._id ? <img src={svg[iconStatus]} /> : null}
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
                                                    const arrReturn = Static.messageList.list_records[0].message.map((item, index) => {
                                                        return (
                                                            <div class={item.author == Variable.myInfo._id ? "your_message_container" : "friend_message_container"}>
                                                                <div class={[item.author == Variable.myInfo._id ? "your_message" : "friend_message", Helpers.ifHaveMedia(item.media, "video") ? "chat_have_video" : null, Helpers.ifHaveMedia(item.media, "audio") ? "chat_have_audio" : null]} >
                                                                    {Helpers.editText(item.text, { clear: true, paragraph: true, html: true })}

                                                                    {() => {
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
                                                                    }}
                                                                    <div class={item.author == Variable.myInfo._id ? "your_message_date" : "friend_message_date"}>
                                                                        {Helpers.getDateFormat(item.showDate, "now")}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })

                                                    return arrReturn
                                                }
                                            }}

                                        </div>
                                        {
                                            Static.mediaInputs.show && Static.mediaInputs.value.length
                                                ?
                                                <div class="create_post_chapter createPostImage">
                                                    {
                                                        Static.mediaInputs.value.map((item, index) => {
                                                            if (item.type != "audio") {
                                                                return (
                                                                    <MediaPreview
                                                                        item={item}
                                                                        index={index}
                                                                        type="chat"
                                                                        Static={Static}
                                                                        sendPhotoChat={(cropper) => sendPhoto(cropper, index)}
                                                                    />
                                                                );
                                                            }
                                                        })
                                                    }
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

                                                    loadPhoto(this.files, "chat");

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
                                                    onclickMic={function () {
                                                        alert("onclicMic")
                                                    }}
                                                />
                                                :
                                                <ButtonSubmit
                                                    text={<img class="c-comments__icon" src={svg["message_send"]} />}
                                                    className="c-comments__send button-container-preview"
                                                    onclick={async (tmp, el) => {
                                                        if (!Static.message.el.value.trim().length && Static.mediaInputs.value.length == 0) {
                                                            return
                                                        }
                                                        let text, media = [];
                                                        if (Static.message.el.value.trim().length) {
                                                            text = Static.message.el.value.trim()
                                                        }
                                                        if (Static.mediaInputs.value.length != 0) {
                                                            Static.mediaInputs.value.forEach((file) => {
                                                                media.push(file)
                                                            })
                                                        }
                                                        // let data = { value: { users: Static.activeUser._id, message: { text } } }
                                                        // let response = await api({ type: "set", action: "setUserChats", data: data })
                                                        let response = await fn.restApi.setUserChats.sendMessage({ users: Static.activeUser._id, text, media })
                                                        // console.log('=6befba=', response)
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
                                                                // console.log('=46ae17=', Static.chatsList)

                                                                if (Static.chatsList && Static.chatsList.list_records) {
                                                                    Static.chatsList.list_records.map((item) => {
                                                                        let tmp = item.users.filter(item => item._id == Static.activeUser._id)
                                                                        if (tmp.length) {
                                                                            item.message[0] = newRes
                                                                        }
                                                                    })
                                                                }
                                                                Static.mediaInputs.value = [];
                                                                initReload();
                                                            }
                                                        } else {
                                                            Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error], }, }, true);
                                                        }
                                                    }}
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
                        src={svg.chats_back}
                        onClick={() => { Static.activeChat = null; initReload(); }}
                    />
                </div>
            )
        }, ID
    )
}

export default start;