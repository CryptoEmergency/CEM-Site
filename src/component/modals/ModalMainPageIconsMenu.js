import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  sendApi,
  initGo,
  Helpers,
  init,
} from "@betarost/cemserver/cem.js";
import svg from "@assets/svg/index.js";
import { fn } from "@src/functions/index.js";

const ModalMainPageIconsMenu = function (data, ID) {
  init(
    () => {},
    () => {
      return (
        <div
          class="c-modal c-modal--open c-modal--fullscreen"
          id="ModalMainPageIconsMenu"
          onclick={function (e) {
            if (close) {
              fn.modals.close(ID);
            }
          }}
        >
          <section class="c-modal__dialog">
            <header class="c-modal__header">
              <h2 class="c-modal__title">{Variable.lang.h.modalAllServices}</h2>

              <button
                type="button"
                class="c-modal__close"
                onclick={() => {
                  fn.modals.close(ID);
                }}
              ></button>
            </header>
            <div class="c-modal__body">
              <div class="c-allservices">
                <div class="c-allservices__subtitle">
                  {Variable.lang.text.communion}
                </div>
                <div class="c-allservices__group">
                  <a
                    href="/lenta-users/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_lenta"]} alt="" />
                    </div>
                    <p>{Variable.lang.span.userNews}</p>
                  </a>
                  <a
                    href="/question/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_questions"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.questionsAnswers}</p>
                  </a>
                  {/* <a
                                        href="/chats/"
                                        class="c-allservices__link"
                                        onclick={function (e) {
                                            fn.siteLink(e)
                                        }}
                                    >
                                        <div class="c-allservices__wrap">
                                            <img src={svg["chats_main"]} alt="" />
                                        </div>
                                        <p>{Variable.lang.a.chatsPublic}</p>
                                    </a> */}
                  <a
                    href="/content-creator/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["contentmaker"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.contentCreater}</p>
                  </a>
                  <a
                    href="/experts/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_experts"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.experts}</p>
                  </a>
                  <a
                    href="/users/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_users"]} alt="" />
                    </div>
                    <p>{Variable.lang.h.top_users}</p>
                  </a>
                  <a
                    href="/rooms/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["rooms"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.rooms}</p>
                  </a>
                </div>
                <div class="c-allservices__subtitle">
                  {Variable.lang.text.commerce}
                </div>
                <div class="c-allservices__group">
                  <a
                    href="/list-trade/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_exchange"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.trade}</p>
                  </a>
                  <a
                    href="/list-exchange/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["exchanges"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.exchange}</p>
                  </a>
                  <a
                    href="/exchange-rates/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["rates"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.exchangeRates}</p>
                  </a>

                  {/* <a
                                        href="/nft-market/"
                                        class="c-allservices__link"
                                        onclick={function (e) {
                                            fn.siteLink(e)
                                        }}
                                    >
                                            <div class="c-allservices__wrap">
                                                <img src={svg["nft_icon"]} alt="" />
                                            </div>
                                            <p>{Variable.lang.a.nft}</p>
                                    </a> */}
                </div>
                <div class="c-allservices__subtitle">
                  {Variable.lang.text.starups}
                </div>
                <div class="c-allservices__group">
                  <a
                    href="/list-icostartaps/"
                    class="c-allservices__link"
                    // onclick={function(e) {
                    //     fn.siteLink(e)
                    // }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["star1"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.icoRating}</p>
                  </a>
                  <a
                    href="/list-startaps/"
                    class="c-allservices__link"
                    // onclick={function(e) {
                    //     fn.siteLink(e)
                    // }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["startup"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.starups}</p>
                  </a>
                  {/* <a
                                        href="/library/"
                                        class="c-allservices__link"
                                        onclick={function (e) {
                                            fn.siteLink(e)
                                        }}
                                    >
                                            <div class="c-allservices__wrap">
                                                <img src={svg["meta_universes"]} alt="" />
                                            </div>
                                            <p>{Variable.lang.a.universes}</p>
                                    </a> */}
                </div>
                <div class="c-allservices__subtitle">
                  {Variable.lang.text.news}
                </div>
                <div class="c-allservices__group">
                  {/* <a
                                        href="#"
                                        class="c-allservices__link"
                                    // onclick={function(e) {
                                    //     fn.siteLink(e)
                                    // }}
                                    >
                                            <div class="c-allservices__wrap">
                                                <img src={svg["news_page_icon"]} alt="" />
                                            </div>
                                            <p>{Variable.lang.a.news}</p>
                                    </a> */}
                  <a
                    href="/news/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_news"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.news}</p>
                  </a>
                  <a
                    href="/blog/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_blog"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.blog}</p>
                  </a>
                  <a
                    href="/media/"
                    class="c-allservices__link"
                    // onclick={function(e) {
                    //     fn.siteLink(e)
                    // }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["media"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.mediaUs}</p>
                  </a>
                </div>
                <div class="c-allservices__subtitle">
                  {Variable.lang.text.work}
                </div>
                <div class="c-allservices__group">
                  {/* <a
                                        href="#"
                                        class="c-allservices__link"
                                    // onclick={function(e) {
                                    //     fn.siteLink(e)
                                    // }}
                                    >
                                            <div class="c-allservices__wrap">
                                                <img src={svg["careers_icon2"]} alt="" />
                                            </div>
                                            <p>{Variable.lang.a.career}</p>
                                    </a> */}
                  <a
                    href="/career-whith-us/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["career_with_us_icon"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.careerUs}</p>
                  </a>
                </div>
                <div class="c-allservices__subtitle">
                  {Variable.lang.text.teaching}
                </div>
                <div class="c-allservices__group">
                  <a
                    href="/university/"
                    class="c-allservices__link"
                    onclick={function (e) {
                      fn.siteLink(e);
                    }}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["mortarboard"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.university}</p>
                  </a>
                </div>

                {/* <div class="c-allservices__subtitle">{Variable.lang.text.entertainment}</div>
                                <div class="c-allservices__group">
                                    <a
                                        href="#"
                                        class="c-allservices__link"
                                    // onclick={function(e) {
                                    //     fn.siteLink(e)
                                    // }}
                                    >
                                            <div class="c-allservices__wrap">
                                                <img src={svg["games_icon"]} alt="" />
                                            </div>
                                            <p>{Variable.lang.a.games}</p>
                                    </a>
                                </div> */}
              </div>
            </div>
          </section>
        </div>
      );
    },
    ID
  );
};

export default ModalMainPageIconsMenu;
