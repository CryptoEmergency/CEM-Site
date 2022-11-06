import {
  jsx,
  jsxFrag,
  init,
  Variable,
  initReload,
} from "@betarost/cemjs";
// check
import { BlockTrade } from '@component/blocks/index.js';

const start = function (data, ID) {
  init(
    async () => {
    },
    () => {
      return (
        <div class="crypto_exchanges_full_page c-main__body">
          <BlockTrade
            nameRecords="PageTrades"
          />
        </div>
      );
    }, ID
  );
};
export default start;
