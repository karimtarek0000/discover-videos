import { fetchGraphQL } from "./hasura";

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
