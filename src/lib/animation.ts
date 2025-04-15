export function slideInOutRight(): void {
  const commonKeyframes = {
    willChange: "transform, opacity, filter",
  };

  // Old view animation (sliding out)
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translate(0, 0)",
        filter: "blur(0px)",
        ...commonKeyframes,
      },
      {
        opacity: 0,
        transform: "translate(-50px, 0)",
        filter: "blur(4px)",
        ...commonKeyframes,
      },
    ],
    {
      duration: 500,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    },
  );

  // New view animation (sliding in)
  document.documentElement.animate(
    [
      {
        opacity: 0,
        transform: "translate(50px, 0)",
        filter: "blur(4px)",
        ...commonKeyframes,
      },
      {
        opacity: 1,
        transform: "translate(0, 0)",
        filter: "blur(0px)",
        ...commonKeyframes,
      },
    ],
    {
      duration: 500,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    },
  );
}

export function slideInOutLeft(): void {
  const commonKeyframes = {
    willChange: "transform, opacity, filter",
  };

  // Old view animation (sliding out)
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translate(0, 0)",
        filter: "blur(0px)",
        ...commonKeyframes,
      },
      {
        opacity: 0,
        transform: "translate(50px, 0)",
        filter: "blur(4px)",
        ...commonKeyframes,
      },
    ],
    {
      duration: 500,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    },
  );

  // New view animation (sliding in)
  document.documentElement.animate(
    [
      {
        opacity: 0,
        transform: "translate(-50px, 0)",
        filter: "blur(4px)",
        ...commonKeyframes,
      },
      {
        opacity: 1,
        transform: "translate(0, 0)",
        filter: "blur(0px)",
        ...commonKeyframes,
      },
    ],
    {
      duration: 500,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    },
  );
}

export function fadeScale(): void {
  const commonConfig = {
    duration: 400,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    fill: "forwards",
  };

  const commonKeyframes = {
    willChange: "transform, opacity",
  };

  document.documentElement.animate(
    [
      { opacity: 1, transform: "scale(1)", ...commonKeyframes },
      { opacity: 0, transform: "scale(0.98)", ...commonKeyframes },
    ],
    {
      ...commonConfig,
      pseudoElement: "::view-transition-old(root)",
      fill: "forwards" as FillMode,
    },
  );

  document.documentElement.animate(
    [
      { opacity: 0, transform: "scale(1.02)", ...commonKeyframes },
      { opacity: 1, transform: "scale(1)", ...commonKeyframes },
    ],
    {
      ...commonConfig,
      pseudoElement: "::view-transition-new(root)",
      fill: "forwards" as FillMode,
    },
  );
}
