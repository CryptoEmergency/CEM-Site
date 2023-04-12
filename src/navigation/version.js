import {
  jsx,
  jsxFrag,
  load
} from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/index.js';

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return (
        <div class="startap c-main__body">
          <button
            onclick={() => {
              fn.modals.ModalAfterRegisterFormNew({})
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