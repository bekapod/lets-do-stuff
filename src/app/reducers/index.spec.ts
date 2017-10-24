import { logger } from './index';
import { reducer } from '../todos/reducers';
import * as actions from '../todos/actions';

describe('Root Reducer', () => {
  describe('logger', () => {
    it('logs all actions', () => {
      const spy = spyOn(global.console, 'log');
      const todoLogger = logger(reducer);
      const action = new actions.FetchTodos();
      todoLogger({}, action);
      expect(spy).toHaveBeenCalledWith('state', {});
      expect(spy).toHaveBeenCalledWith('action', action);
    });
  });
});
