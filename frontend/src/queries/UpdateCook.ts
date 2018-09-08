export default `mutation updateCook($cook: UpdateCookInput!) {
  updateCook(cook: $cook) {
    message
    errors {
      message
    }
  }
}`;
