import {
    jsx,
    jsxFrag,
    setVariable,
    getVariable,
    setAction,
    makeDOM,
    getStorage,
  } from "@betarost/cemjs";
  import { init as mainHeader } from "@navigation/header/index.js";
  import {init as mainFooter} from '@navigation/footer/index.js';

  import about_us_vector1 from "@assets/image/background/about_us_vector-1.svg";
  import about_us_vector2 from "@assets/image/background/about_us_vector-2.svg";

  import about_us_portfolio from "@assets/icon/about_us_portfolio.svg";
  import about_us_cryptocurrencies from "@assets/icon/about_us_cryptocurrencies.svg";
  import about_us_protection from "@assets/icon/about_us_protection.svg";
  import about_us_quality from "@assets/icon/about_us_quality.svg";


  import road_map from "@assets/image/road_map.png";
  import about_us_banner5 from "@assets/image/about_us_banner5.png";
  import about_us_banner6 from "@assets/image/about_us_banner6.png";
  import about_us_banner7 from "@assets/image/about_us_banner7.png";
  import about_us_banner8 from "@assets/image/about_us_banner8.png";

  

  const ID = "mainBlock";
  setVariable({ header: true });
  setVariable({ footer: true });


  const aboutUsView = function () {
    const lang = getVariable("languages")[getStorage("lang")];
   
    return (
      
        <div class="about_us_container">
        <div class="who_we_are">
            <div class="who_we_are_inner">
            <h2>{lang.h.who_are_we}</h2>  
            <img class="about_us_vector-1" src={about_us_vector1}/>
            {/* <p>{lang.p.preview}</p> */}
        </div>
        <div class="about_us_background_fade"></div>
        </div>
        <div class="about_us_content">
            <div class="our_goal">
                <h2>{lang.h.our_goals}</h2>
                <div class="our_goal_block">
                    <div class="our_goal_item">
                        <div class="our_goal_icon_block">
                            <img src={about_us_portfolio}/>
                        </div>
                        <div>
                            <p>{lang.p.goalOne}</p>
                            <span>{lang.p.goalOneDesc}</span>
                        </div>
                    </div>
                    <div class="our_goal_item">
                        <div class="our_goal_icon_block">
                            <img src={about_us_protection}/>
                        </div>
                        <div>
                            <p>{lang.p.goalTwo}</p>
                            <span>{lang.p.goalTwoDesc}</span>
                        </div>
                    </div>
                    <div class="our_goal_item">
                        <div class="our_goal_icon_block">
                            <img src={about_us_cryptocurrencies}/>
                        </div>
                        <div>
                            <p>{lang.p.goalThree}</p>
                            <span>{lang.p.goalThreeDesc}</span>
                        </div>
                    </div>
                    <div class="our_goal_item">
                        <div class="our_goal_icon_block">
                            <img src={about_us_quality}/>
                        </div>
                        <div>
                            <p>{lang.p.goalFour}</p>
                            <span>{lang.p.goalFourDesc}</span>
                        </div>
                    </div>
                </div>
                <img class="about_us_vector-2" src={about_us_vector2}/>
            </div>
            <div class="road_map">
                <h2>{lang.h.road_map}</h2>
                <div class="road_map_container">
                    <div class="road_map_top_dates">
                        <div class="road_map_date-1">
                            <p>{lang.p.mapDateOne}</p>
                            <div></div>
                            <span>{lang.span.mapDescOne}</span>
                        </div>
                        <div class="road_map_date-2">
                            <p>{lang.p.mapDateTwo}</p>
                            <div></div>
                            <span>{lang.span.mapDescTwo}</span>
                        </div>
                        <div class="road_map_date-3">
                             <p>{lang.p.mapDateThree}</p>
                            
                            <div></div>
                            <span>{lang.span.mapDescFour}</span>
                        </div>
                    </div>
                    <img src={road_map}/>
                    <div class="road_map_bottom_dates">
                        <div class="road_map_date-4">
                           
                            <p>{lang.p.mapDateFour}</p>
                            <div></div>
                            <span>{lang.span.mapDescThree}</span>
                            
                        </div>
                        <div class="road_map_date-5">
                            <p>{lang.p.mapDateFive}</p>
                            <div></div>
                            <span>{lang.span.mapDescFive}</span>
                        </div>
                        <div class="road_map_date-6">
                            <p>{lang.p.mapDateSix}</p>
                            <div></div>
                            <span>{lang.span.mapDescSix}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="projects">
                <h2>{lang.h.our_projects}</h2>
                <div class="projects_block">
                    <div class="projects_item">
                        <img src={about_us_banner5}/>
                        <span class="project_gradient">{lang.span.aboutProjectNameOne}</span>
                        <p>{lang.p.aboutProjectDateOne}</p>
                    </div>
                    <a target="_blank" href="https://www.crypto-vpn.online" class="projects_item">
                        <img src={about_us_banner7}/>
                        <span class="project_gradient">{lang.span.aboutProjectNameThree}</span>
                        <p>{lang.p.aboutProjectDateThree}</p>
                    </a>
                    <div class="projects_item">
                        <img src={about_us_banner6}/>
                        <span class="project_gradient">{lang.span.aboutProjectNameTwo}</span>
                        <p>{lang.p.aboutProjectDateTwo}</p>
                    </div>
                    <div class="projects_item">
                        <img src={about_us_banner8}/>
                        <span class="project_gradient">{lang.span.aboutProjectNameThree}</span>
                        <p>{lang.p.aboutProjectDateThree}</p>
                    </div>
                </div>
            
            </div>
        </div>
    </div>





    );
  };
  

  const befor = function (dataUrl) {
    mainHeader(dataUrl);
    mainFooter(dataUrl);
  };
  
  const start = function (dataUrl) {
    console.log("start aboutUs");
    makeDOM(aboutUsView(), ID);
  };
  
  const after = function (dataUrl) {};
  
  setAction(ID, "befor", befor);
  setAction(ID, "start", start);
  setAction(ID, "after", after);
  
  const init = function (dataUrl) {
    befor(dataUrl);
    start(dataUrl);
    after(dataUrl);
  };
  
  export default init;
  