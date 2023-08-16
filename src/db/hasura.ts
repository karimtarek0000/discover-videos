const operationsDoc = `
    query MyQuery {
        users {
        id
        issuer
        publicAddress
        email
        }
    }
`;

async function fetchGraphQL(operationsDoc: any, operationName: any, variables: any) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_URL as string, {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET_KEY,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });

  return await result.json();
}

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    console.error(errors);
  }

  return data;
}
