import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const BlockUsers = function ({lang}) {

    return (
        <div class="top_professionals">
                            <h2>{lang.h.top_users}</h2>
                            <div data-type="main_page_users" class="friends_block_container">   
                                <div class="friends_search">
                                    <div class="friends_search_top">
                                        <input autocomplete="off" type="text" data-keyup="friendsSearchType" placeholder="{{lang.placeholder.findFriends}}"/>
                                        <div class="filter_summoner" data-action="filterSummoner">
                                            <img src={svg.filter}/>
                                            <span>{lang.span.filter}</span>
                                        </div>
                                    </div>
                                    <div style="display: none" class="friends_search_filter">
                                        <div class="filter_block_container">
                                            <div data-language="all" data-language_code="all" class="friends_filter_language" data-action="friendsLanguageFilter" data-name="{{lang.text.language}}">
                                                {lang.text.language}
                                            </div>
                                            <img style="display: none;" class="refresh_language" data-action="refreshLanguage" src="/assets/svg/refresh_filter.svg"/>
                                        </div>
                                        <div class="filter_block_container">
                                            <div data-country="all" data-country_code="all" class="friends_filter_country" data-action="friendsCountryFilter" data-name="{{lang.text.country}}">
                                                {lang.text.country}
                                            </div>
                                            <img style="display: none;" class="refresh_country" data-action="refreshCountry" src="/assets/svg/refresh_filter.svg"/>
                                        </div>   
                                        <div class="friends_filter_checkboxs">
                                            <div class="checkbox" data-action="friendsFilterCheckbox">
                                                <input checked="false" class="checkbox__input" type="checkbox" id="common" required="required"/>
                                                <label class="checkbox__label" for="fast_agree">{lang.h.top_users}</label>
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
                                </div>
                                <div class="top_professionals_block">
                                    <div class="new_professional_card userLoad" data-id="{{id}}"> 
                                        <div class="new_professional_card_top">
                                            <div class="new_professional_card_avatar">
                                                <a href="/user/nekotwo⚧" class="comment_avatar" data-action="link" data-needauth="true">
                                                    <div class="micro_user_avatar">
                                                        <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/upload/avatar/37a4e7ead2a6e496775f8995a4d391c4.png"/>
                                                        <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height: 100%;width: " src={svg.frame_default}/>
                                                        <div class="user_avatar_level">
                                                            <img src={svg.levelGray}/>
                                                            <span>9</span>
                                                        </div>
                                                        <div style="display: none;" class="avatar_user_online"></div>
                                                        <div style="display: none;" class="avatar_user_offline"></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="new_professional_card_main">
                                            <a href="/user/{{nickname}}" data-action="link">
                                                <p style="width: 80%; margin: 5px auto;" class="new_professional_name load">nickname</p>
                                            </a>
                                            <p style="width: 50%; margin: 0 auto;" class="new_professional_spec load">speciality</p>
                                            <div class="new_professional_badges">
                                                
                                            </div>
                                            <div class="new_professional_statistic">
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.answers}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.subscribe}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.views}</p>
                                                </div>
                                            </div>
                                            <div class="new_professional_buttons">
                                                <div class="button-container-preview">
                                                    <a class="btn-news-preview" href="/user/chats/id{{_id}}" data-action="link" data-needauth="true">
                                                        <span>
                                                            {lang.button.write}
                                                        </span>
                                                    </a>
                                                    <a class="btn-news-preview" data-id="{{_id}}" data-action="userSubscribe" data-needauth="true">
                                                        <span class="subscribe_status">
                                                            {lang.button.subscribe}
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="new_professional_card userLoad" data-id="{{id}}"> 
                                        <div class="new_professional_card_top">
                                            <div class="new_professional_card_avatar">
                                                <a href="/user/nekotwo⚧" class="comment_avatar" data-action="link" data-needauth="true">
                                                    <div class="micro_user_avatar">
                                                        <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/upload/avatar/37a4e7ead2a6e496775f8995a4d391c4.png"/>
                                                        <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height: 100%;width: " src={svg.frame_default}/>
                                                        <div class="user_avatar_level">
                                                            <img src={svg.levelGray}/>
                                                            <span>9</span>
                                                        </div>
                                                        <div style="display: none;" class="avatar_user_online"></div>
                                                        <div style="display: none;" class="avatar_user_offline"></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="new_professional_card_main">
                                            <a href="/user/{{nickname}}" data-action="link">
                                                <p style="width: 80%; margin: 5px auto;" class="new_professional_name load">nickname</p>
                                            </a>
                                            <p style="width: 50%; margin: 0 auto;" class="new_professional_spec load">speciality</p>
                                            <div class="new_professional_badges">
                                                
                                            </div>
                                            <div class="new_professional_statistic">
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.answers}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.subscribe}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.views}</p>
                                                </div>
                                            </div>
                                            <div class="new_professional_buttons">
                                                <div class="button-container-preview">
                                                    <a class="btn-news-preview" href="/user/chats/id{{_id}}" data-action="link" data-needauth="true">
                                                        <span>
                                                            {lang.button.write}
                                                        </span>
                                                    </a>
                                                    <a class="btn-news-preview" data-id="{{_id}}" data-action="userSubscribe" data-needauth="true">
                                                        <span class="subscribe_status">
                                                            {lang.button.subscribe}
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="new_professional_card userLoad" data-id="{{id}}"> 
                                        <div class="new_professional_card_top">
                                            <div class="new_professional_card_avatar">
                                                <a href="/user/nekotwo⚧" class="comment_avatar" data-action="link" data-needauth="true">
                                                    <div class="micro_user_avatar">
                                                        <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/upload/avatar/37a4e7ead2a6e496775f8995a4d391c4.png"/>
                                                        <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height: 100%;width: " src={svg.frame_default}/>
                                                        <div class="user_avatar_level">
                                                            <img src={svg.levelGray}/>
                                                            <span>9</span>
                                                        </div>
                                                        <div style="display: none;" class="avatar_user_online"></div>
                                                        <div style="display: none;" class="avatar_user_offline"></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="new_professional_card_main">
                                            <a href="/user/{{nickname}}" data-action="link">
                                                <p style="width: 80%; margin: 5px auto;" class="new_professional_name load">nickname</p>
                                            </a>
                                            <p style="width: 50%; margin: 0 auto;" class="new_professional_spec load">speciality</p>
                                            <div class="new_professional_badges">
                                                
                                            </div>
                                            <div class="new_professional_statistic">
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.answers}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.subscribe}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.views}</p>
                                                </div>
                                            </div>
                                            <div class="new_professional_buttons">
                                                <div class="button-container-preview">
                                                    <a class="btn-news-preview" href="/user/chats/id{{_id}}" data-action="link" data-needauth="true">
                                                        <span>
                                                            {lang.button.write}
                                                        </span>
                                                    </a>
                                                    <a class="btn-news-preview" data-id="{{_id}}" data-action="userSubscribe" data-needauth="true">
                                                        <span class="subscribe_status">
                                                            {lang.button.subscribe}
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            <a href="{{lang.url}}users/" class="btn-view-all-a" data-action="link">
                                <div class="btn-view-all">
                                    <div>{lang.button.allUsers}</div>
                                </div>
                            </a>
                        </div>
    )
}

export { BlockUsers }