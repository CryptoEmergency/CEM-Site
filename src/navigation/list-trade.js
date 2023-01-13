import {
  jsx,
  jsxFrag,
  init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';
import { BlockTrade } from '@component/blocks/index.js';

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })
  init(
    async () => {
      Static.nameRecords = "PageTrades"
      Static.apiFilter = {}
    },
    () => {
      return (
        <div class="crypto_exchanges_full_page c-main__body">
          <BlockTrade Static={Static} limit={55} />
        </div>
      );
    }, ID
  );
};
export default start;
// OK
