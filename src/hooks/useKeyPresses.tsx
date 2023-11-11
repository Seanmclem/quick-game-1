import { useEffect } from "react";
import { useInputsStore } from "../stores/input-store-hooks";

const getDegreesFromDirections = (
  forward: boolean,
  backward: boolean,
  leftward: boolean,
  rightward: boolean
) => {
  // individual directions
  // forward
  if (forward && !backward && !leftward && !rightward) {
    return 0;
  }
  // backward
  if (!forward && backward && !leftward && !rightward) {
    return 180;
  }
  // leftward
  if (!forward && !backward && leftward && !rightward) {
    return 90;
  }
  // rightward
  if (!forward && !backward && !leftward && rightward) {
    return -90;
  }

  // combinations of directions
  // forward + leftward
  if (forward && !backward && leftward && !rightward) {
    return 45;
  }
  // forward + rightward
  if (forward && !backward && !leftward && rightward) {
    return -45;
  }
  // backward + leftward
  if (!forward && backward && leftward && !rightward) {
    return 135;
  }
  // backward + rightward
  if (!forward && backward && !leftward && rightward) {
    return -135;
  }

  return undefined;
};

// Moved these outside of the hook to prevent reinitialization to false.
// could use useRef instead, but this is simpler
let forward = false;
let backward = false;
let leftward = false;
let rightward = false;
//

// hook for registering keyboard input
export const useKeyPresses = (is_keyboard_enabled = true) => {
  const { update_movement } = useInputsStore();

  // TODO: Does handleKeyPress this need useCallaback?
  // OR: Just move most code of the functions out of the hook, in separate functions
  const handleKeyPress = (event: KeyboardEvent, direction: "DOWN" | "UP") => {
    const is_pressed = direction === "DOWN";

    const jump_pressed = event.code === "Space";
    const run_pressed = event.key === "Shift";
    // TODO: add more keycode variables ^ like these

    if (jump_pressed || run_pressed) {
      if (event.key === "Shift") {
        update_movement({ run: is_pressed });
      }

      if (event.code === "Space") {
        update_movement({ jump: is_pressed });
      }

      return false;
    }

    if (event.key === "ArrowUp" || event.key.toLocaleLowerCase() === "w") {
      forward = is_pressed;
    }

    if (event.key === "ArrowLeft" || event.key.toLocaleLowerCase() === "a") {
      leftward = is_pressed;
    }

    if (event.key === "ArrowDown" || event.key.toLocaleLowerCase() === "s") {
      backward = is_pressed;
    }

    if (event.key === "ArrowRight" || event.key.toLocaleLowerCase() === "d") {
      rightward = is_pressed;
    }

    // update movement degrees
    const new_movement_degrees = getDegreesFromDirections(
      forward,
      backward,
      leftward,
      rightward
    );
    update_movement({ movement_degrees: new_movement_degrees });
  };

  // Funnel all keydown/keyup events into handleKeyPress
  const handleKeyDown = (event: KeyboardEvent) => handleKeyPress(event, "DOWN");
  const handleKeyUp = (event: KeyboardEvent) => handleKeyPress(event, "UP");

  // Attach keydown and keyup event listeners
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
