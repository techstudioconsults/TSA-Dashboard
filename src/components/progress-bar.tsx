"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Progress_Bar = () => {
  return (
    <ProgressBar
      style="style"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default Progress_Bar;
