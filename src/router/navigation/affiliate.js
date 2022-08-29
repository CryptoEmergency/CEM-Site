import {
    jsx,
    jsxFrag,
    setVariable,
    getVariable,
    setAction,
    makeDOM,
    getStorage,
  } from "@betarost/cemjs";
  import { init as mainHeader } from "@navigation/header/index.js";

  
  const ID = "mainBlock";
  setVariable({ header: true });
  setVariable({ footer: true });
  
  const affiliateView = function () {
    const lang = getVariable("languages")[getStorage("lang")];
  
    return (
      <div class="page-content">
         cool
      </div>
    );
  };
  
  const befor = function (dataUrl) {
    mainHeader(dataUrl);
  };
  
  const start = function (dataUrl) {
    console.log("start contact");
    makeDOM(affiliateView(), ID);
  };
  
  const after = function (dataUrl) {};
  
  setAction(ID, "befor", befor);
  setAction(ID, "start", start);
  setAction(ID, "after", after);
  
  const init = function (dataUrl) {
    befor(dataUrl);
    start(dataUrl);
    after(dataUrl);
  };
  
  export default init;
  