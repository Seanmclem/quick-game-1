import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import Floor from "../../../example/Floor.jsx";
import Lights from "../../../example/Lights.jsx";
import Steps from "../../../example/Steps.jsx";
import Slopes from "../../../example/Slopes.jsx";
import RoughPlane from "../../../example/RoughPlane.jsx";
import RigidObjects from "../../../example/RigidObjects.jsx";
import FloatingPlatform from "../../../example/FloatingPlatform.jsx";
import DynamicPlatforms from "../../../example/DynamicPlatforms.jsx";
import ShotCube from "../../../example/ShotCube";
import { useControls } from "leva";
import { CharacterComponent } from "../../components/CharacterComponent.js";
import { Box } from "@react-three/drei";

// import { Box } from "@react-three/rapier";

export const LevelOne = () => {
  /**
   * Debug settings
   */
  const { physics } = useControls("World Settings", {
    physics: false,
  });

  return (
    <Physics debug={physics} timeStep="vary">
      <Lights />
      {/* Character */}
      <CharacterComponent />

      {/* Rough plan */}
      <RoughPlane />

      {/* <RigidBody>
        <Box position={[5, 1, 5]} />
      </RigidBody> */}

      {/* <CuboidCollider
        args={[5, 1, 5]}
        sensor
        onIntersectionEnter={() => console.log("Goal!")}
      /> */}

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
  );
};
