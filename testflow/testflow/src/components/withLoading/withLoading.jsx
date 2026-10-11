import { createElement } from "react";

function withLoading(WrappedComponent) {
  function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return createElement("p", { role: "status" }, "Loading...");
    }

    return createElement(WrappedComponent, props);
  }

  WithLoadingComponent.displayName = `withLoading(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithLoadingComponent;
}

export default withLoading;
