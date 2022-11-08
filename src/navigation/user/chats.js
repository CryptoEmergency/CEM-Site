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
                <div class="messages_block">
                    <div class="messages_left_part">
                        <div class="chats_search">
                        </div>
                        <div class="messages_list" data-action="messagesLinkPrevent" data-nofollow="true">
                            {/* <Map
                                data={chatsList.list_records}
                                dataIf={(item, index) => {
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
                                            <Avatar
                                                author={user} />
                                            <div class="messages_list_item_info">
                                                <div class="messages_list_item_info-1">
                                                    <p>{user.nickname}</p>
                                                    <If
                                                        data={lastMessage.text}
                                                        dataIf={
                                                            <span>{lastMessage.text}</span>
                                                        }
                                                    />

                                                </div>
                                                <div class="messages_list_item_info-2">
                                                    <If
                                                        data={lastMessage.author == Variable.myInfo._id}
                                                        dataIf={
                                                            <p>{Helpers.getDateFormat(lastMessage.showDate)}</p>
                                                        }
                                                        dataElse={
                                                            <p class="message--new">
                                                                <span>{Helpers.getDateFormat(lastMessage.showDate)}</span>
                                                                <If
                                                                    data={item.unreadMessage}
                                                                    dataIf={<i>{item.unreadMessage}</i>}
                                                                />
                                                            </p>
                                                        }
                                                    />

                                                    <If
                                                        data={lastMessage.author == Variable.myInfo._id}
                                                        dataIf={
                                                            <img src={svg[iconStatus]} />
                                                        }
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                }
                            /> */}
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
                                            {/* <If
                                            data={Variable.myInfo._id != messageList.list_records[0].users[0]._id}
                                            dataIf={
                                                <Avatar author={messageList.list_records[0].users[0]} />
                                            }
                                        /> */}
                                        </div>


                                        gggg
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