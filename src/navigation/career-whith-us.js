import {
    jsx,
    jsxFrag,
    getVariable,
    makeDOM,
    getStorage,
    setValue
  } from "@betarost/cemjs";
  import svg from "@assets/svg/index.js";
  import images from "@assets/images/index.js";
  
  
  const careerWhithUsView = function () {
    const lang = getVariable("languages")[getStorage("lang")];
    
    return (
        <div class="jobs_container">
    <div class="jobs_page">
        <div class="jobs_preview">
            <div class="blue_blur"></div>
            <div class="jobs_preview_text">
                <h3>{lang.h.career_with_us}</h3>
                <p>{lang.p.connectTeam}</p>
                <div class="button-container-preview">
                    <a class="btn-news-preview" href="">
                        <span>
                            {lang.button.our_vacancies}
                        </span>
                    </a>
                </div>
            </div>
            <div class="jobs_preview_image">
                <img src={images["background/jobs_preview"]} />
            </div>
        </div>
    
        <div class="jobs_advantages">
            <h2>{lang.h.advantages}</h2>
            <div class="jobs_advantages_list">
                <div class="jobs_advantages_item">
                    <div class="jobs_advantages_item_img">
                        <img  src={svg["advantages_icon-1"]}/>
                    </div>
                    <h5>{lang.p.friendlyTeam}</h5>
                    <p>{lang.p.friendlyTeamDesc}</p>
                </div>
                <div class="jobs_advantages_item">
                    <div class="jobs_advantages_item_img">
                        <img src={svg["advantages_icon-2"]}/>
                    </div>
                    <h5>{lang.p.IntCcompany}</h5>
                    <p>{lang.p.IntCcompanyDesc}</p>
                </div>
                <div class="jobs_advantages_item">
                    <div class="jobs_advantages_item_img">
                        <img src={svg["advantages_icon-3"]}/>
                    </div>
                    <h5>{lang.p.comfortWorking}</h5>
                    <p>{lang.p.comfortWorkingDesc}</p>
                </div>
                <div class="jobs_advantages_item">
                    <div class="jobs_advantages_item_img">
                        <img src={svg["advantages_icon-4"]}/>
                    </div>
                    <h5>{lang.p.employmentStandart}</h5>
                    <p>{lang.p.employmentStandartDesc}</p>
                </div>
            </div>
        </div>
        <div class="jobs_profession">
            <h2>{lang.h.profession}</h2>
            <div class="jobs_profession_list">
                <a href="" class="jobs_profession_item">
                    <div class="jobs_profession_item_inner">
                        <img src={svg["profession_icon-1"]}/><span>{lang.p.professionOne}</span>
                    </div>
                </a>
                <a href="" class="jobs_profession_item">
                    <div class="jobs_profession_item_inner">
                        <img src={svg["profession_icon-2"]}/><span>{lang.p.professionTwo}</span>
                    </div>
                </a>
                <a href="" class="jobs_profession_item">
                    <div class="jobs_profession_item_inner">
                        <img src={svg["profession_icon-3"]}/><span>{lang.p.professionThree}</span>
                    </div>
                </a>
                <a href="" class="jobs_profession_item">
                    <div class="jobs_profession_item_inner">
                        <img src={svg["profession_icon-4"]}/><span>{lang.p.professionFour}</span>
                    </div>
                </a>
                <a href="" class="jobs_profession_item">
                    <div class="jobs_profession_item_inner">
                        <img src={svg["profession_icon-5"]}/><span>{lang.p.professionFive}</span>
                    </div>
                </a>
                <a href="" class="jobs_profession_item">
                    <div class="jobs_profession_item_inner">
                        <img src={svg["profession_icon-6"]}/><span>{lang.p.professionSix}</span>
                    </div>
                </a>
                <a href="" class="jobs_profession_item">
                    <div class="jobs_profession_item_inner">
                        <img src={svg["profession_icon-1"]}/><span>{lang.p.professionSeven}</span>
                    </div>
                </a>
                <a href="" class="jobs_profession_item">
                    <div class="jobs_profession_item_inner">
                        <img src={svg["profession_icon-2"]}/><span>{lang.p.professionEight}</span>
                    </div>
                </a>
                <a href="" class="jobs_profession_item">
                    <div class="jobs_profession_item_inner">
                        <img src={svg["profession_icon-3"]}/><span>{lang.p.professionNine}</span>
                    </div>
                </a>
            </div>
        </div>
        <div class="jobs_how">
            <h2>{lang.h.how_get_job}</h2>
            <div class="jobs_how_list">
                <div class="jobs_how_item">
                    <div class="jobs_gradient_circle_container">
                        <div class="jobs_gradient_circle"></div><img src={svg["jobs_points_line"]}/>
                    </div>
                    <span>01</span>
                    <p>{lang.p.stepGetJobOne}</p>
                </div>
                <div class="jobs_how_item">
                    <div class="jobs_gradient_circle_container">
                        <div class="jobs_gradient_circle"></div><img src={svg["jobs_points_line"]}/>
                    </div>
                    <span>02</span>
                    <p>{lang.p.stepGetJobTwo}</p>
                </div>
                <div class="jobs_how_item">
                    <div class="jobs_gradient_circle_container">
                        <div class="jobs_gradient_circle"></div><img src={svg["jobs_points_line"]}/>
                    </div>
                    <span>03</span>
                    <p>{lang.p.stepGetJobThree}</p>
                </div>
                <div class="jobs_how_item">
                    <div class="jobs_gradient_circle_container">
                        <div class="jobs_gradient_circle"></div><img src={svg["jobs_points_line"]}/>
                    </div>
                    <span>04</span>
                    <p>{lang.p.stepGetJobFour}</p>
                </div>
            </div>
        </div>
        <div class="job_work_with_us">
            <h2>{lang.p.waitYouTeam}</h2>
        </div>      
    </div>
</div> 
    );
  };
  
  const ID = "mainBlock";
  
  const init = function (reload) {
    setValue("mainHeader", "show", true);
    setValue("mainFooter", "show", true);
    makeDOM(careerWhithUsView(), ID);
  };
  
  export default init;