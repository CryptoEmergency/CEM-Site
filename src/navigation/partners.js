import {
  jsx,
  jsxFrag,
  load
} from "@betarost/cemserver/cem.js";

import Elements from '@src/elements/export.js';
import { BlockInfoPartners } from '@component/blocks/index.js';

const start = function (data, ID) {
  load({
    ID,
    fn: () => {
      return (
        <Elements.page.MainContainer>
          <BlockInfoPartners />
        </Elements.page.MainContainer>
      )
    }
  })
  return
}

export default start;