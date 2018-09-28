export default `query GetCurrentGourmetImage {
  getCurrentGourmet {
    gourmet {
      image {
        key
      }
    },
    message,
    errors {
      message
    }
  }
}`;
