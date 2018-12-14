import React, { PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as courseActions from "../../actions/courseActions";
import CourseForm from "./CourseForm";
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({ course: nextProps.course });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({ course: course });
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving:true})
    this.props.actions
      .saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {        
        this.setState({saving:false})
        toastr.error(error);
      }) ;
  }
  redirect() {
    this.setState({saving:false})
    toastr.success('Course Saved..');
    this.context.router.push("/courses");
  }

  render() {
    return (
      <div>
        <CourseForm
          allAuthors={this.props.authors}
          course={this.state.course}
          onSave={this.saveCourse}
          errors={this.state.errors}
          onChange={this.updateCourseState}
          loading={this.state.saving}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, courseId) {
  const filteredcourses = courses.filter(course => course.id == courseId);
  if (filteredcourses) return filteredcourses[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  //Translation of original Props received from store to required format is done in
  //mapStateToProps

  let course = {
    id: "",
    watchHref: "",
    title: "",
    authorId: "",
    length: "",
    category: ""
  };

  const courseId = ownProps.params.id;
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + " " + author.lastName
    };
  });
  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
