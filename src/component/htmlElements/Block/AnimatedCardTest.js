import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

{
  /* <button type="button" style={style} class={className} onclick={onclick}>
      <span class={textClass}>{text}</span>
      {children}
    </button> */
}

const AnimatedCardTest = function ({
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
  console.log("=78fc5b=", className);
  return (
    <div class={className} onclick={onclick}>
      <div class="goal-img">
        <img alt={altImg} src={blockImg}></img>
      </div>

      <div class="goal-content">{children}</div>
    </div>
  );
};
export { AnimatedCardTest };
