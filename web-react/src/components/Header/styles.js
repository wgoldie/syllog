import styled from 'styled-components';

export const HeaderWrapper = styled.h1`
width: 100%;
max-height: 10px;
flex: 1;
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: row;
flex: 1;
background: ${props => props.theme.background};
color: ${props => props.theme.color};
&:hover {
  background: ${props => props.theme.hoverBackground};
  color: ${props => props.theme.hoverColor};
  border-color: ${props => props.theme.hoverBorder};
}
border-color: ${props => props.theme.border};
border-right: 1px solid;
border-bottom: 1px solid; 
padding: 20px;
`;

export const HeaderButton = styled.a`

`;
