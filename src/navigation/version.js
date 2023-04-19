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
      console.log('=d8df1e=', Variable.lang)
      return (
        <div class="startap c-main__body">
          <button
            onclick={() => {
              CEM.fn.modals.ModalComplainComment({})
            }}
          >
            ggggggggggggggggggggggggg
          </button>
        </div>
      )
    }
  })
};

export default start;