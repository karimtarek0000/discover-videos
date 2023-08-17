import { fetchGraphQL } from "./hasura";

export async function isNewUser(issuer: string, token: string) {
  const operationsDoc = `
      query MyQuery {
        users(where: {issuer: {_eq: "${issuer}" }}) {
          id
          email
          issuer
          publicAddress
        }
      }
  `;

  const { data } = await fetchGraphQL(operationsDoc, "MyQuery", {}, token);

  return data?.users?.length === 1;
}
