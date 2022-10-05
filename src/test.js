import {
  Variable,
  getInitList,
  getTimerInit
} from '@betarost/cemjs'

const test = async function () {
  setInterval(async () => {
    console.log("=======================")
    console.log("Дебаг каждые 60 секунд:")
    console.log("Variable:", Variable);
    console.log("InitList:", await getInitList());
    console.log("TimerInit:", await getTimerInit());
    console.log("=======================")
  }, 60000);
}

export { test }