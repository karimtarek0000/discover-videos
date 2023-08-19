import { MetaData } from "@/types";
import { fetchGraphQL } from "./hasura";

export async function createNewUser(metaData: MetaData, token: string) {
  const operationsDoc = `
    mutation CreateNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
      insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
        affected_rows
      }
    }
  `;

  const { email, issuer, publicAddress } = metaData;

  const { data } = await fetchGraphQL(
    operationsDoc,
    "CreateNewUser",
    {
      email,
      issuer,
      publicAddress,
    },
    token
  );

  return data;
}

export async function isNewUser(issuer: string, token: string) {
  const operationsDoc = `
      query IsNewUserQuery($issuer: String!) {
        users(where: {issuer: {_eq: $issuer }}) {
          id
          email
          issuer
          publicAddress
        }
      }
  `;

  const { data } = await fetchGraphQL(
    operationsDoc,
    "IsNewUserQuery",
    {
      issuer,
    },
    token
  );

  return data?.users?.length === 0;
}
