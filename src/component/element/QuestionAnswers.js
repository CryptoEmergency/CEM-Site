import { jsx, jsxFrag, Variable, Helpers, initReload } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";

import { If, Map } from "@component/helpers/All.js";
import { ifHaveMedia } from "@src/functions.js";
import { Avatar, Likes, QuestionAnswerItem } from "@component/element/index.js";
Variable.Static.openComent =[]
const QuestionAnswers = function ({ items }) {
  return (

    
      items.map((item, index) => {
        return <QuestionAnswerItem item={item} index={index} />;
      })
    
  );
};

export { QuestionAnswers };
