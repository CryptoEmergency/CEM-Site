import {
    jsx,
    jsxFrag,
    init,
    Variable,
    sendApi
} from "@betarost/cemjs";
import { siteLink, checkAnswerApi } from '@src/functions.js'
import svg from "@assets/svg/index.js";
import { WalletCard } from '@component/element/user/WalletCard.js';
import { Avatar } from '@component/element/Avatar.js';

const start = function () {



    Variable.HeaderShow = false
    Variable.FooterShow = false

    init(
        async () => {

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
                                    <div data-type="security" data-action="settingsCategoryChange" class="settings_list_subcategory">
                                        <p>{Variable.lang.text.security}</p>
                                    </div>
                                    <div data-type="blackList" data-action="settingsCategoryChange" class="settings_list_subcategory">
                                        <p>{Variable.lang.text.blackList}</p>
                                    </div>
                                    <div class="settings_gradient_line"></div>
                                </div>
                            </div>
                        </div>

                        <div class="settings_body">
                            <div data-type="security" class="settings_body_item">
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

                                    {/* {partials => deletePageForm} */}

                                </div>
                            </div>

                            <div style="display: none;" data-type="blackList" class="settings_body_item">
                                <div class="setting_body_item_chapter">
                                    <ul class="settings_blacklist">
                                        <li data-id="{{_id}}" class="settings_blackuser friend" data-action="link" data-href="">

                                            <Avatar
                                                author={Variable.myInfo}
                                                nickNameAndDate={true}
                                            />


                                            <div data-action="deleteFromBlacklist" data-id="{{_id}}" class="settings_deleteuser">{Variable.lang.text.deleteFromBlacklist}</div>
                                        </li>
                                    </ul>

                                </div>


                            </div>

                        </div>


                    </div>
                </div>
            )
        })
};

export default start;