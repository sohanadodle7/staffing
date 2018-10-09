import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateList, filterList } from './../Employee/actions';

const Input = styled.input`
  width: calc(100% - 10px);
  padding: 5px;
  margin: 5px;
  fontSize: 16px;
`;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.makeSearch = this.makeSearch.bind(this);
  }

  makeSearch(key) {
    // console.log('key::', key, this.props.employeeList);
    const result = {};
    Object.keys(this.props.employeeList).forEach(id => {
      if (this.props.employeeList[id].name.toLowerCase().includes(key.toLowerCase())) result[id] = this.props.employeeList[id];
    });
    this.props.updateList(result);
  }

  render() {
    return <Input
      type="text"
      placeholder="Search Technician"
      onChange={(e) => this.makeSearch(e.target.value)}
    />;
  }
}

Search.propTypes = {};


const mapStateToProps = state => ({
  employeeList: state.Employee.list,
});

const mapDispatchToProps = dispatch => ({
  updateList: payload => dispatch(filterList(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
