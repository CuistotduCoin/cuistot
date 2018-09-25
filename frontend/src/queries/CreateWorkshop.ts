export default `mutation CreateWorkshop($workshop: CreateWorkshopInput!) {
  createWorkshop(workshop: $workshop) {
    message,
    errors {
      message
    }
  }
}`;
