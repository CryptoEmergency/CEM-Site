import { jsx, jsxFrag, Variable, load } from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import { fn } from "@src/functions/index.js";
import { Avatar } from "@component/element/index.js";
import { TextInSpan, Row, Link, Button, Img } from "@htmlElements/index.js";
let Burger
const mainHeader = async function () {
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
                        <Row
                          class="language"
                          onclick={() => {
                            fn.modals.ModalLanguageSite({});
                          }}
                        >
                          <TextInSpan mClass={["selectlink", "selectlink-control"]}>
                            {Variable.lang.lang_orig}
                          </TextInSpan>
                        </Row>
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
                              <Row style="display: flex; align-items: center">
                                <Link
                                  class="log-in"
                                  onclick={(e) => {
                                    e.stopPropagation();
                                    fn.modals.ModalAuth({});
                                  }}
                                >
                                  {Variable.lang.button.login}
                                </Link>
                                <Button
                                  class="c-button c-button--gradient"
                                  text={Variable.lang.button.registration}
                                  textClass="c-button__text"
                                  onclick={(e) => {
                                    e.stopPropagation();
                                    fn.modals.ModalReg({});
                                  }}
                                ></Button>
                              </Row>
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
                        <div class={["connect", !Variable.socketConnect ? "disconnect" : null]}></div>
                        <Link
                          class="c-logo c-menu__link"
                          href="/"
                          onclick={fn.siteLink}
                        >
                          <Img eClass="c-logo__image" src={svg.logo}></Img>
                        </Link>
                        <Link
                          class="c-menu__link"
                          // href="#about"
                          onclick={(e) => {
                            window.scrollTo({
                              top: document.querySelector("#about").offsetTop - 75,
                              behavior: "smooth",
                            });
                          }}
                        >
                          {Variable.lang.a.aboutForum}
                        </Link>
                        <Link
                          class="c-menu__link"
                          // href="#stands"
                          onclick={(e) => {
                            window.scrollTo({
                              top: document.querySelector("#stands").offsetTop - 75,
                              behavior: "smooth",
                            });
                          }}
                        >
                          {Variable.lang.a.stands}
                        </Link>
                        <Link
                          class="c-menu__link"
                          // href="#speakers"
                          onclick={(e) => {
                            window.scrollTo({
                              top: document.querySelector("#speakers").offsetTop - 75,
                              behavior: "smooth",
                            });
                          }}
                        >
                          {Variable.lang.a.speakers}
                        </Link>
                        <Link
                          class="c-menu__link"
                          // href="#guests"
                          onclick={(e) => {
                            window.scrollTo({
                              top: document.querySelector("#guests").offsetTop - 75,
                              behavior: "smooth",
                            });
                          }}
                        >
                          {Variable.lang.a.guests}
                        </Link>
                        <Link
                          class="c-menu__link"
                          // href="#partners"
                          onclick={(e) => {
                            window.scrollTo({
                              top: document.querySelector("#partners").offsetTop - 75,
                              behavior: "smooth",
                            });
                          }}
                        >
                          {Variable.lang.a.partnersForum}
                        </Link>
                        <Link
                          class="c-menu__link"
                          // href="#localmap"
                          onclick={(e) => {
                            window.scrollTo({
                              top: document.querySelector("#localmap").offsetTop - 75,
                              behavior: "smooth",
                            });
                          }}
                        >
                          {Variable.lang.a.localmap}
                        </Link>
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
                        <div class={["connect", !Variable.socketConnect ? "disconnect" : null]}></div>
                        <Link
                          class="c-logo c-menu__link"
                          href="/"
                          onclick={fn.siteLink}
                        >
                          <Img eClass="c-logo__image" src={svg.logo}></Img>
                        </Link>
                        <Link
                          class="c-menu__link"
                          href="/contacts/"
                          onclick={(e) => {
                            fn.siteLinkModal(e, {
                              title: Variable.lang.a.contacts,
                              items: fn.itemsMenu.onlyPage({ url: "/contacts/" }),
                            });
                          }}
                        >
                          {Variable.lang.a.contacts}
                        </Link>

                        <Link
                          class="c-menu__link"
                          href="/about/"
                          onclick={(e) => {
                            fn.siteLinkModal(e, {
                              title: Variable.lang.a.about,
                              items: fn.itemsMenu.onlyPage({ url: "/about/" }),
                            });
                          }}
                        >
                          {Variable.lang.a.about}
                        </Link>

                        <Link
                          class="c-menu__link"
                          href="/blog/"
                          onclick={(e) => {
                            fn.siteLinkModal(e, {
                              title: Variable.lang.a.blog,
                              items: fn.itemsMenu.onlyPage({ url: "/blog/" }),
                            });
                          }}
                        >
                          {Variable.lang.a.blog}
                        </Link>
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

export { mainHeader };
