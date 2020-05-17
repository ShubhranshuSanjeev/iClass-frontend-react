import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { fetchClassrooms } from '../../../actions/classroom';
import notebook from '../../../assests/working.svg';
import personal_notebook from '../../../assests/process.svg';

import styles from './App.module.css';
class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchClassrooms()
  }

  renderClassroomList() {
    const { classrooms } = this.props;
    if (!classrooms.length) return <></>;
    return classrooms.map(classroom => {
      const idx = Math.ceil(Math.random() * 2);
      const img = idx === 1 ? notebook : notebook;
      return (
        <div className="col-3 mx-auto" key={classroom.id}>
          <Link to={`/classrooms/${classroom.id}`} >
            <div className="card" style={{ border: "1px solid rgba(0,0,0,0.125)", borderRadius: "0" }}>
              <div className="card-img-top" style={{ backgroundColor: "#cfccff", height: "130px", borderRadius: "0", position: "relative", overflow: "hidden" }}>
                <img src={img} alt="notebook" width="100%" />
              </div>
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#000" }}>
                  {classroom.course_name}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">{`Teacher: ${classroom.teacher.first_name} ${classroom.teacher.last_name}`}</h6>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container-fluid pt-5" style={{ minHeight: "100vh" }}>
        <div className="row">
          <div className="col-12">
            <div className="row px-2 justify-content-around">
              <div className={`${styles.courseContainer}`} >
                <div className="row">
                  <div className="col-12 p-4">
                    <h1 style={{ color: "#000", fontWeight: "300", fontSize: "25px", textTransform: "capitalize" }}>Dashboard</h1>
                  </div>
                </div>
                <div className="row flex-wrap">
                  {this.renderClassroomList()}
                  <div className="col-3 my-auto">
                    <div className="card" style={{ position: "relative" }}>
                      <div className="card-img-top h-100" style={{ backgroundColor: "#cfccff", overflow: "hidden", position: "relative" }}>
                        <img src={notebook} alt="notebook" width="100%" style={{ position: "relative", top: "14px" }} />
                      </div>
                      <div className="overlay h-100 w-100 d-flex justify-content-center align-items-center flex-column" style={{ position: "absolute", top: "0", left: "0", backgroundColor: "rgba(207, 204, 255, 0.5)" }}>
                        <span className="material-icons" style={{ display: "block", fontSize: "50px", }}>add</span>
                        <h4>Join a Classroom</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.utilityContainer}>
                <div className="row">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { classrooms: Object.values(state.classrooms) };
};

export default connect(mapStateToProps, { fetchClassrooms })(Dashboard);
