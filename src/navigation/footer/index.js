import {jsx,jsxFrag,setAction,setValue,makeDOM,getVariable,getStorage,getValue} from '@betarost/cemjs'
import appstore from '@assets/image/appstore.svg'
import googleplay from '@assets/image/googleplay.svg'
import telegram from '@assets/icon/telegram-icon.svg'
import youtube from '@assets/icon/youtube_icon.svg'
import twitter from '@assets/icon/twitter-icon.svg'
import discord from '@assets/icon/discord-icon.svg'
import github from '@assets/icon/github-icon2.svg'
import tiktok from '@assets/icon/tiktok-icon.svg'
import { clickCancel,siteLink, changeLang } from '@src/functions.js'

const mainFooter = function(){  
    const lang = getVariable("languages")[getStorage("lang")]
    return(
        <div class="footer">
            <div class="nav-footer" id="accordionFooter">
                <div class="title">
                    <span class="title-text" id="headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            {lang.span.company}
                        </button>
                    </span>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionFooter">
                        <div class="accordion-body">
                            <a onclick={siteLink} href="/about/">
                                <span>{lang.a.about}</span>
                            </a>
                            <a onclick={siteLink} href="/blog/"><span>{lang.a.blog}</span></a>
                            <a onclick={siteLink} href="/career-whith-us/"><span>{lang.a.career}</span></a>
                            <a onclick={siteLink} href="/media/"><span>{lang.h.mediaUs}</span></a>

                            <a onclick={siteLink} href="/university/"><span>Крипто университет</span></a>
                            <a href="/assets/docs/whitePaperEN.pdf">
                                <span>{lang.span.whitePaper}</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="title">
                    <span class="title-text" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            {lang.span.support}
                        </button>
                    </span>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionFooter">
                        <div class="accordion-body">
                            <a id="supportSummon" data-action="supportModal" data-nofollow="true" href=""><span>{lang.a.supportCenter}</span></a>
                            <a onclick={siteLink} href="/contacts/"><span>{lang.a.contacts}</span></a>
                            <a onclick={siteLink} href="/affiliate/"><span>{lang.h.affiliate}</span></a>
                        </div>
                    </div>
                </div>
                <div class="title">
                    <span class="title-text" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            {lang.span.rules}
                        </button>
                    </span>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionFooter">
                        <div class="accordion-body">
                            <a onclick={siteLink} href="/terms-of-service/"><span>{lang.a.userTerms}</span></a>
                            <a onclick={siteLink} href="/data-policy/"><span>{lang.a.dataPolicy}</span></a>
                            <a onclick={siteLink} href="/cookies-policy/"><span>{lang.a.cookies}</span></a>
                        </div>
                    </div>
                </div>
                <div class="title">
                    <span class="title-text" id="headingFour">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            CEM
                        </button>
                    </span>
                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionFooter">
                        <div class="accordion-body">
                            <a target="_blank" href="https://cemblockchain.com/"><span>CEM Blockchain</span></a>
                            <a target="_blank" href="https://cemscan.com/"><span>CEM Explorer</span></a>
                        </div>
                    </div>
                </div>
                <div class="title">
                    <a href="https://apps.apple.com/ru/app/crypto-emergency/id1635628021" class="c-button__app">
                        <img src={appstore} />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.cryptoemergency" class="c-button__app">
                        <img src={googleplay} />
                    </a>
                </div>
            </div>
            <div class="bottom">
                <div class="unicode">
                    ©2020-2022 Crypto Emergency
                </div>
                <div class="social-icons">
                    <div class="footer-icon-block">
                        <div style="display:none;" class="footer-media-full">
                            <div><a target="_blank" href="https://t.me/cryptoemergencychat" rel="nofollow noopener" data-type="social" data-count="telegramRu"><img src={telegram}/> Русский </a></div>
                            <div><a target="_blank" href="https://t.me/emergencycrypto" rel="nofollow noopener" data-type="social" data-count="telegramEn"><img src={telegram}/> English </a></div>
                        </div>
                        <a id="footer_telegram_icon" data-action="showAllLangMedia" class="icon"><img src={telegram} /></a>
                    </div>
                    <div class="footer-icon-block">
                        <div style="display:none;" class="footer-media-full">
                            <div><a target="_blank" href="https://www.youtube.com/channel/UCb9Fx-fNikzs-OZwnTXepLg/" rel="nofollow noopener" data-type="social" data-count="youtube"><img src={youtube}/> Русский </a></div>
                            <div><a target="_blank" href="https://www.youtube.com/channel/UCdDWOveIuvqkyusDK1gv4ig/" rel="nofollow noopener" data-type="social" data-count="youtube"><img src={youtube}/> English </a></div>
                        </div>
                        <a id="footer_youtube_icon" data-action="showAllLangMedia" class="icon" rel="nofollow noopener" data-type="social" data-count="youtube"><img src={youtube} /></a>
                    </div>
                    <div class="footer-icon-block">
                        <a href="https://twitter.com/cryptoemergency" target="_blank" class="icon" rel="nofollow noopener" data-type="social" data-count="twitter"><img src={twitter} /></a>
                    </div>
                    <div class="footer-icon-block">
                        <a href="https://discord.com/invite/Qdm7W8DjYc" target="_blank" class="icon" rel="nofollow noopener" data-type="social" data-count="discord"><img src={discord} /></a>
                    </div>
                    <div class="footer-icon-block">
                        <a href="https://github.com/CryptoEmergency" target="_blank" class="icon" rel="nofollow noopener" data-type="social" data-count="discord"><img src={github} /></a>
                    </div>
                    <div class="footer-icon-block">
                        <div style="display:none;" class="footer-media-full footer-media-full-right">
                        <div><a target="_blank" href="https://vm.tiktok.com/ZSefEMs2c/" rel="nofollow noopener" data-type="social" data-count="tiktokRu"><img src={tiktok}/> Русский </a></div>
                        <div><a target="_blank" href="https://vm.tiktok.com/ZSefExJrr/" rel="nofollow noopener" data-type="social" data-count="tiktokEn"><img src={tiktok}/> English </a></div>
                        </div>
                        <a id="footer_tiktok_icon" data-action="showAllLangMedia" class="icon"><img src={tiktok} /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ID = "mainFooter";
const befor = function(){}
const start = function(){
    if(!getVariable("footer")){
        return;
    }
    makeDOM(mainFooter(),ID)
}
const after = function(){}

// setAction(ID,"befor",befor)
// setAction(ID,"start",start)
// setAction(ID,"after",after)

const init = function(){
    befor()
    start()
    after()
}
export {init}