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

const BlockUserProfileFollowers = function ({ lang, myInfo, userInfo, data, followers, haveFilter = false }) {
    const ListFollowers = Object.keys(followers.list_records).map(function (key) {
        return (
            <div class="friend" data-action="link" data-href={'/user/' + followers.list_records[key].nickname}>
                <Avatar author={followers.list_records[key]} />
                <div class="friend_info">
                    <p>{followers.list_records[key].nickname}</p>
                    <p>{followers.list_records[key].fullname ? followers.list_records[key].fullname : ''}</p>
                </div>
            </div>
        )
    })

    return (
        <div data-touchmove="userProfileSlide" data-touchstart="userProfileSlideStart" data-touchend="userProfileSlideEnd" class="bl_one" id="UserInfoFollowers">
            <If
                data={haveFilter}
                dataIf={
                    <div class="friends friends_block_container" data-type="{{typeSearch}}">
                        <h2></h2>
                        {/* <div class="friends_search">
                            <div class="friends_search_top">
                                <input autocomplete="off" type="text" data-keyup="friendsSearchType" data-type="followers" placeholder="{{findPreholder}}"/>
                                <div class="filter_summoner" data-action="filterSummoner">
                                    <img src={svg['filter']}/>
                                    <span>{lang.span.filter}</span>
                                </div>
                            </div>
                            <div style="display: none" class="friends_search_filter">
                                <div class="filter_block_container">
                                    <div data-language="all" data-language_code="all" class="friends_filter_language" data-action="friendsLanguageFilter" data-name="{{lang.text.language}}">
                                        {lang.text.language}
                                    </div>
                                    <img style="display: none;" class="refresh_language" data-action="refreshLanguage" src="/assets/icon/refresh_filter.svg"/>
                                </div>
                                <div class="filter_block_container">
                                    <div data-country="all" data-country_code="all" class="friends_filter_country" data-action="friendsCountryFilter" data-name="{{lang.text.country}}">
                                        {lang.text.country}
                                    </div>
                                    <img style="display: none;" class="refresh_country" data-action="refreshCountry" src="/assets/icon/refresh_filter.svg"/>
                                </div>   
                                <div class="friends_filter_checkboxs">
                                    <div class="checkbox" data-action="friendsFilterCheckbox">
                                        <input checked="false" class="checkbox__input" type="checkbox" id="common" required="required"/>
                                        <label class="checkbox__label" for="fast_agree">{lang.select.users_regular}</label>
                                    </div>
                                    <div class="checkbox" data-action="friendsFilterCheckbox">
                                        <input checked="true" class="checkbox__input" type="checkbox" id="content-makers" required="required"/>
                                        <label class="checkbox__label" for="fast_agree">{lang.select.users_contentCreater}</label>
                                    </div>
                                    <div class="checkbox" data-action="friendsFilterCheckbox">
                                        <input checked="true" class="checkbox__input" type="checkbox" id="specialists" required="required"/>
                                        <label class="checkbox__label" for="fast_agree">{lang.select.users_experts}</label>
                                    </div>
                                    <div class="checkbox" data-action="friendsFilterCheckbox">
                                        <input class="checkbox__input" type="checkbox" id="online" required="required"/>
                                        <label class="checkbox__label" for="fast_agree">{lang.span.online}</label>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div class="friends_block">
                            {ListFollowers}
                        </div>
                    </div>
                }
                dataElse={
                    { ListFollowers }
                }
            />
        </div>

    )
}

export { BlockUserProfileFollowers };