import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import { Joystick } from "react-joystick-component";
import { OptionsButton } from "./components/ui/OptionsButton";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Leva collapsed />
    {/* Canvas z-index is basically 0, so 1+ will overlay it */}
    <div style={{ position: "absolute", top: 200, zIndex: 10 }}>
      <Joystick
        size={100}
        // sticky={true}
        baseColor="red"
        stickColor="blue"
        move={(e) => {
          console.log(e);
          const foo = {
            type: "move",
            x: 0.145234375,
            y: -0.175625,
            direction: "BACKWARD",
            distance: 22.78972670012535,
          };

          const is_forward = ({ y }) => y > 0.2;
          const is_backward = ({ y }) => y < -0.2;

          const is_left = ({ x }) => x < -0.2;
          const is_right = ({ x }) => x > 0.2;

          const is_run = ({ distance }) => distance > 75;

          // greater than -0.20 and less than 0.20
          // const is_deadZone = (num) => num > -0.2 && num < 0.2;
        }}
        stop={() => null}

        // pos={{ x: 100, y: 100 }}
      ></Joystick>
    </div>

    <OptionsButton />

    <Canvas
      shadows
      camera={{
        fov: 65,
        near: 0.1,
        far: 1000,
        position: [0, 0, 0],
      }}
      onPointerDown={(e) => {
        console.dir(e);
        console.log(e.isDefaultPrevented(), e.isPropagationStopped());

        e.target.requestPointerLock();
      }}
    >
      <Experience />
    </Canvas>
  </>
);
