import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable,
    sendApi
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

import { checkAnswerApi } from '@src/functions.js'

import { If } from '@component/helpers/All.js';
import { Select } from '@component/element/Select.js';

const start = function () {
    Variable.HeaderShow = true
    Variable.FooterShow = true

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
        let value = {
            nickname: this.elements.nickname.value,
            telegram: this.elements.telegram.value,
            twitter: this.elements.twitter.value,
            instagram: this.elements.instagram.value,
            email: this.elements.email.value
        }
        // let tmpRes = await SendData(data)
        // let res = await makeData({ res: tmpRes, one: true })
        // let htmlData = getFirstData()
        // htmlData.ticketNumber = res.ticketNumber
        // $('.lottery_data').html(await partialsHtml('ticket', htmlData))
        let response = checkAnswerApi(await sendApi.create("setLottery", { value: value }));
        ticketNumber = response.list_records[0].ticketNumber
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
            let response = checkAnswerApi(await sendApi.create("getLottery", { filter: { nickname: Variable.myInfo.nickname } }));
            // console.log('response', response)
            if (response.totalFound != 0) {
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
                <div class={`${Variable.HeaderShow ? "c-main__body" : "c-main__body--noheader"}`}>
                    <div class="page-content">
                        <div class="lottery_block">
                            <h1>«Word of Mouth» lottery</h1>
                            <h2>WIN the CEM</h2>
                            <p>Do the simplest actions to get a lucky lottery ticket!</p>
                            <div class="lottery_steps_list">
                                <div class="lottery_steps_item">
                                    <img src={svg['lottery_step1']} />
                                    <p>Invite your friends to increase Prize Pool.</p>
                                </div>
                                <div class="lottery_steps_item">
                                    <img src={svg['lottery_step2']} />
                                    <p>Every registered user = 1 CEM additionally to 1000 CEM Prize Pool</p>
                                </div>
                                <div class="lottery_steps_item">
                                    <img src={svg['lottery_step3']} />
                                    <p>5 winners will share the Prize Pool!</p>
                                </div>
                            </div>
                            <p>Give a word of mouth to your friends as every user registered in the lottery will add 1CEM into a 1000CEM Prize Pool. 5 winners will share the Prize Pool!</p>
                            <p>Dates of Lottery:</p>
                            <div class="lottery_main">
                                <div class="lottery_data">
                                    { }
                                    <If
                                        data={ticketNumber}
                                        dataIf={
                                            <div class="ticket_container">
                                                <div class="ticket">
                                                    <p>Job done, get your ticket!</p>
                                                    <div class="ticket_number"><span>{ticketNumber}</span></div>
                                                </div>
                                            </div>
                                        }
                                        dataElse={
                                            <div>
                                                <form class="lottery_form" onsubmit={SendLotteryForm} >
                                                    <p>To get lottery ticket:</p>
                                                    <div ref={nickname} class={Variable.auth ? 'lottery_check lottery_check_valid' : 'lottery_check'}>
                                                        <p>1. Register at Crypto-emergency.com.</p>
                                                        <input type="text" name="nickname" placeholder="Nickname" readonly value={Variable.auth ? Variable.myInfo.nickname : ''} />
                                                        <img src={svg['check_lottery_black']} />
                                                    </div>
                                                    <div ref={email} data-name="email" class="lottery_check">
                                                        <p>2. Enter your Email</p>
                                                        <input onkeyup={lotteryValidCheckKeyup} type="text" name="email" placeholder="Email" />
                                                        <img src={svg['check_lottery_black']} />
                                                    </div>
                                                    <div ref={telegram} data-name="telegram" class="lottery_check">
                                                        <p>3. Join our Telegram group and inform us your @nickname below.</p>
                                                        <p><a target="_blank" rel="nofollow noopener" href="https://t.me/emergencycrypto">https://t.me/emergencycrypto</a></p>
                                                        <p><a target="_blank" rel="nofollow noopener" href="https://t.me/cryptoemergencychat">https://t.me/cryptoemergencychat</a></p>
                                                        <input onkeyup={lotteryValidCheckKeyup} type="text" name="telegram" placeholder="Telegram" />
                                                        <img src={svg['check_lottery_black']} />
                                                    </div>
                                                    <div ref={twitter} data-name="twitter" class="lottery_check">
                                                        <p>4. Retweet post and give us a link</p>
                                                        <p><a target="_blank" rel="nofollow noopener" href="https://twitter.com/cryptoemergency">https://twitter.com/cryptoemergency</a></p>
                                                        <input onkeyup={lotteryValidCheckKeyup} type="text" name="twitter" placeholder="Twitter" />
                                                        <img src={svg['check_lottery_black']} />
                                                    </div>
                                                    <div ref={instagram} data-name="instagram" class="lottery_check">
                                                        <p>5. Make an Instagram post and give us a link</p>
                                                        <p><a target="_blank" rel="nofollow noopener" href="https://www.instagram.com/cryptoemergency/">https://www.instagram.com/cryptoemergency/</a></p>
                                                        <input onkeyup={lotteryValidCheckKeyup} type="text" name="instagram" placeholder="Instagram" />
                                                        <img src={svg['check_lottery_black']} />
                                                    </div>
                                                    <div ref={quiz} data-name="quiz" class="lottery_check">
                                                        <p>6. Answer a shortest quiz.</p>
                                                        <label for="">How many CEMD do everyone get for registration in Crypto Emergency?</label>
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
                                        }
                                    />
                                </div>
                                <div>
                                    <p class="lottery_post_banner_text">Download banner:</p>
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