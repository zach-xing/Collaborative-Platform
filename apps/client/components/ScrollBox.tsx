import styled from "@emotion/styled";
import { Box } from "@mui/material";

const ScrollBox = styled(Box)`
  ::-webkit-scrollbar,
  ::-webkit-scrollbar-thumb {
    width: 16px;
    border-radius: 10px;
    background-clip: padding-box;
    border: 5px solid transparent;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0 10px;
    color: rgba(121, 121, 121, 0.5);
  }
`;

export default ScrollBox;
