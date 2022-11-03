import {
    jsx,
    jsxFrag,
    Variable,
    init,
} from '@betarost/cemjs';

import list from "@src/modalsList.js";

Variable.Static.countModals = 0
Variable.Static.countModalsPage = 0

const mainModal = async function () {
    init(
        () => {
            // console.log("modals", Variable.Modals)
            //Variable.OutHideWindows = []
        },

        async (reload) => {
            if (!Variable.Modals.length) {
                document.getElementById('backdrop').classList.remove("c-backdrop--show");
                if (Variable.auth && Variable.myInfo && !Variable.myInfo.confirm.registrasion) {
                    Variable.SetModals({ name: "ModalAfterRegisterForm", data: {} })
                }
                // document.querySelector('body').style = "";
                return <div></div>
            }
            let modals = []
            // if (Variable.ModalsPage.length) {
            //     let rel = reload
            //     if (Variable.ModalsPage.length != Variable.Static.countModalsPage) {
            //         Variable.Static.countModalsPage = Variable.ModalsPage.length
            //     } else {
            //         rel = true
            //     }
            //     Variable.ModalsPage.map(async (item, index) => {
            //         modals.push({ fn: list["ModalPage"], data: index, reload: rel })
            //     });
            // }

            if (Variable.Modals.length) {
                Variable.Modals.map(async (item, index) => {
                    let rel = reload
                    if (Variable.Modals.length != Variable.Static.countModals) {
                        Variable.Static.countModals = Variable.Modals.length
                    }
                    if (index != Variable.Modals.length - 1) {
                        rel = true
                    }
                    modals.push({ fn: list[item.name], data: item.data, reload: rel })
                });
            }

            if (!modals.length) {
                document.getElementById('backdrop').classList.remove("c-backdrop--show");
                // document.querySelector('body').style = "";
                return <div></div>
            }

            let mm = []
            for (let index = 0; index < modals.length; index++) {
                mm.push(await modals[index].fn(modals[index].data, modals[index].reload))
            }
            // for (let item of modals) {
            //     console.log('=0602d4= modals', item)
            //     Variable.Static.reloadModals = item.reload
            //     console.log('=0602d4= modals 2', Variable.Static.reloadModals, item.reload)
            //     mm.push(await item.fn(item.data, item.reload))
            //     Variable.Static.reloadModals = false
            //     console.log('=0602d4= modals 3', Variable.Static.reloadModals, item.reload)
            // }
            document.getElementById('backdrop').classList.add("c-backdrop--show");
            // document.querySelector('body').style = "overflow: hidden";
            return (
                <div>{mm}</div>
            )
        },
        "modals")
    return
};

export { mainModal };