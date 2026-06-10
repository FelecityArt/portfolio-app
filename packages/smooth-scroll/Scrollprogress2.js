var __dai_window=typeof window!=="undefined"?window:undefined;var __dai_navigator=typeof __dai_window!=="undefined"?navigator:undefined;

// http-url:https://framerusercontent.com/modules/cBMcHpDKuwE702JELPoU/39t0yRNboolityOAwFSw/ScrollProgress.js
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState, startTransition } from "react";
import { addPropertyControls, ControlType, useIsStaticRenderer } from "./_framer-runtime.js";
function ScrollProgress(props) {
  const { color, backgroundColor, height, borderRadius, style } = props;
  const barRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const isStatic = useIsStaticRenderer();
  useEffect(() => {
    if (isStatic)
      return;
    let scrollParent = null;
    if (barRef.current) {
      let el = barRef.current.parentElement;
      while (el && el !== document.body) {
        const overflowY = __dai_window.getComputedStyle(el).overflowY;
        if (overflowY === "auto" || overflowY === "scroll") {
          scrollParent = el;
          break;
        }
        el = el.parentElement;
      }
    }
    if (!scrollParent)
      return;
    function handleScroll() {
      const max = scrollParent.scrollHeight - scrollParent.clientHeight;
      if (max <= 0) {
        startTransition(() => setProgress(0));
        return;
      }
      startTransition(() => setProgress(scrollParent.scrollTop / max));
    }
    handleScroll();
    scrollParent.addEventListener("scroll", handleScroll);
    return () => {
      scrollParent?.removeEventListener("scroll", handleScroll);
    };
  }, [isStatic]);
  const displayProgress = isStatic ? 0 : progress;
  return /* @__PURE__ */ _jsx("div", { ref: barRef, style: { width: "100%", height, background: backgroundColor, borderRadius, position: "relative", overflow: "hidden", ...style }, "aria-hidden": true, children: /* @__PURE__ */ _jsx("div", { style: { width: `${displayProgress * 100}%`, height: "100%", background: color, borderRadius, transition: isStatic ? "none" : "width 0.45s cubic-bezier(0.33,1,0.68,1)" } }) });
}
addPropertyControls(ScrollProgress, { color: { type: ControlType.Color, title: "Bar Color", defaultValue: "#0099FF" }, backgroundColor: { type: ControlType.Color, title: "Background", defaultValue: "#EEEEEE" }, height: { type: ControlType.Number, title: "Height", defaultValue: 8, min: 2, max: 40, step: 1, unit: "px" }, borderRadius: { type: ControlType.Number, title: "Radius", defaultValue: 8, min: 0, max: 24 } });
var __FramerMetadata__ = { "exports": { "default": { "type": "reactComponent", "name": "ScrollProgress", "slots": [], "annotations": { "framerContractVersion": "1", "framerIntrinsicHeight": "8", "framerSupportedLayoutHeight": "fixed", "framerIntrinsicWidth": "360", "framerSupportedLayoutWidth": "any-prefer-fixed" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  ScrollProgress as default
};
