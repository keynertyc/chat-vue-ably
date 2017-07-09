/**
 * Created by Keyner on 7/7/17.
 */
import * as types from './mutation-types';

const addMessage = ({ commit }, payload) => {
  commit([types.addMessage], payload);
};

export { addMessage as default };
