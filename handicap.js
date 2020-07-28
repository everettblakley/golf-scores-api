import handler from "./libs/handler-lib";
import db from "./libs/database-lib-lib";
import { calculateHandicap } from "./libs/handicap-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
    },
  };

  // Get the users' scores
  const result = await db.query(params);

  // Calculate the handicap
  const handicap = calculateHandicap(result.items);

  return { handicap };
});
