import {
  jsx,
  jsxFrag,
  Variable,
  init,
  timersStart,
  timersStop,
  load,
  CEM
} from "@betarost/cemserver/cem.js";
// import { fn } from '@src/functions/index.js';

const fn = CEM.fn

const ModalNeedAuth = function (data, ID) {

  let isEmpty = Object.entries(data).length === 0;


  let g1, g2
  if (isEmpty) {
    g1 = Variable.lang.h.modal_needAuth;
    g2 = Variable.lang.p.needAuth
  }
  else {
    g1 = "Так и будем дальше нажимать?"
    g2 = "Давайте вести счёт!"
  }

  load({
    ID,
    fnLoad: async () => {
      if (isEmpty) {
        timersStart({
          name: "needAuth",
          fn: async () => {
            fn.modals.ModalAuth()
            timersStop("needAuth");
          },
          msecond: 1500,
          type: "setTimeout"
        })

        // timersStart("needAuth", () => {
        //   fn.modals.ModalAuth()
        //   timersStop("needAuth");
        // }, 1500, "timeout")
      } else {
        timersStart({
          name: "needAuth",
          fn: async () => {
            fn.modals.close(ID)
            timersStop("needAuth");
          },
          msecond: 2500,
          type: "setTimeout"
        })
        // timersStart("needAuth", () => {
        //   fn.modals.close(ID)
        //   timersStop("needAuth");
        // }, 2500, "timeout")
      }
    },
    fn: () => {
      return (
        <div class="c-modal c-modal--open" id="ModalNeedAuth">
          <section class="c-modal__dialog">
            <header class="c-modal__header">
              <h4>{g1}</h4>
            </header>
            <div class="c-modal__body">
              <p>{g2}</p>
            </div>
          </section>
        </div>
      );
    }
  })
};
export default ModalNeedAuth;
// OK