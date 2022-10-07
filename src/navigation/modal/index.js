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

            if (Variable.Modals && Variable.Modals.length != 0) {
                document.getElementById('backdrop').classList.add("c-backdrop--show");
                const modals = Variable.Modals.map((item, index) => {
                    let rel = reload
                    if (index < (Variable.Modals.length - 1)) {
                        rel = true
                    }
                    return (
                        list[item.name](item.data, reload)
                    )
                })

                return (
                    <div>
                        {modals}
                    </div>
                )
            } else {
                document.getElementById('backdrop').classList.remove("c-backdrop--show");
                return (
                    <></>
                )
            }
        },
        "modals")
    return
};

export { mainModal };