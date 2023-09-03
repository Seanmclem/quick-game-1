import { Grid } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import Floor from "../example/Floor.jsx";
import Lights from "../example/Lights.jsx";
import Steps from "../example/Steps.jsx";
import Slopes from "../example/Slopes.jsx";
import RoughPlane from "../example/RoughPlane.jsx";
import RigidObjects from "../example/RigidObjects.jsx";
import FloatingPlatform from "../example/FloatingPlatform.jsx";
import DynamicPlatforms from "../example/DynamicPlatforms.jsx";
import ShotCube from "../example/ShotCube";
import { useControls } from "leva";
import { CharacterComponent } from "./components/CharacterComponent";

export default function Experience() {
  /**
   * Debug settings
   */
  const { physics } = useControls("World Settings", {
    physics: false,
  });

  return (
    <>
      <Perf position="top-left" />

      <Grid
        args={[300, 300]}
        sectionColor={"lightgray"}
        cellColor={"gray"}
        position={[0, -0.99, 0]}
      />

      <Lights />

      <Physics debug={physics} timeStep="vary">
        {/* Character */}
        <CharacterComponent />

        {/* Rough plan */}
        <RoughPlane />

        {/* Slopes and stairs */}
        <Slopes />

        {/* Small steps */}
        <Steps />

        {/* Rigid body objects */}
        <RigidObjects />

        {/* Floating platform */}
        <FloatingPlatform />

        {/* Dynamic platforms */}
        <DynamicPlatforms />

        {/* Floor */}
        <Floor />

        {/* Shoting cubes */}
        <ShotCube />
      </Physics>
    </>
  );
}
