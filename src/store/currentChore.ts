import type { IStateMessage } from "../interfaces";
import { get, set } from "./localStorage.adapter";

export type ChoreMessage = IStateMessage<string>;
const key = "slysh.currentChore";
export const getCurrentChore = async () => {
  return await get({ key } as ChoreMessage);
};

export const setCurrentChore = async (chore: string) => {
  const choreMessage: ChoreMessage = { value: chore, key };
  await set(choreMessage);
};
