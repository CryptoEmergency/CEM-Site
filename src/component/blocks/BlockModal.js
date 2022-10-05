import {
    jsx,
    jsxFrag,
    Variable,
    initOne,
    initReload
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";




let test

const BlockModal = function () {
    // console.log("BlockModal");
    console.log('=c8508fghfgh2=',test)

    initOne(
        () => {
            test = 5
            console.log('=c85082=',test)
        }
    )

    setTimeout ( () => {
        test = 77
        initReload()
    },5000)
    return (
        <div >
           jgkgkggkkggkkg
        </div>
    )
};


export { BlockModal }

// <div class="c-modal c-modal--open">
// <section class="c-modal__dialog">
//     <header class="c-modal__header">
//         <h2 class="c-modal__title">Заголовок</h2>
//         <button type="button" class="c-modal__close"></button>
//     </header>
//     <div class="c-modal__body">
//         <p>Lorem ipsum...</p>
//     </div>
//     <footer class="c-modal__footer">
//         <button class="c-button c-button--primary">
//             <span>Кнопка</span>
//         </button>
//     </footer>
// </section>
// </div>