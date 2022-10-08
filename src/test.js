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

const snippets = async function () {
  Helpers.getDateFormat(question.showDate, "now")

  Variable.MainQuestions = await sendApi.send({ action: "getQuestions", short: true, cache: true, name: "MainQuestions" });
  Variable.PageBlog = await sendApi.send({ action: "getNews", short: true, cache: true, name: "PageBlog" });
  // <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
  // class={['blog_page_container', Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}
}
//I check
export { test }