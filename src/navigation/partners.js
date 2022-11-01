import {
  jsx,
  jsxFrag,
  init
} from "@betarost/cemjs";
// poydet
import { BlockInfoPartners } from '@component/blocks/index.js';

const start = function (data, ID = "mainBlock") {
  init(
    null,
    () => {
      return (
        <div class="c-main__body">
          <BlockInfoPartners />
        </div>
      )
    }, ID
  )
}

export default start;