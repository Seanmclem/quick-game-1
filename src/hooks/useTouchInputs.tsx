import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { useInputsStore } from "../stores/input-store-hooks";

const getDegreesFromDirections = (x: number, y: number) => {
  // individual directions
  // if (x === 0 && y === 0) {
  //     return undefined;
  // }

  let radians = Math.atan2(y, x);
  let degrees = radians * (180 / Math.PI);

  if (degrees < 0) {
    degrees += 360;
  }

  return {
    degrees,
    radians,
  };
};

export const useTouchInputs = () => {
  const update_movement = useInputsStore((state) => state.update_movement);
  const movement_degrees = useInputsStore((state) => state.movement_degrees);

  const handleTouchMove = (e: IJoystickUpdateEvent) => {
    const { x, y } = e;

    if (movement_degrees !== undefined && !x && !y) {
      update_movement({ movement_degrees: undefined });
      return;
    }

    const { degrees } = getDegreesFromDirections(x as number, y as number);

    if (movement_degrees !== degrees) {
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
