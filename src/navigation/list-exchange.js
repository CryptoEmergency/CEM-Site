import {
  jsx,
  jsxFrag,
  init
} from "@betarost/cemjs";
import { BlockExchange } from '@component/blocks/index.js';

const start = function (data, ID) {
  init(
    null,
    () => {
      return (
        <div class="crypto_exchanges_full_page c-main__body" id="crypto_exchange">
          <BlockExchange
            nameRecords="PageExchange"
          />
        </div>
      );
    }, ID
  );
};
export default start;