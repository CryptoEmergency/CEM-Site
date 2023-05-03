import { Variable, fn, sendApi, initReload } from "@betarost/cemserver/cem.js";

const forExport = async function () {

    if (Variable.dataUrl.adress == "rooms") {
        let [Static] = fn.GetParams({ ID: "mainBlock", actual: true })
        //  console.log("timerTik", "tt",Static)
        if (Static.Rooms._id) {

            let _id = Static.Rooms._id

            if (Static.Rooms.message[0]) {

            }
            let messageID = null
            if (Static.Rooms.message[0]) {

                messageID = Static.Rooms.message[0]._id

            }


            let response = await sendApi.create("tik", { rooms: { _id, messageID } })
            if (response.result && response.result.list_records) {

                Static.new = _id
                // initReload()
            }
        }
    } else {
        // 
        let response = await sendApi.create("tik", {})
        if (response && response.info && response.info.myInfo && response.info.myInfo.chatMessage && response.info.myInfo.chatMessage.length > 0) {
            let [Static] = fn.GetParams({ ID: "mainBlock", actual: true })
            if (Variable.dataUrl.adress == "user" && Variable.dataUrl.category == "chats") {
                if (Static.activeUser && Static.activeUser._id == response.info.myInfo.chatMessage[0].author) {
                    if (Static.messageList.list_records[0].message[0]._id != response.info.myInfo.chatMessage[0]._id) {
                        Static.messageList.list_records[0].message.unshift(response.info.myInfo.chatMessage[0])
                    }
                }
                Static.chatsList.list_records.forEach(async chat => {
                    if (chat.users[0]._id == response.info.myInfo.chatMessage[0].author || chat.users[1]._id == response.info.myInfo.chatMessage[0].author) {
                        if (chat.message[0]._id != response.info.myInfo.chatMessage[0]._id && ((!Static.activeUser) || !(Static.activeUser._id == response.info.myInfo.chatMessage[0].author))) {
                            console.log('INCREMENT')
                            if (typeof chat.unreadMessage == "undefined") {
                                chat.unreadMessage = 1
                            } else {
                                chat.unreadMessage++
                            }
                        } else if (Static.activeUser && Static.activeUser._id == response.info.myInfo.chatMessage[0].author) {
                            console.log("QUERY")
                            Static.messageList = await sendApi.send({
                                action: "getUserChats", short: true,
                                filter: {
                                    "$and": [
                                        {
                                            "users": chat.users[0]
                                        },
                                        {
                                            "users": chat.users[1]
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
                        }
                        chat.message[0] = response.info.myInfo.chatMessage[0]
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
                        setTimeout(() => {
                            initReload()
                        }, 100);
                        // initReload()
                    }
                })
            }
        }
        if (response && response.result && Object.keys(response.result).length) {
            //console.log('=df2a55=', response)
        }
    }

};

export default forExport