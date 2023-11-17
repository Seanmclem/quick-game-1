import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.tsx";
import { Leva } from "leva";
import { OptionsButton } from "./components/ui/OptionsButton";
import { MovementJoystick } from "./components/controls/MovementJoystick";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Leva collapsed />
    {/* Canvas z-index is basically 0, so 1+ will overlay it */}

    <MovementJoystick />
    <OptionsButton />

    <div
      id="touch-square"
      style={{
        position: "absolute",
        right: "30px",
        top: "30px",
        height: 200,
        width: 200,
        backgroundColor: "red",
        zIndex: 2,
      }}
    ></div>

    <Canvas
      style={{ userSelect: "none" }}
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
