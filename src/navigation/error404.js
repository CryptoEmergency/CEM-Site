import {
  jsx,
  jsxFrag,
  init
} from "@betarost/cemjs";
import { BlockError404 } from '@component/blocks/index.js';

const start = function () {
  init(
    null,
    () => {
      return (
        <div>
          <BlockError404 />
        </div>
      )
    })
};
export default start;
// OK