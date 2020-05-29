import { LOAD_EVENTS } from './types';

export const loadEvents = (assignments, classrooms) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear(), month = currentDate.getMonth(), day = currentDate.getDate();
  let events = {};
  let i = 0;
  assignments.forEach(assignment => {
    const [a, b, c] = assignment.deadline.split('-').map(d => parseInt(d));
    const valid = a < year ? false : (a > year ? true : (b < month ? false : (b > month ? true : (c < day ? false : true))));
    if (valid) {
      const event = {
        courseName: classrooms[assignment.classroom_id].course_name,
        assignment: assignment.description,
        deadline: assignment.deadline
      };
      event[++i] = event;
    }
  });
  return { type: LOAD_EVENTS, payload: events };
};
