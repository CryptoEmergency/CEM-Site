import {
    jsx,
    jsxFrag,
    Variable,
} from "@betarost/cemjs";

import { If } from "@component/helpers/All.js";

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

let elemImg = Variable.setRef()
let elemRatio1 = Variable.setRef()
let elemRatio2 = Variable.setRef()
let elemRatio3 = Variable.setRef()

const URL = window.URL || window.webkitURL;
let cropper, aspectActive;

const ModalCropImage = function ({ file, typeUpload, arrMedia, aspectSelect, uploadCropImage }, reload) {

    const cropperGo = function (el) {
        if (cropper) {
            cropper.destroy();
        }

        cropper = new Cropper(el, {
            aspectRatio: aspectActive,
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
    }

    if (!reload) {
        cropper = null
        if (aspectSelect) {
            aspectActive = aspectSelect
        } else {
            if (typeUpload == "bg") {
                aspectActive = 4
            } else if (typeUpload == "avatar") {
                aspectActive = 1
            } else {
                aspectActive = 1.7777777777777777
            }
        }
    }

    return (
        <div class="c-modal c-modal--open" id="addCropImage">
            <section class="c-modal__dialog c-modal__dialog--lg">
                <header class="c-modal__header">
                    <h2 class="c-modal__title">{Variable.lang.h.modal_cropImage}</h2>
                </header>
                <div class="c-modal__body">
                    <div class="c-cropper container crop-container" style="addCropImage">
                        <div class="c-cropper__row row">
                            <div class="c-cropper__wrapimage img-container">
                                <img width="300" height="300" class="c-cropper__cropimage cropImage" id="cropImage" src={URL.createObjectURL(file)} After={cropperGo} ref={elemImg} />
                            </div>
                        </div>
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
                            dataElse={
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
                                    dataElse={
                                        <div class="c-cropper__toggles col-12 docs-toggles">
                                            <div class="c-groupbtn c-groupbtn--lg btn-group btn-group-lg" role="group" style="width: 100%;">
                                                <input
                                                    type="radio"
                                                    hidden={true}
                                                    id="aspectRatio1"
                                                    checked={aspectActive == 1.7777777777777777 || aspectActive == undefined}
                                                    disabled={arrMedia.length && aspectSelect != 1.7777777777777777}
                                                    ref={elemRatio1}
                                                />
                                                <label class="c-button c-button--outline"
                                                    onclick={function () {
                                                        if (aspectActive == 1.7777777777777777 || elemRatio1().disabled) {
                                                            return
                                                        }
                                                        aspectActive = 1.7777777777777777
                                                        elemRatio1().checked = true
                                                        elemRatio2().checked = false
                                                        elemRatio3().checked = false
                                                        cropperGo(elemImg())
                                                    }}
                                                >16:9</label>

                                                <input
                                                    type="radio"
                                                    hidden={true}
                                                    id="aspectRatio2"
                                                    checked={aspectActive == 0.8}
                                                    disabled={arrMedia.length && aspectSelect != 0.8}
                                                    ref={elemRatio2}
                                                />
                                                <label class="c-button c-button--outline"
                                                    onclick={function () {
                                                        if (aspectActive == 0.8 || elemRatio2().disabled) {
                                                            return
                                                        }
                                                        aspectActive = 0.8
                                                        elemRatio1().checked = false
                                                        elemRatio2().checked = true
                                                        elemRatio3().checked = false
                                                        cropperGo(elemImg())
                                                    }}
                                                >4:5</label>

                                                <input
                                                    type="radio"
                                                    hidden={true}
                                                    id="aspectRatio3"
                                                    checked={aspectActive == 1}
                                                    disabled={arrMedia.length && aspectSelect != 1}
                                                    ref={elemRatio3}
                                                />
                                                <label class="c-button c-button--outline"
                                                    onclick={function () {
                                                        if (aspectActive == 1 || elemRatio3().disabled) {
                                                            return
                                                        }
                                                        aspectActive = 1
                                                        elemRatio1().checked = false
                                                        elemRatio2().checked = false
                                                        elemRatio3().checked = true
                                                        cropperGo(elemImg())
                                                    }}
                                                >1:1</label>
                                            </div>
                                        </div>
                                    }
                                />
                            }
                        />
                        <div class="c-cropper__footer">
                            <button
                                type="button"
                                class="c-button c-button--primary2"
                                onClick={() => uploadCropImage(cropper)}
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