export default `mutation recreateKitchen($kitchen: KitchenInput!) {
  recreateKitchen(kitchen: $kitchen) {
    message
    errors {
      message
    }
  }
}`;
