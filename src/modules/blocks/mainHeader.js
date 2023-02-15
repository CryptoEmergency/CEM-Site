import { jsx, jsxFrag, Variable, load } from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import { fn } from "@src/functions/index.js";
import { Avatar } from "@component/element/index.js";
import { TextInSpan, Row, Link, Button, Img } from "@htmlElements/index.js";
const mainHeader = async function () {
  load({
    ID: "mainHeader",
    fn: () => {
      if (Variable.Static.HeaderShow) {
        return (
          <div class="c-header__container c-container">
            <div class="c-header__inner">
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
              <nav class="c-header__menu c-menu" style="position: relative;">
                <div class="connect disconnect"></div>
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
