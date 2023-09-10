import { styled } from "styled-components";
import { GenericButton } from "./GenericButton";
import { useInputsStore } from "../../stores/input-store-hooks";

export const OptionsButton = () => {
  const update_movement = useInputsStore((state) => state.update_movement);

  return (
    <CircleButton
      onClick={(e) => {
        update_movement({ jump: true });
        setTimeout(() => {
          update_movement({ jump: false });
        }, 100);
      }}
    >
      <div>J</div>
    </CircleButton>
  );
};

export const CircleButton = styled(GenericButton)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: darkblue;

  position: absolute;
  color: white;
  right: 75px;
  bottom: 100px;
`;
