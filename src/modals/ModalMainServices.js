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
} from "@betarost/cemserver/cem.js";

const { svg, fn } = CEM

const ModalMainServices = function (data, ID) {
  load({
    ID,
    fnLoad: async () => { },
    fn: () => {
      return (
        <div class="wrap-modal">
          <div class="wrap-modal_body">
            <div class="wrap-modal_content">
              <header class="header-modal">
                <h2 class="modal-subtitle">{Variable.lang.h.services}</h2>
                <button
                  class="b btn-modal_close"
                  onclick={(e) => {
                    fn.modals.close(ID);
                  }}
                >
                  X
                </button>
              </header>
              <main class="main-modal">
                <div class="wrap-services">
                  <a
                    href="/lenta-users/"
                    class="c-allservices__link"
                    onclick={fn.siteLink}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_lenta"]} alt="" />
                    </div>
                    <p>{Variable.lang.span.userNews}</p>
                  </a>
                  <a
                    href="/question/"
                    class="c-allservices__link"
                    onclick={fn.siteLink}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_questions"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.questionsAnswers}</p>
                  </a>
                  <a
                    href="/content-creator/"
                    class="c-allservices__link"
                    onclick={fn.siteLink}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["contentmaker"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.contentCreater}</p>
                  </a>
                  <a
                    href="/experts/"
                    class="c-allservices__link"
                    onclick={fn.siteLink}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_experts"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.experts}</p>
                  </a>
                  <a
                    href="/users/"
                    class="c-allservices__link"
                    onclick={fn.siteLink}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_users"]} alt="" />
                    </div>
                    <p>{Variable.lang.h.top_users}</p>
                  </a>
                  <a
                    href="/list-trade/"
                    class="c-allservices__link"
                    onclick={fn.siteLink}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_exchange"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.trade}</p>
                  </a>
                  <a
                    href="/list-exchange/"
                    class="c-allservices__link"
                    onclick={fn.siteLink}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["exchanges"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.exchange}</p>
                  </a>
                  <a
                    href="/exchange-rates/"
                    class="c-allservices__link"
                    onclick={fn.siteLink}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["rates"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.exchangeRates}</p>
                  </a>
                  <a
                    href="/list-icostartaps/"
                    class="c-allservices__link"
                    onclick={fn.siteLink}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["star1"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.icoRating}</p>
                  </a>
                  <a
                    href="/list-startaps/"
                    class="c-allservices__link"
                    onclick={fn.siteLink}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["startup"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.starups}</p>
                  </a>
                  <a
                    href="/news/"
                    class="c-allservices__link"
                    onclick={fn.siteLink}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["preview_line_news"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.news}</p>
                  </a>
                  <a
                    href="/career-whith-us/"
                    class="c-allservices__link"
                    onclick={fn.siteLink}
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["career_with_us_icon"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.careerUs}</p>
                  </a>
                  {/* <a
                    href="/crypto-university/"
                    class="c-allservices__link"
                    onclick={fn.siteLink} 
                  >
                    <div class="c-allservices__wrap">
                      <img src={svg["mortarboard"]} alt="" />
                    </div>
                    <p>{Variable.lang.a.university}</p>
                  </a> */}
                </div>
              </main>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default ModalMainServices;
