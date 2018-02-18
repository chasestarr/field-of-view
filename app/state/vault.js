// constants
const WRITE_CURRENT_PATH = 'VAULT/WRITE_CURRENT_PATH';
const APPEND_CURRENT_PATH = 'VAULT/APPEND_CURRENT_PATH';

// action creators
export function writeCurrentPath(path) {
  return {
    type: WRITE_CURRENT_PATH,
    path,
  };
}

export function appendCurrentPath(item) {
  return {
    type: APPEND_CURRENT_PATH,
    item,
  };
}

// selectors
export function $currentPath(state) {
  return state.vault.currentPath;
}

export function $isCurrentPathSecret(state) {
  const path = state.vault.currentPath.join('');
  return path.charAt(path.length - 1) !== '/';
}

// reducer
const initialState = {
  currentPath: ['/'],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case WRITE_CURRENT_PATH:
      return {
        ...state,
        currentPath: action.path,
      };
    case APPEND_CURRENT_PATH:
      return {
        ...state,
        currentPath: [...state.currentPath, action.item],
      };
    default:
      return state;
  }
}
