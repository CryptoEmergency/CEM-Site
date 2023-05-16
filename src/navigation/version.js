import {
  jsx,
  jsxFrag,
  CEM,
  load,
  Variable,
  initReload
} from "@betarost/cemserver/cem.js";
import Elements from "@src/elements/export.js";
import { Comment, TextArea, ButtonSubmit, NotFound } from "@elements/element/index.js";

import { BlockError404 } from "@elements/blocks/index.js";

const { svg, fn } = CEM
let new2 = [5]
let new1 = [
  {
    count: 0,
    t2: 2,

  },
  {
    t1: 3,
    t2: 4,

  }
]

// import { fn } from '@src/functions/index.js';
// console.log('=f0ba6d=', CEM.fn)
const start = function (data, ID) {
  new2[2] = 155
  new1[0].t1 = 555

  new1[0].t3 = 999
  // cosole.log('=43d73f=', 'gdfgdf')
  console.log('gjhgjhgjh======11', new1[0].t1)

  console.log('gjhgjhgjh======', new2[2])

  let [count] = [5]

  let [Static] = CEM.fn.GetParams({ data, ID });
  CEM.load({
    ID,
    fnLoad: async () => {
      Static.records = await fn.socket.get({ method: "News", params: { filter: {} } });
      console.log('=88f6e6=', Static.records)


    },
    fn: () => {


      return (


        <div class="startap c-main__body">
          <button class="bbt"

            onclick={() => {
              // console.log('=d41053=', 123)

              if (count >= 1) {
                count--
                initReload()
                console.log('count = 1')
              } else {
                console.log('count = 5!!!!!!!')
                alert("Низя")

              }

              // if (count >= 1) {
              //   initReload()
              // }
              // else (count == 0)
              // alert("Низя")

            }}
          >
            Ведите : {count}



          </button>
          <button class="bbt"

            onclick={() => {
              // console.log('=d41053=', 123)

              if (count >= 1) {
                count--
                initReload()
                console.log('count = 1')
              } else {
                console.log('count = 5!!!!!!!')
                alert("Низя")

              }

              // if (count >= 1) {
              //   initReload()
              // }
              // else (count == 0)
              // alert("Низя")

            }}
          >
            Ведите : {count}



          </button>
          <button class="bbtt"

            onclick={() => {
              // console.log('=d41053=', 123)

              if (count >= 1) {
                count--
                initReload()
                console.log('count = 1')
              } else {
                console.log('count = 5!!!!!!!')
                alert("Низя")

              }

              // if (count >= 1) {
              //   initReload()
              // }
              // else (count == 0)
              // alert("Низя")

            }}
          >
            Ведите : {count}



          </button>

          <img src="train/avatar.gif" > </img>
          <button>

            gggggggg={new1[0].t3}
            <div>123</div>



            {
              Static.records.map((item, index) => {
                // console.log('=289091=', item, index)
                return (
                  <img src={item.image}></img>
                )
              })
            }

          </button>

          {/* <input
            placeholder="Введите название мероприятий"
            type="date"
            style="border-radius: 10px;"
          // value="0000-00-00" 
          // min="2023-01-01"
          //  max="2026-12-31"
          >

          </input> */}
        </div>

      )
    }

  })
};

export default start;