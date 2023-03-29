import {
  jsx,
  jsxFrag,
  init,
  initGo,
  Variable,
  load,
} from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/index.js";
import svg from "@assets/svg/index.js";
import { BottomMenu } from "@component/element/BottomMenu.js";

const mainFooter = async function () {
  let socialIcon, collapseBodyShow;
  let elem = {};
  elem.telegram = Variable.setRef();
  elem.tiktok = Variable.setRef();
  elem.youtube = Variable.setRef();

  const showSocial = function (e) {
    socialIcon[e.currentTarget.dataset.type] =
      !socialIcon[e.currentTarget.dataset.type];
    initGo("mainFooter", true);
  };

  const showCollapseBody = function (e) {
    collapseBodyShow[e.target.dataset.number] =
      !collapseBodyShow[e.target.dataset.number];
    e.stopPropagation();
    initGo(null, true);
  };

  load({
    ID: "mainFooter",
    fnLoad: () => {
      socialIcon = {
        telegram: false,
        tiktok: false,
      };

      collapseBodyShow = {
        one: false,
        two: false,
        three: false,
        four: false,
      };
    },
    fn: () => {
      return (
        <div>
          {() => {
            if (Variable.Static.FooterMenuShow) {
              return <BottomMenu />;
            }
          }}
          {/* {() => {
            if (Variable.Static.FooterShow) {
              return (
                <div
                  class={`c-footer__container c-container ${
                    Variable.auth ? "c-footer__container--panel" : ""
                  }`}
                >
                  <div class="c-footer__nav" id="accordionFooter">
                    <div class="c-footer__accordion c-accordion">
                      <span class="c-accordion__header" id="headingOne">
                        <button
                          class={`c-accordion__btn ${
                            collapseBodyShow.one
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
                        class={`c-accordion__collapse c-accordion__collapse--collapse ${
                          !collapseBodyShow.one
                            ? ""
                            : "c-accordion__collapse--show"
                        }`}
                        style={`${
                          !collapseBodyShow.one ? "" : "max-height: 200px"
                        }`}
                      >
                        <div class="c-accordion__body">
                          <a
                            class="c-footer__link"
                            href="/about/"
                            onclick={(e) => {
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
                              fn.siteLinkModal(e, {
                                title: Variable.lang.a.blog,
                                items: fn.itemsMenu.onlyPage({ url: "/blog/" }),
                              });
                            }}
                            href="/blog/"
                          >
                            <span>{Variable.lang.a.blog}</span>
                          </a>
                          <a
                            class="c-footer__link"
                            onclick={(e) => {
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
                          <a
                            class="c-footer__link"
                            onclick={(e) => {
                              fn.siteLinkModal(e, {
                                title: Variable.lang.h.mediaUs,
                                items: fn.itemsMenu.onlyPage({
                                  url: "/media/",
                                }),
                              });
                            }}
                            href="/media/"
                          >
                            <span>{Variable.lang.h.mediaUs}</span>
                          </a>

                          {/* {<a class="c-footer__link" onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.a.university }) }} href="/university/"><span>{Variable.lang.a.university}</span></a>} */}
              {/*}            <a
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
                          class={`c-accordion__btn ${
                            collapseBodyShow.two
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
                        class={`c-accordion__collapse c-accordion__collapse--collapse ${
                          !collapseBodyShow.two
                            ? ""
                            : "c-accordion__collapse--show"
                        }`}
                        style={`${
                          !collapseBodyShow.two ? "" : "max-height: 200px"
                        }`}
                      >
                        <div class="c-accordion__body">
                          <a
                            class="c-footer__link"
                            onclick={(e) => {
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
                          class={`c-accordion__btn ${
                            collapseBodyShow.three
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
                        class={`c-accordion__collapse c-accordion__collapse--collapse ${
                          !collapseBodyShow.three
                            ? ""
                            : "c-accordion__collapse--show"
                        }`}
                        style={`${
                          !collapseBodyShow.three ? "" : "max-height: 200px"
                        }`}
                      >
                        <div class="c-accordion__body">
                          <a
                            class="c-footer__link"
                            onclick={(e) => {
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
                          class={`c-accordion__btn ${
                            collapseBodyShow.four
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
                        class={`c-accordion__collapse c-accordion__collapse--collapse ${
                          !collapseBodyShow.four
                            ? ""
                            : "c-accordion__collapse--show"
                        }`}
                        style={`${
                          !collapseBodyShow.four ? "" : "max-height: 200px"
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
                        class="c-button__app"
                      >
                        <img src={svg["appstore"]} />
                      </a>
                      {/* <a href="https://play.google.com/store/apps/details?id=com.cryptoemergency" class="c-button__app">
                                            <img src={svg['googleplay']} />
                                        </a> */}
       {/*             </div>
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
              );
            }
          }} */}
        </div>
      );
    },
  });
  return;
};

export { mainFooter };
