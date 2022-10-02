import {
  Variable,
  getInitList,
  getTimerInit
} from '@betarost/cemjs'

const test = async function (data) {

  setInterval(async () => {
    console.log("=======================")
    console.log("Дебаг каждые 30 секунд:")
    console.log("Variable:", Variable);
    console.log("InitList:", await getInitList());
    console.log("TimerInit:", await getTimerInit());
    console.log("=======================")
  }, 30000);
}

export { test }