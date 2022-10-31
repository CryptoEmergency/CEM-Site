import {
    jsx,
    jsxFrag,
    Variable,
    init,
} from '@betarost/cemjs';

import list from "@src/modalsList.js";

const mainModal = async function () {

    init(
        () => {
            // console.log("modals", Variable.Modals)
            //Variable.OutHideWindows = []
        },

        async (reload) => {
            console.log('=1060e5=', "mainModal", Variable.ModalsPage, Variable.Modals, reload)
            if (!Variable.ModalsPage.length && !Variable.Modals.length) {
                document.getElementById('backdrop').classList.remove("c-backdrop--show");
                document.querySelector('body').style = "";
                return <div></div>
            }
            let modals = []
            if (Variable.ModalsPage.length) {
                Variable.ModalsPage.map(async (item, index) => {
                    modals.push({ fn: list["ModalPage"], data: index, reload })
                });
            }

            if (Variable.Modals.length) {
                Variable.Modals.map(async (item, index) => {
                    let rel = reload
                    if (index != Variable.Modals.length - 1) {
                        rel = true
                    }
                    modals.push({ fn: list[item.name], data: item.data, reload: rel })
                });
            }

            if (!modals.length) {
                document.getElementById('backdrop').classList.remove("c-backdrop--show");
                document.querySelector('body').style = "";
                return <div></div>
            }

            let mm = []
            for (let item of modals) {
                mm.push(await item.fn(item.data, item.reload))
            }
            document.getElementById('backdrop').classList.add("c-backdrop--show");
            document.querySelector('body').style = "overflow: hidden";
            return (
                <div>{mm}</div>
            )
        },
        "modals")
    return
};

export { mainModal };