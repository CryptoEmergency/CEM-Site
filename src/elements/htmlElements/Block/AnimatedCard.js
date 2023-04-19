import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

{
  /* <button type="button" style={style} class={className} onclick={onclick}>
      <span class={textClass}>{text}</span>
      {children}
    </button> */
}

const AnimatedCard = function ({
  blockImg,
  altImg,
  title,
  descriptions,

  style,
  className,
  onclick,
  text,
  textClass,
  children,
  reloadActive,
}) {
  return (
    <div class={["list-goals_item", className]}>
      <div class="goal-img">
        <img alt={altImg} src={blockImg}></img>
      </div>

      <div class="goal-content">
        <h4>{title}</h4>
        <div class="goal-content_desc">{descriptions}</div>
      </div>
    </div>
  );
};
export { AnimatedCard };
