"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const LoadingBar = () => {
  return (
    <ProgressBar
      height="4px"
      color="#1E88E5"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default LoadingBar;
