import { useEffect } from "react";
import { useInputsStore } from "../stores/input-store-hooks";

// hook for registering keyboard input
export const useKeyPresses = (is_keyboard_enabled = true) => {
  const { update_movement } = useInputsStore();

  // TODO: Does handleKeyPress this need useCallaback?
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
