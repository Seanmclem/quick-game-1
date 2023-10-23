import CharacterController from "../CharacterController";
import CharacterModel from "../CharacterModel.jsx";

export const CharacterComponent = () => {
  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    { name: "triggle", keys: ["KeyF"] },
    // q: what is a triggle?
    // a: a triggle is a trigger that is also a toggle
    // q: what is a trigger?
    // a: a trigger is a button that is not a toggle
    // whoa
  ];

  return (
    <CharacterController>
      {/* Replace your model here */}
      <CharacterModel />
    </CharacterController>
  );
};
