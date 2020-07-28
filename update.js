import handler from "./libs/handler-lib";
import db from "./libs/database-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      scoreId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET grossScore = :grossScore, scoreDate = :scoreDate, holes = :holes, rating = :rating, course = :course, slope = :slope, tees = :tees, conditions = :conditions",
    ExpressionAttributeValues: {
      ":grossScore": data.grossScore || null,
      ":scoreDate": data.scoreDate || null,
      ":rating": data.rating || null,
      ":slope": data.slope || null,
      ":course": data.course || null,
      ":holes": data.holes || null,
      ":tees": data.tees || null,
      ":conditions": data.conditions || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  await db.update(params);

  return { status: true };
});