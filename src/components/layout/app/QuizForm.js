import React, { Component } from 'react';

import styles from './App.module.css';
class QuizForm extends Component{
  state = {}
  componentDidMount(){
    const {
      initialValue: {
        name, endTime,
        startTime, duration,
        maxAttempts,
        enableQuizForAll = false,
        publishResults = false,
      }, actionType
    } = this.props;

    this.setState(
      {
        name, endTime,
        startTime, duration,
        maxAttempts, enableQuizForAll,
        publishResults,
        actionType: parseInt(actionType),
        changedOnce: false,
      }
    );
  }

  onChange = (event) => {
    if(event.target.name === "startTime" || event.target.name === "endTime"){
      const { startTime, endTime, changedOnce } = this.state;
      let dateObj = new Date(event.target.value);
      console.log(event.target.value, dateObj.toISOString());
      let days = 0, hours = 0, minutes = 0, remainder;
      let updatedValues = { [event.target.name] : dateObj };

      if (endTime !== undefined || startTime !== undefined){
        const diff = dateObj - startTime;
        if(diff <= 0){
          /**
           * Raise alert
          */
        } else if (!changedOnce){
          days = Math.floor(diff / (1000 * 60 * 60 * 24));
          remainder = diff % (1000 * 60 * 60 * 24);
          hours = Math.floor(remainder / (1000 * 60 * 60));
          remainder = remainder % (1000 * 60 * 60);
          minutes = Math.floor(remainder/ (1000 * 60));

          updatedValues['duration'] = { days, hours, minutes, seconds: 0};
        }
      }
      this.setState({...this.state, ...updatedValues});
    }
    else if(event.target.name === "days" || event.target.name === "hours" || event.target.name === "minutes" || event.target.name === "seconds"){
      this.setState({
        ...this.state,
        duration: {
          ...this.state.duration,
          [event.target.name]: event.target.name,
        }
      });
    }
    else if (event.target.name === "enableQuizForAll" || event.target.name === "publishResult"){
      this.setState({
        ...this.state,
        [event.target.name]: event.target.checked,
      });
    }
    else {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
      });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    let {
      name, endTime,
      startTime, duration,
      maxAttempts, enableQuizForAll,
      publishResults,
    } = this.state;
    const tmp = endTime-startTime;
    if(!name || !startTime || !endTime || !duration || !maxAttempts){
      /**
       * Raise exception
       */
    }
    if(tmp <= 0){
    /**
     * Raise exception
     */
    }
    else if (tmp < (duration.days * (1000 * 60 * 60 * 24) + duration.hours * (1000 * 60 * 60) + duration.minutes * (1000 * 60) + duration.seconds * 1000)){
    /**
     * Raise exception
     */
    }
    else if(maxAttempts < 1){
    /**
     * Raise exception
     */
    }
    else {
      startTime = `${startTime.getDate()} ${startTime.getMonth()} ${startTime.getFullYear()} ${startTime.getHours()} ${startTime.getMinutes()}`;
      endTime = `${endTime.getDate()} ${endTime.getMonth()} ${endTime.getFullYear()} ${endTime.getHours()} ${endTime.getMinutes()}`;
      duration = `${duration['days']} ${duration['hours']} ${duration['minutes']} ${duration['seconds']}`;

      let formValues = {
        name, enableQuizForAll,
        publishResults, maxAttempts,
        startTime, endTime, duration
      };

      this.props.onSubmit(formValues);
    }
  }

  render() {

    if(Object.keys(this.state).length === 0) return <></>;
    const {
      state: {
        name,
        duration : {
          days, hours,
          minutes, seconds
        },
        maxAttempts, enableQuizForAll,
        publishResults, actionType,
        startTime, endTime
      },
      onChange,
      onSubmit
    } = this;
    console.log(startTime ? startTime.toISOString(): 0);
    console.log(endTime ? endTime.toISOString(): 0);
    return (
      <form className="px-3 w-100" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Quiz Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxAttempts">Max Attempts</label>
          <input
            name="maxAttempts"
            type="number"
            className="form-control"
            id="maxAttempts"
            value={maxAttempts}
            onChange={onChange}
          />
        </div>
        <div className="form-row form-group">
          <div className="col">
            <label htmlFor="startTime">Start Time</label>
            <input
              name="startTime"
              type="datetime-local"
              className="form-control"
              id="startTime"
              value = {!startTime ? '' : startTime.toISOString().slice(0,-2)}
              onChange={onChange}
            />
          </div>
          <div className="col">
            <label htmlFor="startTime">End Time</label>
            <input
              name="endTime"
              type="datetime-local"
              className="form-control"
              id="endTime"
              value = {!endTime ? '' : endTime.toISOString().slice(0,-2)}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-row form-group">
          <div className="col">
            <label htmlFor="duration">Duration</label>
            <div className="form-row form-group">
              <div className="col">
                <input
                  name="days"
                  type="number"
                  className="form-control"
                  id="days"
                  value={days}
                  onChange={onChange}
                />
                <label htmlFor="days">days</label>
              </div>
              <div className="col">
                <input
                  name="hours"
                  type="number"
                  className="form-control"
                  id="hours"
                  value={hours}
                  onChange={onChange}
                />
                <label htmlFor="hours">hours</label>
              </div>
              <div className="col">
                <input
                  name="minutes"
                  type="number"
                  className="form-control"
                  id="minutes"
                  value={minutes}
                  onChange={onChange}
                />
                <label htmlFor="minutes">minutes</label>
              </div>
              <div className="col">
                <input
                  name="seconds"
                  type="number"
                  className="form-control"
                  id="seconds"
                  value={seconds}
                  onChange={onChange}
                />
                <label htmlFor="seconds">seconds</label>
              </div>
            </div>
          </div>
        </div>
        {actionType ?
          <div className="custom-control custom-switch">
            <input
              name="enableQuizForAll"
              type="checkbox"
              className="custom-control-input"
              id="enableQuizForAll"
              onChange={onChange}
              checked={enableQuizForAll}
            />
            <label className="custom-control-label" htmlFor="enableQuizForAll">Enable Quiz for all</label>
          </div> : <></>
        }

        {actionType ?
          <div className="custom-control custom-switch">
            <input
              name="publishResults"
              type="checkbox"
              className="custom-control-input"
              id="publishResults"
              onChange={onChange}
              checked={publishResults}
            />
            <label className="custom-control-label" htmlFor="publishResults">Publish Results</label>
          </div> : <></>
        }

        <div className="form-group row mt-4">
          <div className="col-12 d-flex justify-content-end">
            {this.props.deleteButton ? this.props.deleteButton : <></>}
            <button
              type="submit"
              className={`btn btn-success ml-3 d-flex align-items-center ${styles.myBtn}`}
            >
              <span className="material-icons mr-1">save</span>
              {this.props.buttonText}
            </button>
          </div>
        </div>
      </form>
    );
  }

}

export default QuizForm;
