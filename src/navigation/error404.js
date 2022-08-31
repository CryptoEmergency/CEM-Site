import {
    jsx,
    jsxFrag,
    getVariable,
    makeDOM,
    getStorage,
    setValue
  } from "@betarost/cemjs";

  import svg from "@assets/svg/index.js";

  
  const alert = function () {
    const lang = getVariable("languages")[getStorage("lang")];
  
    return (
        <div class="error_page">
        <h1>{lang.h.notFound}</h1>
        <img   src={svg["icon/error_404.svg"]}/>
        <p>{lang.p.returnToMainPage}</p>
        <a data-action="link" href="/">
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
  
  const init = function (dataUrl) {
    setValue("mainHeader", "show", true);
    setValue("mainFooter", "show", true);
    makeDOM(alert(dataUrl), ID);
  };
  
  export default init;