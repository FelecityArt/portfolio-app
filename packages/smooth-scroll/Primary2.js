var __dai_window=typeof window!=="undefined"?window:undefined;var __dai_navigator=typeof __dai_window!=="undefined"?navigator:undefined;

// http-url:https://framerusercontent.com/modules/8pVkK4hxhOLbvK51ySNU/kDR9kU9ttvAZFOd4xu1F/WOfKF0MNK.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, getFontsFromSharedStyle, Link, RichText, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "./_framer-runtime.js";
import { LayoutGroup, motion, MotionConfigContext } from "framer-motion";
import * as React from "react";
import { useRef } from "react";

// http-url:https://framerusercontent.com/modules/C3A0jhKP37PtffdlbkhV/WFSELQ0glCRsW4b3ufT1/apjX_XM8a.js
import { fontStore } from "./_framer-runtime.js";
fontStore.loadFonts(["FS;Switzer-semibold", "FS;Switzer-black", "FS;Switzer-black italic", "FS;Switzer-semibold italic"]);
var fonts = [{ explicitInter: true, fonts: [{ cssFamilyName: "Switzer", source: "fontshare", style: "normal", uiFamilyName: "Switzer", url: "https://framerusercontent.com/third-party-assets/fontshare/wf/5SZVFDB7V52TI6ULVC6J3WQZQCIZVDV5/ODYPSTCUDMKSTYIPTV4CLQ7URIK7XYBJ/YS3VPNVO4B3TOJMEXDGFZQ4TLZGGSRZC.woff2", weight: "600" }, { cssFamilyName: "Switzer", source: "fontshare", style: "normal", uiFamilyName: "Switzer", url: "https://framerusercontent.com/third-party-assets/fontshare/wf/A54N3N7J5AY6YOPYJKLHF5VH7G7HSSUN/ERWIWIB434FMFHQFSSBD233EP3C62HOI/TOHQHMLIEIPKVF2JPM6SVKXFYGO5G2TJ.woff2", weight: "900" }, { cssFamilyName: "Switzer", source: "fontshare", style: "italic", uiFamilyName: "Switzer", url: "https://framerusercontent.com/third-party-assets/fontshare/wf/FQHNKZEV35SAMFWVFCFSORJXUNHNILL4/X4YCR4COAQTK5XB6JCDDBS7Q33AQWUAE/J7XVDQ2IJENINPUAVBDJNH3VEXVDSPQQ.woff2", weight: "900" }, { cssFamilyName: "Switzer", source: "fontshare", style: "italic", uiFamilyName: "Switzer", url: "https://framerusercontent.com/third-party-assets/fontshare/wf/2UC2M25RQ2XRSGCBJRQ2G5SNXCROECQB/QJT3T33NN372363FJY5EO5D63GKDKLDK/IOAFMDAPNX3S6OL2GYQQJ2FFJIRSVB3N.woff2", weight: "600" }] }];
var css = ['.framer-id4KY .framer-styles-preset-1ddjjmm:not(.rich-text-wrapper), .framer-id4KY .framer-styles-preset-1ddjjmm.rich-text-wrapper p { --framer-font-family: "Switzer", "Switzer Placeholder", sans-serif; --framer-font-family-bold: "Switzer", sans-serif; --framer-font-family-bold-italic: "Switzer", sans-serif; --framer-font-family-italic: "Switzer", "Switzer Placeholder", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 16px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: italic; --framer-font-style-italic: italic; --framer-font-variation-axes: normal; --framer-font-weight: 600; --framer-font-weight-bold: 900; --framer-font-weight-bold-italic: 900; --framer-font-weight-italic: 600; --framer-letter-spacing: -0.03em; --framer-line-height: 1.1em; --framer-paragraph-spacing: 20px; --framer-text-alignment: left; --framer-text-color: var(--token-b69aad86-5624-44f9-ae41-9312d1dc58a2, #121212); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: inherit; }'];
var className = "framer-id4KY";

// http-url:https://framerusercontent.com/modules/8pVkK4hxhOLbvK51ySNU/kDR9kU9ttvAZFOd4xu1F/WOfKF0MNK.js
var enabledGestures = { uKfczHew1: { hover: true } };
var serializationHash = "framer-vf5Q2";
var variantClassNames = { uKfczHew1: "framer-v-1dv92xd" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var getProps = ({ height, id, link, text, width, ...props }) => {
  return { ...props, aDo6xqA83: text ?? props.aDo6xqA83 ?? "Text", tr1OJLNgj: link ?? props.tr1OJLNgj };
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
  const { style, className: className2, layoutId, variant, aDo6xqA83, tr1OJLNgj, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ defaultVariant: "uKfczHew1", enabledGestures, ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [className];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsx(Link, { href: tr1OJLNgj, motionChild: true, nodeId: "uKfczHew1", openInNewTab: false, scopeId: "WOfKF0MNK", smoothScroll: true, children: /* @__PURE__ */ _jsx(motion.a, { ...restProps, ...gestureHandlers, className: `${cx(scopingClassNames, "framer-1dv92xd", className2, classNames)} framer-yiorny`, "data-framer-name": "Variant 1", layoutDependency, layoutId: "Primary__uKfczHew1", ref: refBinding, style: { ...style }, ...addPropertyOverrides({ "uKfczHew1-hover": { "data-framer-name": void 0 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsxs(motion.div, { className: "framer-vqnuk4", "data-framer-name": "Container", layoutDependency, layoutId: "Primary__h1YMsMuxN", style: { borderBottomLeftRadius: 25, borderBottomRightRadius: 25, borderTopLeftRadius: 25, borderTopRightRadius: 25 }, children: [/* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-1ddjjmm", "data-styles-preset": "apjX_XM8a", children: "Book a Call" }) }), className: "framer-9f4dzq", fonts: ["Inter"], layoutDependency, layoutId: "Primary__E05AZtR_7", style: { "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: aDo6xqA83, verticalAlignment: "top", withExternalLayout: true }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-1smxgeh", "data-framer-name": "BG", layoutDependency, layoutId: "Primary__H5QgZrUdt", style: { backgroundColor: "var(--token-2117c9c1-40d8-4ceb-a302-e0f1b4a0ab6a, rgb(18, 18, 18))", opacity: 1 }, variants: { "uKfczHew1-hover": { opacity: 0.75 } } })] }) }) }) }) }) });
});
var css2 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-vf5Q2.framer-yiorny, .framer-vf5Q2 .framer-yiorny { display: block; }", ".framer-vf5Q2.framer-1dv92xd { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; text-decoration: none; width: min-content; }", ".framer-vf5Q2 .framer-vqnuk4 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 10px 16px 10px 16px; position: relative; width: min-content; will-change: var(--framer-will-change-override, transform); }", ".framer-vf5Q2 .framer-9f4dzq { flex: none; height: auto; position: relative; white-space: pre; width: auto; z-index: 1; }", ".framer-vf5Q2 .framer-1smxgeh { bottom: 0px; flex: none; left: 0px; overflow: visible; position: absolute; right: 0px; top: 0px; z-index: 0; }", ...css];
var FramerWOfKF0MNK = withCSS(Component, css2, "framer-vf5Q2");
var WOfKF0MNK_default = FramerWOfKF0MNK;
FramerWOfKF0MNK.displayName = "Primary";
FramerWOfKF0MNK.defaultProps = { height: 38, width: 62 };
addPropertyControls(FramerWOfKF0MNK, { aDo6xqA83: { defaultValue: "Text", displayTextArea: false, title: "Text", type: ControlType.String }, tr1OJLNgj: { title: "Link", type: ControlType.Link } });
addFonts(FramerWOfKF0MNK, [{ explicitInter: true, fonts: [{ cssFamilyName: "Inter", source: "framer", style: "normal", uiFamilyName: "Inter", unicodeRange: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F", url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2", weight: "400" }, { cssFamilyName: "Inter", source: "framer", style: "normal", uiFamilyName: "Inter", unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116", url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2", weight: "400" }, { cssFamilyName: "Inter", source: "framer", style: "normal", uiFamilyName: "Inter", unicodeRange: "U+1F00-1FFF", url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2", weight: "400" }, { cssFamilyName: "Inter", source: "framer", style: "normal", uiFamilyName: "Inter", unicodeRange: "U+0370-03FF", url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2", weight: "400" }, { cssFamilyName: "Inter", source: "framer", style: "normal", uiFamilyName: "Inter", unicodeRange: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF", url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2", weight: "400" }, { cssFamilyName: "Inter", source: "framer", style: "normal", uiFamilyName: "Inter", unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2070, U+2074-207E, U+2080-208E, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD", url: "https://framerusercontent.com/assets/GrgcKwrN6d3Uz8EwcLHZxwEfC4.woff2", weight: "400" }, { cssFamilyName: "Inter", source: "framer", style: "normal", uiFamilyName: "Inter", unicodeRange: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB", url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2", weight: "400" }] }, ...getFontsFromSharedStyle(fonts)], { supportsExplicitInterCodegen: true });
var __FramerMetadata__ = { "exports": { "default": { "type": "reactComponent", "name": "FramerWOfKF0MNK", "slots": [], "annotations": { "framerDisplayContentsDiv": "false", "framerAutoSizeImages": "true", "framerColorSyntax": "true", "framerVariables": '{"aDo6xqA83":"text","tr1OJLNgj":"link"}', "framerContractVersion": "1", "framerComponentViewportWidth": "true", "framerImmutableVariables": "true", "framerIntrinsicHeight": "38", "framerCanvasComponentVariantDetails": '{"propertyName":"variant","data":{"default":{"layout":["auto","auto"]},"DK33yGEkh":{"layout":["auto","auto"]}}}', "framerIntrinsicWidth": "62" } }, "Props": { "type": "tsType", "annotations": { "framerContractVersion": "1" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  WOfKF0MNK_default as default
};
