import {
  jsx,
  jsxFrag,
  init,
  Variable
} from "@betarost/cemjs";
import { siteLink } from '@src/functions.js'
import svg from "@assets/svg/index.js";



const start = function () {

  Variable.HeaderShow = true
  Variable.FooterShow = true

  init(
    null,
    () => {

      return (
        <div class="error_page">
          <h1>{Variable.lang.h.notFound}</h1>
          <img src={svg["icon/error_404.svg"]} />
          <p>{Variable.lang.p.returnToMainPage}</p>
          <a data-action="link" href="/" onclick={siteLink}>
            <div class="go_home_button_container">
              <div class="go_home_button">
                {Variable.lang.button.main_page}
              </div>
            </div>
          </a>
        </div>
      )
    })
};

export default start;