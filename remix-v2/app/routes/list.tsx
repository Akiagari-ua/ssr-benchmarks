import  CollapsibleComponent, { mockData } from "@pages/CollapsibleComponent";
// import CollapsibleComponent from "./CollapsibleComponent";

export default function List() {
  return <CollapsibleComponent title="Test Title" items={mockData} />;
}
