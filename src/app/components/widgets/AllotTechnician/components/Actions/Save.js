import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CONSTANTS from './../../constants';
import { Button, LoaderIcon, Error, Success, Wrap } from './Components';

class Save extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      success: '',
      requesting: false,
    };
    this.save = this.save.bind(this);
  }

  save() {
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
    const URL = CONSTANTS.serverUrl + CONSTANTS.api.saveTechnicianShifts;
    const self = this;
    axios.put(URL, {
      employeeList,
      commonShift,
    })
      .then(function (response) {
        console.log('submit', response);
        self.setState({ requesting: false, error: '', success: 'saved successfully!' });
      })
      .catch(function (error) {
        console.log('error', error);
        self.setState({ requesting: false, error: 'something went wrong!', success: '' });
      });
  }

  render() {
    console.log(this.props);
    return (
      <Wrap>
        <Button onClick={this.save}>
          {(this.state.requesting) ? <LoaderIcon /> : 'Save'}
        </Button>
        <br />
        {(this.state.error) ? <Error>{this.state.error}</Error> : null}
        {(this.state.success) ? <Success>{this.state.success}</Success> : null}
      </Wrap>
    );
  }
}

Save.propTypes = {};

export default Save;
