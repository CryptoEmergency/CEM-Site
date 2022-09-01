import {
    jsx,
    jsxFrag,
    getVariable,
    getStorage,
    makeDOM,
    timersStart,
    setValue,
    getValue,
    sendApi
} from '@betarost/cemjs'
import { timerCourse, checkAnswerApi } from '@src/functions.js'
import { init as mainHeader } from '@navigation/header/index.js'
import { init as mainFooter } from '@navigation/footer/index.js'
import lines from '@assets/images/background/lines-preview-min.png'
import cem from '@assets/images/background/cem.png'
import bitcoin_icon from '@assets/svg/Bitcoin.svg'
import bnb_icon from '@assets/svg/bnb.svg'
import eth_icon from '@assets/svg/eth.svg'
import cem_icon from '@assets/images/cem.jpg'
import up_arrow from '@assets/svg/up_arrow.svg'
import shuffle from '@assets/svg/shuffle 1.svg'
import mortarboard from '@assets/svg/mortarboard 1.svg'
import graph from '@assets/svg/graph 1.svg'
import startup from '@assets/svg/startup 1.svg'
import meta_universes from '@assets/svg/meta_universes.svg'
import star from '@assets/svg/star 1.svg'
import stock from '@assets/svg/stock-market 1.svg'
import world from '@assets/svg/world-news 1.svg'
import user from '@assets/svg/user 1.svg'
import nft_icon from '@assets/svg/nft_icon.svg'
import careers_icon from '@assets/svg/careers_icon.svg'
import swiper_arrow_left from '@assets/svg/swiper_arrow_left.svg'
import swiper_arrow_right from '@assets/svg/swiper_arrow_right.svg'
import search_icon from '@assets/svg/search_icon.svg'
import filter from '@assets/svg/filter.svg'
import frame_default from '@assets/profile/frame/default.svg'
import question_audio from '@assets/svg/question_audio.svg'
import question_video from '@assets/svg/question_video.svg'
import question_photo from '@assets/svg/question_photo.svg'
import levelGray from '@assets/profile/levelGray.svg'
import question_answers from '@assets/svg/question_answers.svg'
import question_views from '@assets/svg/question_views.svg'
import question_time from '@assets/svg/question_time.svg'
import lbf_banner from '@assets/images/banners/lbf_banner.jpg'
import blockchain24 from '@assets/images/banners/blockchain24.png'
import crypto_summit from '@assets/images/banners/crypto_summit.jpg'
import plus_forum from '@assets/images/banners/1200х580-(fb).png'
import blockchain_life from '@assets/images/banners/blockchain_life.jpg'
import crypto_future_banner from '@assets/images/banners/crypto_future_banner.png'
import sber_unity_partner from '@assets/images/partners/sber_unity.png'
import skolkovo_partner from '@assets/images/partners/skolkovo.png'
import crypto_summit_partner from '@assets/images/partners/crypto_summit.png'
import plus_forum_partner from '@assets/images/partners/plus_forum.png'
import blockchain_life_partner from '@assets/images/partners/blockchain_life.png'
import b4_week_partner from '@assets/images/partners/b4_week.png'
import be_in_crypto_partner from '@assets/images/partners/be_in_crypto.png'
import crypto_mining_partner from '@assets/images/partners/crypto_mining.png'
import cryptomania_partner from '@assets/images/partners/cryptomania.png'
import tech_week_partner from '@assets/images/partners/tech_week.png'

import { BlockPreview } from '@component/blocks/BlockPreview.js';
import swiperload from "@assets/js/swiper.js"


const mainView = function () {
    const lang = getVariable("languages")[getStorage("lang")]
    const course = getValue(ID, "mainCourse");
    const show = getValue("mainHeader", "show");

    return (
        <div class={show && "c-main__body" || "c-main__body--noheader"}>
            <BlockPreview lang={lang} course={course} />
            
            {/* <div class="index-content">
            <div class="swiper-container">
                <div class="swiper swiper-icons" id="swiper-desktop">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}list-exchange/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={shuffle} alt=""/>
                                    </div>
                                    <p>{lang.a.exchange}</p>
                                </div>
                            </a>
                        </div>
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}library/" data-action="link" data-updating="true">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={mortarboard} alt=""/>
                                    </div>
                                    <p>{lang.a.university}</p>
                                </div>
                            </a>
                        </div>
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}content-creator/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={graph} alt=""/>
                                    </div>
                                    <p>{lang.a.contentCreater}</p>
                                </div>
                            </a>
                        </div>
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}startups/" data-action="link" data-updating="true">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={startup} alt=""/>
                                    </div>
                                    <p>{lang.a.starups}</p>
                                </div>
                            </a>
                        </div>
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}university/" data-action="link" data-updating="true">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={meta_universes} alt=""/>
                                    </div>
                                    <p>{lang.a.universes}</p>
                                </div>
                            </a>
                        </div>
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}ico-rating/" data-action="link" data-updating="true">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={star} alt=""/>
                                    </div>
                                    <p>{lang.a.icoRating}</p>
                                </div>
                            </a>
                        </div>
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}list-trade/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={stock} alt=""/>
                                    </div>
                                    <p>{lang.a.trade}</p>
                                </div>
                            </a>
                        </div>
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}news/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={world} alt=""/>
                                    </div>
                                    <p>{lang.a.news}</p>
                                </div>
                            </a>
                        </div>
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}experts/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={user} alt=""/>
                                    </div>
                                    <p>{lang.a.experts}</p>
                                </div>
                            </a>
                        </div>
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}nft-market/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={nft_icon} alt=""/>
                                    </div>
                                    <p>{lang.a.nft}</p>
                                </div>
                            </a>
                        </div>
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}experts/" data-action="link" data-updating="true">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={careers_icon} alt=""/>
                                    </div>
                                    <p>{lang.a.career}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="swiper-button-prev" id="prev-desktop-icons"><img src={swiper_arrow_left} style="height: 40%;"/></div>
                <div class="swiper-button-next" id="next-desktop-icons"><img src={swiper_arrow_right} style="height: 40%;"/></div>
            </div>    
            <div class="swiper-container">
                <div class="swiper swiper-icons" id="swiper-one">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}list-exchange/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={shuffle} alt=""/>
                                    </div>
                                    <p>{lang.a.exchange}</p>
                                </div>
                            </a>
                            <a href="{{lang.url}}library/" data-action="link" data-updating="true">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={mortarboard} alt=""/>
                                    </div>
                                    <p>{lang.a.university}</p>
                                </div>
                            </a>
                        </div>

                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}content-creator/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={graph} alt=""/>
                                    </div>
                                    <p>{lang.a.contentCreater}</p>
                                </div>
                            </a>
                            <a href="{{lang.url}}startups/" data-action="link" data-updating="true">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={startup} alt=""/>
                                    </div>
                                    <p>{lang.a.starups}</p>
                                </div>
                            </a>     
                        </div>

                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}university/" data-action="link" data-updating="true">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={meta_universes} alt=""/>
                                    </div>
                                    <p>{lang.a.universes}</p>
                                </div>
                            </a>
                            <a href="{{lang.url}}ico-rating/" data-action="link" data-updating="true">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={star} alt=""/>
                                    </div>
                                    <p>{lang.a.icoRating}</p>
                                </div>
                            </a>
                        </div>

                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}list-trade/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={stock} alt=""/>
                                    </div>
                                    <p>{lang.a.trade}</p>
                                </div>
                            </a>
                            <a href="{{lang.url}}news/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={world} alt=""/>
                                    </div>
                                    <p>{lang.a.news}</p>
                                </div>
                            </a>      
                        </div>

                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}experts/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={user} alt=""/>
                                    </div>
                                    <p>{lang.a.experts}</p>
                                </div>
                            </a>   
                            <a href="{{lang.url}}nft-market/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={nft_icon} alt=""/>
                                    </div>
                                    <p>{lang.a.nft}</p>
                                </div>
                            </a>
                        </div>
                        <div class="swiper-slide slide-item">
                            <a href="{{lang.url}}experts/" data-action="link">
                                <div class="projects_icons_text">
                                    <div class="nav-more_item">
                                        <img src={careers_icon} alt=""/>
                                    </div>
                                    <p>{lang.a.career}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="swiper-button-prev" id="prev-icons"><img src={swiper_arrow_left} style="height: 40%;"/></div>
                <div class="swiper-button-next" id="next-icons"><img src={swiper_arrow_right} style="height: 40%;"/></div>

            </div>
            <div class="main_page_show_more" data-action="mainPageShowAllIcons">
            {lang.button.see_all}
            </div>
        </div>
        <div class="index-questions_wrapper">  
            <div class="index-questions">
                <div class="title-questions">
                    <p class="info-text-questions">{lang.h.lastQuestions}</p>  
                    <div class="input-question-container" data-needauth="true">
                        <div class="question_search_container">
                            <div class="mobile-question-container">
                                <img src={search_icon}/>
                                <input class="input-question" type="text" data-keyup="questionTypeHelper" placeholder="{{lang.placeholder.question}}" autocomplete="disabled"/>
                                <img data-action="questionFilterShow" class="mobile_question_filter_icon" src={filter}/>
                            </div>
                            <div style="display: none;" class="questions_search">
                                <div class="question_search_half_empty">
                                    {lang.text.contInput}
                                </div>
                                <div style="display: none;" class="question_search_help">
                                </div>
                            </div>
                        </div>
                        <div data-needauth="true" data-action="askQuestionModal" class="mobile_search_container">
                            <div class="search-button" style="width:238px;">
                                {lang.button.giveQuestion}
                            </div>
                        </div>
                    </div>        
                    <div class="questions_filter">
                        <div class="profit_calculator_inputs_container">
                            <span>{lang.span.sort}</span>
                            <select class="justselect" id="statusQuestions">
                                <option selected="selected" value="all">{lang.select.showAllQuestions}</option>
                                <option value="open">{lang.select.openQuestions}</option>
                                <option value="closed">{lang.select.closeQuestions}</option>
                                <option value="best">{lang.select.bestQuestions}</option>
                            </select>
                        </div>
                        <div class="profit_calculator_inputs_container">
                            <span>{lang.span.sort}</span>
                            <select class="justselect" id="sortQuestions">
                                <option selected="selected" value="date">{lang.select.byDate}</option>
                                <option value="views">{lang.select.byViews}</option>
                                <option value="answers">{lang.select.byAnswers}</option>
                            </select>
                            <img data-sort="DESC" class="filter_sort_toggler" data-action="toggleFilterSort" src="/assets/svg/filter_arrow_bottom.svg"/>
                        </div>
                        <div data-language="{{lang.lang}}" data-language_code="{{lang.code}}" class="questions_filter_language" data-action="questionsFilterLanguage">
                            {lang.lang}
                        </div>
                    </div>
                    <h4>{lang.h.lastQuestions}</h4>
                </div>     
                <div class="questions-blocks">
                    <div data-id="{{_id}}" class="question-block questionLoad">
                        <div class="question_header">
                            <div class="question_card_avatar">
                                <a href="/user/nekotwo⚧" class="comment_avatar" data-action="link" data-needauth="true">
                                    <div class="micro_user_avatar">
                                        <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/upload/avatar/37a4e7ead2a6e496775f8995a4d391c4.png"/>
                                        <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height: 100%;width: " src={frame_default}/>
                                        <div class="user_avatar_level">
                                            <img src={levelGray}/>
                                            <span>9</span>
                                        </div>
                                        <div style="display: none;" class="avatar_user_online"></div>
                                        <div style="display: none;" class="avatar_user_offline"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="question_card_name">
                                <a style="display: block; left: 5px;bottom:5px" href="/user/id{{author._id}}" class="comment_avatar load" data-action="link" data-needauth="true">
                                    nickName
                                </a>
                                <div class="question_icons">
                                    <div>
                                        <img class="unstable_question_icons" src={question_audio}/>
                                        <img class="unstable_question_icons" src={question_video}/>
                                        <img class="unstable_question_icons" src={question_photo}/>
                                    </div>
                                    <div class="language_container load"> 
                                        <div class="language-question"></div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <a style="display: block; margin-top: 10px;margin-bottom: 0;" href="/question/show/{{_id}}" data-action="link" class="load">
                            <div class="preview-question">
                                <div>
                                    <span class="cut_question_text">
                                        1
                                    </span>
                                </div>
                            </div>
                        </a>
                        <div class="answers-questions">
                            <div class="question_card_stats load">
                                <img src={question_answers}/> 1
                            </div>
                            <div class="question_card_stats load">
                                <img src={question_views}/> 1
                            </div>
                            <div class="question_card_stats load">
                                <img src={question_time}/> 01.01.2000
                            </div>
                        </div>
                        <a href="/question/show/{{_id}}" data-action="link">
                            <div class="answer_button_container load">
                                <div class="answer_button">
                                    {lang.button.giveAnswer}
                                </div>
                            </div>
                        </a>
                    </div>
                    <div data-id="{{_id}}" class="question-block questionLoad">
                        <div class="question_header">
                            <div class="question_card_avatar">
                                <a href="/user/nekotwo⚧" class="comment_avatar" data-action="link" data-needauth="true">
                                    <div class="micro_user_avatar">
                                        <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/upload/avatar/37a4e7ead2a6e496775f8995a4d391c4.png"/>
                                        <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height: 100%;width: " src={frame_default}/>
                                        <div class="user_avatar_level">
                                            <img src={levelGray}/>
                                            <span>9</span>
                                        </div>
                                        <div style="display: none;" class="avatar_user_online"></div>
                                        <div style="display: none;" class="avatar_user_offline"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="question_card_name">
                                <a style="display: block; left: 5px;bottom:5px" href="/user/id{{author._id}}" class="comment_avatar load" data-action="link" data-needauth="true">
                                    nickName
                                </a>
                                <div class="question_icons">
                                    <div>
                                        <img class="unstable_question_icons" src={question_audio}/>
                                        <img class="unstable_question_icons" src={question_video}/>
                                        <img class="unstable_question_icons" src={question_photo}/>
                                    </div>
                                    <div class="language_container load"> 
                                        <div class="language-question"></div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <a style="display: block; margin-top: 10px;margin-bottom: 0;" href="/question/show/{{_id}}" data-action="link" class="load">
                            <div class="preview-question">
                                <div>
                                    <span class="cut_question_text">
                                        1
                                    </span>
                                </div>
                            </div>
                        </a>
                        <div class="answers-questions">
                            <div class="question_card_stats load">
                                <img src={question_answers}/> 1
                            </div>
                            <div class="question_card_stats load">
                                <img src={question_views}/> 1
                            </div>
                            <div class="question_card_stats load">
                                <img src={question_time}/> 01.01.2000
                            </div>
                        </div>
                        <a href="/question/show/{{_id}}" data-action="link">
                            <div class="answer_button_container load">
                                <div class="answer_button">
                                    {lang.button.giveAnswer}
                                </div>
                            </div>
                        </a>
                    </div>
                    <div data-id="{{_id}}" class="question-block questionLoad">
                        <div class="question_header">
                            <div class="question_card_avatar">
                                <a href="/user/nekotwo⚧" class="comment_avatar" data-action="link" data-needauth="true">
                                    <div class="micro_user_avatar">
                                        <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/upload/avatar/37a4e7ead2a6e496775f8995a4d391c4.png"/>
                                        <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height: 100%;width: " src={frame_default}/>
                                        <div class="user_avatar_level">
                                            <img src={levelGray}/>
                                            <span>9</span>
                                        </div>
                                        <div style="display: none;" class="avatar_user_online"></div>
                                        <div style="display: none;" class="avatar_user_offline"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="question_card_name">
                                <a style="display: block; left: 5px;bottom:5px" href="/user/id{{author._id}}" class="comment_avatar load" data-action="link" data-needauth="true">
                                    nickName
                                </a>
                                <div class="question_icons">
                                    <div>
                                        <img class="unstable_question_icons" src={question_audio}/>
                                        <img class="unstable_question_icons" src={question_video}/>
                                        <img class="unstable_question_icons" src={question_photo}/>
                                    </div>
                                    <div class="language_container load"> 
                                        <div class="language-question"></div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <a style="display: block; margin-top: 10px;margin-bottom: 0;" href="/question/show/{{_id}}" data-action="link" class="load">
                            <div class="preview-question">
                                <div>
                                    <span class="cut_question_text">
                                        1
                                    </span>
                                </div>
                            </div>
                        </a>
                        <div class="answers-questions">
                            <div class="question_card_stats load">
                                <img src={question_answers}/> 1
                            </div>
                            <div class="question_card_stats load">
                                <img src={question_views}/> 1
                            </div>
                            <div class="question_card_stats load">
                                <img src={question_time}/> 01.01.2000
                            </div>
                        </div>
                        <a href="/question/show/{{_id}}" data-action="link">
                            <div class="answer_button_container load">
                                <div class="answer_button">
                                    {lang.button.giveAnswer}
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <a href="{{lang.url}}question/" class="btn-view-all-a" data-action="link">
                    <div class="btn-view-all">
                        <div>{lang.button.allQuestions}</div>
                    </div>
                </a>
                <div class="sturtups-wrapper">  
                    <div class="startaps-other">
                        <div class="swiper-container">
                            <div class="swiper swiper-startups" id="swiper-startups">
                                <div class="swiper-wrapper">
                                        <a class="swiper-slide"><div data-action="getNews" data-id="62dd2ca100978d192547427c" class=""><img src={lbf_banner}/></div></a>
                                        <a class="swiper-slide"><div data-action="getNews" data-id="62bab2ac962df43c3fd94755" class=""><img src={blockchain24}/></div></a>
                                        <a class="swiper-slide"><div data-action="getNews" data-id="62f0da1ef2b8fa66345ef411" class=""><img src={crypto_summit}/></div></a>
                                        <a class="swiper-slide"><div data-action="getNews" data-id="630382384dab714d6e986cd6" class=""><img src={plus_forum}/></div></a>
                                        <a class="swiper-slide"><div data-action="getNews" data-id="62fb66bd4dab714d6e955d80" class=""><img src={blockchain_life}/></div></a>
                                        <a class="swiper-slide"><div data-action="getNews" data-id="62d134221de982539a72345e" class=""><img src={crypto_future_banner}/></div></a>
                                </div>
                                <div class="swiper-pagination" id="swiper-pagination-startup"></div>
                                <div class="swiper-scrollbar-startup"></div>
                            </div>
                            <div class="swiper-button-prev" id="prev-startup"><img src={swiper_arrow_left} style="height: 40%;"/></div>
                            <div class="swiper-button-next" id="next-startup"><img src={swiper_arrow_right} style="height: 40%;"/></div>
                        </div>
                    </div>
                    <div id="crypto_exchanges" class="crypto_exchanges">
                        <h4>{lang.h.trade}</h4>
                        <div class="statistics-preview list_trade_page">
                            <div class="crypto_exchanges-row">  
                                <div class="crypto_exchanges-cell">
                                #
                                </div>
                                <div class="crypto_exchanges-cell">
                                    {lang.tableTitle.appellation}
                                </div>
                                <div class="crypto_exchanges-cell">
                                    {lang.tableTitle.volume}
                                </div>
                                <div class="crypto_exchanges-cell">
                                    {lang.tableTitle.countVisitors}
                                </div>
                                <div class="crypto_exchanges-cell">
                                    {lang.tableTitle.chart}
                                </div>
                                <div>

                                </div>
                            </div>
                            <a class="crypto_exchanges-row tradeListLoad" target="_blank" rel="nofollow noopener" data-type="trade" data-count="{{marketId}}">
                                <div class="crypto_exchanges-cell">
                                    1.
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span>
                                            <span class="list_exanges_image_container load" style="margin-right: 50px;display: block;">
                                                <img  class="crypto_coin_icon" src="{{logo}}"/>
                                            </span> 
                                            1
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src="/assets/svg/exange_money.svg"/>
                                            </span> 
                                            1
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src="/assets/svg/exange_visitors.svg"/>
                                            </span> 
                                            1
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div style="display: flex;align-items: center;">
                                        <img class="load" style="margin-right: 50px;filter: none" src="https://s3.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/{{marketId}}.svg"/>
                                    </div> 
                                </div>
                                <div class="crypto_exchanges_cell_button">
                                    <div class="button-container-preview">
                                        <span class="btn-news-preview">
                                            <span>
                                                {lang.button.trade}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </a>
                            <a class="crypto_exchanges-row tradeListLoad" target="_blank" rel="nofollow noopener" data-type="trade" data-count="{{marketId}}">
                                <div class="crypto_exchanges-cell">
                                    2.
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span>
                                            <span class="list_exanges_image_container load" style="margin-right: 50px;display: block;">
                                                <img  class="crypto_coin_icon" src="{{logo}}"/>
                                            </span> 
                                            1
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src="/assets/svg/exange_money.svg"/>
                                            </span> 
                                            1
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src="/assets/svg/exange_visitors.svg"/>
                                            </span> 
                                            1
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div style="display: flex;align-items: center;">
                                        <img class="load" style="margin-right: 50px;filter: none" src="https://s3.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/{{marketId}}.svg"/>
                                    </div> 
                                </div>
                                <div class="crypto_exchanges_cell_button">
                                    <div class="button-container-preview">
                                        <span class="btn-news-preview">
                                            <span>
                                                {lang.button.trade}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </a>
                            <a class="crypto_exchanges-row tradeListLoad" target="_blank" rel="nofollow noopener" data-type="trade" data-count="{{marketId}}">
                                <div class="crypto_exchanges-cell">
                                    3.
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span>
                                            <span class="list_exanges_image_container load" style="margin-right: 50px;display: block;">
                                                <img  class="crypto_coin_icon" src="{{logo}}"/>
                                            </span> 
                                            1
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src="/assets/svg/exange_money.svg"/>
                                            </span> 
                                            1
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src="/assets/svg/exange_visitors.svg"/>
                                            </span> 
                                            1
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div style="display: flex;align-items: center;">
                                        <img class="load" style="margin-right: 50px;filter: none" src="https://s3.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/{{marketId}}.svg"/>
                                    </div> 
                                </div>
                                <div class="crypto_exchanges_cell_button">
                                    <div class="button-container-preview">
                                        <span class="btn-news-preview">
                                            <span>
                                                {lang.button.trade}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <a href="{{lang.url}}list-trade/" class="btn-view-all-a" data-action="link">
                            <div class="btn-view-all">
                                <div>{lang.button.show_all}</div>
                            </div>
                        </a>
                    </div>
                    <div class="top_professionals_container">
                        <div class="crypto_exchanges" id="crypto_exchange">
                            <h4>{lang.h.exchange}</h4>
                            <div class="statistics-preview list_exchange_page">
                                <div class="crypto_exchanges-row">
                                    <div class="crypto_exchanges-cell">
                                        {lang.tableTitle.appellation}
                                    </div>
                                    <div class="crypto_exchanges-cell">
                                        {lang.tableTitle.rank}
                                    </div>
                                    <div class="crypto_exchanges-cell">
                                        {lang.tableTitle.coins}
                                    </div>
                                    <div class="crypto_exchanges-cell">
                                        {lang.tableTitle.startDate}
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <a class="crypto_exchanges-row exchangeListLoad" target="_blank" rel="nofollow noopener" data-type="exchange" data-count="{{_id}}">
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <span>
                                                <span class="list_exanges_image_container">
                                                    <img  class="crypto_coin_icon load" src="/assets/upload/exchange/{{logo}}"/>
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <div style="height: auto;" class="load">
                                                1
                                                <img class="crypto_exchanges_rate" src="/assets/svg/rate_icon.svg"/>
                                            </div>
                                        </div> 
                                    </div> 
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <div class="crypto_coin_container load">
                                                <img  class="crypto_coin_icons" src="/assets/svg/coins/{{ icon }}.svg"/>        
                                                <div class="crypto_coin_description">
                                                    1
                                                </div>  
                                            </div>       
                                        </div>
                                    </div>
                                    <div class="crypto_exchanges-cell exanges_date_create">
                                        <span class="load">
                                            1
                                        </span>        
                                    </div>
                                    <div>
                                        <div class="button-container-preview">
                                            <span class="btn-news-preview">
                                                <span>
                                                    {lang.button.exchange}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </a>
                                <a class="crypto_exchanges-row exchangeListLoad" target="_blank" rel="nofollow noopener" data-type="exchange" data-count="{{_id}}">
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <span>
                                                <span class="list_exanges_image_container">
                                                    <img  class="crypto_coin_icon load" src="/assets/upload/exchange/{{logo}}"/>
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <div style="height: auto;" class="load">
                                                4
                                                <img class="crypto_exchanges_rate" src="/assets/svg/rate_icon.svg"/>
                                            </div>
                                        </div> 
                                    </div> 
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <div class="crypto_coin_container load">
                                                <img  class="crypto_coin_icons" src="/assets/svg/coins/{{ icon }}.svg"/>        
                                                <div class="crypto_coin_description">
                                                    1
                                                </div>  
                                            </div>       
                                        </div>
                                    </div>
                                    <div class="crypto_exchanges-cell exanges_date_create">
                                        <span class="load">
                                            1
                                        </span>        
                                    </div>
                                    <div>
                                        <div class="button-container-preview">
                                            <span class="btn-news-preview">
                                                <span>
                                                    {lang.button.exchange}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </a>
                                <a class="crypto_exchanges-row exchangeListLoad" target="_blank" rel="nofollow noopener" data-type="exchange" data-count="{{_id}}">
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <span>
                                                <span class="list_exanges_image_container">
                                                    <img  class="crypto_coin_icon load" src="/assets/upload/exchange/{{logo}}"/>
                                                </span> 
                                            </span>
                                        </div>
                                    </div>
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <div style="height: auto;" class="load">
                                                1
                                                <img class="crypto_exchanges_rate" src="/assets/svg/rate_icon.svg"/>
                                            </div>
                                        </div> 
                                    </div> 
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <div class="crypto_coin_container load">
                                                <img  class="crypto_coin_icons" src="/assets/svg/coins/{{ icon }}.svg"/>        
                                                <div class="crypto_coin_description">
                                                    1
                                                </div>  
                                            </div>       
                                        </div>
                                    </div>
                                    <div class="crypto_exchanges-cell exanges_date_create">
                                        <span class="load">
                                            1
                                        </span>        
                                    </div>
                                    <div>
                                        <div class="button-container-preview">
                                            <span class="btn-news-preview">
                                                <span>
                                                    {lang.button.exchange}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <a href="{{lang.url}}list-exchange/" class="btn-view-all-a" data-action="link">
                                <div class="btn-view-all">
                                    <div>{lang.button.show_all}</div>
                                </div>
                            </a>       
                        </div> 

                        <div class="top_professionals">
                            <h2>{lang.h.top_users}</h2>
                            <div data-type="main_page_users" class="friends_block_container">   
                                <div class="friends_search">
                                    <div class="friends_search_top">
                                        <input autocomplete="off" type="text" data-keyup="friendsSearchType" placeholder="{{lang.placeholder.findFriends}}"/>
                                        <div class="filter_summoner" data-action="filterSummoner">
                                            <img src={filter}/>
                                            <span>{lang.span.filter}</span>
                                        </div>
                                    </div>
                                    <div style="display: none" class="friends_search_filter">
                                        <div class="filter_block_container">
                                            <div data-language="all" data-language_code="all" class="friends_filter_language" data-action="friendsLanguageFilter" data-name="{{lang.text.language}}">
                                                {lang.text.language}
                                            </div>
                                            <img style="display: none;" class="refresh_language" data-action="refreshLanguage" src="/assets/svg/refresh_filter.svg"/>
                                        </div>
                                        <div class="filter_block_container">
                                            <div data-country="all" data-country_code="all" class="friends_filter_country" data-action="friendsCountryFilter" data-name="{{lang.text.country}}">
                                                {lang.text.country}
                                            </div>
                                            <img style="display: none;" class="refresh_country" data-action="refreshCountry" src="/assets/svg/refresh_filter.svg"/>
                                        </div>   
                                        <div class="friends_filter_checkboxs">
                                            <div class="checkbox" data-action="friendsFilterCheckbox">
                                                <input checked="false" class="checkbox__input" type="checkbox" id="common" required="required"/>
                                                <label class="checkbox__label" for="fast_agree">{lang.h.top_users}</label>
                                            </div>
                                            <div class="checkbox" data-action="friendsFilterCheckbox">
                                                <input checked="true" class="checkbox__input" type="checkbox" id="content-makers" required="required"/>
                                                <label class="checkbox__label" for="fast_agree">{lang.select.users_contentCreater}</label>
                                            </div>
                                            <div class="checkbox" data-action="friendsFilterCheckbox">
                                                <input checked="true" class="checkbox__input" type="checkbox" id="specialists" required="required"/>
                                                <label class="checkbox__label" for="fast_agree">{lang.select.users_experts}</label>
                                            </div>
                                            <div class="checkbox" data-action="friendsFilterCheckbox">
                                                <input class="checkbox__input" type="checkbox" id="online" required="required"/>
                                                <label class="checkbox__label" for="fast_agree">{lang.span.online}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="top_professionals_block">
                                    <div class="new_professional_card userLoad" data-id="{{id}}"> 
                                        <div class="new_professional_card_top">
                                            <div class="new_professional_card_avatar">
                                                <a href="/user/nekotwo⚧" class="comment_avatar" data-action="link" data-needauth="true">
                                                    <div class="micro_user_avatar">
                                                        <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/upload/avatar/37a4e7ead2a6e496775f8995a4d391c4.png"/>
                                                        <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height: 100%;width: " src={frame_default}/>
                                                        <div class="user_avatar_level">
                                                            <img src={levelGray}/>
                                                            <span>9</span>
                                                        </div>
                                                        <div style="display: none;" class="avatar_user_online"></div>
                                                        <div style="display: none;" class="avatar_user_offline"></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="new_professional_card_main">
                                            <a href="/user/{{nickname}}" data-action="link">
                                                <p style="width: 80%; margin: 5px auto;" class="new_professional_name load">nickname</p>
                                            </a>
                                            <p style="width: 50%; margin: 0 auto;" class="new_professional_spec load">speciality</p>
                                            <div class="new_professional_badges">
                                                
                                            </div>
                                            <div class="new_professional_statistic">
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.answers}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.subscribe}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.views}</p>
                                                </div>
                                            </div>
                                            <div class="new_professional_buttons">
                                                <div class="button-container-preview">
                                                    <a class="btn-news-preview" href="/user/chats/id{{_id}}" data-action="link" data-needauth="true">
                                                        <span>
                                                            {lang.button.write}
                                                        </span>
                                                    </a>
                                                    <a class="btn-news-preview" data-id="{{_id}}" data-action="userSubscribe" data-needauth="true">
                                                        <span class="subscribe_status">
                                                            {lang.button.subscribe}
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="new_professional_card userLoad" data-id="{{id}}"> 
                                        <div class="new_professional_card_top">
                                            <div class="new_professional_card_avatar">
                                                <a href="/user/nekotwo⚧" class="comment_avatar" data-action="link" data-needauth="true">
                                                    <div class="micro_user_avatar">
                                                        <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/upload/avatar/37a4e7ead2a6e496775f8995a4d391c4.png"/>
                                                        <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height: 100%;width: " src={frame_default}/>
                                                        <div class="user_avatar_level">
                                                            <img src={levelGray}/>
                                                            <span>9</span>
                                                        </div>
                                                        <div style="display: none;" class="avatar_user_online"></div>
                                                        <div style="display: none;" class="avatar_user_offline"></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="new_professional_card_main">
                                            <a href="/user/{{nickname}}" data-action="link">
                                                <p style="width: 80%; margin: 5px auto;" class="new_professional_name load">nickname</p>
                                            </a>
                                            <p style="width: 50%; margin: 0 auto;" class="new_professional_spec load">speciality</p>
                                            <div class="new_professional_badges">
                                                
                                            </div>
                                            <div class="new_professional_statistic">
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.answers}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.subscribe}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.views}</p>
                                                </div>
                                            </div>
                                            <div class="new_professional_buttons">
                                                <div class="button-container-preview">
                                                    <a class="btn-news-preview" href="/user/chats/id{{_id}}" data-action="link" data-needauth="true">
                                                        <span>
                                                            {lang.button.write}
                                                        </span>
                                                    </a>
                                                    <a class="btn-news-preview" data-id="{{_id}}" data-action="userSubscribe" data-needauth="true">
                                                        <span class="subscribe_status">
                                                            {lang.button.subscribe}
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="new_professional_card userLoad" data-id="{{id}}"> 
                                        <div class="new_professional_card_top">
                                            <div class="new_professional_card_avatar">
                                                <a href="/user/nekotwo⚧" class="comment_avatar" data-action="link" data-needauth="true">
                                                    <div class="micro_user_avatar">
                                                        <img style="position: absolute; top: 50%;left: 50%;z-index: 1; height: 78%; width: 78%; border-radius: 50%; transform: translateX(-50%) translateY(-50%);" src="/assets/upload/avatar/37a4e7ead2a6e496775f8995a4d391c4.png"/>
                                                        <img style="position: absolute; top: 0;left: 50%;transform: translateX(-50%);z-index: 2; height: 100%;width: " src={frame_default}/>
                                                        <div class="user_avatar_level">
                                                            <img src={levelGray}/>
                                                            <span>9</span>
                                                        </div>
                                                        <div style="display: none;" class="avatar_user_online"></div>
                                                        <div style="display: none;" class="avatar_user_offline"></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="new_professional_card_main">
                                            <a href="/user/{{nickname}}" data-action="link">
                                                <p style="width: 80%; margin: 5px auto;" class="new_professional_name load">nickname</p>
                                            </a>
                                            <p style="width: 50%; margin: 0 auto;" class="new_professional_spec load">speciality</p>
                                            <div class="new_professional_badges">
                                                
                                            </div>
                                            <div class="new_professional_statistic">
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.answers}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.subscribe}</p>
                                                </div>
                                                <div class="new_professional_info_block">
                                                    <p class="load">1</p>
                                                    <p>{lang.p.views}</p>
                                                </div>
                                            </div>
                                            <div class="new_professional_buttons">
                                                <div class="button-container-preview">
                                                    <a class="btn-news-preview" href="/user/chats/id{{_id}}" data-action="link" data-needauth="true">
                                                        <span>
                                                            {lang.button.write}
                                                        </span>
                                                    </a>
                                                    <a class="btn-news-preview" data-id="{{_id}}" data-action="userSubscribe" data-needauth="true">
                                                        <span class="subscribe_status">
                                                            {lang.button.subscribe}
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            <a href="{{lang.url}}users/" class="btn-view-all-a" data-action="link">
                                <div class="btn-view-all">
                                    <div>{lang.button.allUsers}</div>
                                </div>
                            </a>
                        </div>
                        <div class="news_block_container">
                            <div class="news_block">
                                <div class="home_page_news">
                                    <a class="crypto_news_link" data-action="link" href="{{lang.url}}news/">Crypto News</a>
                                    <div class="gradient_line"></div>
                                </div>
                                <div class="main_page_news_block">
                                    <a data-type="" class="blog_news_item">
                                        <img style="width: 100px; margin-bottom: 20px" class="load" src="/assets/upload/news/{{image}}"/>
                                        <p style="width: 60%; margin-bottom: 20px" class="blog_new_title load"></p>
                                        <div style="display: flex!important;" class="blog_post_stat">
                                            <span><img src={question_views}/> <span class="load">1</span></span>
                                            <span><img src={question_answers}/> <span class="load">1</span></span>
                                            <span class="load"></span>
                                        </div>
                                    </a>
                                    <a data-type="" class="blog_news_item">
                                        <img style="width: 100px; margin-bottom: 20px" class="load" src="/assets/upload/news/{{image}}"/>
                                        <p style="width: 60%; margin-bottom: 20px" class="blog_new_title load"></p>
                                        <div style="display: flex!important;" class="blog_post_stat">
                                            <span><img src={question_views}/> <span class="load">1</span></span>
                                            <span><img src={question_answers}/> <span class="load">1</span></span>
                                            <span class="load"></span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="button-container-preview">
                                <a class="btn-news-preview" href="{{lang.url}}news/" data-action="link">
                                    <span>
                                    {lang.button.allNews}
                                            </span>
                                </a>
                            </div>
                        </div>
                        <div class="top_professionals">
                            <h2>{lang.h.partners}</h2>
                            <div data-mainpage="true" class="partners_container"> 
                                <a target="_blank" rel="nofollow nooopener" href="https://sberunity.ru/main/startups/879d88aa-4729-4788-a541-20cc8cc3cb14" class="partner_item">
                                    <img src={sber_unity_partner}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://sk.ru" class="partner_item">
                                    <img src={skolkovo_partner}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://cryptosummit.ru" class="partner_item">
                                    <img src={crypto_summit_partner}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://plus-forum.com" class="partner_item">
                                    <img src={plus_forum_partner}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://blockchain-life.com/europe/ru/" class="partner_item">
                                    <img src={blockchain_life_partner}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://rbw.moscow/?utm_source=infopartner&utm_medium=cryptoemergency&utm_campaign=pressreliz" class="partner_item">
                                    <img src={b4_week_partner}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://ru.beincrypto.com" class="partner_item">
                                    <img src={be_in_crypto_partner}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://mining-cryptocurrency.ru" class="partner_item">
                                    <img src={crypto_mining_partner}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://cryptomania.moscow" class="partner_item">
                                    <img src={cryptomania_partner}/>
                                </a>
                                <a target="_blank" rel="nofollow nooopener" href="https://techweek.moscow" class="partner_item">
                                    <img src={tech_week_partner}/>
                                </a>
                            </div>  
                            <a href="{{lang.url}}partners/" class="btn-view-all-a" data-action="link">
                                <div class="btn-view-all more_partners">
                                    <div>{lang.button.allPartners}</div>
                                </div>
                            </a>
                        </div>
                    </div> 
                </div>
            </div>
        </div> */}
        </div>
    )

}






const ID = "mainBlock"

const init = async function (reload) {
    if (!reload) {
        if (!getValue(ID, "mainCourse")) {
            const course = await sendApi.getCourse()
            setValue(ID, "mainCourse", course.result.list_records[0])
        }
        timersStart("Course", timerCourse, 10000)
    }
    setValue("mainHeader", "show", true);
    setValue("mainFooter", "show", true);

    
    makeDOM(mainView(), ID);
    swiperload();
}

export default init