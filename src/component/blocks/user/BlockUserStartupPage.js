import {
    jsx,
    jsxFrag,
    Variable,
    initReload,
    initOne,
    sendApi
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';
import { MediaButton } from '@component/element/index.js';
import images from "@assets/images/index.js";




function addSocialNetworkDiv(elem)
{


elem.insertAdjacentHTML('afterend', '<div style="background:none" class="startup_page_table_row settings_list_item_active"><div>Add social network:</div><p class="settings_list_title" onClick="this.closest(\'div\').remove()"></p><div contenteditable="true" style="margin-top:5px;" data-placeholder="enter social network" class="pl"></div></div>');

}

const BlockUserStartupPage = function ({Static})
    {
     
     
        if (!Static && (Static.settingsPage != "startUP" || Static.settingsPage != "createstartUP" || Static.settingsPage != "editstartUP")) {
            return (<></>)
        }


        initOne(
            () => {
           
            }
        )
     
        return(
            <div class="settings_body_item">
            <div class="settings_body_item_chapter">
         {   <div class="startup_page_container">
    <div class="startup_page">
        <div class="startup_page_block-1">
            <div class="startup_page_preview">
                <img style="border:1px solid #9844b7;border-radius: 10px" height="200px" width="400px" src={images["banners/ecosystem"]}/>
               
               <MediaButton
                onclickPhoto={function () {
                  if (this.files.length == 0) {
                    return;
                  }

                  Variable.SetModals({
                    name: "ModalCropImage",
                    data: {
                      file: this.files[0],
                      typeUpload: 'answers',
                      arrMedia: formInputs.mediaInputs.value,
                      aspectSelect: formInputs.mediaInputs.selectAspect,
                      uploadCropImage: async function (cropper) {
                        await sendPhoto(cropper)
                        return;
                      }
                    },
                  }, true);
                  this.value = '';
                }}

              />
              <br />
               <div class="startup_page_table_row">
                     <div>
                      Website:
                     </div>
                     <div contenteditable="true" data-placeholder="enter website" class="pl">
                     </div>
                </div>
                
                <div class="startup_page_table_row">
                     <div>
                      Add social network:
                     </div>
                  
                     <p class="settings_list_title" onClick={function(){addSocialNetworkDiv(Static.social)}}></p>
                    
                     <div contenteditable="true" style="margin-top:5px;" data-placeholder="enter social network" class="pl">
                     </div>
            
                </div>
                <div Element={($el) => {Static.social = $el}} class="social">
                    
                </div>
                {<div class="startup_page_contacts">
                    <a href="" class="startup_page_contact_container">
                        <div class="startup_page_contact_icon">
                            <img src="/assets/img/web_icon.svg" />
                        </div>
                        <p class="startup_page_contact_name">1{}</p>
                    </a>
                     <a href="" class="startup_page_contact_container">
                        <div class="startup_page_contact_icon">
                            <img src="/assets/img/web_icon.svg" />
                        </div>
                        <p class="startup_page_contact_name">2{}</p>
                    </a>
                     <a href="" class="startup_page_contact_container">
                        <div class="startup_page_contact_icon">
                            <img src="/assets/img/web_icon.svg" />
                        </div>
                        <p class="startup_page_contact_name">3{}</p>
                    </a>
                     <a href="" class="startup_page_contact_container">
                        <div class="startup_page_contact_icon">
                            <img src="/assets/img/web_icon.svg" />
                        </div>
                        <p class="startup_page_contact_name">4{}</p>
                    </a>
                </div>}
                <p class="startup_page_short_description">
                Короткое описание:
                
                </p>
               
                <div style="width:400px" contenteditable="true" data-placeholder="enter text" class="pl">
            
                  
               
                </div>
            </div>
            <div class="startup_page_table">
                <label>Название</label>
                <div contenteditable="true" data-placeholder="enter text" class="pl startup_page_startup_title"></div>
                <div class="startup_page_table_title">Key indicators</div>
                <div class="startup_page_table_row">
                     <div>
                       Ticker:
                     </div>
                     <div contenteditable="true" data-placeholder="enter text" class="pl">
                     
                     </div>
                </div>
                <div class="startup_page_table_row">
                     <div>
                      Blockchain Network:
                     </div>
                     <div contenteditable="true" data-placeholder="enter text" class="pl">
                      
                     </div>
                </div>
                <div class="startup_page_table_row">
                     <div>
                     Total tokens issued:
                     </div>
                     <div contenteditable="true" data-placeholder="enter text" class="pl">
                     
                     </div>
                </div>
                <div class="startup_page_table_row">
                     <div>
                      Initial evaluation of the project
                     </div>
                     <div contenteditable="true" data-placeholder="enter text" class="pl">
                     
                     </div>
                </div>
                <div class="startup_page_table_row">
                     <div>
                      Initial market Capitalization
                     </div>
                     <div contenteditable="true" data-placeholder="enter text" class="pl">
                    
                     </div>
                </div>
                <div class="startup_page_table_row">
                     <div>
                      IDO sale
                     </div>
                     <div contenteditable="true" data-placeholder="enter text" class="pl">
                   
                     </div>
                </div>
                <div class="startup_page_table_row">
                     <div>
                     Price
                     </div>
                     <div contenteditable="true" data-placeholder="enter text" class="pl">
                    
                     </div>
                </div>
                <div class="startup_page_table_row">
                     <div>
                     Allocation
                     </div>
                     <div contenteditable="true" data-placeholder="enter text" class="pl">
                   
                     </div>
                </div>
            </div>
        </div>
        <div class="startup_page_block-2">
            <img src="/assets/img/startup_vector.svg" />
            <p class="project_overview_title">PROJECT OVERVIEW: <br /> WHAT IS Muon Network?</p>
            <p class="project_overview_text">
                Empowering the metaverse economy.
            </p>
            <p class="project_overview_text">
                Decentralized cloud computing, cross-chain bridge interfacing and
                secure oracles for gaming, DeFi and dApps.
            </p>
            <p class="project_overview_text">
                Muon\'s decentralized autonomous nodes operate like a VPS (virtual private server) and can therefore run anything you could run on a Linux server.

                This structure opens up Muon dApps to a much broader range of functions, bridging different blockchains, oracles, and off-chain data, rather than being limited to a single chain.
            </p>
            <p class="project_overview_text">
                Muon natively connects all applications on all chains with the off-chain world. Muon fills the gaps between different networks through a sonar-like system of decentralized autonomous nodes, which can speak and understand any language.

                Muon nodes communicate, read and transmit data to any chain quickly, efficiently, and securely. Building oracles, bridges, or off-chain workers has never been as simple, decentralized, and secure as it is with Muon.
            </p>
            <p class="project_overview_list_item">
                <span></span> GameFi Decentralized computation, storage, and hosting, and a proprietary oracle for play-to-earn economies.
            </p>
            <p class="project_overview_list_item">
               <span></span>  DeFi Decentralized cloud services and white label liquidity bootstrappers including farms, bridges, and staking, along the first 10 ms frequency oracle.
            </p>
            <p class="project_overview_list_item">
                <span></span> dApps Putting the decentralized in dApps: remove centralized points of cloud failures, node networks, and data security.
            </p>
            <p class="project_overview_list_item">
                <span></span> 
            </p>
        </div>
        <div class="startup_page_block-3">
            <div class="road_map">
                <h2>Road map</h2>
                <div class="road_map_container">
                    <div class="road_map_top_dates">
                        <div class="road_map_date-1">
                            <p>October 2021</p>
                            <div></div>
                            <span>Litepaper Release
                            All you need to know to get muonized</span>
                        </div>
                        <div class="road_map_date-2">
                            <p>November 2021</p>
                            <div></div>
                            <span>Muon V3 Update
                            Another big leap forwards on the path to decentralization</span>
                        </div>
                        <div class="road_map_date-3">
                            <p>Q1 2022</p>
                            <div></div>
                            <span>DAOmaker SHO (IDO)
                            IDO for the vetted and lucky participants of our partner\'s IDO: the DAOmaker SHO</span>
                        </div>
                    </div>
                    <img src="/assets/img/road_map.png" />
                    <div class="road_map_bottom_dates">
                        <div class="road_map_date-4">
                            <p>Q1 2022 - Suon ;)</p>
                            <div></div>
                            <span>$MUON Launch
                            The wait will be over, you\'ll be able to fill your hearts (and wallets) with $MUON</span>
                        </div>
                        <div class="road_map_date-5">
                        <p>Q1 2022</p>
                            <div></div>
                            <span>Exchange listing
                            Muon CEX Listing, for people uncomfortable with trading on DEXs and owning their own tokens</span>  
                        </div>
                        <div class="road_map_date-6">
                            <p>Q1 2022</p>
                            <div></div>
                            <span>More Chain Launches
                            Seamlessly connecting (muonizing) all the different blockchains is the next important step in the decentralization</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h2>Promo video</h2>
        <div class="startup_page_block-4">
            <iframe id="startupVideoPlayer" width="100%" height="585px" src="https://www.youtube.com/embed/ANjAvbRkTes" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="startup_page_block-5">
            <h2>Tokenomics</h2>
            <div class="startup_charts_block">
                <div class="startup_first_chart_block">
                    <div class="startup_gradient_border">
                        <div class="startup_chart_container">
                            <p>Fund distribution <img src="/assets/img/alert_icon.svg" /></p>
                            <div class="startup_chart_block">
                                <div id="startupChartContainer">
                                    <canvas id="startupChart">

                                    </canvas>
                                </div>
                                <div id="startup_chart_info">
                                    <div class="startup_chart_info_color" style="background: rgb(86, 156, 255);"></div><p><b>120</b><br /> million Tokens</p><br />
                                    <div class="startup_chart_info_color" style="background: rgb(239, 56, 255);"></div><p><b>-</b><br /> Token sale</p><br />
                                    <div class="startup_chart_info_color" style="background: rgb(244, 174, 69);"></div><p><b>$2,940,000</b><br /> Soft Cap</p><br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="startup_gradient_border">
                    <div class="startup_chart_container">
                        <p>Token distribution <img src="/assets/img/alert_icon.svg" /></p>
                        <div class="startup_chart_wrapper">
                            <div class="startup_chart_inner">
                                <div style="left: 0%;" class="startup_chart_percent">
                                    0%
                                </div>
                                <div style="left: 10%;" class="startup_chart_percent">
                                    10%
                                </div>
                                <div style="left: 40%;" class="startup_chart_percent">
                                    40%
                                </div>
                                <div style="left: 75%;" class="startup_chart_percent">
                                    75%
                                </div>
                                <div style="left: 100%;" class="startup_chart_percent">
                                    100%
                                </div>
                            </div>
                        </div>
                        <div class="startup_chart_inner_chart">
                            <div style="left: 0%;" class="startup_chart_line"> </div>
                            <div style="left: 10%;" class="startup_chart_line"> </div>
                            <div style="left: 40%;" class="startup_chart_line"> </div>
                            <div style="left: 75%;" class="startup_chart_line"> </div>
                            <div style="left: 100%;" class="startup_chart_line"> </div>
                            <div style="background: #B558F6;" class="startup_chart_item">
                                <div class="startup_chart_item_percent" data-title="Marketing">5%</div>
                            </div>
                            <div style="background: #29CB97;" class="startup_chart_item">
                                <div class="startup_chart_item_percent" data-title="Ecosystem Incentives">30%</div>
                            </div>
                            <div style="background: #DADADA;" class="startup_chart_item">
                                <div class="startup_chart_item_percent" data-title="Seed Round">10%</div>
                            </div>
                            <div style="background: #F4AE45;" class="startup_chart_item">
                                <div class="startup_chart_item_percent" data-title="Private Sale">15%</div>
                            </div>
                            <div style="background: #EF38FF;" class="startup_chart_item">
                                <div class="startup_chart_item_percent" data-title="Initial Liquidity and Liquidity Incentives">15%</div>
                            </div>
                            <div style="background: #4072EE;" class="startup_chart_item">
                                <div class="startup_chart_item_percent" data-title="Team & Development">19%</div>
                            </div> 
                            <div style="background: #e62f2f;" class="startup_chart_item">
                                <div class="startup_chart_item_percent" data-title="Partner & Advisors">6%</div>
                            </div> 
                        </div>
                        <div class="startup_chart_inner_chart_legend">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="our_team">
            <h2>Our team</h2>
            <div class="our_team_block">
                <div class="our_team_item">
                    <img src="/assets/img/Reza.jpg" />
                    <p>Reza</p>
                    <span>Co-Founder / Chief Engineer</span>
                </div>
                <div class="our_team_item">
                    <img src="/assets/img/Lafayette Tabor.jpg" />
                    <p>Lafayette Tabor</p>
                    <span>Co-Founder / Visioneer</span>
                </div>
                <div class="our_team_item">
                    <img src="/assets/img/Paslar.jpg" />
                    <p>Paslar</p>
                    <span>Co-Founder / Head of Developer Relations</span>
                </div>
                <div class="our_team_item">
                    <img src="/assets/img/Amin Abbasi.jpg" />
                    <p>Amin Abbasi</p>
                    <span>Software Engineer</span>
                </div>
                <div class="our_team_item">
                    <img src="/assets/img/Zahra Namazi.jpg" />
                    <p>Zahra Namazi</p>
                    <span>Full Stack Developer</span>
                </div>
            </div>
            <div class="our_team_watch_all_container">
                <div class="our_team_watch_all">
                   <span> Watch all </span>
                </div>
            </div>
        </div>
    </div>
</div>}

                </div>
                </div>
        )
    }
export { BlockUserStartupPage }

