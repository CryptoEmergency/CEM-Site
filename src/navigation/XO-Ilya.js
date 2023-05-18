import {
    initReload,
    jsx,
    jsxFrag,
    load,
    CEM,
  } from "@betarost/cemserver/cem.js";
  const { images, svg, fn } = CEM;

  
const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    
    fn: () => {
      
      return (
        <div class="c-main__body">
        <div class="container-marc">
  
        <h1 class="prt">Практическая работа в CryptoEmergency</h1>
            <div class="btn-block"> 
            
            </div>
          </div>
            </div>  




      )}})
}

export default start;
