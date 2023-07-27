import React, { useState } from "react";
import Board from "../Board/Board";
import { Button } from "../Button/Button";
import s from "./Container.modules.scss";
import global_s from "../../style.modules.scss";

type boardSizeType = {
  width: number;
  height: number;
};
type sizeButtonsType = boardSizeType & { name: string };
export type eventButtonsType = "Run" | "Pause" | "Clear" | "End";
const DEFAULT_SPEED = 300;
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
  const [speed, setSpeed] = useState<number>(DEFAULT_SPEED);
  const [percent, setPercent] = useState<number>(0);
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
    setInfoField("Clear");
    setCurrentGameAction("Clear");
    setActiveActionsButton((event.target as HTMLButtonElement).name);
    setPercent(0);
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
  const handleIncreaseSpeed = () => {
    setSpeed(100);
  };
  const handleDecreaseSpeed = () => {
    setSpeed(1000);
  };
  const handleResetSpeed = () => {
    setSpeed(DEFAULT_SPEED);
  };

  const handleIncreasePercent = () => {
    if (currentGameAction === "Run") {
      return;
    }
    setPercent(30);
  };
  const handleDecreasePercent = () => {
    if (currentGameAction === "Run") {
      return;
    }
    setPercent(10);
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
      </div>
      <br />
      <div>
        <h2 style={{ textAlign: "center" }} data-testid="speed-title">
          Задержка: {speed}
        </h2>
        <Button
          onClick={handleIncreaseSpeed}
          name="increase-speed"
          data-testid="btn-increase-speed"
          className={100 === speed ? "active" : ""}
        >
          Быстро
        </Button>
        <Button
          onClick={handleDecreaseSpeed}
          name="decrease-speed"
          data-testid="btn-decrease-speed"
          className={1000 === speed ? "active" : ""}
        >
          Медленно
        </Button>
        <Button
          onClick={handleResetSpeed}
          name="reset-speed"
          data-testid="btn-reset-speed"
          className={DEFAULT_SPEED === speed ? "active" : ""}
        >
          Обычно
        </Button>
      </div>
      <div>
        <h2 style={{ textAlign: "center" }} data-testid="percent-title">
          Процент заполненности: {percent}
        </h2>
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={handleIncreasePercent}
            name="increase-speed"
            data-testid="btn-30-percent"
            className={30 === percent ? "active" : ""}
          >
            30
          </Button>
          <Button
            onClick={handleDecreasePercent}
            name="decrease-speed"
            data-testid="btn-10-percent"
            className={10 === percent ? "active" : ""}
          >
            10
          </Button>
        </div>
      </div>
      <br />
      <div
        style={{ color: "white", fontSize: 24 }}
        data-testid="numberfield-element"
      >
        {infoField}
      </div>
      <br />
      <Board
        {...boardSize}
        getSquareNumber={setInfoField}
        handleGameOver={handleGameOver}
        currentGameAction={currentGameAction}
        speed={speed}
        persent={percent}
      />
    </div>
  );
};
