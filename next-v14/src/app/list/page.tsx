import TableComponent from "@/components/TableComponent";
import getGames from "@api/getGames";
// import CollapsibleComponent from "./CollapsibleComponent";

export default async function List() {
  const games = await getGames();

  return (
    <TableComponent
      data={games.map(({ id, description, title }) => [title, id, description])}
    />
  );
}
