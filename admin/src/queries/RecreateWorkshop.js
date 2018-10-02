export default `mutation recreateWorkshop($workshop: WorkshopInput!) {
  recreateWorkshop(workshop: $workshop) {
    message
    errors {
      message
    }
  }
}`;
