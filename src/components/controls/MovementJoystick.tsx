import { Joystick } from "react-joystick-component";
import { useTouchInputs } from "../../hooks/useTouchInputs";

export const MovementJoystick = () => {
  const { handleMoveEnd, handleStickMove } = useTouchInputs();

  return (
    <div
      style={{
        position: "absolute",
        bottom: 200,
        left: 75,
        zIndex: 10,
        userSelect: "none",
      }}
    >
      <Joystick
        size={100}
        baseColor="red"
        stickColor="blue"
        move={handleStickMove}
        stop={handleMoveEnd}

        // pos={{ x: 100, y: 100 }}
      ></Joystick>
    </div>
  );
};
