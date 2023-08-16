export async function fetchGraphQL(operationsDoc: any, operationName: any, variables: any) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_URL as string, {
    method: "POST",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImthcmltIiwiaWF0IjoxNjkyMTgwNzczLCJleHAiOjE2OTI2MTI3OTksImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLXVzZXItaWQiOiJ0ZXN0aW5nIn19.kz82I4zU7_3oQEf7GGkwwDBwy4m0iTKR1Xc-AAFyg94`,
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

  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    console.error(errors);
  }

  return data;
}
