import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

const forExport = function ({ className, image, title, description }) {
  return (
    <div class="affiliate_program_condition">
      <div class="affiliate_program_condition_icon">
        <img src={image} />
      </div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default forExport;
