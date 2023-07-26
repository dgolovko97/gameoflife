import React, { useState } from "react";
import Board from "../Board/Board";
import { Button } from "../Button/Button";
import s from "./Container.modules.scss";
import global_s from "../../style.modules.scss";
import { CBoard } from "../Board/CBoard";

type boardSizeType = {
  width: number;
  height: number;
};
type sizeButtonsType = boardSizeType & { name: string };
export type eventButtonsType = "Run" | "Pause" | "Clear" | "End";
export const Container = () => {
  const sizeButtons: sizeButtonsType[] = [
    {
      width: 50,
      height: 30,
      name: "50x30",
    },
    {
      width: 70,
      height: 50,
      name: "70x50",
    },
    {
      width: 100,
      height: 80,
      name: "100x80",
    },
  ];
  const [boardSize, setBoardSize] = useState<boardSizeType>({
    width: 50,
    height: 30,
  });
  const [currentGameAction, setCurrentGameAction] =
    useState<eventButtonsType>("Pause");
  const [activeSizeButton, setActiveSizeButton] =
    useState<sizeButtonsType["name"]>("50x30");
  const [activeActionsButton, setActiveActionsButton] =
    useState<string>("Pause");
  const [showBoard, setShowBoard] = useState(true);
  const handleSetBoardSize = (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }
    setBoardSize({
      width: Number(event.target.dataset.width),
      height: Number(event.target.dataset.height),
    });
    setActiveSizeButton(event.target.name);
  };
  const handleClear = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    if (currentGameAction === "Clear") {
      return;
    }
    setInfoField("Clear");
    setCurrentGameAction("Clear");
    setActiveActionsButton((event.target as HTMLButtonElement).name);
  };
  const handleRun = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    if (currentGameAction === "Run") {
      return;
    }
    setInfoField("Running...");
    setCurrentGameAction("Run");
    setActiveActionsButton((event.target as HTMLButtonElement).name);
  };

  const handlePause = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    if (currentGameAction === "Pause") {
      return;
    }
    setInfoField("Pause");
    setCurrentGameAction("Pause");
    setActiveActionsButton((event.target as HTMLButtonElement).name);
  };

  const handleGameOver = (): void => {
    setCurrentGameAction("Pause");
    setActiveActionsButton("Pause");
    setInfoField("Game Over :(");
  };

  const handleDeleteBoard = () => {
    setShowBoard(!showBoard);
  };

  const [infoField, setInfoField] = useState<string | number>(0);

  return (
    <div className={s.container} data-testid="container-element">
      <div className={`${s["set-board-size"]} ${global_s.mb}`}>
        {sizeButtons.map((button) => {
          return (
            <Button
              className={button.name === activeSizeButton ? "active" : ""}
              name={button.name}
              onClick={handleSetBoardSize}
              data-width={button.width}
              data-height={button.height}
              key={button.name}
            >
              {button.name}
            </Button>
          );
        })}
      </div>
      <div className={`${s["board-actions"]} ${global_s.mb}`}>
        <Button
          onClick={handleRun}
          name="Run"
          className={"Run" === activeActionsButton ? "active" : ""}
          data-testid="btn-run"
        >
          Run
        </Button>
        <Button
          onClick={handlePause}
          name="Pause"
          className={"Pause" === activeActionsButton ? "active" : ""}
          data-testid="btn-pause"
        >
          Pause
        </Button>
        <Button
          onClick={handleClear}
          name="Clear"
          className={"Clear" === activeActionsButton ? "active" : ""}
          data-testid="btn-clear"
        >
          Clear
        </Button>
        <Button
          onClick={handleDeleteBoard}
          name="Clear"
          className={"Clear" === activeActionsButton ? "active" : ""}
          data-testid="btn-clear"
        >
          {showBoard ? "Delete" : "Show"} Board
        </Button>
      </div>
      <br />
      <div
        style={{ color: "white", fontSize: 24 }}
        data-testid="numberfield-element"
      >
        {infoField}
      </div>
      <br />
      {showBoard && (
        <CBoard
          {...boardSize}
          getSquareNumber={setInfoField}
          handleGameOver={handleGameOver}
          currentGameAction={currentGameAction}
        />
      )}
    </div>
  );
};
