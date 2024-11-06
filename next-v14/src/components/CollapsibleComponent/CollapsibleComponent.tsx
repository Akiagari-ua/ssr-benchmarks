import { FC } from "react";

interface SubItem {
  title: string;
}

interface Item {
  title: string;
  subItems?: SubItem[];
}

interface Props {
  title: string;
  items: Item[];
}

const CollapsibleComponent: FC<Props> = ({ title, items }) => {
  return (
    <div className="p-4 max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="w-full flex items-center justify-between text-lg font-semibold text-gray-800 mb-2">
        <span className="text-blue-600">{title}</span>
        <div className="w-[30px] ">
          <svg
            className="w-6 h-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 2H18C19.1 2 20 2.9 20 4V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2ZM6 4V20H18V4H6ZM8 6H16V8H8V6ZM8 10H12V12H8V10Z" />
          </svg>
        </div>
      </div>
      <div className="mt-2">
        <ul className="space-y-2 text-gray-700">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 5C3.45 5 3 5.45 3 6V16H21V6C21 5.45 20.55 5 20 5H4ZM4 18V17H20V18C20 18.55 19.55 19 19 19H5C4.45 19 4 18.55 4 18ZM6 7H18V14H6V7Z" />
              </svg>
              <div>
                <span className="font-semibold">{item.title}</span>
                {item.subItems && (
                  <ul className="pl-8 mt-1 space-y-1">
                    {" "}
                    {/* Увеличен отступ для подэлементов */}
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className="flex items-start">
                        <svg
                          className=" mr-2 text-purple-500 mt-0.5" // Увеличение подиконки до около 24px
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M3 10l7-7 7 7H3z" />
                        </svg>
                        {subItem.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default CollapsibleComponent;
