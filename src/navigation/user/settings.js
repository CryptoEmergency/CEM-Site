import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
    sendApi
} from "@betarost/cemjs";
import { siteLink, checkAnswerApi } from '@src/functions.js'
import svg from "@assets/svg/index.js";
import { dateDelete } from '@src/functionsL.js'
import { getUserBlackList } from '@src/apiFunctionsL.js'
import { WalletCard } from '@component/element/user/WalletCard.js';
import { Avatar } from '@component/element/Avatar.js';
import { If } from '@component/helpers/All.js';

const start = function () {

    let currentCategory, blackList

    Variable.HeaderShow = false
    Variable.FooterShow = false

    const userBlackList = function () {
        console.log(blackList.list_records[0].blackList)
        const BlackListBlock = Object.keys(blackList.list_records[0].blackList).map(function (key) {
            console.log('1', key)
            console.log('1', blackList.list_records[0].blackList[key])
            return (
                <li data-id="{{_id}}" class="settings_blackuser friend" data-action="link" data-href="">
                    <Avatar
                        author={blackList.list_records[0].blackList[key]}
                        nickNameAndDate={true}
                    />
                    <div data-action="deleteFromBlacklist" data-id="{{_id}}" class="settings_deleteuser">{Variable.lang.text.deleteFromBlacklist}</div>
                </li>
            )
        })
    
        return (
            <ul class="settings_blacklist">
                {BlackListBlock}                     
            </ul>
        )
    
    }

    const changeCategory = async function(){
        currentCategory = this.dataset.type
        initReload()
    }

    init(
        async () => {
            currentCategory = 'security'
            blackList = await getUserBlackList()
            console.log(blackList)
        },
        () => {
            return (
                <div class="settings_container">
                    <h4 class="settings_title">{Variable.lang.text.socialNetwork}</h4>
                    <div class="settings">
                        <div class="setting_list_block">
                            <div class="settings_list">
                                <div class="settings_list_item settings_list_item_active">
                                    <p data-action="settingsListShow" class="settings_list_title">{Variable.lang.text.socialNetwork} <img style="padding: 3px 0;position: absolute; top:23px;right:20px;" src={svg['settings_active_category_line']} /></p>
                                    <div data-type="security" onclick={changeCategory} class="settings_list_subcategory">
                                        <p>{Variable.lang.text.security}</p>
                                    </div>
                                    <div data-type="blackList" onclick={changeCategory} class="settings_list_subcategory">
                                        <p>{Variable.lang.text.blackList}</p>
                                    </div>
                                    <div class="settings_gradient_line"></div>
                                </div>
                            </div>
                        </div>

                        <div class="settings_body">
                            <div style={currentCategory == 'security' ? '' : 'display: none;'} class="settings_body_item">
                                <div class="setting_body_item_chapter">
                                    <p>{Variable.lang.label.password}</p>
                                    <form class="settings_form">
                                        <div class="button-container-preview">
                                            <a class="btn-news-preview" data-action="changePasswordModal">
                                                <span>
                                                    {Variable.lang.text.change}
                                                </span>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                                <div class="setting_body_item_chapter">
                                    <p>{Variable.lang.text.youCanDeletePage}</p>

                                    <form class="settings_form" id="deleteUser">
                                        <If
                                            data={Variable.myInfo.status.delete.status == true}
                                            dataIf={
                                                <div>
                                                    <p>
                                                        {Variable.lang.text.deletePageDate} {dateDelete(Variable.myInfo.startDelete)}
                                                    </p>
                                                    <div class="button-container-preview">
                                                        <a data-deletedcan="true" class="btn-news-preview" data-action="restoreUser">
                                                            <span>
                                                                {Variable.lang.text.restorePage}
                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            }
                                            dataElse={
                                                <div class="button-container-preview">
                                                    <a class="btn-news-preview" data-action="deleteUserModal">
                                                        <span>
                                                            {Variable.lang.text.deletePage}
                                                        </span>
                                                    </a>
                                                </div>
                                            }
                                        />
                                    </form>

                                </div>
                            </div>

                            <div style={currentCategory == 'blackList' ? '' : 'display: none;'}  data-type="blackList" class="settings_body_item">
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