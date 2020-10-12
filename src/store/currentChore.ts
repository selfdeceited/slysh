import type { IStateMessage } from "./stateMessage";
import { get, set } from "./localStorage.adapter";

type ChoreMessage = IStateMessage<string>;
const key = "slysh.currentChore";
export const getCurrentChore = async () => {
  return await get({ key } as ChoreMessage);
};

export const setCurrentChore = async (chore: string) => {
  const choreMessage: ChoreMessage = { value: chore, key };
  set(choreMessage);
};
