import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CONSTANTS from './../../constants';
import Confirm from './../Confirm';
import { Button, LoaderIcon, Error, Success, Wrap } from './Components';


class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      requesting: false,
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    // console.log('peop', this.props);
    const employeeList = Object.keys(this.props.employeeList).map(empId => ({
      technicianID: empId,
      stationID: this.props.employeeList[empId].station.id || '',
      shiftID: this.props.employeeList[empId].shift.id || '',
    }));

    const commonShift = Object.keys(this.props.commonShiftEmployees).map(empId => ({
      technicianID: empId,
      stationID: this.props.employeeList[empId].station.id || '',
      shiftID: this.props.employeeList[empId].shift.id || '',
    }));

    this.setState({ requesting: true });
    const URL = CONSTANTS.serverUrl + CONSTANTS.api.allotTechnicianShifts;
    const self = this;
    axios.post(URL, {
      employeeList,
      commonShift,
    })
      .then(function (response) {
        console.log('submit', response);
        self.setState({ requesting: false, error: '', success: 'submitted successfully!' });
      })
      .catch(function (error) {
        console.log('error', error);
        self.setState({ requesting: false, error: 'something went wrong!', success: '' });
      });
  }

  render() {
    // console.log(this.props);s
    return (
      <Wrap>
        <Button onClick={this.submit}>
          {(this.state.requesting) ? <LoaderIcon /> : 'Submit'}
        </Button>
        <br />
        {(this.state.error) ? <Error>{this.state.error}</Error> : null}
        {(this.state.success) ? <Success>{this.state.success}</Success> : null}
      </Wrap>
    );
  }
}

Submit.propTypes = {};

export default Submit;
