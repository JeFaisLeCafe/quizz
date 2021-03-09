import styled from "styled-components";
import { COLORS, FONT_SIZES } from "../../constants";

export const Title = styled.h1`
  font-family: "Roboto Condensed", sans-serif;
  margin: 20px 0;
  font-size: ${FONT_SIZES.TITLE};
  font-weight: bold;
  text-align: center;
  color: ${COLORS.PRIMARY};
`;
export const MyText = styled.p<{ textAlign?: string }>`
  font-family: "Roboto Condensed", sans-serif;
  margin: 0;
  font-size: ${FONT_SIZES.REGULAR};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  color: ${COLORS.PRIMARY};
`;
export const MyTextSecondary = styled.p<{ textAlign?: string }>`
  font-family: "Roboto Condensed", sans-serif;
  margin: 0;
  font-size: ${FONT_SIZES.REGULAR};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  color: ${COLORS.SECONDARY};
`;
