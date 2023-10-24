import { useInputsStore } from "../stores/input-store-hooks";

// hook for handling all input setup/coordination, and returning the current input state, all in one
export const useInputListeners = () => {
  // useInputsStore initializes key listeners
  const { forward, backward, leftward, rightward, jump, run } = useInputsStore(
    (state) => state
  );

  return {
    forward,
    backward,
    leftward,
    rightward,
    jump,
    run,
  };
};
