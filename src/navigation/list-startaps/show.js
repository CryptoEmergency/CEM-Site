import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Variable
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';


const showLines = function (listLines) {
  return listLines.map((item, index) => {
    return (
      <div class="progressBlock">
        <div class={["progressBlock-column", `progressBlock-column--${index}`]} style={[`width: calc(100% / 100 * ${item.value})`]}></div>
        <span>{item.value}%</span>
      </div>
    )
  })
}

const showPoints = function (listPoints) {
  return listPoints.map((item, index) => {
    return (
      <div class="line-point_item">
        <div class={["line-point_circle", `line-point_circle--${index}`]}></div>
        <span class="line-point_name">{item.name}</span>
        <span class="line-point_procent">{item.value}%</span>
      </div>
    )
  })
}

const showTeam = function (listTeam) {
  return listTeam.map((item) => {
    return (
      <div class="team-item swiper-slide">
        <div class="team-img">
          <img src={`/assets/upload/worldPress/${item.foto}`}></img>
        </div>
        <h5>{item.name}</h5>
        <span>{item.position}</span>
      </div>
    )
  })
}

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })
  Variable.Static.FooterShow = false
  const swiperGo = function (index) {
    let swiperItem = new Swiper(".mySwiper", {
      // grid: {
      //   rows: 2,
      // },
      spaceBetween: 30,
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      breakpoints: {
        100: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        620: {  //600
          slidesPerView: 2,
          spaceBetween: 10
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 50
        },
        910: {  //800
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1240: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
      spaceBetween: 20
    })
  }

  load({
    ID,
    fnLoad: async () => {
      if (!Static.item) {
        Static.item = await fn.socket.get({
          method: "Startups",
          params: {
            filter: { _id: Variable.dataUrl.params },
            firstRecord: true
          }
        })
      }
      // console.log("Static.item", Static.item)
    },
    fn: () => {
      return (
        <div class="startap c-main__body">
          <div class="startap-inner">
            <div class="crypto appearience">
              <div class="social">
                <div class="social-img">
                  {
                    Static.item.cover
                      ?
                      <img src={`/assets/upload/worldPress/${Static.item.cover}`}></img>
                      :
                      Static.item.coverVideo
                        ?
                        <iframe class="social-video" id="startupVideoPlayer" width="100%" height="400px" src={Static.item.coverVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        :
                        null
                  }
                </div>
                {
                  Static.item.social.length
                    ?
                    <div class="startap-social_icons">
                      {
                        Static.item.social.map((item) => {
                          return (
                            <a href={item.url} class="icons-item">
                              <div class="icons-img">
                                <img src={svg[`${item.channel}-icon`]}></img>
                              </div>
                              {/* <span class="icons-text">{item.channel}</span> */}
                            </a>
                          )
                        })
                      }
                    </div>
                    :
                    null
                }
                <p class="social-desc">{Static.item.descriptionShort}</p>

                <div class="social-btns">
                  <a href={Static.item.whitePaperLink} target="_blank" class={["btn-item", !Static.item.whitePaperLink ? "social-btn_passive" : null]}>
                    <div class="btn-item_text">WhitePaper</div>
                  </a>

                  <a href={Static.item.siteLink} target="_blank" class={["btn-item", !Static.item.siteLink ? "social-btn_passive" : null]}>
                    <div class="btn-item_text">WebSite</div>
                  </a>
                </div>
              </div>

              <div class="info">
                <h2>{Static.item.title}</h2>
                <p class="info-desc">{fn.editText(Static.item.description, { clear: true, paragraph: true, html: true })}</p>
              </div>
            </div>
            <img class="startap-img" src={svg['startaps-inner/figure']} alt={Static.item.name}></img>

            <div class="roadmap appearience">
              {Static.item.roadMap.length ? <h2 class="startap-title">{Variable.lang.h.road_map}</h2> : null}



              <div class="roadmap-inner">
                {
                  Static.item.roadMap.length ?
                    Static.item.roadMap.map((item) => {
                      return (
                        <div class="roadmap-item">
                          <div class="roadmap-item_year fiolet">{item.year}</div>
                          <p class="roadmap-item_text">{item.description}</p>
                        </div>
                      )
                    })
                    : null
                }
              </div>
            </div>

            <div class="promovideo">
              {Static.item.coverVideo ? <h2 class="startap-title">{Variable.lang.h.promo_video}</h2> : null}
              {Static.item.coverVideo
                ?
                <iframe class="promovideo-video" id="startupVideoPlayer" width="100%" height="500px" src={Static.item.coverVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                :
                null
              }
            </div>

            <div class="tokenomics">
              {Static.item.tokenomica.length ? <h2 class="startap-title">{Variable.lang.h.tokenomica}</h2> : null}
              {Static.item.tokenomica.length
                ?
                <div class="diagramm">
                  <div class="diagramm-circle">
                    <svg class="diagramm-circle_wrap" viewBox="0 0 35 35">
                      {() => {
                        let offset = 0
                        return Static.item.tokenomica.map((item, index) => {
                          offset += item.value
                          return (
                            <circle
                              onmouseover={
                                function (event) {

                                }
                              }
                              fill="transparent"
                              cx="50%"
                              cy="50%"
                              r="15.9"
                              stroke-width="2"
                              stroke-dasharray={`${item.value} 100`}
                              stroke-dashoffset={`-${offset - item.value}`}
                              class={["progress-circle", `progress-circle--${index}`]}
                            ></circle>
                          )
                        })
                      }}
                    </svg>
                    <div class="circle-points">
                      {() => {
                        return Static.item.tokenomica.map((item, index) => {
                          return (
                            <div class="circle-points_item">
                              <div class={["circle-line", `progressBlock-column--${index}`]}></div>
                              <div class="circle-desc">
                                <span class="circle-desc_bold">{item.value}%</span>
                                <span>{item.name}</span>
                              </div>
                            </div>
                          )
                        })
                      }}
                    </div>
                  </div>
                  <div class="diagramm-line">
                    <div>
                      {showLines(Static.item.tokenomica)}
                    </div>

                    <div class="line-points">
                      {showPoints(Static.item.tokenomica)}
                    </div>

                  </div>
                </div>
                :
                null
              }
            </div>

            <div class="team">
              {Static.item.team.length ? <h2 class="startap-title">{Variable.lang.h.our_team}</h2> : null}
              <div class="swiper mySwiper" After={() => swiperGo()}>
                <div class="swiper-wrapper">
                  {showTeam(Static.item.team)}
                </div>
                <div class="swiper-pagination"></div>
              </div>
            </div>

            <div class="gallery">
              {Static.item.media.length ? <h2 class="startap-title">{Variable.lang.h.galary}</h2> : null}
              {
                Static.item.media.length
                  ?
                  <div class="gallery-wrap media-wrap">
                    {
                      Static.item.media.map((item) => {
                        return (
                          <div class="gallery-item media-item">
                            <div class="media-img">
                              <img
                                src={`/assets/upload/worldPress/${item.name}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  fn.modals.ModalViewPhoto({
                                    path: item.name,
                                  });
                                }}
                              ></img>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  :
                  null
              }
            </div>

          </div>
        </div>
      )
    }
  })
}
export default start;