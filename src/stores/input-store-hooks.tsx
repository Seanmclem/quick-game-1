import { create } from "zustand";

interface CharacterInputs {
  movement_degrees?: number;
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
  movement_degrees: undefined,
  forward: false,
  backward: false,
  leftward: false,
  rightward: false,
  jump: false,
  run: false,
  update_movement: (movement: Partial<CharacterInputs>) => {
    return set((state) => {
      // console.log(movement);
      if (movement.jump) {
        console.log("jump movement", movement.movement_degrees);
      } else {
        console.log("movement", movement.movement_degrees);
      }
      return { ...state, ...movement };
    });
  },
}));
