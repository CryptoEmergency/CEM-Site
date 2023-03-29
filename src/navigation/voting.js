import { jsx, jsxFrag, load } from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/index.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return <div class="voting">Илья</div>;
    },
  });
};

export default start;
