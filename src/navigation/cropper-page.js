import {
    jsx,
    jsxFrag,
    Variable,
    init,
    initGo,
    initReload
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";

import Cropper from 'cropperjs';

let cropperList = {}

const cropperLoad = function () {
    cropperList.avatar = new Cropper(document.getElementById('cropImage'), {
        aspectRatio: 1 / 1,
        viewMode: 2,
        cropBoxResizable: true,
        autoCropArea: 1,
        strict: false,
        guides: false,
        highlight: true,
        dragCrop: false,
    });
    return
};


const start = function () {
    Variable.HeaderShow = true
    Variable.FooterShow = true

    init(
        async () => {
            Variable.CropperLoad = [];
            Variable.CropperLoad.push(cropperLoad)
        },
        () => {
            // cropperLoad()
            console.log('=bf9e09=', Variable)

            return (
                <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"}`}>
                    <div class="c-container">
                        <h1>CROPPER</h1>
                        <img id="cropImage" width="300" height="300" />
                    </div>
                </div>
            )

        }
    )


}

export default start;