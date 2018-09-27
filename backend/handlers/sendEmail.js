import { run } from '../mailer';
import { isEmpty } from '../utils/utils';

export const handler = (event, context) => {
  let payload;
  if (!isEmpty(event.Records)) { // lambda is called by SNS
    payload = JSON.parse(event.Records[0].Sns.Message);
  } else {
    payload = event;
  }
  run(payload, context, context.done);
};
