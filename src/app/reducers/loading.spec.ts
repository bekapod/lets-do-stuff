import * as fromLoading from './loading';
import * as actions from '../actions/loading';

describe('Loading Reducer', () => {
  const initialState: fromLoading.State = {
    isLoading: false,
  };

  it('should set isLoading to true when SHOW is dispatched', () => {
    expect(fromLoading.reducer(initialState, new actions.Show())).toEqual(<fromLoading.State>{
      ...initialState,
      isLoading: true,
    });
  });

  it('should set isLoading to false when HIDE is dispatched', () => {
    expect(fromLoading.reducer({
      ...initialState,
      isLoading: true,
    }, new actions.Hide())).toEqual(<fromLoading.State>{
      ...initialState,
      isLoading: false,
    });
  });
});
