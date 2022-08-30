import { setValue,sendApi } from '@betarost/cemjs'

const clickCancel = function (e) {
    e.stopPropagation()
}

const clickHide = function (e) {
    setValue("mainHeader", "langListShow", false)
}

const timerTik = function () {
    //console.log("timerTik", "tt")
}

const timerCourse = async function () {
    var course = await sendApi.getCourse()
    setValue("mainBlock","mainCourse",course.result.list_records[0]);
}

const init = function () {

}

export { init, timerTik, timerCourse,clickHide,clickCancel }