import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

import { fn } from "@src/functions/index.js";

const start = function () {
    let ticketNumber

    let buttonContainer = Variable.setRef()
    let button = Variable.setRef()

    let nickname = Variable.setRef()
    let email = Variable.setRef()
    let telegram = Variable.setRef()
    let twitter = Variable.setRef()
    let instagram = Variable.setRef()
    let quiz = Variable.setRef()

    let formValid


    const SendLotteryForm = async function (event) {
        event.preventDefault()
        // let value = {
        //     nickname: this.elements.nickname.value,
        //     telegram: this.elements.telegram.value,
        //     twitter: this.elements.twitter.value,
        //     instagram: this.elements.instagram.value,
        //     email: this.elements.email.value
        // }
        // let tmpRes = await SendData(data)
        // let res = await makeData({ res: tmpRes, one: true })
        // let htmlData = getFirstData()
        // htmlData.ticketNumber = res.ticketNumber
        // $('.lottery_data').html(await partialsHtml('ticket', htmlData))
        // let response = await api({ type: "set", action: "setLottery", short: true, data: { value: value }})
        let response = await fn.restApi.setLottery.join({
            nickname: this.elements.nickname.value,
            telegram: this.elements.telegram.value,
            twitter: this.elements.twitter.value,
            instagram: this.elements.instagram.value,
            email: this.elements.email.value
        })
       // console.log(response)
        if(response.list_records.length != 0){
            ticketNumber = response.list_records[0].ticketNumber
        }
        initReload()
    }


    const lotteryValidCheckKeyup = function () {
        if (this.value.trim().length != 0) {
            formValid[this.name]().classList.add('lottery_check_valid')
        } else {
            formValid[this.name]().classList.remove('lottery_check_valid')
        }
        let FullFilledForm = true
        Object.values(formValid).forEach((element) => {
            if (element().classList[1] != 'lottery_check_valid') {
                FullFilledForm = false
            }
        })
        if (FullFilledForm) {
            buttonContainer().classList.remove('lottery_form_button_inactive')
            button().disabled = false
        } else {
            buttonContainer().classList.add('lottery_form_button_inactive')
            button().disabled = true
        }
    }

    const lotteryQuiz = async function () {
        // console.log(quiz)
        if (quiz().classList[1] == 'lottery_check_valid') {
            return
        }

        if (this.dataset.true == 'true') {
            this.classList.add('valid_quiz_answer')
            quiz().classList.add('lottery_check_valid')
            let FullFilledForm = true
            Object.values(formValid).forEach((element) => {
                if (element().classList[1] != 'lottery_check_valid') {
                    FullFilledForm = false
                }
            })
            if (FullFilledForm) {
                buttonContainer().classList.remove('lottery_form_button_inactive')
                button().disabled = false
            } else {
                buttonContainer().classList.add('lottery_form_button_inactive')
                button().disabled = true
            }
        } else {
            this.classList.add('invalid_quiz_answer')
        }

    }


    init(
        async () => {
            let response = null
            if (Variable.auth && Variable.myInfo) {
                response = await fn.restApi.getLottery({ limit: 1, filter: { nickname: Variable.myInfo.nickname } })
                // response = await api({ type: "get", action: "getLottery", short: true, cache: true, limit: 1, filter: { nickname: Variable.myInfo.nickname } })
            }
            //console.log('response', response, Variable.myInfo.nickname)
            if (response && response.totalFound != 0) {
                ticketNumber = response.list_records[0].ticketNumber
            } else {
                ticketNumber = false
            }
            formValid = {
                nickname: nickname,
                email: email,
                telegram: telegram,
                twitter: twitter,
                instagram: instagram,
                quiz: quiz
            }
        },
        () => {
            // console.log("Second Init ", questions)
            return (
                <div class="c-main__body">
                    <div class="page-content">
                        <div class="lottery_block">
                            <h1>{Variable.lang.h.lottery}</h1>
                            <h2>{Variable.lang.h.lotterySubtitle}</h2>
                            <p>{Variable.lang.p.lotteryActions}</p>
                            <div class="lottery_steps_list">
                                <div class="lottery_steps_item">
                                    <img src={svg['lottery_step1']} />
                                    <p>{Variable.lang.p.lotteryAction1}</p>
                                </div>
                                <div class="lottery_steps_item">
                                    <img src={svg['lottery_step2']} />
                                    <p>{Variable.lang.p.lotteryAction2}</p>
                                </div>
                                <div class="lottery_steps_item">
                                    <img src={svg['lottery_step3']} />
                                    <p>{Variable.lang.p.lotteryAction3}</p>
                                </div>
                            </div>
                            <p>{Variable.lang.p.lotteryAnnounce}</p>
                            <p>{Variable.lang.p.lotteryDates} 17.11.2022 - 17.12.2022</p>
                            <p>{Variable.lang.p.lotteryDatess} <a style="text-decoration: none;background: linear-gradient(160deg, #C126CE 42.19%, #284CCB 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;font-weight: 600;" href="/forum/" onclick={async (e) => {fn.siteLink(e)}}>{Variable.lang.p.lotteryDatesss}</a></p>
                            <div class="lottery_main">
                                <div class="lottery_data">
                                    {() => {
                                        if (ticketNumber) {
                                            return (
                                                <div class="ticket_container">
                                                    <div class="ticket">
                                                        <p>{Variable.lang.p.lotteryTicket}</p>
                                                        <div class="ticket_number"><span>{ticketNumber}</span></div>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div>
                                                    <form class="lottery_form" onsubmit={SendLotteryForm} >
                                                        <p>{Variable.lang.p.getTicket}</p>
                                                        <div ref={nickname} class={Variable.auth ? 'lottery_check lottery_check_valid' : 'lottery_check'}>
                                                            <p>1. {Variable.lang.p.lotteryQuest1}</p>
                                                            <input type="text" name="nickname" placeholder="Nickname" readonly value={Variable.auth ? Variable.myInfo.nickname : ''} />
                                                            <img src={svg['check_lottery_black']} />
                                                        </div>
                                                        <div ref={email} data-name="email" class="lottery_check">
                                                            <p>2. {Variable.lang.p.lotteryQuest2}</p>
                                                            <input oninput={lotteryValidCheckKeyup} type="text" name="email" placeholder="Email" />
                                                            <img src={svg['check_lottery_black']} />
                                                        </div>
                                                        <div ref={telegram} data-name="telegram" class="lottery_check">
                                                            <p>3. {Variable.lang.p.lotteryQuest3}</p>
                                                            {Variable.lang.code == 'ru' ? <p><a target="_blank" rel="nofollow noopener" href="https://t.me/cryptoemergencychat">https://t.me/cryptoemergencychat</a></p> : <p><a target="_blank" rel="nofollow noopener" href="https://t.me/emergencycrypto">https://t.me/emergencycrypto</a></p>}
                                                            <input oninput={lotteryValidCheckKeyup} type="text" name="telegram" placeholder="Telegram" />
                                                            <img src={svg['check_lottery_black']} />
                                                        </div>
                                                        <div ref={twitter} data-name="twitter" class="lottery_check">
                                                            <p>4. {Variable.lang.p.lotteryQuest4}</p>
                                                            <p><a target="_blank" rel="nofollow noopener" href="https://twitter.com/cryptoemergency">https://twitter.com/cryptoemergency/status/1593277451156824070?s=21</a></p>
                                                            <input oninput={lotteryValidCheckKeyup} type="text" name="twitter" placeholder="Twitter" />
                                                            <img src={svg['check_lottery_black']} />
                                                        </div>
                                                        <div ref={instagram} data-name="instagram" class="lottery_check">
                                                            <p>5. {Variable.lang.p.lotteryQuest5}</p>
                                                            {Variable.lang.code == 'ru' ? <p><a target="_blank" rel="nofollow noopener" href="https://www.instagram.com/p/ClGfX9HqAfo/?igshid=YmMyMTA2M2Y=">https://www.instagram.com/p/ClGfX9HqAfo/?igshid=YmMyMTA2M2Y=</a></p> : <p><a target="_blank" rel="nofollow noopener" href="https://www.instagram.com/p/ClGkx_pscof/?igshid=YmMyMTA2M2Y=">https://www.instagram.com/p/ClGkx_pscof/?igshid=YmMyMTA2M2Y=</a></p>}
                                                            <p>{Variable.lang.p.lotteryQuest55}</p>
                                                            <input oninput={lotteryValidCheckKeyup} type="text" name="instagram" placeholder="Instagram" />
                                                            <img src={svg['check_lottery_black']} />
                                                        </div>
                                                        <div ref={quiz} data-name="quiz" class="lottery_check">
                                                            <p>6. {Variable.lang.p.lotteryQuest6}</p>
                                                            <label for="">{Variable.lang.p.lotteryQuiz}</label>
                                                            <div class="lottery_quiz_container">
                                                                <div onclick={lotteryQuiz} class="lottery_quiz_button">
                                                                    5
                                                                </div>
                                                                <div data-true="true" onclick={lotteryQuiz} class="lottery_quiz_button">
                                                                    0.5
                                                                </div>
                                                                <div onclick={lotteryQuiz} class="lottery_quiz_button">
                                                                    0.2
                                                                </div>
                                                            </div>
                                                            <img src={svg['check_lottery_black']} />
                                                        </div>
                                                        <div ref={buttonContainer} class="lottery_form_button lottery_form_button_inactive">
                                                            <button ref={button}>OK</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            )
                                        }
                                    }}
                                </div>
                                <div>
                                    <p class="lottery_post_banner_text">{Variable.lang.p.lotteryBanner}</p>
                                    <img class="lottery_post_banner" src={images['lottery_post_banner_en']} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    )


}

export default start;