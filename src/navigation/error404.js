import {
  jsx,
  jsxFrag,
  init,
  load
} from "@betarost/cemserver/cem.js";
import { BlockError404 } from '@elements/blocks/index.js';

const start = function (data, ID) {
  load({
    ID,
    fn: () => {
      return (
        <div>
          <BlockError404 />
        </div>
      )
    }
  })
  return
};

export default start;