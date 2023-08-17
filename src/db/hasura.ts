export async function fetchGraphQL(
  operationsDoc: any,
  operationName: any,
  variables: any,
  token: string
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_URL as string, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });

  return await result.json();
}
