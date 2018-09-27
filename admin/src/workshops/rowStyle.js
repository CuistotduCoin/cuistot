const rowStyle = (record, index, defaultStyle = {}) => {
  const bookingsCount = record.bookings.length;
  if (bookingsCount < record.min_gourmet) {
    return { ...defaultStyle, backgroundColor: '#fedddd' };
  }
  if (bookingsCount === record.max_gourmet) {
    return { ...defaultStyle, backgroundColor: '#defede' };
  }
  if (bookingsCount >= record.max_gourmet - 2) {
    return { ...defaultStyle, backgroundColor: '#fffede' };
  }
  return defaultStyle;
};

export default rowStyle;
