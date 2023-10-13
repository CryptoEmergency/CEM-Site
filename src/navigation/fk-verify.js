import {
  jsx,
  jsxFrag,
  init,
  Variable,
  initReload,
  load,
  CEM
} from "@betarost/cemserver/cem.js";

const { images, svg, fn } = CEM

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return (
        <div class='c-main__body'>
          ab5582325e361fc42f4d7cede1d7ed81
        </div>
      );
    },
  });
};

export default start;
