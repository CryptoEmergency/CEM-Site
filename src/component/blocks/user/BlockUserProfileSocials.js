import {
    jsx,
    jsxFrag,
    Variable,
    stringToHtml
} from '@betarost/cemjs';
import { ProfileAboutMe } from '@component/element/user/ProfileAboutMe.js';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { numberFixWithSpaces } from '@src/functions.js';
import { getDateFormat } from '@src/functions.js'
import { Avatar } from '@component/element/Avatar.js';
import { If } from '@component/helpers/All.js'

const BlockUserProfileSocials = function ({ lang, myInfo, userInfo, data, haveFilter=false }) {
    const ListSocials = Object.keys(userInfo.social).map(function (key) {
        return (
            <a data-id="{{_id}}" target="_blank" href={userInfo.social[key].url} class={userInfo.social[key].channel + " user_social_card"}>
                <div class="user_social_card_inner">
                    <div class={userInfo.social[key].channel + " user_social_card_type"}>
                        <img src="/assets/icon/{channel}_icon.svg"/>
                        <img src={svg[userInfo.social[key].channel + '_icon']}/>
                    </div>
                    <div class="user_social_card_text">
                        <p class="user_social_card_name">{userInfo.social[key].name}</p>
                        <p class="user_social_card_description">{userInfo.social[key].description}</p>
                    </div>
                </div>
                <If
                    data={userInfo._id == myInfo._id}
                    dataIf={
                        <div class="about_user_section_points_container">
                            <img class="about_user_section_points" data-action="aboutUserEditMenu" src="/assets/icon/points.svg"/>
                            <div class="about_user_section_points_menu">
                                <div data-id="{{_id}}" class="about_user_section_points_menu_item about_user_edit_handler" data-action="deleteSocial">
                                    {lang.select.delete}
                                </div>
                            </div>
                        </div>
                    }
                />
            </a>
        )
    })

    return (
        <div data-touchmove="userProfileSlide" data-touchstart="userProfileSlideStart" data-touchend="userProfileSlideEnd" class="bl_one" id="UserInfoSocial">
            <div class="user_social_header">
                <h3>{lang.h.userSocials}</h3>
                <If
                    data={userInfo._id == myInfo._id}
                    dataIf={
                        <img data-action="createSocialToggler" src={svg['pen']}/>
                    }
                />
            </div>
            <div class="createSocialForm">
                <div class="create_social_icons">
                    <div class="create_social_icons">
                        <div data-link="https://www.youtube.com/c/" data-social="youtube" data-action="createSocialChangeMedia" class="create_social_icon youtube">
                            <div class="create_social_icon_inner">
                                <img src="/assets/icon/youtube_icon.svg"/>
                            </div>
                        </div>
                        <div data-link="https://www.facebook.com/" data-social="facebook" data-action="createSocialChangeMedia" class="create_social_icon facebook">
                            <div class="create_social_icon_inner">
                                <img src="/assets/icon/facebook_icon.svg"/>
                            </div>
                        </div>
                        <div data-link="https://www.twitter.com/" data-social="twitter" data-action="createSocialChangeMedia" class="create_social_icon twitter">
                            <div class="create_social_icon_inner">
                                <img src="/assets/icon/twitter_icon.svg"/>
                            </div>
                        </div>
                        <div data-link="https://www.discord.com/invite/" data-social="discord" data-action="createSocialChangeMedia" class="create_social_icon discord">
                            <div class="create_social_icon_inner">
                                <img src="/assets/icon/discord_icon.svg"/>
                            </div>
                        </div>
                        <div data-link="https://www.instagram.com/" data-social="instagram" data-action="createSocialChangeMedia" class="create_social_icon instagram">
                            <div class="create_social_icon_inner">
                                <img src="/assets/icon/instagram_icon.svg"/>
                            </div>
                        </div>
                        <div data-link="https://www.tiktok.com/@" data-social="tiktok" data-action="createSocialChangeMedia" class="create_social_icon tiktok">
                            <div class="create_social_icon_inner">
                                <img src="/assets/icon/tiktok_icon.svg"/>
                            </div>
                        </div>
                        <div data-link="https://www.twitch.tv/" data-social="twitch" data-action="createSocialChangeMedia" class="create_social_icon twitch">
                            <div class="create_social_icon_inner">
                                <img src="/assets/icon/twitch_icon.svg"/>
                            </div>
                        </div>
                        <div data-link="https://www.vk.com/" data-social="vk" data-action="createSocialChangeMedia" class="create_social_icon vk">
                            <div class="create_social_icon_inner">
                                <img src="/assets/icon/vk-icon.svg"/>
                            </div>
                        </div>
                        <div data-link="https://www.t.me/" data-social="telegram" data-action="createSocialChangeMedia" class="create_social_icon telegram">
                            <div class="create_social_icon_inner">
                                <img src="/assets/icon/telegram-icon.svg"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="create_social_inputs">
                    <input style="display: none;" data-keyup="deleteBorder" class="create_social_link" type="text" placeholder="{{lang.placeholder.link}}"/>
                    <input data-keyup="deleteBorder" class="create_social_name" type="text" placeholder="{{lang.placeholder.title}}"/>
                    <input data-keyup="deleteBorder" class="create_social_desc" type="text" placeholder="{{lang.placeholder.shortDescription}}"/>
                </div>
                <div data-action="userSocialAdd" class="button-container-preview">
                    <a class="btn-news-preview">
                        <span>
                            {lang.button.add}
                        </span>
                    </a>
                </div>
            </div>
            <div class="user_social_card_list" style="{{#if data.userInfo.social.length}} {{else}}grid-template-columns: calc(100% - 10px);{{/if}}">
                {ListSocials}
            </div>
        </div>
    )
}

export { BlockUserProfileSocials };