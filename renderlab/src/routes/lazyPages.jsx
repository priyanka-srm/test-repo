import { lazy } from "react";
export const RenderPage = lazy(() => import("../pages/RenderPage"));
export const MemoPage = lazy(() => import("../pages/MemoPage"));
export const CallbackPage = lazy(() => import("../pages/CallbackPage"));
export const LazyPage = lazy(() => import("../pages/LazyPage"));
export const VirtualizationPage = lazy(
  () => import("../pages/VirtualizationPage")
);
export const ProfilerPage = lazy(() => import("../pages/ProfilerPage"));