import styled from 'styled-components';

export const pt = key => props => props.theme[key];

export const Wrapper = styled.div`
flex: 1.5;
height: 100%;
overflow: hidden;
background-color: ${pt('background')};
color: ${pt('color')};
border-color: ${pt('border')};
border-left: 1px solid;
display: flex;
flex-direction: column;
`;

export const Header = styled.div`
`;

export const HeaderText = styled.h2`
display: block;
padding: 10px;
border-bottom: 1px solid;
width: 100%;
`;

export const FactorsWrapper = styled.ul`
display: flex;
justify-content: flex-start;
flex-direction: column;
align-items: center;
padding: 10px;
overflow-x: hidden;
overflow-y: scroll;
background-color: ${pt('background')};
color: ${pt('color')};
border-color: ${pt('border')};
border-top: 1px solid;
`;

export const Factor = styled.li`
display: flex;
flex-direction: column;
justify-content: flex-start;
overflow-x: hidden;
overflow-y: scroll;
width: 100%;;
border: 1px ${pt('altBorderStyle')} ${pt('border')};
border-radius: 5px;
padding: 10px;
margin: 10px;
min-height: 250px;
`;

export const FactorName = styled.span`
display: block;
background: ${pt('altBackground')};
color: ${pt('altColor')};
left: 5px;
border-top-right-radius: 5px;
border-top-left-radius: 5px;
border: 1px solid ${pt('altBorder')};
padding: 5px;
`;

export const FactorFieldsetWrapper = styled.div`
display: block;
border: 1px solid ${pt('border')};
padding: 5px;
margin: 5px 0;
`;

export const FactorFieldsetName = styled.span`
display: block;
margin: 5px;
`;

export const FactorFieldsWrapper = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`;

export const FactorField = styled.div`
margin: 5px;
display: inline-block;
border: 1px solid ${pt('border')};
padding: 5px;
&:hover {
  background: ${pt('altHoverBackground')};
  color: ${pt('altHoverColor')};
}
`;

export const AddButton = styled.button`
margin: 5px 0;
padding: 5px;
display: block;
background: none;
border-radius: 0;
&:hover {
  background: ${pt('hoverBackground')};
  cursor: pointer;
  color: ${pt('hoverColor')};
}
highlight: none;
border: 1px solid ${pt('border')};
color: ${pt('color')};
`;

const buttonStyle = props => `
  display: inline-block;
  border: 1px solid ${pt('border')(props)};
  background: none;
  highlight: none;
  color: ${pt('color')(props)};
  margin: 10px;
  padding: 10px;
  &:hover {
    background: ${pt('hoverBackground')(props)};
    color: ${pt('hoverColor')(props)};
    cursor: pointer;
  }
  font-size: 100%;
  font-family: inherit;
`;

export const FactorsInputLabel = styled.label`
${buttonStyle}
`;

export const FactorsInput = styled.input`
display: none;
`;

export const FactorsButton = styled.button`
${buttonStyle}
`;

export const FactorsLink = styled.a`
${buttonStyle}
text-decoration: none;
font-size: 100%;

`;
