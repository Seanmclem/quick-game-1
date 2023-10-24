import { create } from "zustand";

interface CharacterInputs {
  forward: boolean;
  backward: boolean;
  leftward: boolean;
  rightward: boolean;
  jump: boolean;
  run: boolean;
  update_movement: (movement: Partial<CharacterInputs>) => void;
}

// Store for inputs
export const useInputsStore = create<CharacterInputs>()((set) => ({
  forward: false,
  backward: false,
  leftward: false,
  rightward: false,
  jump: false,
  run: false,
  update_movement: (movement: Partial<CharacterInputs>) => {
    return set((state) => {
      console.log(movement);
      return { ...state, ...movement };
    });
  },
}));
