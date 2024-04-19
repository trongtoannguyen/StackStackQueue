import styled from "styled-components";

const StyledInput = styled.input`
  color: ${({ valid }) => (valid ? "green" : "red")};
  border: 1px solid ${({ valid }) => (valid ? "green" : "red")}!important;
`;


export default StyledInput;