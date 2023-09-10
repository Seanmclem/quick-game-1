import { create } from "zustand";
import { useEffect } from "react";

interface CharacterMovement {
  forward: boolean;
  backward: boolean;
  leftward: boolean;
  rightward: boolean;
  jump: boolean;
  run: boolean;
  update_movement: (movement: Partial<CharacterMovement>) => void;
}

// TODO:  update store from joystick input
// inputs like move direction, jump, run, etc, should be updatable from kb/mouse, touchscreen buttons/joystick, and a controller.

// mobile/touch may have additional on-screen input shortcuts, like quick menu access, etc.

// TODO: update store from touchscreen joystick input, trsting, at least basic 4/8 direction movement
// full 360 movement might be preferred... //
// !! TODO: ^ ask chat-gpt how to turn the Math.PI/2 stuff into x/y coordinate stuff

// Store for inputs
export const useInputsStore = create<CharacterMovement>()((set, state) => ({
  forward: false,
  backward: false,
  leftward: false,
  rightward: false,
  jump: false,
  run: false,
  update_movement: (movement: Partial<CharacterMovement>) =>
    set({ ...state, ...movement }),
}));

// hook for registering keyboard input
export const useKeyPresses = (is_keyboard_enabled = true) => {
  const { update_movement } = useInputsStore();

  const handleKeyPress = (event: KeyboardEvent, direction: "DOWN" | "UP") => {
    const is_pressed = direction === "DOWN";

    // console.log("key pressed", event.key);
    if (event.key === "ArrowUp" || event.key.toLocaleLowerCase() === "w") {
      update_movement({ forward: is_pressed });
    }

    if (event.key === "ArrowLeft" || event.key.toLocaleLowerCase() === "a") {
      update_movement({ leftward: is_pressed });
    }

    if (event.key === "ArrowDown" || event.key.toLocaleLowerCase() === "s") {
      update_movement({ backward: is_pressed });
    }

    if (event.key === "ArrowRight" || event.key.toLocaleLowerCase() === "d") {
      update_movement({ rightward: is_pressed });
    }

    if (event.key === "Shift") {
      update_movement({ run: is_pressed });
    }

    if (event.code === "Space") {
      update_movement({ jump: is_pressed });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => handleKeyPress(event, "DOWN");
  const handleKeyUp = (event: KeyboardEvent) => handleKeyPress(event, "UP");

  // Add keydown and keyup event listeners
  useEffect(() => {
    // remove event listeners first
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);

    // add event listeners if keyboard is enabled
    if (is_keyboard_enabled) {
      console.log("adding event listeners");
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [is_keyboard_enabled]);
};

// hook for handling all input setup/coordination, and returning the current input state, all in one
export const useInputs = () => {
  const { forward, backward, leftward, rightward, jump, run } = useInputsStore(
    (state) => state
  );

  useKeyPresses();

  return {
    forward,
    backward,
    leftward,
    rightward,
    jump,
    run,
  };
};
