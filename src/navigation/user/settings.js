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
import { getUserBlackList, changePassword, deleteUser, restoreUser, deleteUserFromBlacklist } from '@src/apiFunctionsL.js'
import { WalletCard } from '@component/element/user/WalletCard.js';
import { Avatar } from '@component/element/Avatar.js';
import { If } from '@component/helpers/All.js';

const start = function () {

    let currentCategory, blackList, inputType

    const style = {
        formButton: {
            padding: 0,
            background: 'inherit',
            border: 0,
            width: '100%'
        }
    }

    Variable.HeaderShow = false
    Variable.FooterShow = false

    const userBlackList = function () {
        const BlackListBlock = Object.keys(blackList.list_records[0].blackList).map(function (key) {
            return (
                <li style="justify-content: space-between" data-id="{{_id}}" class="settings_blackuser friend" data-action="link" data-href="">
                    <Avatar
                        author={blackList.list_records[0].blackList[key]}
                        nickNameAndDate={true}
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

    const changePasswordForm = async function(e){
        e.preventDefault()
        await changePassword(this.oldPassword.value, this.newPassword.value)
    }

    const showPassword = async function() {
        console.log(this.src)
        if (inputType[this.dataset.type]) {
            inputType[this.dataset.type] = false
            this.src = svg['eye-slash']
        } else {
            inputType[this.dataset.type] = true
            this.src = svg['eye']
        }
        initReload()
    }

    const changeCategory = async function(){
        currentCategory = this.dataset.type
        initReload()
    }

    const deleteFromBlacklist = async function(){
        await deleteUserFromBlacklist(this.dataset.id)
        blackList = await getUserBlackList()
        initReload()
    }

    init(
        async () => {
            currentCategory = 'security'
            inputType = {
                oldPassword: true,
                newPassword: true
            }
            blackList = await getUserBlackList()
            console.log(Variable.myInfo)
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
                                    <form class="settings_form" onsubmit={changePasswordForm}>
                                        <div class="">
                                            <h3>{Variable.lang.h.changePassword}</h3>
                                            <div class="container-input">
                                                <label for="password_reg">{Variable.lang.label.oldPassword}</label>
                                                <div class="error-div">
                                                    <div class="error-div-variant">{Variable.lang.error_div.not_empty_input}</div>
                                                    <div class="error-div-variant">{Variable.lang.error_div.password}</div>
                                                    <div class="error-div-variant">{Variable.lang.error_div.password2}</div>
                                                    <div class="error-div-variant">{Variable.lang.error_div.password3}</div>
                                                    <div class="error-div-variant">{Variable.lang.error_div.password4}</div>
                                                    <div class="error-div-variant">{Variable.lang.error_div.password5}</div>
                                                </div>
                                                <div class="input-div">
                                                    <img src={svg['lock']} class="icon-input"/>
                                                    <input data-keyup="keyupValidate" data-form_type="changePassword" data-dirty="false" data-focusout="focusout" data-validate_type="password" required="required" id="oldPassword" placeholder={Variable.lang.placeholder.oldPassword} type={inputType.oldPassword ? 'password' : 'text'}/>
                                                    <img src={svg['eye']} data-type="oldPassword" class="password_eye" onclick={showPassword}/>
                                                </div>
                                            </div>
                                            <div class="container-input">
                                                <label for="password_reg">{Variable.lang.label.newPassword}</label>
                                                <div class="error-div">
                                                    <div class="error-div-variant">{Variable.lang.error_div.not_empty_input}</div>
                                                    <div class="error-div-variant">{Variable.lang.error_div.password}</div>
                                                    <div class="error-div-variant">{Variable.lang.error_div.password2}</div>
                                                    <div class="error-div-variant">{Variable.lang.error_div.password3}</div>
                                                    <div class="error-div-variant">{Variable.lang.error_div.password4}</div>
                                                    <div class="error-div-variant">{Variable.lang.error_div.password5}</div>
                                                </div>
                                                <div class="input-div">
                                                    <img src={svg['lock']} class="icon-input"/>
                                                    <input data-keyup="keyupValidate" data-form_type="changePassword" data-dirty="false" data-focusout="focusout" data-validate_type="password" required="required" id="newPassword" placeholder={Variable.lang.placeholder.newPassword} type={inputType.newPassword ? 'password' : 'text'}/>
                                                    <img src={svg['eye']} data-type="newPassword" class="password_eye" onclick={showPassword}/>
                                                </div>
                                            </div>
                                            <button style={style.formButton}>
                                            <div type="button" class="reset-btn" data-form_type="changePassword" id="changePassword" data-action="changePassword">
                                                <a class="btn-reset"><span>{Variable.lang.button.save}</span></a>
                                            </div>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div class="setting_body_item_chapter">
                                    <p>{Variable.lang.text.youCanDeletePage}</p>

                                    <form class="settings_form" id="deleteUser">
                                        <If
                                            data={Variable.myInfo.status.delete == true}
                                            dataIf={
                                                <div>
                                                    <p>
                                                        {Variable.lang.text.deletePageDate} {dateDelete(Variable.myInfo.startDelete)}
                                                    </p>
                                                    <div class="button-container-preview">
                                                        <a data-deletedcan="true" class="btn-news-preview" onclick={restoreUser}>
                                                            <span>
                                                                {Variable.lang.text.restorePage}
                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            }
                                            dataElse={
                                                <div class="button-container-preview">
                                                    <a class="btn-news-preview" onclick={deleteUser}>
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