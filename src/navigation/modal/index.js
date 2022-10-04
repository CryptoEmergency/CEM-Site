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
                const modals = Variable.Modals.map((item) => {
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
                return (
                    <></>
                )
            }
        },
        "modals")
    return
};

export { mainModal };