import {
  jsx,
  jsxFrag,
  Variable,
  init
} from "@betarost/cemjs";

import { BlockInfoPartners } from '@component/blocks/BlockInfoPartners.js';

const start = function () {
  Variable.HeaderShow = true
  Variable.FooterShow = true

  init(
    null,
    () => {
      return (
        <div class={[Variable.HeaderShow ? 'c-main__body' : 'c-main__body--noheader']}>
          <BlockInfoPartners />
        </div>
      )
    }
  )
}
//I check
export default start;