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
            console.log('=2ce562=', data)
            return (
                <div class="c-modal c-modal--open"
                    style="background: rgba(0, 0, 0, 0.7);"
                    onclick={function (e) {
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
                        <header>
                            {/* <h2 class="c-modal__title">Updating</h2> */}
                            <button
                                style="top: 10px; right: 10px;"
                                type="button"
                                class="c-modal__close"
                                onclick={() => {
                                    fn.modals.close(ID)
                                }}
                            ></button>
                        </header>
                        <div class="modal-teacher__body">
                            <div class="modal-teacher">
                                <div class="modal-teacher__social">
                                    <img src={`/assets/upload/worldPress/${data.image}`} />
                                    <div>
                                        <div class="modal-teacher__social_list">
                                            {
                                                data.siteLink
                                                    ?
                                                    <div class="modal-teacher__social_item">
                                                        <a
                                                            href={data.siteLink}
                                                            target="_blank"
                                                            class="modal-teacher__social_link"
                                                        >
                                                            <img
                                                                src={svg[`site-icon`]}
                                                            />
                                                        </a>
                                                    </div>
                                                    :
                                                    null
                                            }
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
                                </div>
                                <div class="modal-teacher__description">
                                    <h3>{data.name}</h3>
                                    {
                                        data.profession
                                            ?
                                            <p
                                                class="modal-teacher__description_profession"
                                                style="margin-bottom: 6px"
                                            >{data.profession}</p>
                                            :
                                            null
                                    }
                                    <p class="modal-teacher__description_text">
                                        {
                                            fn.editText(data.description, { clear: true, paragraph: true, html: true })
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )
        }
    })

};


export default ModalTeachers