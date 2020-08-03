import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import db from "./libs/database-lib";

export const main = handler(async (event, context) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    //  - 'scoreId': a unique uuid
    //  - 'grossScore': parsed score from the input data
    //  - 'scoreDate': parsed date from the input data
    //  - 'rating': parsed course rating from the input data
    //  - 'slope' : parsed course slope from the input data
    //  - 'course': parsed course name from the input data
    //  - 'tees': parsed tee selection from the input data
    //  - 'conditions': parsed weather conditions from the input data
    //  - 'createdAt': current unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      scoreId: uuid.v1(),
      grossScore: data.grossScore,
      scoreDate: data.scoreDate || new Date(),
      rating: data.rating,
      slope: data.slope,
      course: data.course,
      holes: data.holes,
      tees: data.tees,
      conditions: data.conditions,
      createdAt: Date.now()
    }
  };

  await db.put(params);

  return params.Item;
});