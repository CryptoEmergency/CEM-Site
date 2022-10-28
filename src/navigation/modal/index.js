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

        (reload) => {
            console.log('=1060e5=', "mainModal", Variable.ModalsPage, Variable.Modals)
            let modals = []
            if (Variable.ModalsPage.length) {

                return (
                    list["ModalPage"](0, reload)
                )


            }

            if (Variable.Modals && Variable.Modals.length != 0) {
                document.getElementById('backdrop').classList.add("c-backdrop--show");
                document.querySelector('body').style = "";
                const modals = Variable.Modals.map((item, index) => {

                    let rel = reload
                    if (index < (Variable.Modals.length - 1)) {
                        rel = true
                    }
                    // console.log('=6da92b=', item, index, reload, rel)
                    return (
                        list[item.name](item.data, rel)
                    )
                })

                return (
                    <div>
                        {modals}
                    </div>
                )
            } else {
                document.getElementById('backdrop').classList.remove("c-backdrop--show");
                document.querySelector('body').style = "overflow: hidden";
                return (
                    <div></div>
                )
            }
        },
        "modals")
    return
};

export { mainModal };