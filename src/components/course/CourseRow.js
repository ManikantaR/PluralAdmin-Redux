import React, { PropTypes } from "react";
import {Link} from 'react-router';

const CourseRow = ({course}) => {
    return (
    <tr>
    <td><a href={course.watchHref} target="_blank">watch</a></td>
    <td><Link to={'/course/'+ course.id}>{course.title}</Link></td>
    <td>{course.authorId}</td>
     <td>{course.category}</td>
        <td>{course.length}</td>
    </tr>
    );
};

CourseRow.propTypes = {
    course : PropTypes.object.isRequired
};

export default CourseRow;