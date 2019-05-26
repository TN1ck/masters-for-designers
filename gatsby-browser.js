// gatsby-browser.js
exports.shouldUpdateScroll = ({routerProps: {location}, getSavedScrollPosition}) => {
  if (location.hash) {
    return false;
  }

  return true;
};
