import styled from 'styled-components';
import { Input } from 'antd';

const StyledInput = styled(Input)`
  &:focus {
    border-color: #047857;
    box-shadow: 0 0 0 2px #047857;
  }
`
export default StyledInput
