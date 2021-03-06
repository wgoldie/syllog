import styled from 'styled-components';

export const HeaderWrapper = styled.h1`
  width: 100%;
  display: flex;
  flex-shrink: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background: ${props => props.theme.background};
  color: ${props => props.theme.color};

  border-color: ${props => props.theme.border};
  border-right: 1px solid;
  border-bottom: 1px solid; 
  padding: 10px;
`;

export const HeaderImage = styled.img`
  margin: 0 13px;
  height: 40px;
  width: 40px;
`;

export const buttonStyle = props => `
  display: block;
  border: 1px solid ${props.theme.border};
  background: ${props.theme.background};
  color: ${props.theme.color};
  &:hover {
    background: ${props.theme.hoverBackground};
    color: ${props.theme.hoverColor};
    border-color: ${props.theme.hoverBorder};
  }
  font-family: Consolas, Courier, monospace;
  font-size: 100%;
  cursor: pointer;
  padding: 10px;
  margin: 0 10px;
  box-sizing: border-box;
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

export const HeaderButtons = styled.ul`
  display: flex;
  flex-direction: row;
`;

export const HeaderText = styled.div`
  display: flex;
  font-size: 200%;
  align-items: center;
`;

export const ExamplePicker = styled.label`
  ${buttonStyle}
`;

export const ExampleList = styled.select`
  margin: 0 10px;
`;
