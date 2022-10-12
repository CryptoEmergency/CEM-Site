import {
    jsx, jsxFrag, Variable,
    initReload,
    initAfter
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";

import Cropper from 'cropperjs';

let elem = Variable.setRef()
const URL = window.URL || window.webkitURL;

const ModalCropImage = function ({ file }, reload) {

    console.log('=70c86c=', file)
    // setTimeout(() => {
    //     const test = new Cropper(elem(), {
    //         aspectRatio: 1 / 1,
    //         viewMode: 2,
    //         cropBoxResizable: true,
    //         autoCropArea: 1,
    //         strict: false,
    //         guides: false,
    //         highlight: true,
    //         dragCrop: false,
    //     });
    // }, 2000);
    if (!reload) {
        console.log('=594449=', "initAfter")
        setTimeout(() => {
            const test = new Cropper(elem(), {
                aspectRatio: 1 / 1,
                viewMode: 2,
                cropBoxResizable: true,
                autoCropArea: 1,
                strict: false,
                guides: false,
                highlight: true,
                dragCrop: false,
                crop: function (e) {
                    var data = e.detail;
                }
            });
        }, 500);

        // const test = new Cropper(elem(), {
        //     aspectRatio: 1 / 1,
        //     viewMode: 2,
        //     cropBoxResizable: true,
        //     autoCropArea: 1,
        //     strict: false,
        //     guides: false,
        //     highlight: true,
        //     dragCrop: false,
        //     crop: function (e) {
        //         var data = e.detail;
        //     }
        // });
    }
    initAfter(
        () => {

        }
    )

    return (
        <div class="c-modal c-modal--open" id="addCropImage">
            <section class="c-modal__dialog modal-dialog modal-lg">
                <header class="c-modal__header">
                    <h2 class="c-modal__title">{Variable.lang.h.modal_cropImage}</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={() => {
                            Variable.DelModals("ModalCropImage");
                        }}
                    ></button>
                </header>
                <div class="c-modal__body modal-body">
                    <div class="container crop-container" style="addCropImage">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="img-container">
                                    <img ref={elem} width="300" height="300" class="cropImage" id="cropImage" src={URL.createObjectURL(file)} />
                                </div>
                            </div>
                        </div>


                    </div>
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