import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CONSTANTS from './../../constants';
import Confirm from './../Confirm';
import { Button, LoaderIcon, Error, Success, Wrap } from './Components';

class Trash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      requesting: false,
      showConfirm: false,
      confirmMessage: '',
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  handleCancel() {
    this.setState({ showConfirm: false });
  }

  handleOk() {
    // console.log('peop', this.props);
    const employeeList = Object.keys(this.props.employeeList).map(empId => ({
      ...this.props.employeeList[empId],
      station: '',
      shift: '',
    }));

    const employeeListAlt = Object.keys(this.props.employeeList).map(empId => ({
      technicianID: empId,
      stationID: '',
      shiftID: '',
    }));

    this.handleCancel();
    this.setState({
      requesting: true,
    });
    const URL = CONSTANTS.serverUrl + CONSTANTS.api.allotTechnicianShifts;
    const self = this;
    axios.post(URL, {
      employeeList: employeeListAlt,
      commonShift: [],
    })
      .then(function (response) {
        console.log('submit', response);
        self.setState({ requesting: false, error: '', success: 'deleted successfully!' });
        self.props.updateList(employeeList);
        self.props.updateState({ employeeList, commonShiftEmployees: [] });
      })
      .catch(function (error) {
        console.log('error', error);
        self.setState({ requesting: false, error: 'something went wrong!', success: '' });
      });
  }

  confirm(confirmMessage) {
    this.setState({
      confirmMessage,
      showConfirm: true,
    });
  }

  render() {
    // console.log(this.props);
    return (
      <Wrap>
        <Button onClick={() => this.confirm('Are you sure you want to reset all the changes?')}>
          {(this.state.requesting) ? <LoaderIcon /> : 'Reset'}
        </Button>
        <br />
        {(this.state.error) ? <Error>{this.state.error}</Error> : null}
        {(this.state.success) ? <Success>{this.state.success}</Success> : null}

        <Confirm
          show={this.state.showConfirm}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          message={this.state.confirmMessage}
        />
      </Wrap>
    );
  }
}

Trash.propTypes = {};

export default Trash;
