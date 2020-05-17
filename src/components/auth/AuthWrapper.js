import React from 'react';
import {Link} from 'react-router-dom';
import styles from "./AuthForm.module.css";

const AuthWrapper = (props) => {
  return (
    <div
      className={`container-fluid d-flex justify-content-center align-items-center vh-100 ${styles.AuthPageWrapper}`}
    >
      <div
        className={`container rounded shadow-lg d-flex align-items-center w-75 p-0 m-0 ${styles.gradient}`}
      >
        <div className="row d-flex justify-content-center w-100">
          <div
            className={`col-sm-6 d-flex justify-content-center align-items-center ${styles.rightPanel}`}
          >
            <Link to="/" className={styles.logo}>
              <h1>iClass</h1>
            </Link>
          </div>
          <div className="col-sm-6 ml-0">
            <div
              className="card px-4 pt-5"
              style={{ border: "none" }}
            >
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
