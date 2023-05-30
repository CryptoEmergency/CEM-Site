import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    load,
    CEM
} from "@betarost/cemserver/cem.js";

const { images, svg, fn } = CEM

const ModalTeachers = function (data, ID) {
    let close = true
    const commingSoonModalShow = false
    const showModalCommingSoon = function (e) {
        e.stopPropagation()
    }

    load({
        ID,
        fnLoad: async () => {

        },
        fn: () => {
            console.log('=2ce562=',data)
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
                            {/* <h2 class="c-modal__title">Updating</h2> */}
                            <button
                                style="top: 15px; right: 15px;"
                                type="button"
                                class="c-modal__close"
                                onclick={() => {
                                    fn.modals.close(ID)
                                }}
                            ></button>
                        </header>
                        <div class="c-modal__body">
                            <div class="modal-teacher">
                                <div class="modal-teacher__social">
                                    <img src={`/assets/upload/worldPress/${data.image}`} />
                                    <div class="modal-teacher__social_list">
                                        {
                                            data.social?.map((item) => {
                                                return (
                                                    <div class="modal-teacher__social_item">
                                                        <a
                                                            href={item.url}
                                                            target="_blank"
                                                            class="modal-teacher__social_link"
                                                        >
                                                            <img
                                                                
                                                                src={svg[`${item.channel}-icon`]}
                                                            />
                                                        </a>
                                                    </div>
                                                )
                                                
                                            })
                                        }
                                    </div>
                                </div>
                                <div class="modal-teacher__description">
                                    <h3>{data.name}</h3>
                                    <p>{data.profession}</p>
                                    <p>{data.experience}</p>
                                </div>
                            </div>
                        </div>
                        {/* <footer class="c-modal__footer">
                            <button class="c-button c-button--primary"
                                onclick={() => {
                                    fn.modals.close(ID)
                                }}
                            >
                                <span>Закрыть</span>
                            </button>
                        </footer> */}
                    </section>
                </div>
            )
        }
    })

};


export default ModalTeachers