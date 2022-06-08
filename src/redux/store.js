import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game/GameSlice";

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
