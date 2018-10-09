import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import CONSTANTS from './../../constants';

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  text-align: center;
`;

const DialogueBox = styled.div`
  width: 350px;
  background: white;
  margin: auto;
  margin-top: 200px;
`;

const Strip = styled.div`
  height: 5px;
  background: ${CONSTANTS.ui.primaryColor};
`;

const Button = styled.button`
  padding: 7px;
  min-width: 60px;
  color: ${(props) => (props.alt) ? CONSTANTS.ui.primaryColor : 'white'};
  background: ${(props) => (props.alt) ? 'white' : CONSTANTS.ui.primaryColor};
  border: 1px solid ${CONSTANTS.ui.primaryColor};
  margin: 0px 5px;
  cursor: pointer;
`;

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillMount() {
    this.setState({
      show: this.props.show,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) this.setState({ show: nextProps.show });
  }

  handleCancel() {
    this.setState({ show: false }, this.props.handleCancel);
  }

  render() {
    return (
      (this.state.show) ?
        <Layout style={{}}>
          <DialogueBox style={{}}>
            <Strip />
            <div style={{ padding: '20px', textAlign: 'left' }}>
              <div style={{ height: '60px', padding: '10px 0px', display: 'flex' }}>
                <FontAwesome name="exclamation-triangle" size="lg" style={{ lineHeight: '23px', color: CONSTANTS.ui.primaryColor }} />
                &nbsp;&nbsp;&nbsp;
              <span>{this.props.message}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Button alt onClick={this.handleCancel}>Cancel</Button>
                <Button onClick={this.props.handleOk}>Yes, Go ahead</Button>
              </div>
            </div>
          </DialogueBox>
        </Layout>
        : null
    );
  }
}

Confirm.propTypes = {};

export default Confirm;
