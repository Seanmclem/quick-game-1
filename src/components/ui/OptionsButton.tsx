import { styled } from "styled-components";
import { GenericButton } from "./GenericButton";
import { useInputsStore } from "../../stores/input-store-hooks";

export const OptionsButton = () => {
  const update_movement = useInputsStore((state) => state.update_movement);

  return (
    <CircleButton
      onTouchStart={(e) => {
        update_movement({ jump: true });
        console.log("jumping");

        e.stopPropagation();

        setTimeout(() => {
          update_movement({ jump: false });
        }, 400);
      }}
      // onTouchEnd={(e) => {
      //   update_movement({ jump: false });
      //   console.log("not jumping");

      //   e.stopPropagation();
      // }}
    >
      {/* <div style={{ userSelect: "none" }}>J</div> */}
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
  user-select: none;
`;
