import {
  Variable,
  getInitList,
  getTimerInit,
  initScreen
} from '@betarost/cemjs'

import { mainHeader } from "@navigation/header/index.js";
import { mainFooter } from '@navigation/footer/index.js';


const test = async function () {

  // initScreen([{ name: "Header", elem: null, run: mainHeader }, { name: "Footer", elem: null, run: mainFooter }]);

  setInterval(async () => {
    console.log("=======================")
    console.log("Дебаг каждые 60 секунд:")
    console.log("Variable:", Variable);
    console.log("InitList:", await getInitList());
    console.log("TimerInit:", await getTimerInit());
    console.log("=======================")
  }, 60000);
}
//I check
export { test }