import { jsx, jsxFrag, Variable, load, CEM } from "@betarost/cemserver/cem.js";

// import svg from "@assets/svg/index.js";
// import { fn } from "@src/functions/index.js";
import { Avatar } from "@elements/element/index.js";

const { images, svg, fn } = CEM

let Burger
const Header = async function () {
    load({
        ID: "mainHeader",
        fn: async () => {
            if (Variable.Static.forumHeaderShow) {
                document.getElementById('mainHeader').classList.add("c-header--summerforum");
            } else {
                document.getElementById('mainHeader').classList.remove("c-header--summerforum");
            }
            if (Variable.Static.HeaderShow) {
                return (
                    <div class="c-header__container c-container">
                        <div class="c-header__inner">
                            {
                                () => {
                                    if (!Variable.Static.forumHeaderShow) {
                                        return (
                                            <div class="c-header__auth">
                                                <div
                                                    class="language"
                                                    onclick={() => {
                                                        fn.modals.ModalLanguageSite({});
                                                    }}>
                                                    <div
                                                        class={["selectlink", "selectlink-control"]}>
                                                        <span>
                                                            {Variable.lang.lang_orig}
                                                        </span>
                                                    </div>
                                                    {/* <TextInSpan mClass={["selectlink", "selectlink-control"]}>
                                                        {Variable.lang.lang_orig}
                                                    </TextInSpan> */}
                                                </div>
                                                {/* <Row
                                                    class="language"
                                                    onclick={() => {
                                                        fn.modals.ModalLanguageSite({});
                                                    }}
                                                >
                                                    <TextInSpan mClass={["selectlink", "selectlink-control"]}>
                                                        {Variable.lang.lang_orig}
                                                    </TextInSpan>
                                                </Row> */}
                                                {() => {
                                                    if (Variable.auth && Variable.myInfo) {
                                                        return (
                                                            <div class="c-header__wrapper" style="">
                                                                <div class="header_avatar_container">
                                                                    <Avatar author={Variable.myInfo} />
                                                                </div>
                                                            </div>
                                                        );
                                                    } else {
                                                        return (
                                                            <div
                                                                style="display: flex; align-items: center">
                                                                <a
                                                                    class="log-in"
                                                                    onclick={(e) => {
                                                                        e.stopPropagation();
                                                                        fn.modals.ModalAuth({});
                                                                    }}>
                                                                    {Variable.lang.button.login}
                                                                </a>

                                                                <button
                                                                    type="button"
                                                                    class="c-button c-button--gradient"
                                                                    onclick={(e) => {
                                                                        e.stopPropagation();
                                                                        fn.modals.ModalReg({});
                                                                    }}>
                                                                    <span class="c-button__text">{Variable.lang.button.registration}</span>
                                                                </button>

                                                                {/* <Button
                                                                    class="c-button c-button--gradient"
                                                                    text={Variable.lang.button.registration}
                                                                    textClass="c-button__text"
                                                                    onclick={(e) => {
                                                                        e.stopPropagation();
                                                                        fn.modals.ModalReg({});
                                                                    }}
                                                                ></Button> */}
                                                            </div>
                                                        );
                                                    }
                                                }}
                                            </div>
                                        )
                                    }
                                }
                            }


                            {
                                () => {
                                    if (Variable.Static.forumHeaderShow) {
                                        return (
                                            <nav class="c-header__menu c-menu c-menu--forum" style="position: relative;">
                                                {/* <div class={["connect", !Variable.socketConnect ? "disconnect" : null]}></div> */}
                                                <a
                                                    class="c-logo c-menu__link"
                                                    href="/"
                                                    onclick={fn.siteLink}>
                                                    <img
                                                        src={svg.logo}
                                                        class="c-logo__image">
                                                    </img>
                                                </a>
                                                <a
                                                    class="c-menu__link"
                                                    onclick={(e) => {
                                                        window.scrollTo({
                                                            top: document.querySelector("#about").offsetTop - 75,
                                                            behavior: "smooth",
                                                        });
                                                    }}>
                                                    {Variable.lang.a.aboutForum}
                                                </a>
                                                <a
                                                    class="c-menu__link"
                                                    onclick={(e) => {
                                                        window.scrollTo({
                                                            top: document.querySelector("#stands").offsetTop - 75,
                                                            behavior: "smooth",
                                                        });
                                                    }}>
                                                    {Variable.lang.a.stands}
                                                </a>
                                                <a
                                                    class="c-menu__link"
                                                    onclick={(e) => {
                                                        window.scrollTo({
                                                            top: document.querySelector("#speakers").offsetTop - 75,
                                                            behavior: "smooth",
                                                        });
                                                    }}>
                                                    {Variable.lang.a.speakers}
                                                </a>
                                                <a
                                                    class="c-menu__link"
                                                    onclick={(e) => {
                                                        window.scrollTo({
                                                            top: document.querySelector("#guests").offsetTop - 75,
                                                            behavior: "smooth",
                                                        });
                                                    }}>
                                                    {Variable.lang.a.guests}
                                                </a>
                                                <a
                                                    class="c-menu__link"
                                                    onclick={(e) => {
                                                        window.scrollTo({
                                                            top: document.querySelector("#forumtopics").offsetTop - 75,
                                                            behavior: "smooth",
                                                        });
                                                    }}>
                                                    {Variable.lang.a.topics}
                                                </a>
                                                <a
                                                    class="c-menu__link"
                                                    onclick={(e) => {
                                                        window.scrollTo({
                                                            top: document.querySelector("#partners").offsetTop - 75,
                                                            behavior: "smooth",
                                                        });
                                                    }}>
                                                    {Variable.lang.a.partnersForum}
                                                </a>
                                                <a
                                                    class="c-menu__link"
                                                    onclick={(e) => {
                                                        window.scrollTo({
                                                            top: document.querySelector("#localmap").offsetTop - 75,
                                                            behavior: "smooth",
                                                        });
                                                    }}>
                                                    {Variable.lang.a.localmap}
                                                </a>


                                                {/* <a
                          class={[
                            "c-userpanel__icon",
                            "c-userpanel__icon--burger",
                            "c-userpanel__icon--mobile_visible",
                          ]}
                          Element={($el) => {
                            Burger = $el
                          }}
                          onClick={(e) => { e.stopPropagation(); fn.modals.ModalMobileForum({ Burger }); Burger.classList.add("c-userpanel__icon--active") }}>
                        </a> */}
                                            </nav>
                                        )
                                    } else {
                                        return (
                                            <nav class="c-header__menu c-menu" style="position: relative;">
                                                {/* <div class={["connect", !Variable.socketConnect ? "disconnect" : null]}></div> */}

                                                <a
                                                    class="c-logo c-menu__link"
                                                    href="/"
                                                    onclick={fn.siteLink}>
                                                    <img
                                                        src={svg.logo}
                                                        class="c-logo__image">
                                                    </img>
                                                </a>
                                                <a
                                                    class="c-menu__link"
                                                    href="/contacts/"
                                                    onclick={(e) => {
                                                        fn.siteLinkModal(e, {
                                                            title: Variable.lang.a.contacts,
                                                            items: fn.itemsMenu.onlyPage({ url: "/contacts/" }),
                                                        });
                                                    }}>
                                                    {Variable.lang.a.contacts}
                                                </a>
                                                <a
                                                    class="c-menu__link"
                                                    href="/about/"
                                                    onclick={(e) => {
                                                        fn.siteLinkModal(e, {
                                                            title: Variable.lang.a.about,
                                                            items: fn.itemsMenu.onlyPage({ url: "/about/" }),
                                                        });
                                                    }}>
                                                    {Variable.lang.a.about}
                                                </a>
                                                <a
                                                    class="c-menu__link"
                                                    href="/news/"
                                                    onclick={(e) => {
                                                        fn.siteLinkModal(e, {
                                                            title: Variable.lang.a.news,
                                                            items: fn.itemsMenu.onlyPage({ url: "/news/" }),
                                                        });
                                                    }}>
                                                    {Variable.lang.a.news}
                                                </a>
                                                <a 
                                                    target="_blank" 
                                                    href="https://twitter.com/cryptoemergency" 
                                                    class="c-menu__icon">
                                                    <img src={svg['socials/twitter']}></img>
                                                </a>


                                            </nav>
                                        )
                                    }
                                }
                            }

                        </div>
                    </div>
                );
            } else {
                return <div></div>;
            }
        },
    });
    return;
};

export { Header };
