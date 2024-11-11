import styled from 'styled-components'
import { Select } from 'antd'

const StyledSelect = styled(Select)`
  &:focus {
    border-color: #047857;
    box-shadow: 0 0 0 2px #047857;
  }
`
export default StyledSelect
