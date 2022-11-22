import {
    jsx,
    jsxFrag,
    Variable,
    init
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';



const ModalCropImage = function ({ file, typeUpload, arrMedia, aspectSelect, uploadCropImage }, ID) {
    let [Static] = fn.GetParams({ data: { file, typeUpload, arrMedia, aspectSelect, uploadCropImage }, ID })

    let elemImg = Variable.setRef()
    let elemRatio1 = Variable.setRef()
    let elemRatio2 = Variable.setRef()
    let elemRatio3 = Variable.setRef()

    const URL = window.URL || window.webkitURL;
    let cropper, aspectActive;
    console.log('=453e8a=', Static)
    console.log('=018927=', Static.aspectSelect)

    const cropperGo = function (el) {
        if (cropper) {
            cropper.destroy();
        }

        cropper = new Cropper(el, {
            aspectRatio: aspectActive,
            // viewMode: 2,
            // cropBoxResizable: true,
            autoCropArea: 1,
            strict: false,
            guides: false,
            highlight: true,
            // dragCrop: false,

            dragMode: 'move',
            restore: false,
            cropBoxMovable: false,
            cropBoxResizable: false,
            toggleDragModeOnDblclick: false,


            crop: function (e) {
                var data = e.detail;
            }
        });
    }

    init(
        () => {
            console.log('=0ae14c=', Static)
            cropper = null
            if (aspectSelect) {
                aspectActive = Static.aspectSelect
            } else {
                if (typeUpload == "bg") {
                    aspectActive = 4
                } else if (typeUpload == "avatar") {
                    aspectActive = 1
                } else {
                    aspectActive = 1.7777777777777777
                }
            }
            console.log('=ca484b=', aspectActive)
        },
        () => {
            console.log('=ca484b=2', aspectActive)
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
                                        <img width="100%" height="300" class="c-cropper__cropimage cropImage" id="cropImage" src={URL.createObjectURL(file)} After={cropperGo} ref={elemImg} />
                                    </div>
                                </div>
                                {() => {
                                    if (typeUpload == "bg") {
                                        return (
                                            <div class="c-cropper__toggles col-12 docs-toggles" style="display: none;">
                                                <div class="c-groupbtn c-groupbtn--lg btn-group btn-group-lg" role="group" style="width: 100%;">
                                                    <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio1" value="4" />
                                                    <label class="c-button c-button--outline" for="aspectRatio1" title="">4:1</label>
                                                </div>
                                            </div>
                                        )
                                    } else if (typeUpload == "avatar") {
                                        return (
                                            <div class="c-cropper__toggles col-12 docs-toggles" style="display: none;">
                                                <div class="c-groupbtn c-groupbtn--lg btn-group btn-group-lg" role="group" style="width: 100%;">
                                                    <input type="radio" class="" hidden name="aspectRatio" id="aspectRatio1" value="1" />
                                                    <label class="c-button c-button--outline" for="aspectRatio1" title="">1:1</label>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div class="c-cropper__toggles col-12 docs-toggles">
                                                <div class="c-groupbtn c-groupbtn--lg btn-group btn-group-lg" role="group" style="width: 100%;">
                                                    <input
                                                        type="radio"
                                                        hidden={true}
                                                        id="aspectRatio1"
                                                        checked={aspectActive == 1.7777777777777777}
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
                                        )
                                    }
                                }}
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
        }, ID
    )


};

export default ModalCropImage;