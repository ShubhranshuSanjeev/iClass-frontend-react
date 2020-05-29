import {
  FETCH_REFERENCE_MATERIALS,
  FETCH_REFERENCE_MATERIAL,
  UPDATE_REFERENCE_MATERIAL,
  DELETE_REFERENCE_MATERIAL
} from "../actions/types";

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_REFERENCE_MATERIALS:
      var referenceMaterials = {}
      payload.reference_materials.forEach(item => { referenceMaterials[item.id] = item; });
      return { ...referenceMaterials };
    case UPDATE_REFERENCE_MATERIAL:
    case FETCH_REFERENCE_MATERIAL:
      return { ...state, [payload.reference_material.id]: payload.reference_material }
    case DELETE_REFERENCE_MATERIAL:
      var copyState = state;
      delete copyState[payload];
      return { ...copyState };
    default:
      return state;
  }
}
