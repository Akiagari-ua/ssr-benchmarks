import { API_ENDPOINT } from "./constants";

type GqlVariables = { [key: string]: unknown };

interface GqlResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

async function gqlFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: GqlVariables;
}): Promise<GqlResponse<T>> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    return { errors: [{ message: (error as Error).message }] };
  }
}

export default gqlFetch;
