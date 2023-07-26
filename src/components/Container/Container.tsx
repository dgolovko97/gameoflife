import React, { FunctionComponent, useEffect } from "react";
import s from "./Container.modules.scss";
import global_s from "../../style.modules.scss";
import { Button } from "../Button/Button";
import { Board } from "../Board/Board";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/rootReducer";
import { getHistoryListThunk } from "../../thunk/thunkData";

export const Container: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {
    activeSizeButton,
    textInfo,
    gameAction,
    loadingHistory,
    historyInfo,
  } = useSelector((state: State) => state);
  const handleSetBoardSize = (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }
    dispatch({
      type: "SET_BOARD_SIZE",
      payload: {
        width: Number(event.target.dataset.width),
        height: Number(event.target.dataset.height),
        buttonName: event.target.name,
      },
    });
  };
  const handleGameAction = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }
    dispatch({
      type: "SET_GAME_ACTION",
      payload: { action: event.target.name },
    });

    if (event.target.name === "Run" && gameAction !== "Run") {
      const id = setInterval(() => {
        dispatch({
          type: "RECALCULATION_BOARD",
        });
      }, 300);
      dispatch({ type: "SET_INTERVAL_ID", payload: { timerId: id } });
    }
  };
  useEffect(() => {
    dispatch(getHistoryListThunk());
  }, []);
  return (
    <div className={s.container} data-testid="container-element">
      <div className={`${s["set-board-size"]} ${global_s.mb}`}>
        <Button
          className={"50x30" === activeSizeButton ? "active" : ""}
          name="50x30"
          onClick={handleSetBoardSize}
          data-width={50}
          data-height={30}
        >
          {"50x30"}
        </Button>
        <Button
          className={"70x50" === activeSizeButton ? "active" : ""}
          name="70x50"
          onClick={handleSetBoardSize}
          data-width={70}
          data-height={50}
        >
          {"70x50"}
        </Button>
        <Button
          className={"100x80" === activeSizeButton ? "active" : ""}
          name="100x80"
          onClick={handleSetBoardSize}
          data-width={100}
          data-height={80}
        >
          {"100x80"}
        </Button>
      </div>
      <div className={`${s["board-actions"]} ${global_s.mb}`}>
        <Button
          name="Run"
          data-testid="btn-run"
          onClick={handleGameAction}
          className={"Run" === gameAction ? "active" : ""}
        >
          Run
        </Button>
        <Button
          name="Pause"
          data-testid="btn-pause"
          onClick={handleGameAction}
          className={"Pause" === gameAction ? "active" : ""}
        >
          Pause
        </Button>
        <Button
          name="Clear"
          data-testid="btn-clear"
          onClick={handleGameAction}
          className={"Clear" === gameAction ? "active" : ""}
        >
          Clear
        </Button>
      </div>
      <br />
      <div
        style={{ color: "white", fontSize: 24 }}
        data-testid="numberfield-element"
      >
        {textInfo}
      </div>
      <br />
      <Board />
      <br />{" "}
      <div
        style={{ color: "white", fontSize: 24 }}
        data-testid="numberfield-element"
      >
        {loadingHistory ? "LOADING..." : historyInfo}
      </div>
    </div>
  );
};
