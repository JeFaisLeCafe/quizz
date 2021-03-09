import styled from "styled-components";
import { COLORS } from "../../constants";

export const MyButton = styled.div<{ disabled?: boolean }>`
  border-radius: 4px;
  background-color: ${COLORS.SUCCESS};
  color: ${COLORS.PRIMARY};
  padding: 20px;
  text-align: center;
  margin: 10px 0;
  min-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
    opacity: 0.9;
  }
  ${(props) => (props.disabled ? `pointer-events: none;` : "")}
`;
