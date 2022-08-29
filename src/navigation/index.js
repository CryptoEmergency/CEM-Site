import {jsx,jsxFrag,getVariable,getStorage,setAction,setVariable, makeDOM} from '@betarost/cemjs'
import {init as mainHeader} from '@navigation/header/index.js'
import {init as mainFooter} from '@navigation/footer/index.js'
import lines from '@assets/image/background/lines-preview-min.png'
import cem from '@assets/image/background/cem.png'
import bitcoin_icon from '@assets/icon/Bitcoin.svg'
import bnb_icon from '@assets/icon/bnb.svg'
import eth_icon from '@assets/icon/eth.svg'
import cem_icon from '@assets/icon/cem.jpg'
import up_arrow from '@assets/icon/up_arrow.svg'
import shuffle from '@assets/icon/shuffle 1.svg'
import mortarboard from '@assets/icon/mortarboard 1.svg'
import graph from '@assets/icon/graph 1.svg'
import startup from '@assets/icon/startup 1.svg'
import meta_universes from '@assets/icon/meta_universes.svg'
import star from '@assets/icon/star 1.svg'
import stock from '@assets/icon/stock-market 1.svg'
import world from '@assets/icon/world-news 1.svg'
import user from '@assets/icon/user 1.svg'
import nft_icon from '@assets/icon/nft_icon.svg'
import careers_icon from '@assets/icon/careers_icon.svg'
import swiper_arrow_left from '@assets/icon/swiper_arrow_left.svg'
import swiper_arrow_right from '@assets/icon/swiper_arrow_right.svg'
import search_icon from '@assets/icon/search_icon.svg'
import filter from '@assets/icon/filter.svg'
import frame_default from '@assets/profile/frame/default.svg'
import question_audio from '@assets/icon/question_audio.svg'
import question_video from '@assets/icon/question_video.svg'
import question_photo from '@assets/icon/question_photo.svg'
import levelGray from '@assets/profile/levelGray.svg'
import question_answers from '@assets/icon/question_answers.svg'
import question_views from '@assets/icon/question_views.svg'
import question_time from '@assets/icon/question_time.svg'
import lbf_banner from '@assets/image/banners/lbf_banner.jpg'
import blockchain24 from '@assets/image/banners/blockchain24.png'
import crypto_summit from '@assets/image/banners/crypto_summit.jpg'
import plus_forum from '@assets/image/banners/1200х580-(fb).png'
import blockchain_life from '@assets/image/banners/blockchain_life.jpg'
import crypto_future_banner from '@assets/image/banners/crypto_future_banner.png'
import sber_unity_partner from '@assets/image/partners/sber_unity.png'
import skolkovo_partner from '@assets/image/partners/skolkovo.png'
import crypto_summit_partner from '@assets/image/partners/crypto_summit.png'
import plus_forum_partner from '@assets/image/partners/plus_forum.png'
import blockchain_life_partner from '@assets/image/partners/blockchain_life.png'
import b4_week_partner from '@assets/image/partners/b4_week.png'
import be_in_crypto_partner from '@assets/image/partners/be_in_crypto.png'
import crypto_mining_partner from '@assets/image/partners/crypto_mining.png'
import cryptomania_partner from '@assets/image/partners/cryptomania.png'
import tech_week_partner from '@assets/image/partners/tech_week.png'




const mainBlock = function(){  
  const lang = getVariable("languages")[getStorage("lang")]
  return(
    <div>
        <div class="preview">
            <img class="lines" src={lines}/>
            <div class="title-preview">
                <img class="cem-img" src={cem}/>
                    <div class="title-text-preview">
                        {lang.homePreview.platformFuture}<br/>
                        {lang.homePreview.unitePeople}
                    </div>
            </div>
            <div class="main_site_parts">
                <a href="/lenta-users/" class="main_site_part" data-action="link"> 
                    <span>{lang.span.userNews}</span>
                </a>
                <a href="/chats/" class="main_site_part" data-action="link" data-updating="true"> 
                    <span>{lang.span.chats}</span>
                </a>
                <a href="/question/" class="main_site_part" data-action="link"> 
                    <span>{lang.span.QA}</span>
                </a>
                <a href="/news/" class="main_site_part" data-action="link">
                    <span>{lang.span.news}</span>
                </a>
            </div>
            <div class="items-currencies swiper">
                <div class="swiper-wrapper" data-reload="true" data-interval="10" data-action="GetCursUpdate">
                    <a href="/list-trade/" data-action="link" class="item-currency swiper-slide">
                        <div class="icon-currency">
                        <div class="icon-color-btc">
                            <img src={bitcoin_icon}/>
                        </div>
                        </div>
                        <div class="info-currency ">
                        <div class="info_left-currency">
                            <div class="name-currency">BTC/USDT</div>
                            <div class="price-currency"><span class="btcusdt_price">30 127.22</span></div>
                        </div>
                        <div class="info_rigth-currency">
                            <div class="percent-currency percent-currency_green"><img src={up_arrow}/><span class="btcusdt_change">-0.48</span></div>
                            <div class="last-update">1h.</div>
                        </div>
                        </div>
                    </a>     
                    <a href="/list-trade/" data-action="link" class="item-currency swiper-slide">
                        <div class="icon-currency">
                        <div class="icon-color-bnb">
                            <img src={bnb_icon}/>
                        </div>
                        </div>
                        <div class="info-currency ">
                        <div class="info_left-currency">
                            <div class="name-currency">BNB/USDT</div>
                            <div class="price-currency"><span class="bnbusdt_price">290.20</span></div>
                        </div>
                        <div class="info_rigth-currency">
                            <div class="percent-currency percent-currency_green"><img src={up_arrow}/><span class="bnbusdt_change">-0.03</span></div>
                            <div class="last-update">1h.</div>
                        </div>
                        </div>
                    </a>                         
                    <a href="/list-trade/" data-action="link" class="item-currency swiper-slide">
                        <div class="icon-currency">
                        <div class="icon-color-eth">
                            <img src={eth_icon}/>
                        </div>
                        </div>
                        <div class="info-currency ">
                        <div class="info_left-currency">
                            <div class="name-currency">ETH/USDT</div>
                            <div class="price-currency"><span class="ethusdt_price">1 797.16</span></div>
                        </div>
                        <div class="info_rigth-currency">
                            <div class="percent-currency percent-currency_green"><img src={up_arrow}/><span class="ethusdt_change">-0.24</span></div>
                            <div class="last-update">1h.</div>
                        </div>
                        </div>
                    </a>                        
                    <a href="/buy-cem/" data-action="link" data-updating="true" class="item-currency swiper-slide">
                        <div class="icon-currency">
                        <div class="icon-color-cem">
                            <img src={cem_icon}/>
                        </div>
                        </div>
                        <div class="info-currency ">
                        <div class="info_left-currency">
                            <div class="name-currency">CEM/USDT</div>
                            <div class="price-currency"><span class="cemusdt_price">0.1826</span></div>
                        </div>
                        <div class="info_rigth-currency">
                            <div class="percent-currency percent-currency_green"><img src={up_arrow}/><span class="cemusdt_change">0.00</span></div>
                            <div class="last-update">24h.</div>
                        </div>
                        </div>
                    </a>    
                </div>
                <div class="swiper-pagination" id="swiper-pagination-currencies"></div>
            </div>  
            <div class="static-crypto">
                <a href="/list-trade/" data-action="link" class="item-currency swiper-slide">
                    <div class="icon-currency">
                    <div class="icon-color-btc">
                        <img src={bitcoin_icon}/>
                    </div>
                    </div>
                    <div class="info-currency ">
                    <div class="info_left-currency">
                        <div class="name-currency">BTC/USDT</div>
                        <div class="price-currency"><span class="btcusdt_price">30 127.22</span></div>
                    </div>
                    <div class="info_rigth-currency">
                        <div class="percent-currency percent-currency_green"><img src={up_arrow}/><span class="btcusdt_change">-0.48 </span></div>
                        <div class="last-update">1h.</div>
                    </div>
                    </div>
                </a>     
                <a href="/list-trade/" data-action="link" class="item-currency swiper-slide">
                    <div class="icon-currency">
                    <div class="icon-color-bnb">
                        <img src={bnb_icon}/>
                    </div>
                    </div>
                    <div class="info-currency ">
                    <div class="info_left-currency">
                        <div class="name-currency">BNB/USDT</div>
                        <div class="price-currency"><span class="bnbusdt_price">290.20</span></div>
                    </div>
                    <div class="info_rigth-currency">
                        <div class="percent-currency percent-currency_green"><img src={up_arrow}/><span class="bnbusdt_change">-0.03</span></div>
                            <div class="last-update">1h.</div>
                    </div>
                    </div>
                </a>                         
                <a href="/list-trade/" data-action="link" class="item-currency swiper-slide">
                    <div class="icon-currency">
                    <div class="icon-color-eth">
                        <img src={eth_icon}/>
                    </div>
                    </div>
                    <div class="info-currency ">
                    <div class="info_left-currency">
                        <div class="name-currency">ETH/USDT</div>
                        <div class="price-currency"><span class="ethusdt_price">1 797.16</span></div>
                    </div>
                    <div class="info_rigth-currency">
                        <div class="percent-currency percent-currency_green"><img src={up_arrow}/><span class="ethusdt_change">-0.24</span></div>
                            <div class="last-update">1h.</div>
                    </div>
                    </div>
                </a>                        
                <a href="/buy-cem/" data-action="link" data-updating="true" class="item-currency swiper-slide">
                    <div class="icon-currency">
                    <div class="icon-color-cem">
                        <img src={cem_icon}/>
                    </div>
                    </div>
                    <div class="info-currency ">
                    <div class="info_left-currency">
                        <div class="name-currency">CEM/USDT</div>
                        <div class="price-currency"><span class="cemusdt_price">0.1826</span></div>
                    </div>
                    <div class="info_rigth-currency">
                        <div class="percent-currency percent-currency_green"><img src={up_arrow}/><span class="cemusdt_change">0.00</span></div>
                        <div class="last-update">24h.</div>
                    </div>
                    </div>
                </a>    
            </div>  
        </div>
        <div class="index-content">
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
                            <img data-sort="DESC" class="filter_sort_toggler" data-action="toggleFilterSort" src="/assets/icon/filter_arrow_bottom.svg"/>
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
                                                <img src="/assets/icon/exange_money.svg"/>
                                            </span> 
                                            1
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src="/assets/icon/exange_visitors.svg"/>
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
                                                <img src="/assets/icon/exange_money.svg"/>
                                            </span> 
                                            1
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src="/assets/icon/exange_visitors.svg"/>
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
                                                <img src="/assets/icon/exange_money.svg"/>
                                            </span> 
                                            1
                                        </span>
                                    </div>
                                </div>
                                <div class="crypto_exchanges-cell">
                                    <div>
                                        <span class="crypto_exchanges_percent_green load" style="margin-right: 50px;">
                                            <span class="crypto_exchanges_percent_green_mobile">
                                                <img src="/assets/icon/exange_visitors.svg"/>
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
                                                <img class="crypto_exchanges_rate" src="/assets/icon/rate_icon.svg"/>
                                            </div>
                                        </div> 
                                    </div> 
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <div class="crypto_coin_container load">
                                                <img  class="crypto_coin_icons" src="/assets/icon/coins/{{ icon }}.svg"/>        
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
                                                <img class="crypto_exchanges_rate" src="/assets/icon/rate_icon.svg"/>
                                            </div>
                                        </div> 
                                    </div> 
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <div class="crypto_coin_container load">
                                                <img  class="crypto_coin_icons" src="/assets/icon/coins/{{ icon }}.svg"/>        
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
                                                <img class="crypto_exchanges_rate" src="/assets/icon/rate_icon.svg"/>
                                            </div>
                                        </div> 
                                    </div> 
                                    <div class="crypto_exchanges-cell">
                                        <div>
                                            <div class="crypto_coin_container load">
                                                <img  class="crypto_coin_icons" src="/assets/icon/coins/{{ icon }}.svg"/>        
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
                                            <img style="display: none;" class="refresh_language" data-action="refreshLanguage" src="/assets/icon/refresh_filter.svg"/>
                                        </div>
                                        <div class="filter_block_container">
                                            <div data-country="all" data-country_code="all" class="friends_filter_country" data-action="friendsCountryFilter" data-name="{{lang.text.country}}">
                                                {lang.text.country}
                                            </div>
                                            <img style="display: none;" class="refresh_country" data-action="refreshCountry" src="/assets/icon/refresh_filter.svg"/>
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
        </div>
        </div>
  )

}

const forExport = function(dataUrl){
    console.log(dataUrl);
    mainHeader(dataUrl);
    mainBlock();
    cemJS.makeDOM(mainBlock(),ID)
}




const ID = "mainBlock"
setVariable({header:true});
setVariable({footer:true});

const befor = function(dataUrl){
   mainHeader(dataUrl);
   mainFooter(dataUrl);
}
const start = function(dataUrl){
makeDOM(mainBlock(),ID)
}
const after = function(dataUrl){}

setAction(ID,"befor",befor)
setAction(ID,"start",start)
setAction(ID,"after",after)

const init = function(dataUrl){
    befor(dataUrl)
    start(dataUrl)
    after(dataUrl)
}

export default init