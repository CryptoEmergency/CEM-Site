import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    sendApi,
    initGo,
    Helpers,
    init,
    load,
    CEM
} from '@betarost/cemserver/cem.js';
// import svg from "@assets/svg/index.js";
// import { fn } from '@src/functions/index.js';
import youtube from '@assets/svg/youtube_icon.svg'
// const showAllLangMedia = function (e, target) {
//     e.preventDefault()
//     if (target.parentNode.children[0].style == "display: none;") {
//         target.parentNode.children[0].style = "";
//     } else {
//         target.parentNode.children[0].style = "display: none;";
//     }
// }

const { svg, fn } = CEM

let elem = {}

const ModalMobileMainSettings = function (data, ID) {

    let socialIcon, collapseBodyShow

    const showSocial = function (e) {
        socialIcon[e.currentTarget.dataset.type] = !socialIcon[e.currentTarget.dataset.type];
        // initGo("mainFooter", true);
    }

    socialIcon = {
        telegram: false,
        // youtube: false,
        tiktok: false
    }

    let close

    const showCollapseBody = function (e) {
        collapseBodyShow[e.target.dataset.number] =
            !collapseBodyShow[e.target.dataset.number];
        e.stopPropagation();
        initGo(null, true);
    };

    load({
        ID,
        fnLoad: async () => {
            elem.telegram = Variable.setRef()
            elem.tiktok = Variable.setRef()
            elem.youtube = Variable.setRef()

            socialIcon = {
                telegram: false,
                youtube: false,
                tiktok: false
            }

            collapseBodyShow = {
                one: false,
                two: false,
                three: false,
                four: false,
            };
        },
        fn: () => {
            return (
                <div class="c-modal c-modal--open c-modal--fullscreen" id="ModalMobileMainSettings"
                    onclick={
                        function (e) {
                            if (close) {

                                fn.modals.close(ID)

                            }

                            if (data.Burger) {
                                data.Burger.classList.remove("c-userpanel__icon--active")
                            }
                        }
                    }
                >
                    <section class="c-modal__dialog"
                        onmouseover={
                            function () {
                                close = false
                            }
                        }
                        onmouseleave={
                            function () {
                                close = true
                            }
                        }
                    >
                        <header class="c-modal__header">
                            {/* <h2 class="c-modal__title">{Variable.lang.h.modal_login}</h2> */}
                            <div
                                class="language language_visible"
                                onclick={() => {
                                    fn.modals.ModalLanguageSite({}, true)
                                }}
                            >
                                <div class="selectlink">
                                    <div class="selectlink-control">
                                        <img class="language_change_world" src={svg.language_change_world} /> {Variable.lang.lang_orig}
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                class="c-modal__close"
                                onclick={() => { fn.modals.close(ID) }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div class="user_mobile_menu_part">
                                <div class="user_mobile_menu_content">
                                    {Variable.lang.text.menu}
                                </div>
                            </div>
                            {() => {
                                if (Variable.auth) {
                                    return (
                                        <div>
                                            <div class="user_mobile_menu_content user_mobile_menu_main_content">
                                                <a onclick={fn.siteLink} class="user_icon_mobile_visible user_icon" href={`/user/${Variable.myInfo.nickname}`}>
                                                    <img src={svg["profile_icon-1"]} />
                                                    <span class="mobile_user_menu_link">{Variable.lang.a.profile}</span>
                                                </a>
                                                {/* <a onclick={Helpers.siteLink} class="user_icon_mobile_visible user_icon" href="/user/chats/">
                                            <img src={svg["profile_icon-2"]} />
                                            <span class="mobile_user_menu_link">{Variable.lang.a.chats}</span>
                                        </a> */}
                                                <a onclick={fn.siteLink} class="user_icon_mobile_visible user_icon" href="/user/posts/">
                                                    <img src={svg["profile_icon-5"]} />
                                                    <span class="mobile_user_menu_link">{Variable.lang.h.createPost}</span>
                                                </a>
                                                <a onclick={fn.siteLink} class="user_icon_mobile_visible user_icon" href="/user/awards/">
                                                    <img src={svg["profile_icon-4"]} />
                                                    <span class="mobile_user_menu_link">{Variable.lang.a.awards}</span>
                                                </a>
                                                {/* <a data-updating="true" onclick={Helpers.siteLink} class="user_icon_mobile_visible user_icon" href="/user/quests/">
                                            <img src={svg["profile_icon-10"]} />
                                            <span class="mobile_user_menu_link">{Variable.lang.a.tasks}</span>
                                        </a> */}
                                                <a onclick={fn.siteLink} class="user_icon_mobile_visible user_icon" href="/user/wallet/">
                                                    <img src={svg.absolutely_new_wallet} />
                                                    <span class="mobile_user_menu_link">{Variable.lang.a.wallet}</span>
                                                </a>
                                                <a onclick={fn.siteLink} class="user_icon_mobile_visible user_icon" href="/user/notes/">
                                                    <img src={svg.notes} />
                                                    <span class="mobile_user_menu_link">{Variable.lang.a.notes}</span>
                                                </a>
                                                <a onclick={fn.siteLink} class="user_icon_mobile_visible user_icon" href="/user/affiliate/">
                                                    <img src={svg["profile_icon-3"]} />
                                                    <span class="mobile_user_menu_link">{Variable.lang.a.affiliate}</span>
                                                </a>
                                                <a onclick={fn.siteLink} class="user_icon_mobile_visible user_icon" href="/user/settings/">
                                                    <img src={svg["settings_menu"]} />
                                                    <span class="mobile_user_menu_link">{Variable.lang.text.settings}</span>
                                                </a>
                                                {/* <a onclick={(e) => {
                                                    fn.siteLinkModal(e, { title: Variable.lang.h.affiliate, items: fn.itemsMenu.onlyPage({ url: '/affiliate/' }) })
                                                    fn.modals.close(ID)
                                                }} class="user_icon_mobile_visible user_icon" href="/user/affiliate/">
                                                    <img src={svg["profile_icon-3"]} />
                                                    <span class="mobile_user_menu_link">{Variable.lang.a.affiliate}</span>
                                                </a> */}
                                                {/* <a onclick={(e) => {
                                                    fn.siteLinkModal(e, { title: Variable.lang.text.settings })
                                                    fn.modals.close(ID)
                                                }}
                                                    class="user_icon_mobile_visible user_icon"
                                                    href="/user/settings/">
                                                    <img src={svg["settings_menu"]} />
                                                    <span class="mobile_user_menu_link">{Variable.lang.text.settings}</span>
                                                </a> */}
                                                <a
                                                    class="user_icon_mobile_visible user_icon"
                                                    href="#"
                                                    onclick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        fn.modals.ModalConfirmAction({
                                                            action: async () => {
                                                                fn.restApi.logOut()
                                                                Variable.Modals = []
                                                                Variable.Rooms = false
                                                                fn.modals.close("ModalConfirmAction")
                                                            },
                                                            text: Variable.lang.p.exitConfirm,
                                                            button: Variable.lang.button.yes
                                                        })
                                                    }}
                                                >
                                                    <img src={svg["exit-icon"]} /> <span class="mobile_user_menu_link">{Variable.lang.a.exit}</span>
                                                </a>
                                            </div>
                                            <div class="user_mobile_menu_part">
                                                <div class="user_mobile_menu_content">
                                                    {Variable.lang.text.sections}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }}
                            <div class="user_mobile_menu_content user_mobile_menu_main_content">
                                <a
                                    onclick={fn.siteLink}
                                    class={`user_icon_mobile_visible user_icon ${Variable.dataUrl.adress == "lenta-users" ? "user_icon_active" : ""}`}
                                    href="/lenta-users/"
                                >
                                    <img src={svg.user_news_page} />
                                    <span class="mobile_user_menu_link">{Variable.lang.span.userNews}</span>
                                </a>
                                <a
                                    onclick={(e) => {
                                        Variable.DelModals("ModalMobileMainSettings");
                                        fn.siteLinkModal(e, {
                                            title: Variable.lang.a.experts, items:
                                                [
                                                    {
                                                        text: Variable.lang.select.share,
                                                        type: "share",
                                                        onclick: async () => {
                                                            try {
                                                                if (navigator.share) {
                                                                    await navigator.share({
                                                                        url: window.location.origin + "/experts/",
                                                                    });
                                                                }
                                                            } catch (err) {
                                                                console.error("Share", err)
                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: Variable.lang.p.copy + " URL",
                                                        type: "copyurl",
                                                        onclick: async () => {
                                                            navigator.clipboard.writeText(window.location.origin + "/experts/");
                                                            Variable.SetModals({ name: "ModalAlarm", data: { icon: "confirm_icon", text: Variable.lang.text.coppied } }, true)
                                                        }
                                                    }
                                                ]
                                        })
                                    }}
                                    class={`user_icon_mobile_visible user_icon ${Variable.dataUrl.adress == "experts" ? "user_icon_active" : ""}`}
                                    href="/experts/"
                                >
                                    <img src={svg.expert_menu_icon} />
                                    <span class="mobile_user_menu_link">{Variable.lang.a.experts}</span>
                                </a>
                                <a
                                    onclick={fn.siteLink}
                                    class={`user_icon_mobile_visible user_icon ${Variable.dataUrl.adress == "question" ? "user_icon_active" : ""}`}
                                    href="/question/"
                                >
                                    <img src={svg.user_mobile_answers_and_questions} />
                                    <span class="mobile_user_menu_link">{Variable.lang.a.questionsAnswers}</span>
                                </a>
                                {/* <a
                                    data-updating="true"
                                    onclick={Helpers.siteLink}
                                    class="user_icon_mobile_visible user_icon"
                                    href={`${Variable.lang.url}chats/`}
                                >
                                    <img src={svg.community_chat_menu_icon} />
                                    <span class="mobile_user_menu_link">{Variable.lang.a.chatsPublic}</span>
                                </a> */}
                                <a
                                    onclick={(e) => {
                                        Variable.DelModals("ModalMobileMainSettings");
                                        fn.siteLinkModal(e, {
                                            title: Variable.lang.a.news, items: fn.itemsMenu.onlyPage({ url: '/news/' })
                                        })
                                    }}
                                    class="user_icon_mobile_visible user_icon"
                                    href={`${Variable.lang.url}news/`}
                                >
                                    <img src={svg.news_menu_icon1} />
                                    <span class="mobile_user_menu_link">{Variable.lang.a.news}</span>
                                </a>
                                {/* <a
                                    data-updating="true"
                                    onclick={Helpers.siteLink}
                                    class="user_icon_mobile_visible user_icon"
                                    href={`${Variable.lang.url}startups/`}
                                >
                                    <img src={svg.startup_menu_icon} />
                                    <span class="mobile_user_menu_link">{Variable.lang.a.starups}</span>
                                </a> */}
                                {/* <a
                                    onclick={(e) => {
                                        Variable.DelModals("ModalMobileMainSettings");
                                        Helpers.siteLinkModal(e, {
                                            title: Variable.lang.a.trade, items:
                                                [
                                                    {
                                                        text: Variable.lang.select.share,
                                                        type: "share",
                                                        onclick: async () => {
                                                            try {
                                                                if (navigator.share) {
                                                                    await navigator.share({
                                                                        url: window.location.origin + "/list-trade/",
                                                                    });
                                                                }
                                                            } catch (err) {
                                                                console.error("Share", err)
                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: Variable.lang.p.copy + " URL",
                                                        type: "copyurl",
                                                        onclick: async () => {
                                                            navigator.clipboard.writeText(window.location.origin + "/list-trade/");
                                                            Variable.SetModals({ name: "ModalAlarm", data: { icon: "confirm_icon", text: Variable.lang.text.coppied } }, true)
                                                        }
                                                    }
                                                ]
                                        })
                                    }}
                                    class="user_icon_mobile_visible user_icon"
                                    href={`${Variable.lang.url}list-trade/`}
                                >
                                    <img src={svg.exchange_menu_icon} />
                                    <span class="mobile_user_menu_link">{Variable.lang.a.trade}</span>
                                </a> */}
                                {/* <a
                                    onclick={(e) => {
                                        Variable.DelModals("ModalMobileMainSettings");
                                        Helpers.siteLinkModal(e, {
                                            title: Variable.lang.a.exchange, items:
                                                [
                                                    {
                                                        text: Variable.lang.select.share,
                                                        type: "share",
                                                        onclick: async () => {
                                                            try {
                                                                if (navigator.share) {
                                                                    await navigator.share({
                                                                        url: window.location.origin + "/list-exchange/",
                                                                    });
                                                                }
                                                            } catch (err) {
                                                                console.error("Share", err)
                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: Variable.lang.p.copy + " URL",
                                                        type: "copyurl",
                                                        onclick: async () => {
                                                            navigator.clipboard.writeText(window.location.origin + "/list-exchange/");
                                                            Variable.SetModals({ name: "ModalAlarm", data: { icon: "confirm_icon", text: Variable.lang.text.coppied } }, true)
                                                        }
                                                    }
                                                ]
                                        })
                                    }}
                                    class="user_icon_mobile_visible user_icon"
                                    href={`${Variable.lang.url}list-exchange/`}
                                >
                                    <img src={svg.exchanger_menu_icon} />
                                    <span class="mobile_user_menu_link">{Variable.lang.a.exchange}</span>
                                </a> */}
                                {/* <a
                                    data-updating="true"
                                    onclick={Helpers.siteLink}
                                    class="user_icon_mobile_visible user_icon"
                                    href={`${Variable.lang.url}ico-rating/`}
                                >
                                    <img src={svg.ico_rating} />
                                    <span class="mobile_user_menu_link">{Variable.lang.a.icoRating}</span>
                                </a> */}
                                <div class="mobile_header_socials desktop_dn" style="display: none;">
                                    <div class="social-icons">
                                        <div class="footer-icon-block">
                                            <div ref={elem.telegram} hidden={true} class="footer-media-full">
                                                <div>
                                                    <a
                                                        target="_blank"
                                                        href="https://t.me/cryptoemergencychat"
                                                        rel="nofollow noopener"
                                                        data-type="social"
                                                        data-count="telegramRu"
                                                    >
                                                        <img src={svg["telegram-icon"]} /> Русский
                                                    </a>
                                                </div>
                                                <div>
                                                    <a
                                                        target="_blank"
                                                        href="https://t.me/emergencycrypto"
                                                        rel="nofollow noopener"
                                                        data-type="social"
                                                        data-count="telegramEn"
                                                    >
                                                        <img src={svg["telegram-icon"]} /> English
                                                    </a>
                                                </div>
                                            </div>
                                            <a id="header_telegram_icon" onclick={(e) => {
                                                if (elem.telegram().hidden === true) {
                                                    elem.telegram().hidden = false
                                                    Variable.OutHideWindows.push([elem.telegram, elem.telegram])
                                                } else {
                                                    elem.telegram().hidden = true
                                                }
                                                elem.tiktok().hidden = true
                                                elem.youtube().hidden = true
                                                e.stopPropagation();
                                            }} class="icon" data-type="telegram">
                                                <img src={svg["telegram-icon"]} />
                                            </a>
                                        </div>
                                        <div class="footer-icon-block">
                                            <div
                                                // style={socialIcon.youtube ? '' : 'display:none;'}
                                                hidden={true}
                                                class="c-socialicon__tooltip"
                                                ref={elem.youtube}
                                            >
                                                <div>
                                                    <a
                                                        target="_blank"
                                                        href="https://www.youtube.com/channel/UCb9Fx-fNikzs-OZwnTXepLg/"
                                                    >
                                                        <img src={youtube} /> Русский
                                                    </a>
                                                </div>
                                                <div>
                                                    <a
                                                        target="_blank"
                                                        href="https://www.youtube.com/channel/UCdDWOveIuvqkyusDK1gv4ig/"
                                                    >
                                                        <img src={youtube} /> English
                                                    </a>
                                                </div>
                                            </div>
                                            <a class="icon" onclick={(e) => {
                                                if (elem.youtube().hidden === true) {
                                                    elem.youtube().hidden = false
                                                    Variable.OutHideWindows.push([elem.youtube, elem.youtube])
                                                } else {
                                                    elem.youtube().hidden = true
                                                }
                                                elem.tiktok().hidden = true
                                                elem.telegram().hidden = true
                                                e.stopPropagation();
                                            }} data-type="social" data-count="youtube">
                                                <img src={svg["youtube-icon"]} />
                                            </a>
                                        </div>
                                        <div class="footer-icon-block">
                                            <a href="https://twitter.com/cryptoemergency" target="_blank" class="icon" rel="nofollow noopener" data-type="social" data-count="twitter">
                                                <img src={svg["twitter-icon"]} />
                                            </a>
                                        </div>
                                        <div class="footer-icon-block">
                                            <a href="https://discord.com/invite/Qdm7W8DjYc" target="_blank" class="icon" rel="nofollow noopener" data-type="social" data-count="discord">
                                                <img src={svg["discord-icon"]} />
                                            </a>
                                        </div>
                                        <div class="footer-icon-block">
                                            <a href="https://github.com/CryptoEmergency" target="_blank" class="icon" rel="nofollow noopener" data-type="social" data-count="discord">
                                                <img src={svg["github-icon2"]} />
                                            </a>
                                        </div>
                                        <div class="footer-icon-block">
                                            <div ref={elem.tiktok} hidden={true} class="footer-media-full footer-media-full-right">
                                                <div>
                                                    <a target="_blank" href="https://www.tiktok.com/@cryptoemergencyrussia" rel="nofollow noopener" data-type="social" data-count="tiktokRu">
                                                        <img src={svg["tiktok-icon"]} /> Русский
                                                    </a>
                                                </div>
                                                <div>
                                                    <a target="_blank" href="https://www.tiktok.com/@cryptoemergency" rel="nofollow noopener" data-type="social" data-count="tiktokEn">
                                                        <img src={svg["tiktok-icon"]} /> English
                                                    </a>
                                                </div>
                                            </div>
                                            <a id="header_tiktok_icon" onclick={(e) => {
                                                if (elem.tiktok().hidden === true) {
                                                    elem.tiktok().hidden = false
                                                    Variable.OutHideWindows.push([elem.tiktok, elem.tiktok])
                                                } else {
                                                    elem.tiktok().hidden = true
                                                }
                                                elem.youtube().hidden = true
                                                elem.telegram().hidden = true
                                                e.stopPropagation();
                                            }} class="icon">
                                                <img src={svg["tiktok-icon"]} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="user_mobile_menu_part">
                                <div class="user_mobile_menu_content">
                                    CryptoEmergency
                                </div>
                            </div>
                            <div
                                class={`c-footer__container1 c-container ${Variable.auth ? "c-footer__container--panel" : ""
                                    }`}
                            >
                                <div class="c-footer__nav" id="accordionFooter">
                                    <div class="c-footer__accordion c-accordion">
                                        <span class="c-accordion__header" id="headingOne">
                                            <button
                                                class={`c-accordion__btn ${collapseBodyShow.one
                                                    ? ""
                                                    : "c-accordion__btn--collapsed"
                                                    }`}
                                                type="button"
                                                onclick={showCollapseBody}
                                                data-number="one"
                                            >
                                                {Variable.lang.span.company}
                                            </button>
                                        </span>
                                        <div
                                            id="collapseOne"
                                            class={`c-accordion__collapse c-accordion__collapse--collapse ${!collapseBodyShow.one
                                                ? ""
                                                : "c-accordion__collapse--show"
                                                }`}
                                            style={`${!collapseBodyShow.one ? "" : "max-height: 200px"
                                                }`}
                                        >
                                            <div class="c-accordion__body">
                                                <a
                                                    class="c-footer__link"
                                                    href="/about/"
                                                    onclick={(e) => {
                                                        fn.modals.close(ID);
                                                        if (data.Burger) {
                                                            data.Burger.classList.remove("c-userpanel__icon--active")
                                                        }
                                                        fn.siteLinkModal(e, {
                                                            title: Variable.lang.a.about,
                                                            items: fn.itemsMenu.onlyPage({
                                                                url: "/about/",
                                                            }),
                                                        });
                                                    }}
                                                >
                                                    <span>{Variable.lang.a.about}</span>
                                                </a>
                                                <a
                                                    class="c-footer__link"
                                                    onclick={(e) => {
                                                        fn.modals.close(ID);
                                                        if (data.Burger) {
                                                            data.Burger.classList.remove("c-userpanel__icon--active")
                                                        }
                                                        fn.siteLinkModal(e, {
                                                            title: Variable.lang.a.career,
                                                            items: fn.itemsMenu.onlyPage({
                                                                url: "/career-whith-us/",
                                                            }),
                                                        });
                                                    }}
                                                    href="/career-whith-us/"
                                                >
                                                    <span>{Variable.lang.a.career}</span>
                                                </a>

                                                {/* {<a class="c-footer__link" onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.a.university }) }} href="/university/"><span>{Variable.lang.a.university}</span></a>} */}
                                                <a
                                                    target="_blank"
                                                    class="c-footer__link"
                                                    href={
                                                        Variable.lang.code == "ru"
                                                            ? "/assets/docs/LitePaperRu.pdf"
                                                            : "/assets/docs/LitePaperEn.pdf"
                                                    }
                                                >
                                                    <span>{Variable.lang.span.litePaper}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="c-footer__accordion c-accordion">
                                        <span class="c-accordion__header" id="headingTwo">
                                            <button
                                                class={`c-accordion__btn ${collapseBodyShow.two
                                                    ? ""
                                                    : "c-accordion__btn--collapsed"
                                                    }`}
                                                type="button"
                                                onclick={showCollapseBody}
                                                data-number="two"
                                            >
                                                {Variable.lang.span.support}
                                            </button>
                                        </span>
                                        <div
                                            id="collapseTwo"
                                            class={`c-accordion__collapse c-accordion__collapse--collapse ${!collapseBodyShow.two
                                                ? ""
                                                : "c-accordion__collapse--show"
                                                }`}
                                            style={`${!collapseBodyShow.two ? "" : "max-height: 200px"
                                                }`}
                                        >
                                            <div class="c-accordion__body">
                                                <a
                                                    class="c-footer__link"
                                                    onclick={(e) => {
                                                        fn.modals.close(ID);
                                                        if (data.Burger) {
                                                            data.Burger.classList.remove("c-userpanel__icon--active")
                                                        }
                                                        fn.siteLinkModal(e, {
                                                            title: Variable.lang.a.contacts,
                                                            items: fn.itemsMenu.onlyPage({
                                                                url: "/contacts/",
                                                            }),
                                                        });
                                                    }}
                                                    href="/contacts/"
                                                >
                                                    <span>{Variable.lang.a.contacts}</span>
                                                </a>
                                                <a
                                                    class="c-footer__link"
                                                    onclick={(e) => {
                                                        fn.modals.close(ID);
                                                        if (data.Burger) {
                                                            data.Burger.classList.remove("c-userpanel__icon--active")
                                                        }
                                                        fn.siteLinkModal(e, {
                                                            title: Variable.lang.h.affiliate,
                                                            items: fn.itemsMenu.onlyPage({
                                                                url: "/affiliate/",
                                                            }),
                                                        });
                                                    }}
                                                    href="/affiliate/"
                                                >
                                                    <span>{Variable.lang.h.affiliate}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="c-footer__accordion c-accordion">
                                        <span class="c-accordion__header" id="headingThree">
                                            <button
                                                class={`c-accordion__btn ${collapseBodyShow.three
                                                    ? ""
                                                    : "c-accordion__btn--collapsed"
                                                    }`}
                                                type="button"
                                                onclick={showCollapseBody}
                                                data-number="three"
                                            >
                                                {Variable.lang.span.rules}
                                            </button>
                                        </span>
                                        <div
                                            id="collapseThree"
                                            class={`c-accordion__collapse c-accordion__collapse--collapse ${!collapseBodyShow.three
                                                ? ""
                                                : "c-accordion__collapse--show"
                                                }`}
                                            style={`${!collapseBodyShow.three ? "" : "max-height: 200px"
                                                }`}
                                        >
                                            <div class="c-accordion__body">
                                                <a
                                                    class="c-footer__link"
                                                    onclick={(e) => {
                                                        fn.modals.close(ID);
                                                        if (data.Burger) {
                                                            data.Burger.classList.remove("c-userpanel__icon--active")
                                                        }
                                                        fn.siteLinkModal(e, {
                                                            title: Variable.lang.a.userTerms,
                                                            items: fn.itemsMenu.onlyPage({
                                                                url: "/terms-of-service/",
                                                            }),
                                                        });
                                                    }}
                                                    href="/terms-of-service/"
                                                >
                                                    <span>{Variable.lang.a.userTerms}</span>
                                                </a>
                                                <a
                                                    class="c-footer__link"
                                                    onclick={(e) => {
                                                        fn.modals.close(ID);
                                                        if (data.Burger) {
                                                            data.Burger.classList.remove("c-userpanel__icon--active")
                                                        }
                                                        fn.siteLinkModal(e, {
                                                            title: Variable.lang.a.dataPolicy,
                                                            items: fn.itemsMenu.onlyPage({
                                                                url: "/data-policy/",
                                                                downloadurl:
                                                                    Variable.lang.code == "ru"
                                                                        ? "/assets/docs/policyRU.pdf"
                                                                        : "/assets/docs/policyEN.pdf",
                                                            }),
                                                        });
                                                    }}
                                                    href="/data-policy/"
                                                >
                                                    <span>{Variable.lang.a.dataPolicy}</span>
                                                </a>
                                                <a
                                                    class="c-footer__link"
                                                    onclick={(e) => {
                                                        fn.modals.close(ID);
                                                        if (data.Burger) {
                                                            data.Burger.classList.remove("c-userpanel__icon--active")
                                                        }
                                                        fn.siteLinkModal(e, {
                                                            title: Variable.lang.a.cookies,
                                                            items: fn.itemsMenu.onlyPage({
                                                                url: "/cookies-policy/",
                                                            }),
                                                        });
                                                    }}
                                                    href="/cookies-policy/"
                                                >
                                                    <span>{Variable.lang.a.cookies}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="c-footer__accordion c-accordion">
                                        <span class="c-accordion__header" id="headingFour">
                                            <button
                                                class={`c-accordion__btn ${collapseBodyShow.four
                                                    ? ""
                                                    : "c-accordion__btn--collapsed"
                                                    }`}
                                                type="button"
                                                onclick={showCollapseBody}
                                                data-number="four"
                                            >
                                                CEM
                                            </button>
                                        </span>
                                        <div
                                            id="collapseFour"
                                            class={`c-accordion__collapse c-accordion__collapse--collapse ${!collapseBodyShow.four
                                                ? ""
                                                : "c-accordion__collapse--show"
                                                }`}
                                            style={`${!collapseBodyShow.four ? "" : "max-height: 200px"
                                                }`}
                                        >
                                            <div class="c-accordion__body">
                                                <a
                                                    class="c-footer__link"
                                                    target="_blank"
                                                    href="https://cemblockchain.com/"
                                                >
                                                    <span>CEM Blockchain</span>
                                                </a>
                                                <a
                                                    class="c-footer__link"
                                                    target="_blank"
                                                    href="https://cemscan.com/"
                                                >
                                                    <span>CEM Explorer</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="c-footer__accordion c-accordion">
                                        <a
                                            href="https://apps.apple.com/ru/app/crypto-emergency/id1635628021"
                                            target="_blank"
                                            class="c-button__app"
                                        >
                                            <img src={svg["appstore"]} />
                                        </a>
                                        <a href="https://play.google.com/store/apps/details?id=com.cryptoemergency" target="_blank" class="c-button__app">
                                            <img src={svg['googleplay']} />
                                        </a>
                                    </div>
                                </div>
                                <div class="c-footer__bottom">
                                    <div class="c-footer__copyright">
                                        ©2020-2023 Crypto Emergency
                                    </div>
                                    <div class="c-footer__socials">
                                        <div class="footer-icon-block c-socialicon">
                                            <div
                                                // style={socialIcon.telegram ? 'display:block;' : 'display:none;'}
                                                hidden={true}
                                                class="c-socialicon__tooltip"
                                                ref={elem.telegram}
                                            >
                                                <div>
                                                    <a
                                                        target="_blank"
                                                        href="https://t.me/cryptoemergencychat"
                                                    >
                                                        <img src={svg["telegram-icon"]} />
                                                        Русский
                                                    </a>
                                                </div>
                                                <div>
                                                    <a
                                                        target="_blank"
                                                        href="https://t.me/emergencycrypto"
                                                    >
                                                        <img src={svg["telegram-icon"]} />
                                                        English
                                                    </a>
                                                </div>
                                            </div>
                                            <a
                                                id="footer_telegram_icon"
                                                class="c-socialicon__link"
                                                // onclick={showSocial}

                                                onclick={(e) => {
                                                    if (elem.telegram().hidden === true) {
                                                        elem.telegram().hidden = false;
                                                        Variable.OutHideWindows.push([
                                                            elem.telegram,
                                                            elem.telegram,
                                                        ]);
                                                    } else {
                                                        elem.telegram().hidden = true;
                                                    }
                                                    elem.youtube().hidden = true;
                                                    elem.tiktok().hidden = true;
                                                    e.stopPropagation();
                                                }}
                                                data-type="telegram"
                                            >
                                                <img
                                                    class="c-socialicon__icon"
                                                    src={svg["telegram-icon"]}
                                                />
                                            </a>
                                        </div>
                                        <div class="c-socialicon">
                                            <div
                                                // style={socialIcon.youtube ? '' : 'display:none;'}
                                                hidden={true}
                                                class="c-socialicon__tooltip"
                                                ref={elem.youtube}
                                            >
                                                <div>
                                                    <a
                                                        target="_blank"
                                                        href="https://www.youtube.com/channel/UCb9Fx-fNikzs-OZwnTXepLg/"
                                                    >
                                                        <img src={svg["youtube_icon"]} /> Русский
                                                    </a>
                                                </div>
                                                <div>
                                                    <a
                                                        target="_blank"
                                                        href="https://www.youtube.com/channel/UCdDWOveIuvqkyusDK1gv4ig/"
                                                    >
                                                        <img src={svg["youtube_icon"]} /> English
                                                    </a>
                                                </div>
                                            </div>
                                            <a
                                                id="footer_youtube_icon"
                                                class="c-socialicon__link"
                                                onclick={(e) => {
                                                    if (elem.youtube().hidden === true) {
                                                        elem.youtube().hidden = false;
                                                        Variable.OutHideWindows.push([
                                                            elem.youtube,
                                                            elem.youtube,
                                                        ]);
                                                    } else {
                                                        elem.youtube().hidden = true;
                                                    }
                                                    elem.telegram().hidden = true;
                                                    elem.tiktok().hidden = true;
                                                    e.stopPropagation();
                                                }}
                                                data-type="youtube"
                                            >
                                                <img
                                                    class="c-socialicon__icon"
                                                    src={svg["youtube_icon"]}
                                                />
                                            </a>
                                        </div>
                                        <div class="c-socialicon">
                                            <a
                                                href="https://twitter.com/cryptoemergency"
                                                target="_blank"
                                                class="c-socialicon__link"
                                            >
                                                <img
                                                    class="c-socialicon__icon"
                                                    src={svg["twitter-icon"]}
                                                />
                                            </a>
                                        </div>
                                        <div class="c-socialicon">
                                            <a
                                                href="https://discord.com/invite/Qdm7W8DjYc"
                                                target="_blank"
                                                class="c-socialicon__link"
                                            >
                                                <img
                                                    class="c-socialicon__icon"
                                                    src={svg["discord-icon"]}
                                                />
                                            </a>
                                        </div>
                                        <div class="c-socialicon">
                                            <a
                                                href="https://github.com/CryptoEmergency"
                                                target="_blank"
                                                class="c-socialicon__link"
                                            >
                                                <img
                                                    class="c-socialicon__icon"
                                                    src={svg["github-icon2"]}
                                                />
                                            </a>
                                        </div>
                                        <div class="c-socialicon">
                                            <div
                                                // style={socialIcon.tiktok ? '' : 'display:none;'}
                                                hidden={true}
                                                class="c-socialicon__tooltip c-socialicon__tooltip--right"
                                                ref={elem.tiktok}
                                            >
                                                <div>
                                                    <a
                                                        target="_blank"
                                                        href="https://www.tiktok.com/@cryptoemergencyrussia"
                                                        rel="nofollow noopener"
                                                        data-type="social"
                                                        data-count="tiktokRu"
                                                    >
                                                        <img src={svg["tiktok-icon"]} /> Русский{" "}
                                                    </a>
                                                </div>
                                                <div>
                                                    <a
                                                        target="_blank"
                                                        href="https://www.tiktok.com/@cryptoemergency"
                                                        rel="nofollow noopener"
                                                        data-type="social"
                                                        data-count="tiktokEn"
                                                    >
                                                        <img src={svg["tiktok-icon"]} /> English{" "}
                                                    </a>
                                                </div>
                                            </div>
                                            <a
                                                id="footer_tiktok_icon"
                                                class="c-socialicon__link"
                                                onclick={(e) => {
                                                    if (elem.tiktok().hidden === true) {
                                                        elem.tiktok().hidden = false;
                                                        Variable.OutHideWindows.push([
                                                            elem.tiktok,
                                                            elem.tiktok,
                                                        ]);
                                                    } else {
                                                        elem.tiktok().hidden = true;
                                                    }
                                                    elem.youtube().hidden = true;
                                                    elem.telegram().hidden = true;
                                                    e.stopPropagation();
                                                }}
                                                data-type="tiktok"
                                            >
                                                <img
                                                    class="c-socialicon__icon"
                                                    src={svg["tiktok-icon"]}
                                                />
                                            </a>
                                        </div>
                                        <div class="c-socialicon">
                                            <a
                                                href="https://www.linkedin.com/company/86302977"
                                                target="_blank"
                                                class="c-socialicon__link"
                                            >
                                                <img
                                                    class="c-socialicon__icon"
                                                    src={svg["linkedin-icon"]}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {() => {/*
                                if (Variable.auth) {
                                    return (
                                        <div>
                                            <div class="user_mobile_menu_part">
                                                <div class="user_mobile_menu_content">
                                                    {Variable.lang.text.control}
                                                </div>
                                            </div>
                                            <div class="user_mobile_menu_bottom">
                                                <div class="user_mobile_menu_content">
                                                    <a class="user_icon_mobile_visible user_icon" href="" onclick={
                                                        function(){
                                                            
                                                          fn.restApi.logOut(Variable.myInfo._id)
                                                        }

                                                    }>
                                                        <img src={svg["exit-icon"]} /> <span class="mobile_user_menu_link">{Variable.lang.a.exit}</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            */}}
                        </div>
                    </section>
                </div>
            )
        }
    })
};


export default ModalMobileMainSettings;