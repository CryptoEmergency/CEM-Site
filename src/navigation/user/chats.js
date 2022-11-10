import {
    jsx,
    jsxFrag,
    Variable,
    init,
    sendApi,
    Helpers,
    initReload
} from "@betarost/cemjs";

import { If, Map } from '@component/helpers/All.js';
import svg from '@assets/svg/index.js';
import { Avatar } from '@component/element/index.js';

const start = function () {
    let Static = {}


    let chatsList,
        activeChat,
        messageList,
        messageUser,
        activeUser

    Variable.Static.HeaderShow = false
    Variable.Static.FooterShow = false
    Variable.showUserMenu = false


    init(
        async () => {
            chatsList = await sendApi.send({
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
                }
            });
            console.log('=08e20a=', chatsList)


        },
        () => {

            if (messageList) {

                if (Variable.myInfo._id != messageList.list_records[0].users[0]._id) {
                    activeUser = messageList.list_records[0].users[0]
                } else {
                    activeUser = messageList.list_records[0].users[1]
                }
                messageUser = messageList.list_records[0].message
            }

            // console.log('=633dca=', messageUser, activeUser)
            return (
                <div
                    class={[
                        "messages_block",
                        Variable.Static.HeaderShow ? "c-main__body" : "c-main__body--noheader",
                    ]}
                >
                    <div class="messages_left_part">
                        <div class="chats_search">
                        </div>
                        <div class="messages_list" data-action="messagesLinkPrevent" data-nofollow="true">

                            {() => {
                                if (chatsList && chatsList.list_records.length) {
                                    const arrReturn = chatsList.list_records.map((item, index) => {
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

                                        if (Variable.myInfo._id != item.users[0]._id) {
                                            user = item.users[0]
                                        } else {
                                            user = item.users[1]
                                        }
                                        return (
                                            <div
                                                class={["messages_list_item", item._id == activeChat ? "active" : null]}
                                                onclick={async () => {
                                                    activeChat = item._id
                                                    messageList = await sendApi.send({
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
                                                    console.log('=c35516=', messageList)
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
                                                            <p>{Helpers.getDateFormat(lastMessage.showDate, "now")}</p>
                                                            :
                                                            <p class="message--new">
                                                                <span>{Helpers.getDateFormat(lastMessage.showDate, "now")}</span>
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
                    <div class="messages_dialog">
                        {() => {
                            if (activeUser) {
                                return (
                                    <div>
                                        <div class="companion">
                                            <Avatar author={activeUser} />
                                            <p>{activeUser.nickname}</p>
                                        </div>
                                        <div class="messages_container">
                                            {() => {
                                                if (messageList && messageList.list_records && messageList.list_records[0].message) {
                                                    const arrReturn = messageList.list_records[0].message.map((item, index) => {
                                                        console.log('=0a9ec9=', item)
                                                        return (
                                                            <div class={item.author == Variable.myInfo._id ? "your_message_container" : "friend_message_container"}>
                                                                <div class={[item.author == Variable.myInfo._id ? "your_message" : "friend_message", Helpers.ifHaveMedia(item.media, "video") ? "chat_have_video" : null, Helpers.ifHaveMedia(item.media, "audio") ? "chat_have_audio" : null]} >
                                                                    {Helpers.editText(item.text, { clear: true, paragraph: true, html: true })}

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
                                    </div>
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

                </div>
            )
        }
    )
}

export default start;