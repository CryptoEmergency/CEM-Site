import {jsx,jsxFrag,getVariable,setValue,getValue, getStorage} from '@betarost/cemjs'
import logo from '@assets/image/logo.svg'
import { clickCancel,siteLink, changeLang } from '@src/functions.js'
import svg from '@assets/svg/index.js'
import images from '@assets/images/index.js'
import burger_menu from '@assets/icon/burger_menu.svg'
const ID = "mainHeader"

const showListLang = function (e) {
    e.stopPropagation()
    setValue(ID, "langListShow", !getValue(ID, "langListShow"))
}

const LanguagesList = function(){
    const languages = getVariable("languages");    
    const listLang = Object.keys(languages).map(function (key){
       return (
            <li class="c-changelanguage__item">
                <a class="c-changelanguage__link" href={"/"+key+"/"} onclick={siteLink}><span class="c-changelanguage__text">{languages[key].lang_orig}</span></a>
            </li>
        )
    })   
   
    return (
        <ul class="c-changelanguage__list">
            {listLang}
        </ul>   
    )

}

const forExport = function(){
    const frame = "rainbow"
    const langListShow = getValue(ID, "langListShow")
    const languages = getVariable("languages");
    const dataUrl = getVariable("dataUrl");
    const lang = languages[getStorage("lang")]
    return(
        <div class="c-header__container c-container">
            <div class="c-header__inner">
                <div class="c-header__auth">
                    <div class="language" onclick={showListLang}>
                        <div class="selectlink">
                            <div class="selectlink-control"><span>{lang.lang_orig}</span></div>
                        </div>
                    </div>
                    <div
                        class={`c-changelanguage ${langListShow ? '' : 'dn'}`}
                        id="listLanguage"
                        onclick={clickCancel}>
                        <div class="c-changelanguage__header">
                            <h4 class="c-changelanguage__title">{lang.h.modal_listLanguage}</h4>
                        </div>
                        {LanguagesList(languages)}
                    </div>
                    <div class="header_avatar_container">
                        <a href="/user/Viktoriya" class="c-avataruser">
                            <img
                                class="c-avataruser__photo"
                                src="/assets/upload/avatar/tory.png"
                            />
                            <img
                                class="c-avataruser__frame"
                                src={images[`frame/${frame}`]}
                            />
                            <div class="c-avataruser__level">
                                <i class="c-avataruser__levelicon"></i>
                                <span>9</span>
                            </div>
                            <div
                                style="display: none;"
                                class="c-avataruser__user--online"
                            ></div>
                            <div
                                style="display: none;"
                                class="c-avataruser__user--offline"
                            ></div>
                        </a>
                    </div>
                    <div class="auth_user_header">
                        <div class="c-header__notifications c-notification c-notification--active">
                            <a href="" class="c-notification__link"></a>
                            <div class="c-notification__new"></div>
                        </div>
                        <div class="c-header__messages c-messages">
                            <a href="/user/chats/" class="c-messages__link" data-action="link">
                                <i class="c-messages__icon"></i> 
                                <div style="display: none;" class="c-messages__counter"></div>
                            </a>
                            <div class="c-messages__new"></div>
                        </div>
                        <i class="c-header__burger"></i>
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
                </div>
                <nav class="c-header__menu c-menu">
                    <a class="c-logo c-menu__link" href="/" onclick={siteLink}>
                        <img class="c-logo__image" src={svg.logo} />
                    </a>
                    <a class="c-menu__link" href="/contacts/" onclick={siteLink}>{lang.a.contacts}</a>
                    <a class="c-menu__link" href="/about/" onclick={siteLink}>{lang.a.about}</a>
                    <a class="c-menu__link" href="/blog/" onclick={siteLink}>{lang.a.blog}</a>
                </nav>
            </div>
        </div>
    )
}

export default forExport


const styles = {
    header:{
    background: 'red',
    whidth:'100%',
    height:'30px'
    },
    test:{

    }
}