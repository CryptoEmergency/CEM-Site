import {
  jsx,
  jsxFrag,
  load,
  init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockExchange } from '@component/blocks/index.js';
import Elements from '@src/elements/export.js';

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })

  load({
    ID,
    fnLoad: () => {
      Static.nameRecords = "PageExchange"
      Static.apiFilter = {}
      Static.filterCoins = []
    },
    fn: () => {
      return (
        <Elements.page.MainContainer
          class="crypto_exchanges_full_page">
          <BlockExchange Static={Static} limit={12} />
        </Elements.page.MainContainer>
      );
    }
  })
  return
};

export default start;