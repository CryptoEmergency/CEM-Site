import {jsx,jsxFrag,setAction,setValue,makeDOM,getVariable,getStorage} from '@betarost/cemjs'
import HeaderEmpty from './HeaderEmpty.js'
import HeaderNotAuth from './HeaderNotAuth.js'
import burger_menu from '@assets/icon/burger_menu.svg'

const mainHeader = function(auth){  
    const lang = getVariable("languages")[getStorage("lang")]
    if(auth){
        return(
            <div class="header-container">
                <div class="header_inner">
                    <div class="auth_header_part">
                        <HeaderLang 
                            lang = {lang}
                        />
                        <div class="header_avatar_container">
                            <a href="/user/nekotwo⚧" class="comment_avatar" data-action="link" data-needauth="true">
                                <div class="micro_user_avatar">
                                    <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/upload/avatar/37a4e7ead2a6e496775f8995a4d391c4.png"/>
                                    <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height: 100%;width: " src="/assets/profile/frame/default.svg"/>
                                    <div class="user_avatar_level">
                                        <img src="/assets/profile/levelGray.svg"/>
                                        <span>9</span>
                                    </div>
                                    <div style="display: none;" class="avatar_user_online"></div>
                                    <div style="display: none;" class="avatar_user_offline"></div>
                                </div>
                            </a>
                        </div>
                        <div class="auth_user_header">
                            <div class="user_notifications">
                                <div class="user_notifications_image">
                                    <a class="active_notification" data-action="notifyAction" data-nofollow="true">
                                        <img src="/assets/icon/notifications_icon.svg"/>
                                    </a>
                                    <div class="active_notifications"></div>
                                </div>
                            </div>
                            <div class="user_messages">
                                <div class="user_messages">
                                    <a href="/user/chats/" class="message_notification" data-action="link">
                                        <img src="/assets/icon/message_notifications.svg"/>
                                        <div style="display: none;" class="messages_notifications_counter"></div>
                                    </a>
                                <div class="message_notifications"></div>
                            </div>
                        </div>
                        <div style="display: none;" class="user_notifications_block auth_notifications" id="notifications_block">
                            <img data-action="notifyAction" class="notify_close" src="/assets/icon/close.svg"/>
                            <div class="notifications_title">
                                <div class="notifications_titles_line">
                                    Ваши уведомления
                                    <a data-action="link" href="/user/notify/">Показать все</a>
                                </div>
                                <div class="notifications_toggle_block">
                                    <div data-type="part_questions" class="notifications_toggle_item notifications_toggle_item_active" data-action="notificationsChange">Вопросы</div>
                                    <div data-type="part_awards" class="notifications_toggle_item" data-action="notificationsChange">Награды</div>
                                    <div data-type="part_system" class="notifications_toggle_item" data-action="notificationsChange">Системные</div>
                                </div>
                            </div>
                            <div class="notifications_list">
                                <div class="notifications_list_inner">
                                    <div class="notifications_list_part part_questions">
                                        <div class="notifications_list_item">
                                            <a data-action="link" href="/lenta-users/show/62e7e57bf2a5481eab157ed0">
                                                <img class="notifications_open_questions" src="/assets/icon/like.svg"/>
                                                <p>Новый лайк!</p>
                                                <span>Вам поставили лайк. Рейтинг увеличен</span>
                                            </a>
                                            <span class="notifyNickname">Пользователь: <a data-action="link" href="/user/Betarost">Betarost</a></span>
                                            <span>2022-08-04 14:56</span>
                                        </div>
                                        <div class="notifications_list_item">
                                            <a data-action="link" href="/lenta-users/show/62e7e61df2a5481eab157f71">
                                                <img class="notifications_open_questions" src="/assets/icon/like.svg"/>
                                                <p>Новый лайк!</p>
                                                <span>Вам поставили лайк. Рейтинг увеличен</span>
                                            </a>
                                            <span class="notifyNickname">Пользователь: <a data-action="link" href="/user/Betarost">Betarost</a></span>
                                            <span>2022-08-04 14:55</span>
                                        </div>
                                        <div class="notifications_list_item">
                                            <a data-action="link" href="/lenta-users/show/62ea42ce54e68a2402cb9274">
                                                <img class="notifications_open_questions" src="/assets/icon/like.svg"/>
                                                <p>Новый лайк!</p>
                                                <span>Вам поставили лайк. Рейтинг увеличен</span>
                                            </a>
                                            <span class="notifyNickname">Пользователь: <a data-action="link" href="/user/Viktoriya">Viktoriya</a></span>
                                            <span>2022-08-04 14:45</span>
                                        </div>
                                        <div class="notifications_list_item">
                                            <a data-action="link" href="/lenta-users/show/62ea42ce54e68a2402cb9274">
                                                <img class="notifications_open_questions" src="/assets/icon/like.svg"/>
                                                <p>Новый лайк!</p>
                                                <span>Вам поставили лайк. Рейтинг увеличен</span>
                                            </a>
                                            <span class="notifyNickname">Пользователь: <a data-action="link" href="/user/Viktoriya">Viktoriya</a></span>
                                            <span>2022-08-04 14:45</span>
                                        </div>
                                        <div class="notifications_list_item">
                                            <img class="notifications_open_questions" src="/assets/icon/follower_notify.svg"/>
                                            <p>Новый подписчик!</p>
                                            <span>На вас подписались</span>
                                            <span class="notifyNickname">Пользователь: <a data-action="link" href="/user/Yan_Krivonosov">Yan_Krivonosov</a></span>
                                            <span>2022-08-04 14:20</span>
                                        </div>
                                        <div class="notifications_list_item">
                                            <a data-action="link" href="/lenta-users/show/62ea45fa54e68a2402cb9a45">
                                                <img class="notifications_open_questions" src="/assets/icon/like.svg"/>
                                                <p>Новый лайк!</p>
                                                <span>Вам поставили лайк. Рейтинг увеличен</span>
                                            </a>
                                            <span class="notifyNickname">Пользователь: <a data-action="link" href="/user/Betarost">Betarost</a></span>
                                            <span>2022-08-04 14:15</span>
                                        </div>
                                        <div class="notifications_list_item">
                                            <a data-action="link" href="/lenta-users/show/62de8e4812016af6d718b854">
                                                <img class="notifications_open_questions" src="/assets/icon/comment_notify.svg"/>
                                                <p>Новый комментарий!</p>
                                                <span>Получен комментарий на Ваш пост</span>
                                            </a>
                                            <span>2022-08-04 10:46</span>
                                        </div>
                                        <div class="notifications_list_item">
                                            <a data-action="link" href="/lenta-users/show/62ea45fa54e68a2402cb9a45">
                                                <img class="notifications_open_questions" src="/assets/icon/like.svg"/>
                                                <p>Новый лайк!</p>
                                                <span>Вам поставили лайк. Рейтинг увеличен</span>
                                            </a>
                                            <span class="notifyNickname">Пользователь: <a data-action="link" href="/user/Viktoriya">Viktoriya</a></span>
                                            <span>2022-08-04 9:25</span>
                                        </div>
                                        <div class="notifications_list_item">
                                            <img class="notifications_open_questions" src="/assets/icon/follower_notify.svg"/>
                                            <p>Новый подписчик!</p>
                                            <span>На вас подписались</span>
                                            <span class="notifyNickname">Пользователь: <a data-action="link" href="/user/Viktoriya">Viktoriya</a></span>
                                            <span>2022-08-02 15:22</span>
                                        </div>
                                        <div class="notifications_list_item">
                                            <a data-action="link" href="/lenta-users/show/62cbd265459b45cad0ff4994">
                                                <img class="notifications_open_questions" src="/assets/icon/comment_notify.svg"/>
                                                <p>Новый комментарий!</p>
                                                <span>Получен комментарий на Ваш пост</span>
                                            </a>
                                            <span>2022-08-02 14:57</span>
                                        </div>
                                    </div>
                                    <div class="notifications_list_part part_awards dn">
                                        <a data-action="link" href="/user/awards/">
                                            <div class="notifications_list_item">
                                                <img class="notifications_open_questions" src="/assets/icon/badge/badge4.svg"/>
                                                <p>Получена награда!</p>
                                                <span>За первого подписчика</span>
                                                <span>2022-06-28 11:23</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="notifications_list_part part_system dn">
                                        <div class="notifications_list_item">
                                            <a data-action="link" href="/user/affiliate/">
                                                <img class="notifications_open_questions" src="/assets/icon/referal_icon.svg"/>
                                                <p>Зарегистрирован реферал!</p>
                                                <span>По Вашей партнерской ссылке зарегистрованы новые пользователи:</span>
                                            </a>
                                            <span class="notifyNickname">Пользователь: <a data-action="link" href="/user/HotHolodilnik">HotHolodilnik</a></span>
                                            <span>2022-08-04 11:41</span>
                                        </div>
                                        <div class="notifications_list_item">
                                            <a data-action="link" href="/user/affiliate/">
                                                <img class="notifications_open_questions" src="/assets/icon/referal_icon.svg"/>
                                                <p>Зарегистрирован реферал!</p>
                                                <span>По Вашей партнерской ссылке зарегистрованы новые пользователи:</span>
                                            </a>
                                            <span class="notifyNickname">Пользователь: <a data-action="link" href="/user/admin">admin</a></span>
                                            <span>2022-07-19 15:53</span>
                                        </div>
                                        <div class="notifications_list_item">
                                            <a data-action="link" href="/user/affiliate/">
                                                <img class="notifications_open_questions" src="/assets/icon/referal_icon.svg"/>
                                                <p>Получен бонус!</p>
                                                <span>Ваш реферал достиг 3 уровня.</span>
                                            </a>
                                            <span class="notifyNickname">Пользователь: <a data-action="link" href="/user/KorovaZalupskaya">KorovaZalupskaya</a></span>
                                            <span>2022-07-19 15:12</span>
                                        </div>
                                        <div class="notifications_list_item">
                                            <a data-action="link" href="/user/affiliate/">
                                                <img class="notifications_open_questions" src="/assets/icon/referal_icon.svg"/>
                                                <p>Зарегистрирован реферал!</p>
                                                <span>По Вашей партнерской ссылке зарегистрованы новые пользователи:</span>
                                            </a>
                                            <span class="notifyNickname">Пользователь: <a data-action="link" href="/user/KorovaZalupskaya">KorovaZalupskaya</a></span>
                                            <span>2022-07-19 15:6</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="burger_menu_icon" data-action="mainBurgerMeny">
                            <img src="/assets/icon/burger_menu.svg"/>
                        </div>
                    </div>
                </div>
                <HeaderList 
                    lang = {lang}
                />
            </div>
        </div>
        )
    } else {
        return(
            <div class="header-container">
                <div class="header_inner">
                    <div class="auth_header_part">
                        {/* <HeaderLang 
                            lang = {lang}
                        /> */}
                        <div class="auth">
                            <a class="log-in link" data-action="loginModal">{lang.button.login}</a>
                            <button type="button" class="button-container sign-up btn" id="registration" data-action="registrationModal">
                                <a href="#" class="btn-gr">
                                    <span>{lang.button.registration}</span>
                                </a>
                            </button>
                        </div>
                        <div class="burger_menu_icon non_auth_burger_menu" data-action="mainBurgerMeny">
                            {/* <img src={burger_menu}/> */}
                            {/* <img src={"/assets/icon/burger_menu.svg"}/> */}
                        </div>
                    </div>
                    {/* <HeaderList 
                        lang = {lang}
                    /> */}
                </div>
            </div>
        )
    }
}

// cemJS.setValue("Start",mainHeader,ID)

// const forExport = function(){
//     cemJS.setValue("langListShow",false,ID)
//     let auth = cemJS.getStorage('auth')
//     return cemJS.makeDOM(mainHeader(auth),ID)
// }

// export default forExport

const ID = "mainHeader";
const befor = function(){
    setValue(ID,"langListShow",false)
}
const start = function(){
    console.log("start header",getVariable("header"),getStorage("auth"));
    if(!getVariable("header")){
        makeDOM(<HeaderEmpty/>,ID)
        return;
    }

    const lang = getVariable("languages")[getStorage("lang")]
   
    if(!getStorage("auth")){
        makeDOM(<HeaderNotAuth 
            lang = {lang}
        />,ID)
        return;
    }
    console.log(getVariable("header"));
    //makeDOM(mainHeader(),ID)
}
const after = function(){}

setAction(ID,"befor",befor)
setAction(ID,"start",start)
setAction(ID,"after",after)

const init = function(){
    befor()
    start()
    after()
}
export {init}