import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import Confirm from './../Confirm';
import CONSTANTS from './../../constants';

const Layout = styled.div`
  width: 250px;
  height: 90px;
  position: relative;
  border: 2px solid red;
  display: flex;
  background: white;
  border: 1px solid ${(props) => (props.partial) ? 'grey' : (props.completed) ? CONSTANTS.ui.primaryColor : 'rgba(0,0,0,0.1)'};
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
  margin: 10px;
  overflow: hidden;
  cursor: move;
`;

const Indicator = styled.div`
  width: 5px;
  height: 90px;
  background: ${(props) => (props.partial) ? 'grey' : (props.completed) ? CONSTANTS.ui.primaryColor : 'white'};
`;

const Hr = styled.div`
  margin: auto; 
  width: calc(100% - 10px); 
  height: 1px; 
  background: lightgrey;
`;

const Profile = styled.img`
  width: 90px;
  height: 90px;
`;

const Details = styled.div`
  width: 155px;
  height: 90px;
  text-align: center;
  color: grey;
`;

const Name = styled.div`
  // height: 45px;
  height: 90px;
  padding: 0px 5px;
  line-height: 45px;
  text-align: left;
`;

const Icon = styled.div`
  width:50%;
  height: 45px;
  font-size: 16px;
  line-height: 45px;
  padding-left: 5px;
  text-align: left;
  color: ${(props) => (props.selected) ? CONSTANTS.ui.primaryColor : 'grey'}
`;

const Small = styled.span`
  font-size: 12px;
`;

const Reset = styled(FontAwesome) `
  font-size: 12px;
  color: rgba(124, 10, 2, 0.5);
  cursor: pointer;
  position: absolute; 
  right: 3px;
  top: 3px;
`;

class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirm: false,
    };
    this.handleCancel = this.handleCancel.bind(this); // method to handle when user clicks cancel
    this.handleOk = this.handleOk.bind(this); // method to handle when user clicks ok
  }

  componentWillMount() {
    this.setState({
      shift: this.props.shift,
      station: this.props.station,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.shift !== nextProps.shift) this.setState({ shift: nextProps.shift });
    if (this.props.station !== nextProps.station) this.setState({ station: nextProps.station });
  }

  handleCancel() {
    this.setState({
      showConfirm: false,
    });
  }

  handleOk() {
    this.props.reset(this.props.id, 'ALL')
    this.handleCancel();
  }

  render() {
    // http://via.placeholder.com/90x90
    // console.log(this.props);
    return (
      <Layout
        completed={this.state.shift && this.state.station}
        partial={this.props.isInCommonShift}
        className={this.props.className}
        style={{ ...this.props.style }}
        draggable={this.props.draggable}
        onDragStart={this.props.onDragStart}
      >
        <Reset name="times" onClick={() => this.setState({ showConfirm: true })} />
        <Indicator completed={this.state.shift && this.state.station} partial={this.props.isInCommonShift} />
        <Profile alt="profile" src={this.props.image || require('./../../assets/profile.jpeg')} />
        <Details>
          <Name>{this.props.name || 'No Name'}</Name>
          {/* <Hr /> */}
          {/* <div style={{ display: 'flex' }}>
            <Icon selected={this.state.station}><FontAwesome name="industry" />
              &nbsp;<Small>{this.state.station.name}</Small>
            </Icon>
            <Icon selected={this.state.shift}><FontAwesome name="clock-o" size="lg" />
              &nbsp;<Small>{this.state.shift.name}</Small>
            </Icon>
          </div> */}
        </Details>
        <Confirm
          show={this.state.showConfirm}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          message={`Are you sure you want to reset the allotment for '${this.props.name}'?`}
        />
      </Layout>
    );
  }
}

Employee.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  onDrop: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  shift: PropTypes.any.isRequired,
  reset: PropTypes.func.isRequired,
  station: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
};

Employee.defaultProps = {
  className: '',
  style: {},
};

export default Employee;
