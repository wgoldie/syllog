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

  border-color: ${props => props.theme.border};
  border-right: 1px solid;
  border-bottom: 1px solid; 
  padding: 20px;
`;

export const buttonStyle = props => `
  display: block;
  border-color: ${props.theme.border};
  border: 1px solid;
  background: ${props.theme.background}
  &:hover {
    background: ${props.theme.hoverBackground};
    color: ${props.theme.hoverColor};
    border-color: ${props.theme.hoverBorder};
  }
  font-family: Consolas, Courier, monospace;
  font-size: 100%;
  cursor: pointer;
  padding: 10px;
  margin: 10px;
`;

export const HeaderButton = styled.a`
  ${buttonStyle}
`;

export const UploadLabel = styled.label`
  ${buttonStyle}
`;

export const UploadInput = styled.input`
  display: none;
`;

export const DownloadButtonInner = styled.button`
  ${buttonStyle}
`;
