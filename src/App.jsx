import {  useState } from 'react';
import './App.css'
import DungeonGenerator from './DungeonGenerator';

export default function SortCustomList() {
  const [input, setInput] = useState("5, 3, 2, 8, 4, 5, 2, 1, 9, 5, 3");
  const [output, setOutput] = useState([]);

  const handleSort = () => {
    const numbers = input.split(",").map((num) => parseInt(num.trim(), 10));

    const frequencyMap = {};
    numbers.forEach((num) => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });

    const unique = [];
    const duplicates = [];

    Object.keys(frequencyMap)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((num) => {
        unique.push(num);
        const count = frequencyMap[num];
        if (count > 1) {
          for (let i = 1; i < count; i++) {
            duplicates.push(num);
          }
        }
      }); 

    const result = [...unique, ...duplicates];
    setOutput(result);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Custom Sort List</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Enter comma-separated numbers"
      />
      <button
        onClick={handleSort}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
      >
        Sort List
      </button>

      {output.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Output:</h3>
          <p>{output.join(", ")}</p>
        </div>
      )}
      <div className="text-center mt-4">
        <button ><DungeonGenerator/></button>
    </div>
    </div>
    
  );
}
