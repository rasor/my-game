import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";

const Tab2_5: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab Two</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <GameGenerator />      
      </IonContent>
    </IonPage>
  );
};

export default Tab2_5;

/** https://jscomplete.com/playground/rs3.5 */
interface Dictionary {
  [key: string]: string;
};

const GameStatus: Dictionary = {
  NEW: 'NEW',
  CHALLENGE: 'CHALLENGE',
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST',
};

const CellStatus: Dictionary = {
  NORMAL: 'white',
  HIGHLIGHT: 'lightblue',
  CORRECT: 'lightgreen',
  WRONG: 'pink',
};

const Messages: Dictionary = {
  NEW: 'You will have a few seconds to memorize the blue random cells',
  CHALLENGE: 'Remember these blue cells now',
  PLAYING: 'Which cells were blue?',
  WON: 'Victory!',
  LOST: 'Game Over',
};

const Cell: React.FC<{width: number;}> = ({ width }) => {
  const cellStatus = CellStatus.NORMAL;
  return (
    <div
      className="cell"
      style={{ width: `${width}%`, backgroundColor: cellStatus }}
    />
  );
};

const Footer: React.FC<{gameStatus: string; startGame(): void;}> = ({ gameStatus, startGame }) => {
  return (
    <>
      <div className="message">{Messages[gameStatus]}</div>
      <div className="button" onClick={startGame}>
        <button>Start Game</button>
      </div>
    </>
  );
};

const GameSession: React.FC<{cellIds: number[]; challengeCellIds: number[]; cellWidth: number;}> = ({
  cellIds,
  //challengeCellIds,
  cellWidth,
  //challengeSize,
  //challengeSeconds,
  //playSeconds,
  //maxWrongAttempts,
}) => {
  const [gameStatus, setGameStatus] = useState(GameStatus.NEW);
  //const [pickedCellIds, setPickedCellIds] = useState([]);
  //const [countdown, setCountdown] = useState(playSeconds);
  
  return (
    <div className="game">
      <div className="grid">
        {cellIds.map(cellId => (
          <Cell 
            key={cellId} 
            width={cellWidth} 
          />
        ))}
      </div>
      <Footer
        gameStatus={gameStatus}
        startGame={() => setGameStatus(GameStatus.CHALLENGE)}
      />
    </div>
  );
};

const GameGenerator: React.FC = () => {
  const gridSize = 5;
  const challengeSize: number = 6;
  const cellIds = utils.createArray(gridSize * gridSize);
  const cellWidth = 100 / gridSize;
  const challengeCellIds: number[] = utils.sampleArray(cellIds, challengeSize);

  return (
    <GameSession
      cellIds={cellIds}
      challengeCellIds={challengeCellIds}
      cellWidth={cellWidth}
      //challengeSize={challengeSize}
      //challengeSeconds={3}
      //playSeconds={10}
      //maxWrongAttempts={3}
    />
  );
};

/** https://jscomplete.com/playground/rs3.1 */
// Math science
const utils = {
  /* Create an array based on a numeric size property.
     Example: createArray(5) => [0, 1, 2, 3, 4] */
  createArray: (size: number) => Array.from({ length: size }, (_, i) => i),

  /* Pick random elements from origArray up to sampleSize
     And use them to form a new array.
     Example: sampleArray([9, 12, 4, 7, 5], 3) => [12, 7, 5] */
  sampleArray: (origArray: number[], sampleSize: number) => {
    const copy = origArray.slice(0);
    const sample = [];
    for (let i = 0; i < sampleSize && i < copy.length; i++) {
      const index = Math.floor(Math.random() * copy.length);
      sample.push(copy.splice(index, 1)[0]);
    }
    return sample;
  },

  /* Given a srcArray and a crossArray, count how many elements 
     in srcArray exist or do not exist in crossArray.
     Returns an array like [includeCount, excludeCount]
     Example: arrayCrossCounts([0, 1, 2, 3, 4], [1, 3, 5]) => [2, 3] */
  arrayCrossCounts: (srcArray: number[], crossArray: number[]) => {
    let includeCount = 0;
    let excludeCount = 0;
    srcLoop: for (let s = 0; s < srcArray.length; s++) {
      for (let c = 0; c < crossArray.length; c++) {
        if (crossArray[c] === srcArray[s]) {
          includeCount += 1;
          continue srcLoop;
        }
      }
      excludeCount += 1;
    }
    return [includeCount, excludeCount];
  },
};