import {
  jsx,
  jsxFrag,
  load
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';


const tokenomica = [
  {
    name: 'Project',
    value: 25,
  },
  {
    name: 'Pre-sale',
    value: 15,
  },
  {
    name: 'Marketing',
    value: 10,
  },
  {
    name: 'Redemption',
    value: 17,
  },
  {
    name: 'Seed Investment',
    value: 3,
  },
  {
    name: 'Founders and Team',
    value: 30,
  }
]


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


const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return (
        <div class="startap c-main__body">
          <div class="startap-inner">


            <div class="tokenomics">
              <h2 class="startap-title">Tokenokmica</h2>

              <div class="diagramm">
                <div class="diagramm-circle">
                  <svg class="diagramm-circle_wrap" viewBox="0 0 35 35">
                    {() => {
                      let offset = 0
                      return tokenomica.map((item, index) => {
                        offset += item.value
                        return (
                          <circle
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
                      return tokenomica.map((item, index) => {
                        return (
                          <div
                            class={["circle-points_item", `circle-points_item--${index}`]}>
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
                    {showLines(tokenomica)}
                  </div>

                  <div class="line-points">
                    {showPoints(tokenomica)}
                  </div>

                </div>
              </div>

            </div>



          </div>
        </div>
      )
    }
  })
};

export default start;