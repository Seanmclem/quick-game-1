import { useEffect } from "react";
import { useInputsStore } from "../stores/input-store-hooks";

const getDegreesFromDirections = (
  forward: boolean,
  backward: boolean,
  leftward: boolean,
  rightward: boolean
) => {
  if (forward && !backward && !leftward && !rightward) {
    // just forward
    //console.log("setting degrees");
    return 0;
  }
  if (!forward && backward && !leftward && !rightward) {
    // just backward
    //console.log("setting degrees");

    return 180;
  }
  if (!forward && !backward && leftward && !rightward) {
    // just left
    //console.log("setting degrees");

    return 90;
  }
  if (!forward && !backward && !leftward && rightward) {
    // just right
    //console.log("setting degrees");

    return -90;
  }

  if (forward && !backward && leftward && !rightward) {
    // forward and left
    //console.log("setting degrees");

    return 45;
  }
  if (forward && !backward && !leftward && rightward) {
    // forward and right
    //console.log("setting degrees");

    return -45;
  }
  if (!forward && backward && leftward && !rightward) {
    // backward and left
    //console.log("setting degrees");

    return 135;
  }
  if (!forward && backward && !leftward && rightward) {
    // backward and right\
    //console.log("setting degrees");

    return -135;
  }

  //console.log("setting undefined degrees");//not the culprit
  return undefined;
};

// hook for registering keyboard input
export const useKeyPresses = (is_keyboard_enabled = true) => {
  const { update_movement, movement_degrees } = useInputsStore();

  // NOTES:
  // Movement-degrees are always 0 or direction after un_press, and never undefined apparently
  // need default undefined and, set back to undefined if no movement pressed

  // TODO: Does handleKeyPress this need useCallaback?
  const handleKeyPress = (event: KeyboardEvent, direction: "DOWN" | "UP") => {
    let forward = false;
    let backward = false;
    let leftward = false;
    let rightward = false;

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
