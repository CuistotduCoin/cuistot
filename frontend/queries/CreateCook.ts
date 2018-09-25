export default `mutation CreateCook($cook: CreateCookInput!) {
  createCook(cook: $cook) {
    message,
    errors {
      message
    }
  }
}`;
