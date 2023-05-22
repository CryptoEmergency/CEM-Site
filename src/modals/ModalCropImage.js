import {
    jsx,
    jsxFrag,
    Variable,
    init,
    initReload,
    load,
    CEM
} from "@betarost/cemserver/cem.js";
// import { fn } from '@src/functions/index.js';

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const fn = CEM.fn

const ModalCropImage = function ({ originalImage = null, file, typeUpload, arrMedia, aspectSelect, uploadCropImage, editable = false }, ID) {

    let [Static] = fn.GetParams({ data: { originalImage, file, typeUpload, arrMedia, aspectSelect, uploadCropImage, editable }, ID })
    console.log('=ModalCropImage=2', file.type.match("image.*"))

    let elemImg = Variable.setRef()
    let elemRatio1 = Variable.setRef()
    let elemRatio2 = Variable.setRef()
    let elemRatio3 = Variable.setRef()
    let elemRatio4 = Variable.setRef()

    const URL = window.URL || window.webkitURL;
    let cropper, aspectActive;
    // console.log('=ModalCropImage=', Static, arrMedia.length > 1 && !originalImage)


    const cropperGo = function (el) {
        if (cropper) {
            cropper.destroy();
        }

        if (aspectActive) {
            Static.classAspectContainer = aspectActive == 1
                ? "one"
                : aspectActive == 0.8
                    ? "two"
                    : aspectActive == 1.7777777777777777
                        ? "three"
                        : aspectActive == 333
                            ? "four"
                            : null

            if (aspectActive == 333) {
                cropper = new Cropper(el, {
                    // aspectRatio: aspectActive,
                    viewMode: 3,
                    dragMode: 'move',
                    autoCropArea: 1,
                    restore: false,
                    modal: false,
                    guides: false,
                    highlight: true,
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    toggleDragModeOnDblclick: false,
                    center: false,
                    responsive: true,

                    crop: function (e) {
                        var data = e.detail;
                    }
                });
            } else {
                cropper = new Cropper(el, {
                    //**1 */
                    // aspectRatio: aspectActive,
                    // viewMode: 2,
                    // cropBoxResizable: true,
                    // autoCropArea: 1,
                    // strict: false,
                    // guides: false,
                    // highlight: true,
                    // dragCrop: false,

                    //**2 */
                    // aspectRatio: aspectActive,
                    // autoCropArea: 1,
                    // viewMode: 3,
                    // strict: false,
                    // guides: false,
                    // highlight: false,
                    // dragMode: 'move',
                    // restore: false,
                    // modal: false,
                    // cropBoxMovable: false,
                    // cropBoxResizable: false,
                    // toggleDragModeOnDblclick: false,

                    /**3 */
                    aspectRatio: aspectActive,
                    viewMode: 3,
                    dragMode: 'move',
                    autoCropArea: 1,
                    restore: false,
                    modal: false,
                    guides: false,
                    highlight: true,
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    toggleDragModeOnDblclick: false,
                    center: false,
                    responsive: true,

                    crop: function (e) {
                        var data = e.detail;
                    }
                });
            }
        } else {
            cropper = new Cropper(el, {
                viewMode: 3,
                dragMode: 'move',
                autoCropArea: 1,
                restore: false,
                modal: false,
                guides: false,
                highlight: true,
                cropBoxMovable: true,
                cropBoxResizable: true,
                cropBoxDraggble: true,
                toggleDragModeOnDblclick: false,

                crop: function (e) {
                    var data = e.detail;
                }
            });
        }

        Static.elCropBox.classList.contains("one")
            ? Static.elCropBox.classList.remove("one")
            : Static.elCropBox.classList.contains("two")
                ? Static.elCropBox.classList.remove("two")
                : Static.elCropBox.classList.contains("three")
                    ? Static.elCropBox.classList.remove("three")
                    : Static.elCropBox.classList.contains("four")
                        ? Static.elCropBox.classList.remove("four")
                        : null
        Static.elCropBox.style = "";
        Static.elCropBox.classList.add(Static.classAspectContainer)
        let widthImg = Static.elCropBox.offsetWidth;
        let heightImg = aspectActive == 1
            ? 1
            : aspectActive == 0.8
                ? 1.25
                : aspectActive == 1.7777777777777777
                    ? 0.5625
                    : aspectActive == 333
                        ? 'auto'
                        : 1
        heightImg == "auto"
        ? Static.elCropBox.style = `width: ${widthImg}px; height: auto;}`
        : Static.elCropBox.style = `width: ${widthImg}px; height: calc(${widthImg}px * ${heightImg})`
        console.log('=e85dd2= widthImg =',widthImg,', heightImg =',heightImg)
    }


    load({
        ID,
        fnLoad: async () => {
        if (aspectSelect) {
            aspectActive = Static.aspectSelect
        } else {
            if (typeUpload == "bg") {
                aspectActive = 4
            } else if (typeUpload == "avatar" || typeUpload == "preview") {
                aspectActive = 1
            } else if (typeUpload == "chat") {
                aspectActive = null
            } else {
                aspectActive = 1.7777777777777777
            }

            Static.classAspectContainer = aspectActive == 1
                ? "one"
                : aspectActive == 0.8
                    ? "two"
                    : aspectActive == 1.7777777777777777
                        ? "three"
                        : aspectActive == NaN
                            ? "four"
                            : null
            // console.log('=c98352=', Static.classAspectContainer, aspectActive)
        }
    },
        fn: () => {
            cropper = null

            // console.log('=272ba4=', Static.aspectSelect)
            return (
                <div class="c-modal c-modal--open" id="addCropImage">
                    <section class="c-modal__dialog c-modal__dialog--lg1">
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">{Variable.lang.h.modal_cropImage}</h2>
                        </header>
                        <div class="c-modal__body">
                            <div
                                class={[
                                    "c-cropper",
                                    "container",
                                    "crop-container",
                                    Static.aspectSelect == 1 && typeUpload == "avatar" ? "c-cropper--avatar" : null
                                ]}
                            // style="addCropImage"
                            >

                                <div class="c-cropper__row row">
                                    <div class={[
                                        "c-cropper__wrapimage",
                                        "img-container",
                                        aspectActive == 1 ? "one" : aspectActive == 0.8 ? "two" : aspectActive == 1.7777777777777777 ? "three" : null,
                                        Static.classAspectContainer ? Static.classAspectContainer : null
                                    ]}
                                        Element={($el) => { Static.elCropBox = $el }}
                                    >
                                        <img
                                            width="600"
                                            height="300"
                                            class="c-cropper__cropimage cropImage"
                                            id="cropImage"
                                            // src={!Static.originalImage ? aspectActive ? URL.createObjectURL(file) : file : Static.originalImage.getAttribute("src")}
                                            src={!originalImage ? aspectActive ? URL.createObjectURL(file) : file : originalImage.getAttribute("src")}
                                            After={cropperGo}
                                            ref={elemImg}
                                        />
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
                                    } else if (typeUpload != "chat" && typeUpload != "preview") {
                                        return (
                                            <div class="c-cropper__toggles col-12 docs-toggles">
                                                <div class="c-groupbtn c-groupbtn--lg btn-group btn-group-lg" role="group" style="width: 100%;">
                                                    <input
                                                        type="radio"
                                                        hidden={true}
                                                        id="aspectRatio1"
                                                        checked={aspectActive == 1.7777777777777777}
                                                        disabled={((arrMedia.length > 1 && Static.editable) || (arrMedia.length > 0 && !Static.editable)) && aspectSelect != 1.7777777777777777}
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
                                                        disabled={((arrMedia.length > 1 && Static.editable) || (arrMedia.length > 0 && !Static.editable)) && aspectSelect != 0.8}
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
                                                        disabled={((arrMedia.length > 1 && Static.editable) || (arrMedia.length > 0 && !Static.editable)) && aspectSelect != 1}
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

                                                    <input
                                                        type="radio"
                                                        hidden={true}
                                                        id="aspectRatio4"
                                                        checked={aspectActive == 333}
                                                        disabled={((arrMedia.length > 1 && Static.editable) || (arrMedia.length > 0 && !Static.editable)) && aspectSelect != 333}
                                                        ref={elemRatio4}
                                                    />
                                                    <label class="c-button c-button--outline"
                                                        onclick={function () {
                                                            if (aspectActive == 333 || elemRatio4().disabled) {
                                                                return
                                                            }
                                                            aspectActive = 333
                                                            elemRatio1().checked = false
                                                            elemRatio2().checked = false
                                                            elemRatio3().checked = false
                                                            elemRatio4().checked = true
                                                            cropperGo(elemImg())
                                                        }}
                                                    >auto</label>
                                                </div>
                                            </div>
                                        )
                                    }
                                }}
                                <div class="c-cropper__footer">
                                    <button
                                        type="button"
                                        class="c-button c-button--primary2"
                                        onClick={() => {
                                            uploadCropImage(cropper, aspectActive)
                                            fn.modals.close(ID)


                                        }
                                        }
                                    >
                                        <span class="c-button__wrapper">{Variable.lang.button.upload}</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="c-button c-button--outline c-button--secondary"
                                        onclick={() => {
                                            // Static.mediaInputs.selectAspect = null;
                                            fn.modals.close(ID)
                                            initReload()

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
        }
    })


};

export default ModalCropImage;