import {
  FETCH_CLASSROOMS,
  FETCH_CLASSROOM,
  UPDATE_CLASSROOM,
  DELETE_CLASSROOM,
  FETCH_JOIN_REQUESTS,
  ACCEPT_JOIN_REQUESTS,
  DECLINE_JOIN_REQUESTS,
  FETCH_CLASSROOM_STUDENTS,
  REMOVE_CLASSROOM_STUDENT,
  FETCH_ASSIGNMENTS,
  FETCH_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  FETCH_SUBMISSIONS,
  UPDATE_SUBMISSION,
  FETCH_REFERENCE_MATERIALS,
  FETCH_REFERENCE_MATERIAL,
  GET_ERRORS,
  UPDATE_REFERENCE_MATERIAL,
  DELETE_REFERENCE_MATERIAL,
} from './types';

import history from '../history';
import { createMessage } from "./messages";
import axios from '../api';


export const createClassroom = ({ courseName, roomNumber, joiningPermission }) => (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  const body = {
    course_name: courseName,
    room_number: roomNumber,
    joining_permission: joiningPermission
  };

  axios.post('/classrooms', body, config)
    .then(res => {
      history.push('/dashboard');
      dispatch(
        createMessage({
          classroom: res.data.message
        })
      );
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const joinClassroom = (id) => (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  const body = {
    'classroom_id': id,
  };
  axios.post('/join_requests', body, config)
    .then(res => {
      history.push('/dashboard');
      dispatch(
        createMessage({
          classroom:
            res.data.message
        })
      );
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: { classroomError: err.response.data.message },
          status: err.response.status
        }
      });
    })
}

export const fetchClassrooms = () => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  axios.get('/classrooms', config)
    .then(res => {
      setTimeout(() => dispatch({ type: FETCH_CLASSROOMS, payload: res.data }), 1100);
    })
    .catch(err => {
      console.log(err.response);
    })
};

export const fetchClassroom = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  axios.get(`/classrooms/${id}`, config)
    .then(res => {
      setTimeout(() => dispatch({ type: FETCH_CLASSROOM, payload: res.data.class_details }), 1000);
    })
    .catch(err => {
      console.log(err.response);
    })
};

export const updateClassroom = (id, formValues) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  const { courseName, roomNumber, joiningPermission } = formValues;
  const body = {
    course_name: courseName,
    room_number: roomNumber,
    joining_permission: joiningPermission
  };

  axios.patch(`/classrooms/${id}`, body, config)
    .then(res => {
      dispatch({ type: UPDATE_CLASSROOM, payload: res.data.class_details });
      dispatch(createMessage({ classroom: res.data.message }))
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const deleteClassroom = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  axios.delete(`/classrooms/${id}`, config)
    .then(res => {
      history.push('/dashboard');
      dispatch({ type: DELETE_CLASSROOM, payload: id });
      dispatch(createMessage({ classroom: res.data.message }));
    })
    .catch(err => { console.log(err.response); });
}


export const createAssignment = (id, { description, maxMarks, deadline, file }) => (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  const formData = new FormData();
  formData.append('description', description);
  formData.append('max_marks', maxMarks);
  formData.append('deadline', deadline);
  formData.append('file', file);

  axios.post(`/classrooms/${id}/assignments`, formData, config)
    .then(res => {
      history.push(`/classrooms/${id}`);
      dispatch(
        createMessage({
          assignment: res.data.message
        })
      );
    })
    .catch(err => {
      console.log(err);
    })
}

export const fetchAssignments = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.get(`/classrooms/${id}/assignments`, config)
    .then(res => {
      dispatch({ type: FETCH_ASSIGNMENTS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const fetchAssignment = (classroomId, id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {}
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.get(`classrooms/${classroomId}/assignments/${id}`, config)
    .then(res => {
      dispatch({ type: FETCH_ASSIGNMENT, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const updateAssignment = (classroomId, id, formValues) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  const { description, maxMarks, deadline, publishGrades, file } = formValues;
  const formData = new FormData();
  formData.append('description', description);
  formData.append('max_marks', maxMarks);
  formData.append('deadline', deadline);
  formData.append('file', file);
  formData.append('publish_grades', publishGrades);

  if (typeof formData.get('file') === 'string')
    formData.append('file_updated', false);
  else if (typeof formData.get('file') === 'object')
    formData.append('file_updated', true);

  axios.patch(`/classrooms/${classroomId}/assignments/${id}`, formData, config)
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_ASSIGNMENT, payload: res.data });
      dispatch(createMessage({
        assignment: res.data.message
      }))
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const deleteAssignment = (classroomId, id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  axios.delete(`/classrooms/${classroomId}/assignments/${id}`, config)
    .then(res => {
      history.push(`/classrooms/${classroomId}`);
      dispatch({ type: DELETE_ASSIGNMENT, payload: id });
      dispatch(createMessage({ assignment: res.data.message }));
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const submitAssignment = (file, classroomId, assignmentId) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  const formData = new FormData();
  formData.append('file', file);
  axios
    .post(`/classrooms/${classroomId}/assignments/${assignmentId}/submissions`, formData, config)
    .then(res => {
      dispatch(createMessage({ assignment: res.data.message }));
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const fetchSubmissions = (classroomId, id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {}
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  axios.get(`/classrooms/${classroomId}/assignments/${id}/submissions`, config)
    .then(res => {
      dispatch({ type: FETCH_SUBMISSIONS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
    })
}

export const updateMarks = (classroomId, assignmentId, id, marks) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  const body = { marks };
  axios
    .patch(`/classrooms/${classroomId}/assignments/${assignmentId}/submissions/${id}`, body, config)
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_SUBMISSION, payload: res.data })
      dispatch(createMessage({ submission: res.data.message }))
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const fetchClassroomStudent = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.get(`/classrooms/${id}/students`, config)
    .then(res => {
      dispatch({ type: FETCH_CLASSROOM_STUDENTS, payload: res.data })
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const deleteClassroomStudent = (classroomId, id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.delete(`/classrooms/${classroomId}/students/${id}`, config)
    .then(res => {
      dispatch({ type: REMOVE_CLASSROOM_STUDENT, payload: id });
      dispatch(createMessage({
        member: res.data.message
      }));
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const fetchJoinRequests = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.get(`/classrooms/${id}/join_requests`, config)
    .then(res => {
      dispatch({ type: FETCH_JOIN_REQUESTS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
    })
}

export const acceptJoinRequest = (classroomId, id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.post(`/classrooms/${classroomId}/join_requests/${id}`, {}, config)
    .then(res => {
      dispatch({ type: ACCEPT_JOIN_REQUESTS, payload: id });
      dispatch(createMessage({ joinRequest: 'Successfully Done.' }));
    })
    .catch(err => { console.log(err.response); });
}

export const declineJoinRequest = (classroomId, id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  axios.delete(`/classrooms/${classroomId}/join_requests/${id}`, config)
    .then(res => {
      dispatch({ type: DECLINE_JOIN_REQUESTS, payload: id });
      dispatch(createMessage({ joinRequest: 'Successfully Done.' }));
    })
    .catch(err => { console.log(err.response); });
}

export const createReferenceMaterial = (id, formValues) => (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  const { description, file } = formValues;
  const formData = new FormData();
  formData.append('description', description);
  formData.append('file', file);

  axios.post(`/classrooms/${id}/reference_materials`, formData, config)
    .then(res => {
      history.push(`/classrooms/${id}`);
      dispatch(
        createMessage({
          referenceMaterial: res.data.message
        })
      );
    })
    .catch(err => {
      console.log(err);
    })
}

export const fetchReferenceMaterials = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.get(`/classrooms/${id}/reference_materials`, config)
    .then(res => {
      dispatch({ type: FETCH_REFERENCE_MATERIALS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const fetchReferenceMaterial = (classroomId, id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.get(`/classrooms/${classroomId}/reference_materials/${id}`, config)
    .then(res => {
      dispatch({ type: FETCH_REFERENCE_MATERIAL, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const updateReferenceMaterial = (classroomId, id, formValues) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  const { description, file } = formValues;
  const formData = new FormData();
  formData.append('description', description);
  formData.append('file', file);

  if (typeof formData.get('file') === 'string')
    formData.append('file_updated', false);
  else if (typeof formData.get('file') === 'object')
    formData.append('file_updated', true);

  axios.patch(`/classrooms/${classroomId}/reference_materials/${id}`, formData, config)
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_REFERENCE_MATERIAL, payload: res.data });
      dispatch(createMessage({
        referenceMaterial: res.data.message
      }))
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const deleteReferenceMaterial = (classroomId, id) => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  axios.delete(`/classrooms/${classroomId}/reference_materials/${id}`, config)
    .then(res => {
      history.push(`/classrooms/${classroomId}`);
      dispatch({ type: DELETE_REFERENCE_MATERIAL, payload: id });
      dispatch(createMessage({ referenceMaterial: res.data.message }));
    })
    .catch(err => {
      console.log(err.response);
    });
}
