import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import CONSTANTS from './../../constants';

const Layout = styled.div`
  min-width: 250px;
  background: white;
  border: 1px solid rgba(0,0,0,0.1);
  // border-radius: 3px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
  margin: 10px;
  overflow-x: horizontal;
  text-align: center;
  cursor : move;
  min-height: min-content;
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  padding: 10px;
  background: ${CONSTANTS.ui.primaryColor};
  color: white;
`;

const Info = styled.div`
  width: calc(100% - 50px);
  padding: 15px 15px;
  color: white;
`;

const Title = styled.div`
  width: 100%;
  background: ${CONSTANTS.ui.primaryColor};
  display: flex;
  text-align: right;
`;

class Station extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props);
    return (
  
      <Layout
        className={this.props.className}
        style={{ ...this.props.shift }}
      >
        <Title>
          <Icon><FontAwesome name="industry" size="2x" /></Icon>
          <Info>
            {this.props.name}
          </Info>
        </Title>
        {this.props.children}
      </Layout>
 
    );
  }
}

Station.propTypes = {};

export default Station;
