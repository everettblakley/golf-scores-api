import handler from "./libs/handler-lib";
import db from "./libs/database-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'scoreId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      scoreId: event.pathParameters.id
    }
  };

  await db.delete(params);

  return { status: true };
});