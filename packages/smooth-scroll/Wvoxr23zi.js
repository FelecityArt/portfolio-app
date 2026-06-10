var __dai_window=typeof window!=="undefined"?window:undefined;var __dai_navigator=typeof __dai_window!=="undefined"?navigator:undefined;

// http-url:https://framerusercontent.com/modules/z9EoktionPnqEoxwOhyN/fG2HF90gHX6YiWkRTPUS/WVoxR23Zi.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, Link, RichText, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "./_framer-runtime.js";
import { LayoutGroup, motion, MotionConfigContext } from "framer-motion";
import * as React from "react";
import { useRef } from "react";
var enabledGestures = { bOvvZCqEL: { hover: true } };
var serializationHash = "framer-oG6eS";
var variantClassNames = { bOvvZCqEL: "framer-v-ecvkb6" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { damping: 60, delay: 0, mass: 1, stiffness: 700, type: "spring" };
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var getProps = ({ height, id, link, text, width, ...props }) => {
  return { ...props, FyrjlJ64l: link ?? props.FyrjlJ64l, RXax2L2nn: text ?? props.RXax2L2nn ?? "Get the Template" };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency)
    return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  const fallbackRef = useRef(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React.useId();
  const { activeLocale, setLocale } = useLocaleInfo();
  const componentViewport = useComponentViewport();
  const { style, className, layoutId, variant, RXax2L2nn, FyrjlJ64l, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ defaultVariant: "bOvvZCqEL", enabledGestures, ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsx(Link, { href: FyrjlJ64l, motionChild: true, nodeId: "bOvvZCqEL", openInNewTab: true, scopeId: "WVoxR23Zi", children: /* @__PURE__ */ _jsx(motion.a, { ...restProps, ...gestureHandlers, className: `${cx(scopingClassNames, "framer-ecvkb6", className, classNames)} framer-1qr2bnw`, "data-framer-name": "Regular", layoutDependency, layoutId: "WVoxR23Zi__bOvvZCqEL", ref: refBinding, style: { "--border-bottom-width": "0px", "--border-color": "rgba(0, 0, 0, 0)", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "solid", "--border-top-width": "0px", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, boxShadow: "0px 0.6021873017743928px 0.6021873017743928px 0px rgba(0, 0, 0, 0.02), 0px 2.288533303243457px 2.288533303243457px 0px rgba(0, 0, 0, 0.06), 0px 10px 10px 0px rgba(0, 0, 0, 0.25)", ...style }, variants: { "bOvvZCqEL-hover": { "--border-bottom-width": "1px", "--border-color": "var(--token-c2d4f150-9d36-424f-95fe-afc2b485fcf8, rgb(255, 255, 255))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "rgb(15, 15, 15)" } }, ...addPropertyOverrides({ "bOvvZCqEL-hover": { "data-border": true, "data-framer-name": void 0 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(motion.div, { className: "framer-1m68y0w", layoutDependency, layoutId: "WVoxR23Zi__KEheL7t8T", children: /* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { style: { "--font-selector": "R0Y7SW50ZXIgVGlnaHQtNzAw", "--framer-font-family": '"Inter Tight", "Inter Tight Placeholder", sans-serif', "--framer-font-size": "13px", "--framer-font-weight": "700", "--framer-letter-spacing": "0px" }, children: "Get the Template" }) }), className: "framer-1klxq37", "data-framer-name": "Text 1", fonts: ["GF;Inter Tight-700"], layoutDependency, layoutId: "WVoxR23Zi__ycqGsl88r", style: { "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: RXax2L2nn, variants: { "bOvvZCqEL-hover": { "--extracted-r6o4lv": "rgb(255, 255, 255)" } }, verticalAlignment: "top", withExternalLayout: true, ...addPropertyOverrides({ "bOvvZCqEL-hover": { children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { style: { "--font-selector": "R0Y7SW50ZXIgVGlnaHQtNzAw", "--framer-font-family": '"Inter Tight", "Inter Tight Placeholder", sans-serif', "--framer-font-size": "13px", "--framer-font-weight": "700", "--framer-letter-spacing": "0px", "--framer-text-color": "var(--extracted-r6o4lv, rgb(255, 255, 255))" }, children: "Get the Template" }) }) } }, baseVariant, gestureVariant) }) }) }) }) }) }) });
});
var css = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-oG6eS.framer-1qr2bnw, .framer-oG6eS .framer-1qr2bnw { display: block; }", ".framer-oG6eS.framer-ecvkb6 { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 38px; justify-content: center; padding: 5px 10px 5px 10px; position: relative; text-decoration: none; width: 142px; }", ".framer-oG6eS .framer-1m68y0w { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }", ".framer-oG6eS .framer-1klxq37 { flex: none; height: auto; position: relative; white-space: pre; width: auto; z-index: 1; }", "@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-oG6eS.framer-ecvkb6, .framer-oG6eS .framer-1m68y0w { gap: 0px; } .framer-oG6eS.framer-ecvkb6 > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-oG6eS.framer-ecvkb6 > :first-child { margin-top: 0px; } .framer-oG6eS.framer-ecvkb6 > :last-child { margin-bottom: 0px; } .framer-oG6eS .framer-1m68y0w > * { margin: 0px; margin-left: calc(8px / 2); margin-right: calc(8px / 2); } .framer-oG6eS .framer-1m68y0w > :first-child { margin-left: 0px; } .framer-oG6eS .framer-1m68y0w > :last-child { margin-right: 0px; } }", '.framer-oG6eS[data-border="true"]::after, .framer-oG6eS [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }'];
var FramerWVoxR23Zi = withCSS(Component, css, "framer-oG6eS");
var WVoxR23Zi_default = FramerWVoxR23Zi;
FramerWVoxR23Zi.displayName = "Get template - fixed button";
FramerWVoxR23Zi.defaultProps = { height: 38, width: 142 };
addPropertyControls(FramerWVoxR23Zi, { RXax2L2nn: { defaultValue: "Get the Template", displayTextArea: false, title: "Text", type: ControlType.String }, FyrjlJ64l: { title: "Link", type: ControlType.Link } });
addFonts(FramerWVoxR23Zi, [{ explicitInter: true, fonts: [{ family: "Inter Tight", source: "google", style: "normal", url: "https://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mj6AiqWSRToK8EPg.woff2", weight: "700" }] }], { supportsExplicitInterCodegen: true });
var __FramerMetadata__ = { "exports": { "Props": { "type": "tsType", "annotations": { "framerContractVersion": "1" } }, "default": { "type": "reactComponent", "name": "FramerWVoxR23Zi", "slots": [], "annotations": { "framerIntrinsicHeight": "38", "framerComponentViewportWidth": "true", "framerAutoSizeImages": "true", "framerContractVersion": "1", "framerCanvasComponentVariantDetails": '{"propertyName":"variant","data":{"default":{"layout":["fixed","fixed"]},"slGXEq6SZ":{"layout":["fixed","fixed"]}}}', "framerVariables": '{"RXax2L2nn":"text","FyrjlJ64l":"link"}', "framerIntrinsicWidth": "142", "framerDisplayContentsDiv": "false", "framerImmutableVariables": "true", "framerColorSyntax": "true" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  WVoxR23Zi_default as default
};
