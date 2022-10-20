import {
    jsx, jsxFrag, Variable,
    initReload,
    initAfter
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { If } from "@component/helpers/All.js";
import { uploadMedia } from "@src/functions.js";

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

let elem = Variable.setRef()
const URL = window.URL || window.webkitURL;
let cropper;

const changeRatioCropImage = function (e) {
    if (e.currentTarget.disabled === true) {
        return false;
    }

    const aspectPreview = document.querySelector('.create_post_photo_preview img[data-aspect]');
    var image = document.querySelector(`#addCropImage .c-cropper__cropimage`);
    if (aspectPreview != null) {
        var aspect = +aspectPreview.dataset.aspect;
    } else {
        aspect = 1;
    }
    const options = {
        aspectRatio: aspect,
        viewMode: 2,
        cropBoxResizable: true,
        autoCropArea: 1,
        strict: false,
        guides: false,
        highlight: true,
        dragCrop: false,

        crop: function (e) {
            var data = e.detail;
        },
    };

    var isRadio;

    if (!cropper) {
        return;
    }

    options[e.currentTarget.name] = e.currentTarget.value;

    // Restart
    cropper.destroy();
    cropper = new Cropper(image, options);

    e.currentTarget.setAttribute("checked", true)
    e.currentTarget.setAttribute("data-aspect", e.currentTarget.value);
};

const ModalCropImage = function ({ file, typeUpload, arrMedia, aspectSelect, uploadCropImage }, reload) {

    console.log('=70c86c=', file, typeUpload)

    if (!reload) {
        // console.log('=594449=', "initAfter")
        setTimeout(() => {
            if (aspectSelect != null) {
                var aspect = +aspectSelect;
            } else {
                aspect = document.getElementById('aspectRatio1').value;
            }
            cropper = new Cropper(elem(), {
                aspectRatio: aspect,
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
            const checkedToggler = document.querySelector('[name="aspectRatio"][value="' + aspect + '"]');
            checkedToggler.setAttribute("checked", true);
            const btns = checkedToggler.parentElement.childNodes;
            btns.forEach((item) => {
                if(item.hasAttribute('type')) {
                    item.setAttribute("daisabled", "disabled");
                }
                item.classList.remove('c-button--active')
            });
            checkedToggler.nextElementSibling.classList.add('c-button--active');
        }, 500);
    }

    initAfter(
        () => {

        }
    )

    return (
        <div class="c-modal c-modal--open" id="addCropImage">
            <section class="c-modal__dialog c-modal__dialog--lg">
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
                <div class="c-modal__body">
                    <div class="c-cropper container crop-container" style="addCropImage">
                        <div class="c-cropper__row row">
                            <div class="c-cropper__wrapimage img-container">
                                <img ref={elem} width="300" height="300" class="c-cropper__cropimage cropImage" id="cropImage" src={URL.createObjectURL(file)} />
                            </div>
                        </div>
                        <If
                            data={typeUpload == "post"}
                            dataIf={
                                <div class="c-cropper__toggles col-12 docs-toggles">
                                    <div class="c-groupbtn c-groupbtn--lg btn-group btn-group-lg" role="group" style="width: 100%;">
                                        {
                                            arrMedia.length && aspectSelect != 1.7777777777777777 ? 
                                            <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio1" value="1.7777777777777777" disabled onChange={changeRatioCropImage} />
                                            :
                                            <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio1" value="1.7777777777777777" onChange={changeRatioCropImage} />
                                        }
                                        <label class="c-button c-button--outline c-button--active" for="aspectRatio1" title="">16:9</label>

                                        {
                                            arrMedia.length && aspectSelect != 0.8 ? 
                                            <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio2" value="0.8" disabled onChange={changeRatioCropImage} />
                                            :
                                            <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio2" value="0.8" onChange={changeRatioCropImage} />
                                        }
                                        <label class="c-button c-button--outline" for="aspectRatio2" title="">4:5</label>

                                        {
                                            arrMedia.length && aspectSelect != 1 ? 
                                            <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio3" value="1" disabled onChange={changeRatioCropImage} />
                                            :
                                            <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio3" value="1" onChange={changeRatioCropImage} />
                                        }
                                        <label class="c-button c-button--outline" for="aspectRatio3" title="">1:1</label>
                                    </div>
                                </div>
                            }
                        />

                        <If
                            data={typeUpload == "avatar"}
                            dataIf={
                                <div class="c-cropper__toggles col-12 docs-toggles" style="display: none;">
                                    <div class="c-groupbtn c-groupbtn--lg btn-group btn-group-lg" role="group" style="width: 100%;">
                                        <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio1" value="1" />
                                        <label class="c-button c-button--outline" for="aspectRatio1" title="">1:1</label>
                                    </div>
                                </div>
                            }
                        />

                        <If
                            data={typeUpload == "bg"}
                            dataIf={
                                <div class="c-cropper__toggles col-12 docs-toggles" style="display: none;">
                                    <div class="c-groupbtn c-groupbtn--lg btn-group btn-group-lg" role="group" style="width: 100%;">
                                        <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio1" value="4" />
                                        <label class="c-button c-button--outline" for="aspectRatio1" title="">4:1</label>
                                    </div>
                                </div>
                            }
                        />

                        <div class="c-cropper__footer">
                            <button
                                type="button"
                                class="c-button c-button--primary2"
                                data-type={typeUpload == "post" ? "posts" : ""}
                                onClick={(e) => uploadCropImage(e, cropper)}
                            >
                                <span class="c-button__wrapper">{Variable.lang.button.upload}</span>
                            </button>
                            <button
                                type="button"
                                class="c-button c-button--outline c-button--secondary"
                                onclick={() => {
                                    Variable.DelModals("ModalCropImage");
                                }}
                            >
                                <div class="c-button__wrapper">
                                    <span>{Variable.lang.button.resetCrop}</span>
                                </div>
                            </button>
                        </div>

                    </div>
                </div>
            </section >
        </div >
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