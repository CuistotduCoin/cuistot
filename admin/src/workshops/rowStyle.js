const rowStyle = (record, index, defaultStyle = {}) => {
  if (!record.confirmed) {
    return { ...defaultStyle, backgroundColor: '#fedddd' };
  }
  const bookingsCount = record.bookings.length;
  if (bookingsCount < record.min_gourmet) {
    return { ...defaultStyle, backgroundColor: '#e8e8e8' };
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
