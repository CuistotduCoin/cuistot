export default `mutation confirmCook($cook: CookInput!) {
  confirmCook(cook: $cook) {
    message
    errors {
      message
    }
  }
}`;
