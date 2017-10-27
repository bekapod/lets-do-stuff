import * as fromMessages from './messages';
import * as actions from '../actions/messages';

describe('Messages Reducer', () => {
  const initialState: fromMessages.State = {
    success: [],
    error: [],
  };

  it('should add a new success message to the state when ADD_SUCCESS is dispatched', () => {
    const message = 'This is a success message';
    const action = new actions.AddSuccess(message);

    expect(fromMessages.reducer(initialState, action)).toEqual(<fromMessages.State>{
      ...initialState,
      success: [
        ...initialState.success,
        message,
      ],
    });
  });

  it('should append the new success message to a pre-existing list of messages', () => {
    const message = 'This is a success message';
    const action = new actions.AddSuccess(message);

    expect(fromMessages.reducer({
      ...initialState,
      success: ['Pre-existing success message']
    }, action)).toEqual(<fromMessages.State>{
      ...initialState,
      success: [
        'Pre-existing success message',
        message,
      ],
    });
  });

  it('should remove a success message when DELETE_SUCCESS has been dispatched', () => {
    const action = new actions.DeleteSuccess(['Success 2']);

    expect(fromMessages.reducer({
      ...initialState,
      success: ['Success 1', 'Success 2']
    }, action)).toEqual(<fromMessages.State>{
      ...initialState,
      success: [
        'Success 1',
      ],
    });
  });

  it('should add a new error message to the state when ADD_ERROR is dispatched', () => {
    const message = 'This is an error message';
    const action = new actions.AddError(message);

    expect(fromMessages.reducer(initialState, action)).toEqual(<fromMessages.State>{
      ...initialState,
      error: [
        ...initialState.error,
        message,
      ],
    });
  });

  it('should append the new error message to a pre-existing list of messages', () => {
    const message = 'This is an error message';
    const action = new actions.AddError(message);

    expect(fromMessages.reducer({
      ...initialState,
      error: ['Pre-existing error message']
    }, action)).toEqual(<fromMessages.State>{
      ...initialState,
      error: [
        'Pre-existing error message',
        message,
      ],
    });
  });

  it('should remove error messages when DELETE_ERROR has been dispatched', () => {
    const action = new actions.DeleteError(['Error 1', 'Error 2']);

    expect(fromMessages.reducer({
      ...initialState,
      error: ['Error 1', 'Error 2', 'Error 3']
    }, action)).toEqual(<fromMessages.State>{
      ...initialState,
      error: ['Error 3'],
    });
  });
});
