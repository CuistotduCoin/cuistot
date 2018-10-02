const rowStyle = (record, index, defaultStyle = {}) => {
  if (!record.confirmed) {
    return { ...defaultStyle, backgroundColor: '#fedddd' };
  }
  return { ...defaultStyle, backgroundColor: '#defede' };
};

export default rowStyle;
