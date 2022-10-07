import {
    jsx,
    jsxFrag,
    init,
    initReload,
    Variable
} from "@betarost/cemjs";
import { mainQuestions } from "@src/apiFunctions.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

import { If } from '@component/helpers/All.js';
import { Select } from '@component/element/Select.js';

const start = function () {
    Variable.HeaderShow = true
    Variable.FooterShow = true

    let ticketNumber
    
    init(
        async () => {
            ticketNumber = false
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
                                    <img src="/assets/icon/lottery_step1.svg"/>
                                    <p>Invite your friends to increase Prize Pool.</p>
                                </div>
                                <div class="lottery_steps_item">
                                    <img src="/assets/icon/lottery_step2.svg"/>
                                    <p>Every registered user = 1 CEM additionally to 1000 CEM Prize Pool</p>
                                </div>
                                <div class="lottery_steps_item">
                                    <img src="/assets/icon/lottery_step3.svg"/>
                                    <p>5 winners will share the Prize Pool!</p>
                                </div>
                            </div>
                            <p>Give a word of mouth to your friends as every user registered in the lottery will add 1CEM into a 1000CEM Prize Pool. 5 winners will share the Prize Pool!</p>
                            <p>Dates of Lottery:</p>
                            <div class="lottery_main">
                                <div class="lottery_data">
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
                                                <form class="lottery_form" >
                                                    <p>To get lottery ticket:</p>
                                                    <div class={Variable.auth ? 'lottery_check lottery_check_valid' : 'lottery_check'}>
                                                        <p>1. Register at Crypto-emergency.com.</p>
                                                        <input type="text" name="nickname" placeholder="Nickname" readonly value={Variable.auth ? Variable.myInfo.nickname : ''}/>
                                                        <img src="/assets/icon/check_lottery_black.svg"/>
                                                    </div>
                                                    <div data-name="email" class="lottery_check">
                                                        <p>2. Enter your Email</p>
                                                        <input data-keyup="lotteryValidCheck" type="text" name="email" placeholder="Email"/>
                                                        <img src="/assets/icon/check_lottery_black.svg"/>
                                                    </div>
                                                    <div data-name="telegram" class="lottery_check">
                                                        <p>3. Join our Telegram group and inform us your @nickname below.</p>
                                                        <p><a target="_blank" rel="nofollow noopener" href="https://t.me/emergencycrypto">https://t.me/emergencycrypto</a></p>
                                                        <p><a target="_blank" rel="nofollow noopener" href="https://t.me/cryptoemergencychat">https://t.me/cryptoemergencychat</a></p>
                                                        <input onpaste="lotteryValidCheck(this, event)" data-keyup="lotteryValidCheck" type="text" name="telegram" placeholder="Telegram"/>
                                                        <img src="/assets/icon/check_lottery_black.svg"/>
                                                    </div>
                                                    <div data-name="twitter" class="lottery_check">
                                                        <p>4. Retweet post and give us a link</p>
                                                        <p><a target="_blank" rel="nofollow noopener" href="https://twitter.com/cryptoemergency">https://twitter.com/cryptoemergency</a></p>
                                                        <input data-keyup="lotteryValidCheck" type="text" name="twitter" placeholder="Twitter"/>
                                                        <img src="/assets/icon/check_lottery_black.svg"/>
                                                    </div>
                                                    <div data-name="instagram" class="lottery_check">
                                                        <p>5. Make an Instagram post and give us a link</p>
                                                        <p><a target="_blank" rel="nofollow noopener" href="https://www.instagram.com/cryptoemergency/">https://www.instagram.com/cryptoemergency/</a></p>
                                                        <input data-keyup="lotteryValidCheck" type="text" name="instagram" placeholder="Instagram"/>
                                                        <img src="/assets/icon/check_lottery_black.svg"/>
                                                    </div>
                                                    <div data-name="quiz" class="lottery_check">
                                                        <p>6. Answer a shortest quiz.</p>
                                                        <label for="">How many CEMD do everyone get for registration in Crypto Emergency?</label>
                                                        <div class="lottery_quiz_container">
                                                            <div data-action="lotteryQuiz" class="lottery_quiz_button">
                                                                5
                                                            </div>
                                                            <div data-true="true" data-action="lotteryQuiz" class="lottery_quiz_button">
                                                                0.5
                                                            </div>
                                                            <div data-action="lotteryQuiz" class="lottery_quiz_button">
                                                                0.2
                                                            </div>
                                                        </div>
                                                        <img src="/assets/icon/check_lottery_black.svg"/>
                                                    </div>
                                                    <div class="lottery_form_button lottery_form_button_inactive">
                                                        <button>OK</button>
                                                    </div>
                                                </form>
                                            </div>
                                        }
                                    />
                                </div>
                                <div>
                                    <p class="lottery_post_banner_text">Download banner:</p>
                                    <img class="lottery_post_banner" src="/assets/image/lottery_post_banner_en.jpg"/>
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