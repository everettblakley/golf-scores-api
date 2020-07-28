import handler from "./libs/handler-lib";
import db from "./libs/database-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'scoreId': path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            scoreId: event.pathParameters.id,
        }
    };

    const result = await db.get(params);

    if (!result.Item) {
        throw new Error("Item not found");
    }

    return result.Item;
});