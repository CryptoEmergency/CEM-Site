import {
  jsx,
  jsxFrag,
  init,
  Variable,
  Helpers
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";

const start = function () {
  Variable.HeaderShow = true
  Variable.FooterShow = true

  init(
    null,
    () => {
      return (
        <div class="c-error">
          <h1 class="c-error__title">{Variable.lang.h.notFound}</h1>
          <img class="c-error__bg" src={svg["icon/error_404"]} />
          <p class="c-error__text">{Variable.lang.p.returnToMainPage}</p>
          <a href="/" class="c-button c-button--outline" onclick={Helpers.siteLink}>
            <span class="c-button__wrapper">{Variable.lang.button.main_page}</span>
          </a>
        </div>
      )
    })
};
//I check
export default start;