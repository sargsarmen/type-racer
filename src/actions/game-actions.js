import { gameStore } from "../stores";
import { getRandomText } from "../services/game-service";

export const startNewGame = async () => {
  const response = await getRandomText();
  if (!response.hasError) {
    gameStore.start(response.payload);
  }
};
