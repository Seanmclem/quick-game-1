import { Joystick } from "react-joystick-component";
import { useInputs, useInputsStore } from "../../stores/input-store-hooks";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

export const MovementJoystick = () => {
  const update_movement = useInputsStore((state) => state.update_movement);

  const on_move = (e: IJoystickUpdateEvent) => {
    // console.log(e);
    //   const foo = {
    //     type: "move",
    //     x: 0.145234375,
    //     y: -0.175625,
    //     direction: "BACKWARD",
    //     distance: 22.78972670012535,
    //   };

    const is_forward = ({ y }: IJoystickUpdateEvent) => (y ? y > 0.1 : false);
    const is_backward = ({ y }: IJoystickUpdateEvent) => (y ? y < -0.1 : false);

    const is_left = ({ x }: IJoystickUpdateEvent) => (x ? x < -0.1 : false);
    const is_right = ({ x }: IJoystickUpdateEvent) => (x ? x > 0.1 : false);

    const is_run = ({ distance }: IJoystickUpdateEvent) =>
      distance ? distance > 75 : false;

    const forward = is_forward(e);
    const backward = is_backward(e);
    const leftward = is_left(e);
    const rightward = is_right(e);
    const run = is_run(e);

    const any_pressed = forward || backward || leftward || rightward || run;

    if (is_forward(e)) {
      console.log("forward");
    }

    // prevents dude sinking and stuff when moving in dead-zone
    if (any_pressed) {
      update_movement({
        forward: is_forward(e),
        backward: is_backward(e),
        leftward: is_left(e),
        rightward: is_right(e),
        run: is_run(e),
      });
    }

    // greater than -0.20 and less than 0.20
    // const is_deadZone = (num) => num > -0.2 && num < 0.2;
  };

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
        // sticky={true}
        baseColor="red"
        stickColor="blue"
        move={on_move}
        stop={() =>
          update_movement({
            forward: false,
            backward: false,
            leftward: false,
            rightward: false,
            run: false,
          })
        }

        // pos={{ x: 100, y: 100 }}
      ></Joystick>
    </div>
  );
};
