import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
    sendApi
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { If } from '@component/helpers/All.js';

import { BlockUserSettingsPage } from '@component/blocks/index.js';



import { Avatar } from '@component/element/Avatar.js';



const deleteUserFromBlacklist = async (user) => {
    let data = {
        value: {
            blackList: user
        }
    }
    let response = checkAnswerApi(await sendApi.create("setUsers", data));
    return response
}

const getUserBlackList = async (count = 0) => {
    let data = {
        select: {
            blackList: 1
        },
        limit: 5,
        offset: 5 * count,
        filter: {
            _id: Variable.myInfo._id
        }
    }
    let response = checkAnswerApi(await sendApi.create("getUsers", data));
    return response
}

const start = function () {
    let settingsPage


    let blackList



    Variable.HeaderShow = false
    Variable.FooterShow = false
    Variable.showUserMenu = true

    const userBlackList = function () {
        const BlackListBlock = Object.keys(blackList.list_records[0].blackList).map(function (key) {
            return (
                <li style="justify-content: space-between" data-id="{{_id}}" class="settings_blackuser friend" data-action="link" data-href="">
                    <Avatar
                        author={blackList.list_records[0].blackList[key]}
                    // nickName={item.author.nickname} 
                    // dateShow={true}
                    />
                    <div onclick={deleteFromBlacklist} data-id={blackList.list_records[0].blackList[key]._id} class="settings_deleteuser">{Variable.lang.text.deleteFromBlacklist}</div>
                </li>
            )
        })

        return (
            <ul class="settings_blacklist">
                {BlackListBlock}
            </ul>
        )
    }



    const deleteFromBlacklist = async function () {
        await deleteUserFromBlacklist(this.dataset.id)
        blackList = await getUserBlackList()
        initReload()
    }

    init(
        async () => {
            blackList = await getUserBlackList()

            settingsPage = "security"
        },
        () => {
            return (
                <div class="settings_container">
                    <h4 class="settings_title">{Variable.lang.text.socialNetwork}</h4>
                    <div class="settings">
                        <div class="setting_list_block">
                            <div class="settings_list">
                                <div class="settings_list_item settings_list_item_active">
                                    <p class="settings_list_title">
                                        {Variable.lang.text.socialNetwork}
                                        <img style="padding: 3px 0;position: absolute; top:23px;right:20px;" src={svg['settings_active_category_line']} />
                                    </p>
                                    <div
                                        class="settings_list_subcategory"
                                        onclick={() => {
                                            if (settingsPage == "security") {
                                                return
                                            }
                                            settingsPage = "security"
                                            initReload()
                                        }}
                                    >
                                        <p>{Variable.lang.text.security}</p>
                                    </div>
                                    <div
                                        class="settings_list_subcategory"
                                        onclick={() => {
                                            if (settingsPage == "blackList") {
                                                return
                                            }
                                            settingsPage = "blackList"
                                            initReload()
                                        }}
                                    >
                                        <p>{Variable.lang.text.blackList}</p>
                                    </div>
                                    <div class="settings_gradient_line"></div>
                                </div>
                            </div>
                        </div>

                        <div class="settings_body">
                            <BlockUserSettingsPage.security
                                settingsPage={settingsPage}
                            />


                            <div style={settingsPage == 'blackList' ? '' : 'display: none;'} data-type="blackList" class="settings_body_item">
                                <div class="setting_body_item_chapter">
                                    {userBlackList()}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            )
        })
};

export default start;