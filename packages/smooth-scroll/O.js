var __dai_window=typeof window!=="undefined"?window:undefined;var __dai_navigator=typeof __dai_window!=="undefined"?navigator:undefined;

// http-url:https://framerusercontent.com/modules/omo5LdjL4LRSZXvwvWOk/2QpRZT8g6Vnn49CuN9pt/O_XoZ3FcZ.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, useComponentViewport, useLocaleInfo, useVariantState, withCSS, withFX } from "./_framer-runtime.js";
import { LayoutGroup, motion, MotionConfigContext } from "framer-motion";
import * as React from "react";
import { useRef } from "react";
var MotionDivWithFX = withFX(motion.div);
var cycleOrder = ["G47S15YSn", "PX1MOnVXY"];
var serializationHash = "framer-IJaBb";
var variantClassNames = { G47S15YSn: "framer-v-1hbo82m", PX1MOnVXY: "framer-v-17k3l76" };
var transition1 = { duration: 0, type: "tween" };
var animation = { opacity: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 0 };
var transition2 = { delay: 0, duration: 0.3, ease: [0.44, 0, 0.56, 1], type: "tween" };
var animation1 = { opacity: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, transition: transition2, x: 0, y: 0 };
var transition3 = { delay: 0, duration: 1, ease: [0, 0, 1, 1], type: "tween" };
var animation2 = { opacity: 1, rotate: 360, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 0 };
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var humanReadableVariantMap = { Hidden: "PX1MOnVXY", Loading: "G47S15YSn" };
var Variants = motion.create(React.Fragment);
var getProps = ({ height, id, width, ...props }) => {
  return { ...props, variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "G47S15YSn" };
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
  const { style, className, layoutId, variant, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ cycleOrder, defaultVariant: "G47S15YSn", ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [];
  const isDisplayed = () => {
    if (baseVariant === "PX1MOnVXY")
      return false;
    return true;
  };
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: isDisplayed() && /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsx(motion.div, { ...restProps, ...gestureHandlers, className: cx(scopingClassNames, "framer-1hbo82m", className, classNames), "data-framer-name": "Loading", layoutDependency, layoutId: "OXoZ3FcZ__G47S15YSn", ref: refBinding, style: { ...style }, children: /* @__PURE__ */ _jsx(MotionDivWithFX, { __framer__animate: { transition: transition2 }, __framer__animateOnce: false, __framer__enter: animation, __framer__exit: animation1, __framer__styleAppearEffectEnabled: true, __framer__threshold: 0.5, __perspectiveFX: false, __smartComponentFX: true, __targetOpacity: 1, className: "framer-1qrc6yg", "data-framer-name": "Spinner", layoutDependency, layoutId: "OXoZ3FcZ__onOQ0YrdY", style: { mask: "url('https://framerusercontent.com/images/pGiXYozQ3mE4cilNOItfe2L2fUA.svg') alpha no-repeat center / cover add", WebkitMask: "url('https://framerusercontent.com/images/pGiXYozQ3mE4cilNOItfe2L2fUA.svg') alpha no-repeat center / cover add" }, children: /* @__PURE__ */ _jsx(MotionDivWithFX, { __framer__loop: animation2, __framer__loopEffectEnabled: true, __framer__loopPauseOffscreen: true, __framer__loopRepeatDelay: 0, __framer__loopRepeatType: "loop", __framer__loopTransition: transition3, __perspectiveFX: false, __smartComponentFX: true, __targetOpacity: 1, className: "framer-1jivlv8", "data-framer-name": "Conic", layoutDependency, layoutId: "OXoZ3FcZ__rN6xsA2D3", style: { background: "conic-gradient(from 0deg at 50% 50%, rgba(255, 255, 255, 0) 0deg, rgb(153, 153, 153) 342deg)" }, children: /* @__PURE__ */ _jsx(motion.div, { className: "framer-m7b4s7", "data-framer-name": "Round", layoutDependency, layoutId: "OXoZ3FcZ__KWLYXFUsw", style: { backgroundColor: "rgb(153, 153, 153)", borderBottomLeftRadius: 1, borderBottomRightRadius: 1, borderTopLeftRadius: 1, borderTopRightRadius: 1 } }) }) }) }) }) }) });
});
var css = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-IJaBb.framer-xuzmjz, .framer-IJaBb .framer-xuzmjz { display: block; }", ".framer-IJaBb.framer-1hbo82m { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: auto; justify-content: center; padding: 0px; position: relative; width: 100%; }", ".framer-IJaBb .framer-1qrc6yg { aspect-ratio: 1 / 1; flex: none; gap: 10px; height: var(--framer-aspect-ratio-supported, 20px); overflow: visible; position: relative; width: 20px; }", ".framer-IJaBb .framer-1jivlv8 { bottom: 0px; flex: none; gap: 10px; left: 0px; overflow: visible; position: absolute; right: 0px; top: 0px; }", ".framer-IJaBb .framer-m7b4s7 { flex: none; height: 2px; left: calc(50.00000000000002% - 2px / 2); overflow: visible; position: absolute; top: 0px; width: 2px; }"];
var FramerO_XoZ3FcZ = withCSS(Component, css, "framer-IJaBb");
var O_XoZ3FcZ_default = FramerO_XoZ3FcZ;
FramerO_XoZ3FcZ.displayName = "Spinner";
FramerO_XoZ3FcZ.defaultProps = { height: 40, width: 40 };
addPropertyControls(FramerO_XoZ3FcZ, { variant: { options: ["G47S15YSn", "PX1MOnVXY"], optionTitles: ["Loading", "Hidden"], title: "Variant", type: ControlType.Enum } });
addFonts(FramerO_XoZ3FcZ, [{ explicitInter: true, fonts: [] }], { supportsExplicitInterCodegen: true });
var __FramerMetadata__ = { "exports": { "Props": { "type": "tsType", "annotations": { "framerContractVersion": "1" } }, "default": { "type": "reactComponent", "name": "FramerO_XoZ3FcZ", "slots": [], "annotations": { "framerContractVersion": "1", "framerImmutableVariables": "true", "framerIntrinsicWidth": "40", "framerColorSyntax": "true", "framerIntrinsicHeight": "40", "framerComponentViewportWidth": "true", "framerCanvasComponentVariantDetails": '{"propertyName":"variant","data":{"default":{"layout":["fixed","fixed"]},"PX1MOnVXY":{"layout":["fixed","fixed"]}}}', "framerDisplayContentsDiv": "false", "framerAutoSizeImages": "true" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  O_XoZ3FcZ_default as default
};
