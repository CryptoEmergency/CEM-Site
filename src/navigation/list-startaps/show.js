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

const showLines = function (listLines) {
  return listLines.map((item) => {
    return (
      <div class="progressBlock">
        <div class="progressBlock-column" style={[`width: calc(100% / 100 * ${item.value})`]}></div>
        <span>{item.value}%</span>
      </div>
    )
  })
}

const showPoints = function (listPoints) {
  return listPoints.map((item) => {
    return (
      <div class="line-point_item">
        <div class="line-point_circle"></div>
        <span>{item.name}</span>
        <span class="line-point_procent">{item.value}%</span>
      </div>
    )
  })
}

const showTeam = function (listTeam) {
  return listTeam.map((item) => {
    return (
      <div class="team-item">
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

  load({
    ID,
    fnLoad: async () => {
      if (!Static.item) {
        Static.item = await fn.restApi.getStartaps({ filter: { _id: Variable.dataUrl.params }, firstRecord: true })
      }
      console.log("Static.item", Static.item)
    },
    fn: () => {
      return (
        <div class="startap c-main__body">
          <div class="startap-inner">
            <div class="crypto appearience">
              <div class="social">
                <div class="social-img">
                  <img src={`/assets/upload/worldPress/${Static.item.cover}`}></img>
                </div>

                {
                  Static.item.social.length
                    ?
                    <div class="social-icons">
                      {
                        Static.item.social.map((item) => {
                          return (
                            <a href={item.url} class="icons-item">
                              <div class="icons-img">
                                <img src={svg[`${item.channel}-icon`]}></img>
                              </div>
                              <span class="icons-text">{item.channel}</span>
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

                  <a href={Static.item.whitePaperLink} class="btn-item">
                    <div class="btn-item_text">White paper</div>
                  </a>

                  <a href={Static.item.siteLink} class="btn-item">
                    <div class="btn-item_text">Web site</div>
                  </a>

                </div>

              </div>

              <div class="info">
                <p class="info-desc">{Static.item.description}</p>
              </div>
            </div>

            <img class="startap-img" src={svg['startaps-inner/figure']}></img>



            <div class="roadmap appearience">
              <h2 class="startap-title">Road Map</h2>
              <div class="roadmap-inner">
                <div class="roadmap-item">
                  <div class="roadmap-item_year fiolet"><span>2</span>022</div>
                  <p class="roadmap-item_text">All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-item_year orange"><span>2</span>023</div>
                  <p class="roadmap-item_text">All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-item_year blue"><span>2</span>024</div>
                  <p class="roadmap-item_text">All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-item_year red"><span>2</span>025</div>
                  <p class="roadmap-item_text">All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-item_year mint"><span>2</span>026</div>
                  <p class="roadmap-item_text">All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
                <div class="roadmap-item">
                  <div class="roadmap-item_year lightBlue"><span>2</span>026</div>
                  <p class="roadmap-item_text">All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
              </div>
            </div>

            <div class="tokenomics">
              <h2 class="startap-title">Tokenomics</h2>


              <div class="diagramm">
                <div class="diagramm-circle">
                  <p>Hello World!</p>
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

            </div>

            <div class="team">
              {Static.item.team.length ? <h2 class="startap-title">Our team</h2> : null}

              <div class="team-wrap">
                {showTeam(Static.item.team)}
              </div>

              {
                Static.item.team.length ?
                  <button class="btn-item team-btn">
                    <div>Показать ещё</div>
                  </button>
                  : null
              }

            </div>

            <div class="gallery">
              {Static.item.media.length ? <h2 class="startap-title">Gallery</h2> : null}
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