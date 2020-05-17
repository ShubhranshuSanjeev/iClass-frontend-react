import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClassroom } from '../../../actions/classroom';

import Assignments from './Assignments';
import styles from './App.module.css';
import notebook from '../../../assests/working.svg';

class Classroom extends Component {
  state = {
    assignments: true,
    referenceMaterials: false,
    members: false,
    messages: false,
  }

  componentDidMount() {
    const classroomId = this.props.match.params.id;
    this.props.fetchClassroom(classroomId);
  }

  onClick = (event) => {
    const contentType = event.target.closest('div').attributes['data-option'].nodeValue;
    const newState = {
      assignments: false,
      referenceMaterials: false,
      members: false,
      messages: false
    };
    if (contentType === 'assignments') this.setState({ ...newState, assignments: true });
    else if (contentType === 'referenceMaterials') this.setState({ ...newState, referenceMaterials: true });
    else if (contentType === 'members') this.setState({ ...newState, members: true });
  }

  renderMenuItems() {
    const menuItems = [
      { name: 'assignments', icon: 'assignment', label: 'Assignments' },
      { name: 'referenceMaterials', icon: 'notes', label: 'Reference Materials' },
      { name: 'messages', icon: 'message', label: 'Messages' },
      { name: 'members', icon: 'people', label: 'Members' },
    ];
    return menuItems.map(item => {
      const active = this.state[item.name] ? styles.active : '';
      return (
        <div
          className={`${styles.menuItem} ${active} d-flex align-items-center pl-2 py-2 `}
          onClick={this.onClick}
          data-option={item.name}
          key={item.name}
        >
          <span className="material-icons">{item.icon}</span>
          <p className="my-0 ml-3">{item.label}</p>
        </div>
      );
    });
  }

  render() {
    const { classroom } = this.props;
    const classroomId = this.props.match.params.id;

    if (!classroom) return <></>;
    return (
      <div className="container-fluid pt-5" style={{ minHeight: "100vh" }}>
        <div className="row">
          <div className="col-12">
            <div className="row px-2 justify-content-around">
              <div className={`${styles.classroomWrapper} d-flex justify-content-around`}>
                <div className={`${styles.sidemenu}`} >
                  <div className={`${styles.classroomIcon}`} >
                    <img src={notebook} alt="icon" width="70%"></img>
                  </div>
                  <div className={`${styles.menu} pt-3`} >
                    {
                      /** 
                       ** Rendering Menu items 
                      */
                    }
                    {this.renderMenuItems()}
                  </div>
                </div>
                <div className={`${styles.classroomContent} p-4`}>
                  <div className="content-header">
                    <h1 className={`${styles.courseName}`}>{classroom.course_name}</h1>
                    <hr />
                  </div>
                  {
                    /** 
                     ** Conditional Rendering of Assignments, Reference Material, Members
                     ** based on the option selected from menu.
                    */
                  }
                  {this.state.assignments ? <Assignments classroomId={classroomId} /> : <></>}
                </div>
              </div>
              <div className="upcoming-events" style={{ width: "360px", height: "100vh", backgroundColor: "#fff" }} >

              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const classroomId = ownProps.match.params.id;
  return { classroom: state.classrooms[classroomId] };
};

export default connect(mapStateToProps, { fetchClassroom })(Classroom);
