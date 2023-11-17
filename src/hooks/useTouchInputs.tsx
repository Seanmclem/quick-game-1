import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { useInputsStore } from "../stores/input-store-hooks";

const getDegreesFromDirections = (x: number, y: number) => {
  let radians = Math.atan2(y, x);

  let degrees = (radians * (180 / Math.PI) - 90) % 360;
  if (degrees < 0) {
    degrees += 360;
  }

  // remove decimals from degrees
  degrees = Math.round(degrees);
  console.log({ radians, degrees });

  return {
    degrees,
    radians,
  };
};

export const useTouchInputs = () => {
  const update_movement = useInputsStore((state) => state.update_movement);
  const movement_degrees = useInputsStore((state) => state.movement_degrees);

  const handleTouchMove = (e: IJoystickUpdateEvent) => {
    const { x, y, distance } = e;

    // Depth of deadzone
    if (distance && distance < 25) {
      return;
    }

    console.log({ x, y });

    if (movement_degrees !== undefined && !x && !y) {
      update_movement({ movement_degrees: undefined });
      return;
    }

    const { degrees } = getDegreesFromDirections(x as number, y as number);

    // if degrees is more than 10 different from previous movement_degrees, update
    // hack for weird sinking bug
    // TODO: fix this for real,, in character controller
    if (
      movement_degrees == undefined ||
      Math.abs(degrees - movement_degrees) > 10
    ) {
      update_movement({ movement_degrees: degrees });
    }
  };

  const handleMoveEnd = () => {
    update_movement({ movement_degrees: undefined });
  };

  const handleStickMove = (e: IJoystickUpdateEvent) => {
    if (e.type === "stop") {
      handleMoveEnd();
      return;
    } else {
      handleTouchMove(e);
    }
  };

  return {
    handleMoveEnd,
    handleStickMove,
  };
};
