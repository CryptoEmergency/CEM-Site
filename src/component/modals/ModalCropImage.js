import { jsx, jsxFrag, Variable, initReload } from "@betarost/cemjs";
import svg from "@assets/svg/index.js";





const ModalCropImage = function (data, reload) {
  return (
    <div class="c-modal c-modal--open" id="ModalCropImage">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          <h2 class="c-modal__title">{Variable.lang.h.modal_cropImage}</h2>
          <button
            type="button"
            class="c-modal__close"
            onclick={() => {
                Variable.DelModals("ModalCropImage");
                initReload("modals");
              }}
          ></button>
        </header>
        <div class="c-modal__body">
         123455
        
        </div>
      </section>
    </div>
  );
};

export default ModalCropImage;



{/* <div class="modal fade" id="addCropImage" tabindex="-1" aria-labelledby="" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h5>{{lang.h.modal_cropImage}}</h5>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                {{>cropImage parent="addCropImage"}}
            </div>
            
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            <button type="button" disabled="" class="c-button c-button--outline add_post_button_container" data-type="posts" data-action="sendCropImage">
                                <div class="c-button__wrapper add_avatar_button">
                                    <span>Загрузить</span>
                                </div>
                            </button>
                        </div>
                        <div class="col-6">
                            <button type="button" class="c-button c-button--outline c-button--secondary" data-action="clearCropImage">
                                <div class="c-button__wrapper">
                                    <span>Отменить</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}