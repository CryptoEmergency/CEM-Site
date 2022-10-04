import {
    jsx,
    jsxFrag,
    Variable,
    initOne,
    initReload
} from '@betarost/cemjs';
import svg from "@assets/svg/index.js";




let test

const BlockModal = function () {
    // console.log("BlockModal");
    console.log('=c8508fghfgh2=',test)

    initOne(
        () => {
            test = 5
            console.log('=c85082=',test)
        }
    )

    setTimeout ( () => {
        test = 77
        initReload()
    },5000)
    return (
        <div >
           jgkgkggkkggkkg
        </div>
    )
};


export { BlockModal }