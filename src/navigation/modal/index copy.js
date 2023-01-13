import {
    jsx,
    jsxFrag,
    Variable,
    init,
    getInitList
} from '@betarost/cemserver/cem.js';

import { fn } from '@src/functions/index.js';
import list from "@src/lists/modalsList.js";

Variable.Static.countModals = 0
Variable.Static.countModalsPage = 0


const mainModal = async function () {
    init(
        () => {
            // console.log("modals", Variable.Modals)
            //Variable.OutHideWindows = []
        },

        async function (reload) {
         //   console.log('=50716e= mainModal', reload)
            if (!Variable.Modals.length) {
                document.getElementById('backdrop').classList.remove("c-backdrop--show");
                if (Variable.auth && Variable.myInfo && !Variable.myInfo.confirm.registrasion) {
                    Variable.SetModals({ name: "ModalAfterRegisterForm", data: {} })
                }
                return <div></div>
            }
            document.getElementById('backdrop').classList.add("c-backdrop--show");

            if (Variable.Modals.length == 1) {
                let ID = "Modal-" + (Variable.Modals.length - 1)
                if (!reload && getInitList()[ID].firstStart) {
                    await getInitList()[ID].firstStart(reload)
                }

                return (
                    <div>
                        {async () => {
                            return await getInitList()[ID].function(reload)
                        }}
                    </div>
                )
            } else {
                const arrReturn = Variable.Modals.map(async (item, index) => {
                    let ID = "Modal-" + index
                    let rel = reload
                    if (!reload && getInitList()[ID].firstStart && index != Variable.Modals.length - 1) {
                        await getInitList()[ID].firstStart(reload)
                    }
                    if (index != Variable.Modals.length - 1) {
                        rel = false
                    }
                    return (
                        <div>
                            {async () => {
                                return await getInitList()[ID].function(rel)
                            }}
                        </div>
                    )
                })
            //    console.log('=f76ca7= arrReturn', arrReturn)
                return (
                    <div>
                        {arrReturn}
                    </div>

                )



            }
            return (
                <div>ffff</div>
            )
            if (!this.test) {
                this.Static = {}
                this.test = 0
            }
            this.test++

            let Static = this.Static
            // let [Static] = fn.GetParams({ reload, ID: 8 })
            console.log('=c590a4==Static=Static=Static=Static=Static=Static=Static=Static=Static=', this, Static)
            // // let Static = fn.GetParams({ reload, ID: 8 })
            // Static.hhh = "gggg"
            Static.hhh = "g2ggg"
            // console.log('=a9ab5c= mainModal === ', reload, Static)
            // let [Static] = fn.GetParams({ ID: 7 })
            // Static.test = 5555
            if (!Variable.Modals.length) {
                document.getElementById('backdrop').classList.remove("c-backdrop--show");
                if (Variable.auth && Variable.myInfo && !Variable.myInfo.confirm.registrasion) {
                    Variable.SetModals({ name: "ModalAfterRegisterForm", data: {} })
                }
                return <div></div>
            }

            return (
                <div>
                    {async () => {

                        // return await list["ModalReg"]({}, reload, 8, Static)
                        return await Variable.Modals[0].fn({}, reload, 8)
                    }}
                </div>
            )
            return (
                <div>

                </div>
            )
            if (!Variable.Modals.length) {


                document.getElementById('backdrop').classList.remove("c-backdrop--show");
                if (Variable.auth && Variable.myInfo && !Variable.myInfo.confirm.registrasion) {
                    Variable.SetModals({ name: "ModalAfterRegisterForm", data: {} })
                }
                // document.querySelector('body').style = "";
                return <div></div>
            }

            return (
                <div>
                    {async () => {
                        return await Variable.Modals[0].fn({}, reload, 7)
                    }}
                </div>
            )

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
            let test = []
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
                    // test.push(await list[item.name](item.data, rel, index))
                });
            }

            if (!modals.length) {
                document.getElementById('backdrop').classList.remove("c-backdrop--show");
                // document.querySelector('body').style = "";
                return <div></div>
            }

            let mm = []
            for (let index = 0; index < modals.length; index++) {
                // mm.push(await modals[index].fn(modals[index].data, modals[index].reload, index))
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
                <div>
                    {async () => {
                        return await list["ModalReg"]({}, reload, 7, Static)
                    }}
                    {/* {mm} */}
                    {/* {() => {
                        return modals.map(async (item, index) => {
                            return (
                                await item.fn(item.data, item.reload, index)
                            )
                        })
                    }} */}
                </div>
            )
        },
        "modals")
    return
};

export { mainModal };