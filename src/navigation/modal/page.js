import {
    jsx,
    jsxFrag,
    Variable,
    init,
    load
} from '@betarost/cemserver/cem.js';

import list from "@src/lists/modalsList.js";

Variable.Static.countModals = 0
Variable.Static.countModalsPage = 0

const mainModalPage = async function () {
    load({
        ID: "modalsPage",
        fn: async (reload) => {

            if (!Variable.ModalsPage.length) {
                document.querySelector('body').style = "";
                return <div></div>
            }

            if (Variable.ModalsPage.length) {
                if (Variable.ModalsPage[Variable.ModalsPage.length - 2] && !Variable.ModalsPage[Variable.ModalsPage.length - 2].top && Variable.ModalsPage[Variable.ModalsPage.length - 2].el) {
                    Variable.ModalsPage[Variable.ModalsPage.length - 2].top = Variable.ModalsPage[Variable.ModalsPage.length - 2].el.scrollTop
                }
                document.querySelector('body').style = "overflow: hidden";
                return (
                    <div>
                        {async () => {
                            return await list["ModalPage"](Variable.ModalsPage.length - 1, reload)
                        }}
                    </div>
                )
            }



        },
    })
    return
};

export { mainModalPage };