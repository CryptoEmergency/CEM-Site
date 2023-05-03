import {
  jsx,
  jsxFrag,
  CEM,
  load,
  Variable
} from "@betarost/cemserver/cem.js";

// import { fn } from '@src/functions/index.js';
// console.log('=f0ba6d=', CEM.fn)
const start = function (data, ID) {
  // console.log('=43d73f=', 'gdfgdf')
  let [Static] = CEM.fn.GetParams({ data, ID });
  CEM.load({
    ID,
    fn: () => {
      return (
        <div class="startap c-main__body">
          <button
            onclick={() => {
              CEM.fn.modals.ModalUserAddWork({})
            }}
          >
            ggggggggggggggggggggggggg
          </button>

          <input
            placeholder="Введите название мероприятий"
            type="date"
            style="border-radius: 10px;"
          // value="0000-00-00" 
          // min="2023-01-01"
          //  max="2026-12-31"
          >

          </input>
        </div>
      )
    }
  })
};

export default start;