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
  clientId: process.env.MANGO_PAY_CLIENT_ID,
  clientApiKey: process.env.MANGO_PAY_CLIENT_API_KEY,
  baseUrl: process.env.MANGO_PAY_BASE_URL
});

async function getGourmet(args) {
  const result = await findFirstWhere(TABLE_NAME, args.gourmet_id, args.is_admin);
  if (result && result.data) {
    api.Wallet.get(data.mango_wallet_id).then(function(data){
      let balance = {
        "amount": data.Amount,
        "currency": data.Currency
      }
      result.balance = balance;
    });
  }
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
      "CountryOfResidence": result.data.country,
      "Email": result.data.email
    };
    api.Users.create(user).then(function(){
      updateGourmet({ id: result.data.id, mango_user_id: user.Id });
      let wallet = {
        "Owners": [ user.Id ],
        "Description": "gourmet e-wallet",
        "Currency": "EUR"
      };
      api.Wallets.create(wallet)then(function(){
        updateGourmet({ id: result.data.id, mango_wallet: wallet.Id });
      };
    });

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
