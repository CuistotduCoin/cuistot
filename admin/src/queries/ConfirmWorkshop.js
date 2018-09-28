export default `mutation confirmWorkshop($workshop: WorkshopInput!) {
  confirmWorkshop(workshop: $workshop) {
    message
    errors {
      message
    }
  }
}`;
