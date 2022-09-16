import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";

const BlockModal = function ({ lang }) {
    // console.log("BlockModal");

    return (
        <div class="c-modal c-modal--open">
            <section class="c-modal__dialog">
                <header class="c-modal__header">
                    <h2 class="c-modal__title">Заголовок</h2>
                    <button type="button" class="c-modal__close"></button>
                </header>
                <div class="c-modal__body">
                    <p>Lorem ipsum...</p>
                </div>
                <footer class="c-modal__footer">
                    <button class="c-button c-button--primary">
                        <span>Кнопка</span>
                    </button>
                </footer>
            </section>
        </div>
    )
};


export { BlockModal }