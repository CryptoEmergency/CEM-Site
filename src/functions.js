import { setValue,sendApi } from '@betarost/cemjs'

const timerTik = function () {
    //console.log("timerTik", "tt")
}

const timerCourse = async function () {
    var course = await sendApi.getCourse()
    setValue("mainBlock","mainCourse",course.result.list_records[0]);
}

const init = function () {

}

export { init, timerTik, timerCourse }