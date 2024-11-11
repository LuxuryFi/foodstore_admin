import styled from 'styled-components';
import { Upload } from 'antd';

const StyledUpload = styled(Upload)`
  &:focus {
    border-color: #047857;
    box-shadow: 0 0 0 2px #047857;
  }
`
export default StyledUpload
