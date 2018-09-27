export default `mutation recreateCook($cook: CookInput!) {
  recreateCook(cook: $cook) {
    message
    errors {
      message
    }
  }
}`;
