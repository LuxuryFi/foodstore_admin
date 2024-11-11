import styled from 'styled-components';
import { Button } from 'antd';

const StyledButton = styled(Button)`
  & {
    background-color: #047857;
    box-shadow: 0 0 0 2px #047857;
},
  &:hover {
    background-color: #ffffff;
    border-color: #047857;
    box-shadow: 0 0 0 2px #047857;
  }
`;

export default StyledButton;
