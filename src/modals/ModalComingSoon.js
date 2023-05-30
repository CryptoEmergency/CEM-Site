import {
    jsx,
    jsxFrag,
    Variable,
    init,
    load,
    CEM
} from '@betarost/cemserver/cem.js';

const { images, svg, fn } = CEM


const ModalComingSoon = function (data, ID) {
    let close = true
    // console.log("ModalComingSoon");
    // const commingSoonModalShow = getValue("modals", "commingSoonModalShow")
    const commingSoonModalShow = false
    const showModalCommingSoon = function (e) {
        e.stopPropagation()
        // setValue("modals", "commingSoonModalShow", !getValue("modals", "commingSoonModalShow"))
    }

    load({
        ID,
        fnLoad: async () => {
            
        },
        fn: () => {
            return (
                <div class="c-modal c-modal--open" onclick={function (e) {
                    if (close) {

                        fn.modals.close(ID)
                    }
                }}>
                    <section class="c-modal__dialog" onmouseover={function () {

                        close = false

                    }}
                        onmouseleave={function () {

                            close = true

                        }}>
                        <header class="c-modal__header">
                            <h2 class="c-modal__title">Updating</h2>
                            <button
                                type="button"
                                class="c-modal__close"
                                onclick={() => {
                                    fn.modals.close(ID)
                                }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <p>Section under development</p>
                            <p>Coming soon</p>
                        </div>
                        <footer class="c-modal__footer">
                            <button class="c-button c-button--primary"
                                onclick={() => {
                                    fn.modals.close(ID)
                                }}
                            >
                                <span>Закрыть</span>
                            </button>
                        </footer>
                    </section>
                </div>
            )
        }
    })

};


export default ModalComingSoon