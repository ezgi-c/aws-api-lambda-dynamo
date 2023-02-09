import DynamoDB from "@aws-sdk/client-dynamodb";
import DynamoDBLib from "@aws-sdk/lib-dynamodb";

const { DynamoDBClient } = DynamoDB;
const ddbClient = new DynamoDBClient({ region: "us-west-2" });

export const handler = async (event) => {
  const person = JSON.parse(event.body);
  person.person_id = String(Math.ceil(Math.random() * 10000000000));

  const command = new DynamoDBLib.PutCommand({
    TableName: "People",
    Item: person,
  });

  await ddbClient.send(command);

  const response = {
    statusCode: 200,
    body: JSON.stringify(person),
  };

  return response;
};
