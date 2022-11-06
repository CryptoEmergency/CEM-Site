import {
  jsx,
  jsxFrag,
  init
} from "@betarost/cemjs";
// check
import { BlockInfoPartners } from '@component/blocks/index.js';

const start = function (data, ID) {
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