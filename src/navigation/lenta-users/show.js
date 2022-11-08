import {
  jsx,
  jsxFrag,
  Variable,
  init,
  sendApi,
  getStorage,
  initReload
} from "@betarost/cemjs";


import { api } from '@src/apiFunctions.js'
import { BlockShowLenta } from "@component/blocks/index.js";

const start = function (data, ID = "mainBlock") {
  let Static = {}
  Static.elMedia = {}
  Static.elToogle = {}
  Static.elShowTextFull = {}
  Static.elShowTextShort = {}
  Static.elMedia = {}
  let item, showItemsMenu;

  init(
    async () => {

      if (data && data.item) {
        item = data.item
      } else {
        showItemsMenu = true
        let response = await api({ type: "get", action: "getPost", short: true, limit: 1, filter: { _id: Variable.dataUrl.params } })
        item = response.list_records[0]
      }
    },
    async () => {

      return (

        <div class="answer_container c-main__body">
          <BlockShowLenta
            Static={Static}
            item={item}
            showItemsMenu={showItemsMenu}
          />

        </div>
      )
    }, ID
  );
};

export default start;
