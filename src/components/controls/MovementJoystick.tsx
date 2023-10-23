import { Joystick } from "react-joystick-component";
import { useInputsStore } from "../../stores/input-store-hooks";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

export const MovementJoystick = () => {
  const update_movement = useInputsStore((state) => state.update_movement);
  const forward = useInputsStore((state) => state.forward);
  const backward = useInputsStore((state) => state.backward);
  const leftward = useInputsStore((state) => state.leftward);
  const rightward = useInputsStore((state) => state.rightward);
  const run = useInputsStore((state) => state.run);

  const on_move = (e: IJoystickUpdateEvent) => {
    const is_forward = ({ y }: IJoystickUpdateEvent) => (y ? y > 0.1 : false);
    const is_backward = ({ y }: IJoystickUpdateEvent) => (y ? y < -0.1 : false);

    const is_left = ({ x }: IJoystickUpdateEvent) => (x ? x < -0.1 : false);
    const is_right = ({ x }: IJoystickUpdateEvent) => (x ? x > 0.1 : false);

    const is_run = ({ distance }: IJoystickUpdateEvent) =>
      distance ? distance > 75 : false;

    const moving_forward = is_forward(e);
    const moving_backward = is_backward(e);
    const moving_leftward = is_left(e);
    const moving_rightward = is_right(e);
    const moving_run = is_run(e);

    // const any_pressed = forward || backward || leftward || rightward || run;

    if (forward !== moving_forward) {
      console.log({ forward, moving_forward });

      update_movement({ forward: moving_forward });
    }
    if (backward !== moving_backward) {
      update_movement({ backward: moving_backward });
    }
    if (leftward !== moving_leftward) {
      update_movement({ leftward: moving_leftward });
    }
    if (rightward !== moving_rightward) {
      update_movement({ rightward: moving_rightward });
    }
    if (run !== moving_run) {
      update_movement({ run: moving_run });
    }
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
