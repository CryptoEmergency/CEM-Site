import {
    jsx,
    jsxFrag,
    setAction,
    setValue,
    makeDOM,
    getVariable,
    getStorage,
    getValue
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";

const showModalAuth = function (e) {
    //console.log('dfffffff');
    e.stopPropagation()
    setValue("modals", "authModalShow", !getValue("modals", "authModalShow"))
}

const ModalAuth = function ({ lang }) {
    // console.log("ModalAuth");
    const authModalShow = getValue("modals", "authModalShow")

    return (
        <div class="c-modal c-modal--open">
            <section class="c-modal__dialog">
                <header class="c-modal__header">
                    <h2 class="c-modal__title">Авторизация</h2>
                    <button
                        type="button"
                        class="c-modal__close"
                        onclick={showModalAuth}
                    ></button>
                </header>  
                <div class="c-modal__body">
                    <p>Lorem ipsum...</p>
                </div>
                <footer class="c-modal__footer">
                    <button class="c-button c-button--primary"
                    onclick={() => {alert(7)}}
                    >
                        <span>Кнопка</span>
                    </button>
                </footer>
            </section>
        </div>
    )
};


export { ModalAuth }