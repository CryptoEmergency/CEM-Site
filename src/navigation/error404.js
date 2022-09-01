import {
    jsx,
    jsxFrag,
    getVariable,
    makeDOM,
    getStorage,
    setValue
  } from "@betarost/cemjs";
  import { siteLink } from '@src/functions.js'
  import svg from "@assets/svg/index.js";

  
  const view404 = function () {
    const lang = getVariable("languages")[getStorage("lang")];
  
    return (
        <div class="error_page">
        <h1>{lang.h.notFound}</h1>
        <img   src={svg["icon/error_404.svg"]}/>
        <p>{lang.p.returnToMainPage}</p>
        <a data-action="link" href="/" onclick={siteLink}>
            <div class="go_home_button_container">
                <div class="go_home_button">
                    {lang.button.main_page}
                </div>
            </div>
        </a>
    </div>
    );
  };
  
  const ID = "mainBlock";
  
  const init = function (reload) {
    setValue("mainHeader", "show", true);
    setValue("mainFooter", "show", true);
    makeDOM(view404(), ID);
  };
  
  export default init;