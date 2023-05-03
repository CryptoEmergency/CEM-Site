import {
    jsx,
    jsxFrag,
    initReload,
    CEM
} from '@betarost/cemserver/cem.js';
const { images, svg, fn } = CEM

const forExport = function ({ src, Static, onclick, onchange }) {
    return (
        <div class="notes-button__img"
        // onclick={() => {
        //     Static.elInputImg.click()
        // }}
        >
            <img class="notes-button__icon" src={src} onclick={onclick} />
            <input
                type="file"
                hidden
                multiple
                Element={($el) => { Static.elInputImg = $el }}
                onchange={async function (e) {
                    e.stopPropagation();
                    Array.from(this.files).forEach((item) => {
                        fn.uploadMedia(
                            item,
                            "gallery",
                            async function () {
                                if (!this.response) {
                                    alert("Произошла ошибка Попробуйте еще раз")
                                    return
                                }
                                let response = JSON.parse(this.response);
                                Static.activeFiletype = response.mimetype.includes("image") ? "image" : "video"
                                initReload()
                                let data = {
                                    type: response.mimetype,
                                    name: response.name
                                }
                                Static.activeNotes.media.push(data)
                                { onchange }
                            }
                        )
                    })
                    // initReload()
                }}
            />
        </div>
    )
}

export default forExport
