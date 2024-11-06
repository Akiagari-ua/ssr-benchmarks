import gqlFetch from "./gqlFetch";

const query = `
  query GetRelevantLocale {
    relevantLocale {
        locale
    }
  }
`;

interface RelvantLocale {
  relevantLocale: {
    locale:string
  }
}

async function getRelevantLocale():Promise<string> {
    const {data} = await gqlFetch<RelvantLocale>({
        query
    })

    return data?.relevantLocale.locale || 'en'
}

export default getRelevantLocale