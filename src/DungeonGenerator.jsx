import React, { useState } from "react";

export default function DungeonGenerator() {
  const [players, setPlayers] = useState(4);
  const [dungeon, setDungeon] = useState([]);

  const generateDungeon = () => {
    const numPlayers = Math.max(1, Math.min(8, parseInt(players, 10)));
    const dungeonLength = Math.max(14, numPlayers * 4);
    const arenaCount = Math.max(1, Math.floor(numPlayers / 2));

    const fixedStart = ["SHRINE"];
    const fixedEnd = ["BOSS", "TREASURE"];
    const arenaBlocks = [];

    for (let i = 0; i < arenaCount; i++) {
      arenaBlocks.push(["CROSSROADS", "SHRINE", "ARENA", "TREASURE"]);
    }

    const roomsUsed = fixedStart.length + fixedEnd.length + arenaBlocks.length * 4;
    const remainingCorridors = dungeonLength - roomsUsed;

    const corridorSpread = Array(remainingCorridors).fill("CORRIDOR");

    // Distribute corridor segments
    const result = [...fixedStart];

    // Distribute corridors evenly between arena blocks
    let segments = arenaBlocks.length + 1;
    let corridorsPerSegment = Math.floor(remainingCorridors / segments);
    let extraCorridors = remainingCorridors % segments;

    const distributeCorridors = (count) => Array(count).fill("CORRIDOR");

    // First segment
    result.push(...distributeCorridors(corridorsPerSegment + (extraCorridors-- > 0 ? 1 : 0)));

    for (let i = 0; i < arenaBlocks.length; i++) {
      result.push(...arenaBlocks[i]);
      result.push(...distributeCorridors(corridorsPerSegment + (extraCorridors-- > 0 ? 1 : 0)));
    }

    result.push(...fixedEnd);
    setDungeon(result);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Dungeon Generator</h2>
      <label className="block mb-2">Enter number of players (1–8):</label>
      <input
        type="number"
        min="1"
        max="8"
        value={players}
        onChange={(e) => setPlayers(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={generateDungeon}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Generate Dungeon
      </button>

      {dungeon.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Dungeon Layout:</h3>
          <ol className="list-decimal list-inside space-y-1">
  {dungeon.map((room, index) => (
    <li key={`room-${index}`}>{room}</li>
  ))}
</ol>

        </div>
      )}
    </div>
  );
}
