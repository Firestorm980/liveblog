import {
  applyUpdate,
  getNewestEntry,
  filterNewPollingEntries,
} from '../utils/utils';

export const initialState = {
  error: false,
  newestEntry: false,
  entries: {},
  pages: 1,
  total: 0,
};

export const polling = (state = initialState, action) => {
  switch (action.type) {
    case 'POLLING_SUCCESS': {
      const newEntries = filterNewPollingEntries(action.payload.entries, { is_admin: false });

      const newState = {
        ...state,
        error: false,
        entries: action.renderNewEntries
          ? {}
          : applyUpdate(
            state.entries,
            action.payload.entries,
          ),
        newestEntry: getNewestEntry(
          state.newestEntry,
          newEntries[newEntries.length - 1],
        ),
        pages: action.payload.pages
          ? action.payload.pages
          : state.pages,
        total: action.payload.total
          ? action.payload.total
          : state.total,
      };

      return newState;
    }
    case 'POLLING_FAILED':
      return {
        ...state,
        error: true,
      };

    case 'GET_ENTRIES_SUCCESS':
      return {
        ...state,
        newestEntry: getNewestEntry(
          state.newestEntry,
          action.payload.entries[0],
        ),
        entries: action.renderNewEntries
          ? {}
          : state.entries,
      };

    case 'MERGE_POLLING_INTO_ENTRIES':
      return {
        ...state,
        entries: {},
      };

    case 'LOAD_CONFIG':
      return {
        ...state,
        newestEntry: {
          id: action.payload.latest_entry_id,
          timestamp: parseInt(action.payload.latest_entry_timestamp, 10),
        },
      };

    default:
      return state;
  }
};
