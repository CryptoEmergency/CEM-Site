import { jsx, jsxFrag, getVariable, setValue, getValue, getStorage } from '@betarost/cemjs'
import logo from '@assets/svg/logo.svg'
import { clickCancel, siteLink, changeLang } from '@src/functions.js'
import svg from '@assets/svg/index.js'



const HeaderAuth = function () {


    return (
        <div class="c-header__container c-container">
            <div class="c-header__inner">
                <div class="c-header__auth">
                    <div
                        class="language"
                        onclick={showListLang}
                    >
                        <div class="selectlink">
                            <div class="selectlink-control"><span>{Variable.lang.lang_orig}</span></div>
                        </div>
                    </div>
                    <div
                        class={`c-changelanguage ${Variable.langListShow ? '' : 'dn'}`}
                        id="listLanguage"
                        onclick={clickCancel}>
                        <div class="c-changelanguage__header">
                            <h4 class="c-changelanguage__title">{Variable.lang.h.modal_listLanguage}</h4>
                        </div>
                        {LanguagesList(Variable.languages)}
                    </div>
                    <div class="header_avatar_container">


                        {/* <Avatar author={Variable.myInfo} /> */}
                    </div>
                    <div class="auth_user_header">
                        <div class="c-header__notifications c-notification c-notification--active">
                            <a class="c-notification__link"></a>
                            <div class="c-notification__new"></div>
                        </div>
                        <div class="c-header__messages c-messages">
                            <a href="/user/chats/" class="c-messages__link" onclick={siteLink}>
                                <i class="c-messages__icon"></i>
                                <div style="display: none;" class="c-messages__counter"></div>
                            </a>
                            <div class="c-messages__new"></div>
                        </div>
                        <i class="c-header__burger"></i>
                    </div>
                    <div style="display: none;" class="user_notifications_block auth_notifications" id="notifications_block">

                    </div>
                </div>
                <nav class="c-header__menu c-menu">
                    <a class="c-logo c-menu__link" href="/" onclick={siteLink}>
                        <img class="c-logo__image" src={svg.logo} />
                    </a>
                    <a class="c-menu__link" href="/contacts/" onclick={siteLink}>{Variable.lang.a.contacts}</a>
                    <a class="c-menu__link" href="/about/" onclick={siteLink}>{Variable.lang.a.about}</a>
                    <a class="c-menu__link" href="/blog/" onclick={siteLink}>{Variable.lang.a.blog}</a>
                </nav>
            </div>
        </div>
    )
}

export default HeaderAuth


const styles = {
    header: {
        background: 'red',
        whidth: '100%',
        height: '30px'
    },
    test: {

    }
}