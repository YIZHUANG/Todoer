
const flex = (values = {}) => {
  const defaultflex = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return {
    display: 'flex',
    ...defaultflex,
    ...values,
  };
};

const leftRightMargin = (value = 20) => {
  return {
    marginLeft: value,
    marginRight: value,
  };
};
const topBottomMargin = (value = 20) => {
  return {
    marginTop: value,
    marginBottom: value,
  };
};

const leftRightPadding = (value = 20) => {
  return {
    paddingLeft: value,
    paddingRight: value,
  };
};
const topBottomPadding = (value = 20) => {
  return {
    paddingTop: value,
    paddingBottom: value,
  };
};

export {
  flex,
  leftRightMargin,
  topBottomMargin,
  leftRightPadding,
  topBottomPadding,
};
