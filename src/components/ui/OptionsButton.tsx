import { styled } from "styled-components";
import { GenericButton } from "./GenericButton";

export const OptionsButton = () => {
  return (
    <CircleButton
      onClick={(e) => {
        console.log("Options button clicked");
      }}
    >
      ⏸
    </CircleButton>
  );
};

export const CircleButton = styled(GenericButton)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: lightblue;

  position: absolute;

  top: 10px;
  right: 47%;
`;
