// bootstrap methoods lib
/**
 * Cached value for breakpoints
 */
let breakPoints = null;
const breakpointNames = ["xl", "lg", "md", "sm", "xs"];
/**
 * Gets the breakpoints used by bootstrap. the values for each key will be computed  
 * @returns {Object} array of breakpoints {
      xl: "1200px",
      lg: "992px",
      md: "768px",
      sm: "576px",
      xs: "0px"
    };
 */
export const getBreakPoints = () => {
  if (breakPoints === null) {
     // sometimes on first run getComputedStyle is not returning any value.
    // maybe bootstrap is not fully initiated yet. Defaults are bootstrap default and used as a stand in
    // if values are not yet computing.
    const breakpointValues = {
      xl: "1200px",
      lg: "992px",
      md: "768px",
      sm: "576px",
      xs: "0px"
    };
    for (let j = 0; j < breakpointNames.length; j++) {
      const breakpointName = breakpointNames[j];
      const computed = window.getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-' + breakpointName);
      if (computed.length !== 0) {
        breakpointValues[breakpointName] = computed;
      }
    }
    breakPoints = breakpointValues;
  }
  return breakPoints;
};
/**
 * Gets the break point value in as an object
 * @returns {Object} object in the form of {name: 'lg', index: 4}
 * if or any reason values cannot be computed then returns default of { name: "sm", index: 1 };
 */
export const detectBreak = () => {
  const breakpointValues = getBreakPoints();
  let i = breakpointNames.length;
  for (const breakpointName of breakpointNames) {
    i--;
    if (window.matchMedia("(min-width: " + breakpointValues[breakpointName] + ")").matches) {
      return { name: breakpointName, index: i };
    }
  }
  return { name: "sm", index: 1 };
};