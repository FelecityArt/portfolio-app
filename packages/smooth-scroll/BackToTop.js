var __dai_window=typeof window!=="undefined"?window:undefined;var __dai_navigator=typeof __dai_window!=="undefined"?navigator:undefined;

// http-url:https://framerusercontent.com/modules/pf9S1jGwQ4gtxWN30I5Q/zfTusE2oUcGWyjcIudo9/Ml0EsGoIm.js
import { jsx as _jsx2 } from "react/jsx-runtime";
import { addFonts, addPropertyControls as addPropertyControls2, ControlType as ControlType2, cx as cx2, getFonts, Link, useComponentViewport, useLocaleInfo, useVariantState, withCSS as withCSS2 } from "./_framer-runtime.js";
import { LayoutGroup, motion as motion2, MotionConfigContext } from "framer-motion";
import * as React2 from "react";
import { useRef } from "react";

// http-url:https://framerusercontent.com/modules/GL7PmCBHnYFo2PmR1lmA/N2sdkvkdDfsxtCrhqoEe/krYN5aLhQ.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addPropertyControls, ControlType, cx, motion, useSVGTemplate, withCSS } from "./_framer-runtime.js";
import * as React from "react";
import { forwardRef as forwardRef2 } from "react";
var mask = "var(--framer-icon-mask)";
var Base = /* @__PURE__ */ forwardRef2(function(props, ref) {
  return /* @__PURE__ */ _jsx("svg", { ...props, ref, children: props.children });
});
var MotionSVG = motion.create(Base);
var SVG = /* @__PURE__ */ forwardRef2((props, ref) => {
  const { animated, layoutId, children, ...rest } = props;
  return animated ? /* @__PURE__ */ _jsx(MotionSVG, { ...rest, layoutId, ref, children }) : /* @__PURE__ */ _jsx("svg", { ...rest, ref, children });
});
var svg = '<svg display="block" role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M 7 0 L 7 18 M 7 0 L 0 7 M 7 0 L 14 7" fill="transparent" height="18px" id="CvTA6chCL" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="round" stroke-width="var(--1ww558a, 2)" stroke="var(--4rxgx6, black)" transform="translate(5 3)" width="14px"/></svg>';
var getProps = ({ color, height, id, width, width1, ...props }) => {
  return { ...props, CRY1Fpez4: color ?? props.CRY1Fpez4 ?? "rgb(0, 0, 0)", vet7gqNu_: width1 ?? props.vet7gqNu_ ?? 2 };
};
var Component = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  const { style, className, layoutId, variant, CRY1Fpez4, vet7gqNu_, ...restProps } = getProps(props);
  const href = useSVGTemplate("3222760347", svg);
  return /* @__PURE__ */ _jsx(SVG, { ...restProps, className: cx("framer-5U4Eu", className), layoutId, ref, role: "presentation", style: { "--1ww558a": vet7gqNu_, "--4rxgx6": CRY1Fpez4, ...style }, viewBox: "0 0 24 24", children: /* @__PURE__ */ _jsx("use", { href }) });
});
var css = [`.framer-5U4Eu { -webkit-mask: ${mask}; aspect-ratio: 1; display: block; mask: ${mask}; width: 24px; }`];
var Icon = withCSS(Component, css, "framer-5U4Eu");
Icon.displayName = "Arrow Up";
var krYN5aLhQ_default = Icon;
addPropertyControls(Icon, { CRY1Fpez4: { defaultValue: "rgb(0, 0, 0)", hidden: false, title: "Color", type: ControlType.Color }, vet7gqNu_: { defaultValue: 2, displayStepper: true, hidden: false, max: 4, min: 1, title: "Width", type: ControlType.Number } });

// http-url:https://framerusercontent.com/modules/pf9S1jGwQ4gtxWN30I5Q/zfTusE2oUcGWyjcIudo9/Ml0EsGoIm.js
var ArrowUpFonts = getFonts(krYN5aLhQ_default);
var enabledGestures = { GHbeNMfcG: { hover: true } };
var serializationHash = "framer-rJxzc";
var variantClassNames = { GHbeNMfcG: "framer-v-wrcezf" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var Transition = ({ value, children }) => {
  const config = React2.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React2.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx2(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion2.create(React2.Fragment);
var getProps2 = ({ height, id, link, width, ...props }) => {
  return { ...props, TlcMCdt2Y: link ?? props.TlcMCdt2Y };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency)
    return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component2 = /* @__PURE__ */ React2.forwardRef(function(props, ref) {
  const fallbackRef = useRef(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React2.useId();
  const { activeLocale, setLocale } = useLocaleInfo();
  const componentViewport = useComponentViewport();
  const { style, className, layoutId, variant, TlcMCdt2Y, ...restProps } = getProps2(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ defaultVariant: "GHbeNMfcG", enabledGestures, ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [];
  const scopingClassNames = cx2(serializationHash, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx2(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx2(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx2(Transition, { value: transition1, children: /* @__PURE__ */ _jsx2(Link, { href: TlcMCdt2Y, motionChild: true, nodeId: "GHbeNMfcG", openInNewTab: false, scopeId: "Ml0EsGoIm", smoothScroll: true, children: /* @__PURE__ */ _jsx2(motion2.a, { ...restProps, ...gestureHandlers, "aria-label": "Back to top button", className: `${cx2(scopingClassNames, "framer-wrcezf", className, classNames)} framer-oyzr4z`, "data-framer-name": "Variant 1", layoutDependency, layoutId: "Backtotop__GHbeNMfcG", ref: refBinding, style: { backgroundColor: "var(--token-70fac189-c0e2-4215-a7e6-b5ba80709729, rgb(47, 47, 47))", borderBottomLeftRadius: "50%", borderBottomRightRadius: "50%", borderTopLeftRadius: "50%", borderTopRightRadius: "50%", ...style }, ...addPropertyOverrides({ "GHbeNMfcG-hover": { "data-framer-name": void 0 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx2(krYN5aLhQ_default, { animated: true, className: "framer-o6q94", layoutDependency, layoutId: "Backtotop__mt7t29mgR", style: { "--1ww558a": 2, "--4rxgx6": "var(--token-1f89590b-e058-413c-a980-4126202a6a42, rgb(171, 171, 171))" }, variants: { "GHbeNMfcG-hover": { "--4rxgx6": "var(--token-2117c9c1-40d8-4ceb-a302-e0f1b4a0ab6a, rgb(255, 255, 255))" } } }) }) }) }) }) });
});
var css2 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-rJxzc.framer-oyzr4z, .framer-rJxzc .framer-oyzr4z { display: block; }", ".framer-rJxzc.framer-wrcezf { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; overflow: visible; padding: 8px; position: relative; text-decoration: none; width: min-content; }", ".framer-rJxzc .framer-o6q94 { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 14px); position: relative; width: 14px; }"];
var FramerMl0EsGoIm = withCSS2(Component2, css2, "framer-rJxzc");
var Ml0EsGoIm_default = FramerMl0EsGoIm;
FramerMl0EsGoIm.displayName = "Back to top";
FramerMl0EsGoIm.defaultProps = { height: 30, width: 30 };
addPropertyControls2(FramerMl0EsGoIm, { TlcMCdt2Y: { title: "Link", type: ControlType2.Link } });
addFonts(FramerMl0EsGoIm, [{ explicitInter: true, fonts: [] }, ...ArrowUpFonts], { supportsExplicitInterCodegen: true });
var __FramerMetadata__ = { "exports": { "Props": { "type": "tsType", "annotations": { "framerContractVersion": "1" } }, "default": { "type": "reactComponent", "name": "FramerMl0EsGoIm", "slots": [], "annotations": { "framerDisplayContentsDiv": "false", "framerAutoSizeImages": "true", "framerComponentViewportWidth": "true", "framerIntrinsicHeight": "30", "framerIntrinsicWidth": "30", "framerCanvasComponentVariantDetails": '{"propertyName":"variant","data":{"default":{"layout":["auto","auto"]},"s9x8qGpJu":{"layout":["auto","auto"]}}}', "framerContractVersion": "1", "framerVariables": '{"TlcMCdt2Y":"link"}', "framerColorSyntax": "true", "framerImmutableVariables": "true" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  Ml0EsGoIm_default as default
};
