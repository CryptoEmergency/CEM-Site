import { jsx, jsxFrag, Variable, initReload,timersStart, timersStop } from "@betarost/cemjs";

const ModalNeedAuth = function (data, reload) {

timersStart("needAuth",() => {
            Variable.DelModals("ModalNeedAuth");
            Variable.SetModals({ name: "ModalAuth", data: {} });
            timersStop("needAuth");
        },1500,"timeout")
  return (
    <div class="c-modal c-modal--open" id="ModalNeedAuth">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
           <h4>{Variable.lang.h.modal_needAuth}</h4>
        </header>
        <div class="c-modal__body">
             <p>{Variable.lang.p.needAuth}</p>
        </div>
      </section>
    </div>
  );
};

export default ModalNeedAuth;





























// <div class="modal fade" id="modalNeedAuth" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div class="modal-dialog">
//         <div class="modal-content">
//             <div class="modal_need_auth">
//                 <h4>{{lang.h.modal_needAuth}}</h4>
//                 <p>{{lang.p.needAuth}}</p>
//             </div>
//         </div>
//     </div>
// </div>