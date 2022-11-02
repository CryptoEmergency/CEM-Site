import {
  jsx,
  jsxFrag,
  init,
  sendApi,
  Variable,
  initReload,
} from "@betarost/cemjs";
// poydet
import {BlockExchange} from '@component/blocks/index.js';
import { api } from '@src/apiFunctions.js'
import { ButtonShowMore } from "@component/element/index.js";

const start = function (data, ID = "mainBlock") {
  init(
    async () => {
    },
    () => {
      return (
        <div class="crypto_exchanges_full_page c-main__body" id="crypto_exchange">
          <BlockExchange
            nameRecords="PageExchange"
            button={
              ()=>{
                if(Variable.PageExchange.list_records.length < Variable.PageExchange.totalFound){
                  return(
                    <ButtonShowMore
                      onclick = {async () => {
                          let tmp = await api({ type: "get", action: "getExchange", short: true, limit: 20, offset: Variable.PageExchange.list_records.length })
                          Variable.PageExchange.list_records.push(...tmp.list_records)
                          initReload()
                        }
                      }
                    />
                  )
                }
              }
            }
          />
        </div>
      );
    }, ID
  );
};
export default start;