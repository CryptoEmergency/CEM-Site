import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

const forExport = function ({ title, className, src, value }) {
  return (
    <div class={["comments", className]}>
      <h2>{title}</h2>
      <div class="comments-form">
        <div class="comments-filed">
          <textarea class="textarea" rows="1" placeholder={value}></textarea>
        </div>
        <button class="comments-send">
          <img src={src} class="comments-icon"></img>
        </button>
      </div>
    </div>
  );
};

export default forExport;
