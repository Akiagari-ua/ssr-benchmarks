import { FC } from 'react';

interface Props {
    title: string;
    text: string;
}

const PoetryPage:FC<Props> = ({ title, text }) => (
    <div className="text-center p-6">
    <h1 className="text-4xl font-bold mb-4">Random Poetry Generator</h1>
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-700 whitespace-pre-line">{text}</p>
  </div>
  );

  export default PoetryPage