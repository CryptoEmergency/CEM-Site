import {
    jsx,
    jsxFrag,
} from "@betarost/cemserver/cem.js";
//check
import { Panzoom as PanzoomJs } from '@fancyapps/ui/dist/panzoom.esm.js';
import '@fancyapps/ui/dist/panzoom.css';

const panzoomInit = function ($el, panzoomElem, index) {
    // panzoomElem = new PanzoomJs(document.querySelector("#myPanzoom"), {});
    let panzoomElem2 = new PanzoomJs($el, {
        click: false,   //Добавить clickпрослушиватель событий.
        pinchToZoom: true,   //Включите жест щипка для увеличения/уменьшения масштаба двумя пальцами
        // wheel: false,    //Добавить wheelпрослушиватель событий
        touch: true,    //Включить сенсорные жесты
        maxScale: 5,
        // minScale: 1,
        baseScale: 1,
        bounceForce: 0,
        panOnlyZoomed: true
    });
    // panzoomElem = new PanzoomJs(document.querySelector(`.panzoom-${index}`), {});

    // console.log('=d3e457=', panzoomElem2)
};

const Panzoom = function ({ path, panzoomElem, index }) {
    // console.log('=0b0f11=', path, `panzoom-${index}`, panzoomElem, index)
    return (
        <div
            // id="myPanzoom"
            class={`panzoom-${index}`}
            After={(el) => {
                if (path.length >= 2) {
                    panzoomInit(el, panzoomElem)
                }
            }}
        >
            <div class="panzoom__viewport" style="overflow: hidden">
                <img
                    class="panzoom__content"
                    src={path}
                    alt=""
                    style="min-width: 100%; width: 100%"
                />
            </div>
        </div>
    )
};
export { Panzoom };