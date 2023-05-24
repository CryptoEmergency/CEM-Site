import {
    jsx,
    jsxFrag,
    Variable,
    init,
    initReload,
    CEM
} from "@betarost/cemserver/cem.js";


const { images, svg, fn } = CEM


const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })

    init(
        async () => {
        },
        () => {

            return (
                <div class='c-main__body с-summerforum'>
                    <div class="video-container-forum">

                        <iframe width="1280" height="720" src="https://www.youtube.com/embed/zwlZJyDXOeU" title="Крипто Юг 2023 (тест)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div >
            )
        }, ID
    )
}

export default start;
