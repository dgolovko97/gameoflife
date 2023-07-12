import React, { useState } from "react";
import { Board } from "../Board/Board";
import { Button } from "../Button/Button";
import s from "./Container.modules.scss";
import global_s from "../../style.modules.scss";

type boardSizeType = {
  width: number;
  height: number;
};
type sizeButtonsType = boardSizeType & { name: string };
type eventButtonsType = "Run" | "Pause" | "Stop";
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
  const eventButtons: eventButtonsType[] = ["Run", "Pause", "Stop"];
  const [boardSize, setBoardSize] = useState<boardSizeType>({
    width: 50,
    height: 30,
  });
  const [activeSizeButton, setActiveSizeButton] =
    useState<sizeButtonsType["name"]>("50x30");
  const [activeActionsButton, setActiveActionsButton] = useState<string>("");
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

  const handleSetAction = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }
    setActiveActionsButton(event.target.name);
    alert("Функционал в разработке");
  };

  const [squareNumber, setSquareNumber] = useState<number | null>(null);
  const getSquareNumber = (number: number) => setSquareNumber(number);

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
        {eventButtons.map((name) => {
          return (
            <Button
              onClick={handleSetAction}
              name={name}
              key={name}
              className={name === activeActionsButton ? "active" : ""}
            >
              {name}
            </Button>
          );
        })}
      </div>
      <Board {...boardSize} getSquareNumber={getSquareNumber} />
      <br />
      <div
        style={{ color: "white", fontSize: 24 }}
        data-testid="numberfield-element"
      >
        {squareNumber}
      </div>
    </div>
  );
};
