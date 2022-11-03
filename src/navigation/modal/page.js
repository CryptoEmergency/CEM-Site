import {
    jsx,
    jsxFrag,
    Variable,
    init,
} from '@betarost/cemjs';

import list from "@src/modalsList.js";

Variable.Static.countModals = 0
Variable.Static.countModalsPage = 0

const mainModalPage = async function () {

    init(
        () => {
            // console.log("modals", Variable.Modals)
            //Variable.OutHideWindows = []
        },

        async (reload) => {

            if (!Variable.ModalsPage.length) {
                document.querySelector('body').style = "";
                return <div></div>
            }

            if (Variable.ModalsPage.length) {
                if (Variable.ModalsPage[Variable.ModalsPage.length - 2] && !Variable.ModalsPage[Variable.ModalsPage.length - 2].top) {
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
        "modalsPage")
    return
};

export { mainModalPage };