

import gqlFetch from "./gqlFetch";

const query = `
  query GetGames(
    $offset: Int = 0
    $limit: Int = 400
) {
    games(
        limit: $limit
        offset: $offset
    ) {
        games {
            id
          	title
          description
        }
    }
}
`;

interface Games {
  games: {
    id: string
    title: string
    description: string
  }[]
}

async function getGames():Promise<Games['games']> {
    const {data} = await gqlFetch<Games>({
        query
    })

    return data?.games || []
}

export default getGames

