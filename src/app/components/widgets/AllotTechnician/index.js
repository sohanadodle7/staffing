import React, { Component } from 'react';
// import './App.css';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import { connect } from 'react-redux';

import CONSTANTS from './constants';
import Employee from './components/Employee';
import Shift from './components/Shift';
import Station from './components/Station';
import Confirm from './components/Confirm';
import SaveBtn from './components/Actions/Save';
import SubmitBtn from './components/Actions/Submit';
import TrashBtn from './components/Actions/Trash';
import Loader from './components/Loader';
import LeadBadge from './components/LeadBadge';
import { Error } from './components/Actions/Components'

import { filterList, updateList } from './components/Employee/actions'
import Search from './components/Search';

// console.log(CONSTANTS);

const Hr = styled.div`
  margin: 20px auto;
  width: calc(100% - 30px); 
  height: 1px; 
  background: lightgrey;
`;

const TechnicianContainer = styled.div`
  position: absolute;
  right: 0px;
  width: 150px;
  marginLeft: 0px;
  background: rgba(100,100,100,0.2);
  padding: 5px;
  height: calc(100% - 20px);
  overflow: auto;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requesting: false,
      error: '',
      success: '',
      showConfirm: false,
      confirmMessage: '',
      commonShiftEmployees: {},
    };
    this.allowDrop = this.allowDrop.bind(this); // method to control on drag over event
    this.onDrop = this.onDrop.bind(this); // method to control on dropping an element event
    this.onDrag = this.onDrag.bind(this); // method to control on dragging an element event
    this.reset = this.reset.bind(this); // reset both shift & station of employee
    // this.submitData = this.submitData.bind(this); // POST data to backend
    this.handleCancel = this.handleCancel.bind(this); // method to handle situation when user clicks cancel om confirm
    this.handleOk = this.handleOk.bind(this); // method to handle situation when user clicks ok on confirm popup
    this.allotEmployee = this.allotEmployee.bind(this); // updating shift & station to an employee
    this.onDropCommon = this.onDropCommon.bind(this);
    this.updateState = this.updateState.bind(this);
    this.addCommonShift = this.addCommonShift.bind(this);
  }

  componentWillMount() {
    console.log('cwm::::', this.props, CONSTANTS);
    this.props.updateList(CONSTANTS.employeeList);
    this.setState({
      stationList: CONSTANTS.stationList,
      employeeList: CONSTANTS.employeeList,
      loading: true,
    }, () => {
      const self = this;
      const URL = CONSTANTS.serverUrl + CONSTANTS.api.getTechnicianShifts;
      axios.get(URL)
        .then(function (response) {
          const employeeList = { ...self.state.employeeList };
          const commonShiftEmployees = {};
          // console.log(response.data);
          JSON.parse(response.data.technicianList).forEach((employee) => {
            // console.log(employee);
            employeeList[employee.technicianID] = {
              ...self.state.employeeList[employee.technicianID],
              shift: (employee.stationID) ? self.state.stationList[employee.stationID].shifts[employee.shiftID] : '',
              station: (employee.shiftID) ? self.state.stationList[employee.stationID] : '',
            }
          });
          JSON.parse(response.data.commonShift).forEach((employee) => {
            // console.log(employee);
            commonShiftEmployees[employee.technicianID] = {
              ...self.state.employeeList[employee.technicianID],
              shift: (employee.stationID) ? self.state.stationList[employee.stationID].shifts[employee.shiftID] : '',
              station: (employee.shiftID) ? self.state.stationList[employee.stationID] : '',
            }
          });
          // console.log('emp:', employeeList, response);
          self.props.updateList(employeeList);
          self.setState({
            employeeList,
            commonShiftEmployees,
            loading: false,
          }, () => { console.log(self.state) })
        })
        .catch(function (error) {
          console.log('error', error);
          self.setState({ loading: false, error: 'something went wrong!', success: '' });
        });
    });
  }

  /**
   * @param {any} e event of element on drag over (event when shift/station dragged over employee)
   * @memberof App
   */
  allowDrop(e) {
    e.preventDefault();
  }

  /**
   * @param {any} e event of element which is dropped
   * @param {any} empId id of employee where shift/station is dropped
   * @memberof App
   */
  onDrop(e, stationId, shiftId) {
    e.preventDefault();
    const empId = e.dataTransfer.getData('id');
    if (empId) {
      // checkign whether shift/station is alloted or not
      if (!this.props.employeeList[empId].station && !this.props.employeeList[empId].shift) this.allotEmployee(empId, stationId, shiftId);
      else {
        // if shift/station is aleadt alloted show confirm popup
        this.setState({
          showConfirm: true,
          confirmMessage: `Are you sure you want to change the shift allotment for '${this.state.employeeList[empId].name}'?`,
          temp: { empId, stationId, shiftId }, // setting empId, stationId & shiftId for temporary use when user clicks ok in confirm
        })
      }
    }
  }

  onDropCommon(e, id) {
    e.preventDefault();
    const empId = e.dataTransfer.getData('id');
    // checkign whether shift/station is alloted or not
    this.setState({
      commonShiftEmployees: {
        ...this.state.commonShiftEmployees,
        [id]: [
          ...this.state.commonShiftEmployees[id],
          { ...this.props.employeeList[empId], id: empId },
        ],
      },
    });
  }

  /**
   * 
   * @param {any} e event on dragging element
   * @param {any} type shift/station
   * @param {any} id id of shift/station
   * @memberof App
   */
  onDrag(e, id) {
    e.dataTransfer.setData('id', id);
  }

  /**
   * @param {any} empId employee id where drop is made
   * @param {any} type type of allotment shift/station
   * @param {any} id id of shift/station
   * @memberof App
   */
  allotEmployee(empId, stationId, shiftId) {

    const employeeList = this.state.stationList[stationId].shifts[shiftId].employees || {};
    if (employeeList[empId]) delete employeeList[empId];
    this.props.updateList({
      ...this.props.employeeList,
      [empId]: {
        ...this.props.employeeList[empId],
        station: this.state.stationList[stationId],
        shift: this.state.stationList[stationId].shifts[shiftId],
      },
    });
  }

  handleOk() {
    this.allotEmployee(this.state.temp.empId, this.state.temp.stationId, this.state.temp.shiftId);
    this.handleCancel();
  }

  handleCancel() {
    this.setState({
      confirmMessage: '',
      showConfirm: false,
    });
  }

  reset(empId, type, commonShiftId) {
    switch (type.toUpperCase()) {
      case 'ALL': {
        // const commonShiftEmployees = this.state.commonShiftEmployees;
        // if (commonShiftEmployees[empId]) delete commonShiftEmployees[empId];
        this.props.updateList({
          ...this.props.employeeList,
          [empId]: {
            ...this.props.employeeList[empId],
            station: '',
            shift: '',
          },
        });
      }
        break;
      case 'COMMON': {
        const employeeList = this.state.commonShiftEmployees[commonShiftId];
        let id;
        employeeList.forEach((emp, index) => {
          if (emp.id === empId) id = index;
        });
        if (id !== undefined) employeeList.splice(id, 1);
        this.setState({
          commonShiftEmployees: {
            ...this.state.commonShiftEmployees,
            [commonShiftId]: [...employeeList],
          },
        });
      }
        break;
      default: {
        this.props.updateList({
          ...this.props.employeeList,
          [empId]: {
            ...this.props.employeeList[empId],
            station: '',
            shift: '',
          },
        });
      }
        break;
    }
  }

  updateState(values) {
    this.setState({
      ...values,
    })
  }

  addCommonShift() {
    this.setState({
      commonShiftEmployees: {
        ...this.state.commonShiftEmployees,
        [Object.keys(this.state.commonShiftEmployees).length + 1]: [],
      },
    });
  }

  render() {
    console.log('render:', this.state, this.props);
    const stationEmployeeMap = {};
    Object.keys(this.props.employeeList).forEach(empId => {
      const emp = this.props.employeeList[empId];
      if (emp.station.id && emp.shift.id) {
        if (!stationEmployeeMap[emp.station.id]) stationEmployeeMap[emp.station.id] = {};
        if (!stationEmployeeMap[emp.station.id][emp.shift.id]) stationEmployeeMap[emp.station.id][emp.shift.id] = [];
        stationEmployeeMap[emp.station.id][emp.shift.id].push({ ...emp, id: empId });
      }
    });

    // const commonShiftEmployees = {};
    // Object.keys(this.state.commonShiftEmployees).forEach(commonShiftId => {
    //   this.state.commonShiftEmployees[commonShiftId].forEach(empId => {
    //     commonShiftEmployees[empId] = { ...this.props.employeeList[empId], id: empId };
    //   });
    // });

    // console.log(commonShiftEmployees);

    console.log('props:', this.props);

    return (
      (this.state.loading) ?
        <div style={{ textAlign: 'center', padding: '20px' }}><Loader color="rgb(55, 150, 198)" style={{ margin: 'auto' }} /></div>
        :
        <div ref={(node) => this.mainContainer = node} style={{ display: 'flex' }}>
          <div style={{ width: 'calc(100% - 150px)', padding: '5px' }}>
            <div style={{ padding: '15px 0px' }}><Error>{this.state.error}</Error></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {Object.keys(this.state.commonShiftEmployees).map(commonShiftId =>
                <Shift
                  name={`Common Shift ${commonShiftId}`}
                  onDrop={(e) => this.onDropCommon(e, commonShiftId)}
                  onDragOver={this.allowDrop}
                  employees={this.state.commonShiftEmployees[commonShiftId]}
                  reset={(empId) => this.reset(empId, 'COMMON', commonShiftId)}
                  onDragStart={this.onDrag}
                />
              )}

              {/*
              <button
                onClick={this.addCommonShift}
                style={{ cursor: 'pointer', border: 'none', color: 'white', background: 'rgb(55, 150, 198)', padding: '5px', minWidth: '80px' }}
              >Add Shift</button> 
              */}
              

           <LeadBadge /> 
            </div>
            <hr />
            <div style={{ display: 'flex', overflow: 'auto', flex: 2 }}> {/*, justifyContent: 'space-around'*/}
              {/* station shift */}
              {Object.keys(this.state.stationList || {}).map((stationId, key) => <Station
                key={key}
                name={this.state.stationList[stationId].name}
              >
                {Object.keys(this.state.stationList[stationId].shifts || {}).map((shiftId, key1) => {
                  const employees = [];
                  this.state.employees
                  return <Shift
                    key={key1}
                    name={this.state.stationList[stationId].shifts[shiftId].name}
                    onDrop={(e) => this.onDrop(e, stationId, shiftId)}
                    onDragOver={this.allowDrop}
                    employees={(stationEmployeeMap[stationId] || {})[shiftId] || []}
                    reset={(empId) => this.reset(empId, 'DEFAULT')}
                    onDragStart={this.onDrag}
                  />
                })}
              </Station>)}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <SubmitBtn
                updateState={this.updateState}
                employeeList={this.props.employeeList}
                stationList={this.state.stationList}
                commonShiftEmployees={this.state.commonShiftEmployees}
              />
              <TrashBtn
                updateState={this.updateState}
                employeeList={this.props.employeeList}
                updateList={this.props.updateList}
                stationList={this.state.stationList}
                commonShiftEmployees={this.state.commonShiftEmployees}
              />
              {/* <SaveBtn
                updateState={this.updateState}
                employeeList={this.state.employeeList}
                stationList={this.state.stationList}
                commonShiftEmployees={this.state.commonShiftEmployees}
              /> */}
            </div>
          </div>
          <TechnicianContainer>
            <Search />
            {Object.keys(this.props.filteredList || {}).map((empId, key) => {
              return (this.props.filteredList[empId].shift && this.props.filteredList[empId].station) ? null : <Employee
                key={key}
                id={empId}
                draggable
                onDragStart={(e) => this.onDrag(e, empId)}
                reset={this.reset}
                // isInCommonShift={commonShiftEmployees[empId]}
                {...this.props.filteredList[empId]}
              />
            }
            )}
          </TechnicianContainer>
          <Confirm
            show={this.state.showConfirm}
            handleCancel={this.handleCancel}
            handleOk={this.handleOk}
            message={this.state.confirmMessage}
          />
        </div >
    );
  }
}

const mapStateToProps = state => ({
  employeeList: state.Employee.list,
  filteredList: state.Employee.filteredList,
});

const mapDispatchToProps = dispatch => ({
  // updateList: payload => dispatch(setInitialList(payload)),
  updateList: payload => dispatch(updateList(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
