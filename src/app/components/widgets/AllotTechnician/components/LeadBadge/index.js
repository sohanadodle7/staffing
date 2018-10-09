import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import CONSTANTS from './../../constants';

const Button = styled.button`
  padding: 5px;
  background: transparent;
  border: 1px solid ${CONSTANTS.ui.borderColor};
  font-size: 15px;
  cursor: pointer;
`;

class LeadBadge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDragStart = this.onDragStart.bind(this);
  }


  onDragStart(e) {
    e.dataTransfer.setData('lead', true);
  }

  render() {
    return <Button
      draggable
      onDragStart={this.onDragStart}
    >
      <FontAwesome name="star" style={{ color: '#FBD84A' }} />
    </Button>
  }
}

LeadBadge.propTypes = {};

export default LeadBadge;
