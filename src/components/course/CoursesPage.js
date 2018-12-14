import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.redirectCoursePage = this.redirectCoursePage.bind(this);
  }  

  redirectCoursePage(){
    browserHistory.push('/course');
  }
  render() {
    
    const {courses} = this.props;
    return (
      <div>
        <p>Courses</p>
        <input type="submit" value="Add Course"
        className="btn btn-primary" onClick={this.redirectCoursePage}/>
        <CourseList courses={courses}/>
      </div>
    );
  }
}


CoursesPage.PropTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStoreToProps(state, ownprops) {
  
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}
export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(CoursesPage);
