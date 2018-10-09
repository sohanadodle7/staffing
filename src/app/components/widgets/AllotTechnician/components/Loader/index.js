import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

// console.log(keyframes);

let color;
const waveAnim = keyframes`
  from {
    width: 40%;
    height: 40%;
    top: 30%;
    left: 30%;
    opacity: 0.9;
  }
  to {
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    opacity: 0;
  }
`;


const Container = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};
  position: relative;
`;

const common = styled.div`
  border-radius: 100%;
  background: ${() => color};
  position: absolute;
`;

const Wave = styled(common) `
  z-index: 1;
  animation: ${() => waveAnim} 2s ease-out infinite;
  &:last-child{
    animation-delay: 1s;
  }
`;

const Core = styled(common) `
  width: 40%;
  height: 40%;
  top: 30%;
  left: 30%;
  z-index: 2;
`;

const Loader = (props) => {
  color = props.color || props.style.color || '#276ab1';
  return (
    <Container className={props.className} style={{ ...props.style }} size={props.size}>
      <Core />
      <Wave />
      <Wave />
    </Container>
  );
};

Loader.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.string,
};

Loader.defaultProps = {
  style: {},
  className: '',
  size: '80px',
};

export default Loader;
