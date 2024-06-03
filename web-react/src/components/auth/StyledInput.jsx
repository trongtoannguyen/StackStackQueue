import styled from "styled-components";

const StyledInput = styled.input`
  color: ${({ valid }) => (valid ? "green" : "red")};
  border: 1px solid ${({ valid }) => (valid ? "green" : "red")}!important;
  maxWidth: 700px!important;
`;


// const StyledInput = styled.input(props => ({
//   color: props.valid ? "green" : "red",
//   border: `1px solid ${props.valid ? "green" : "red"}!important`
// }));


export default StyledInput;