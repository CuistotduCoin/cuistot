import {
  findFirstWhere,
  findWhere,
  insertObject,
  updateObject,
  deleteObject,
  performOperation,
  performPagination,
  recreateObject,
} from './utils';
import mangopay from "mangopay2-nodejs-sdk";

const TABLE_NAME = 'gourmets';

var api = new mangopay({
  clientId: 'your_client_id',
  clientApiKey: 'your_client_api_key',
  baseUrl: 'https://api.mangopay.com'
});

async function getGourmet(args) {
  const result = await findFirstWhere(TABLE_NAME, args.gourmet_id, args.is_admin);
  return result;
}

async function getGourmets(args) {
  const result = await performPagination(TABLE_NAME, args);
  return result;
}

async function getGourmetBookings(args) {
  let result = await performOperation(
    args,
    () => findWhere('bookings', args.id, 'gourmet_id'),
    'id',
  );
  if (result.userError) {
    result = { bookings: [] };
  }
  return result;
}

async function createGourmet(args) {
  const result = await insertObject(TABLE_NAME, args);
  if (result && result.data) {
    let user = {
      "FirstName": result.data.first_name,
      "LastName": result.data.last_name,
      "Birthday": result.data.birthday,
      "Nationality": result.data.nationality,
      "CountryOfResidence": result.data.country_of_residence,
      "Email": result.data.email
    }
    api.Users.create(user)
  }
  return result;
}

async function updateGourmet(args) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId, ...updateArgs } = args;
  const result = await performOperation(
    args,
    () => updateObject(TABLE_NAME, updateArgs),
    'id',
  );
  return result;
}

async function deleteGourmet(args) {
  const result = await performOperation(
    args,
    () => deleteObject(TABLE_NAME, args.id),
    'id',
  );
  return result;
}

async function recreateGourmet(args) {
  const result = await recreateObject(TABLE_NAME, args.id);
  return result;
}

export {
  getGourmet,
  getGourmets,
  getGourmetBookings,
  createGourmet,
  updateGourmet,
  deleteGourmet,
  recreateGourmet,
};
