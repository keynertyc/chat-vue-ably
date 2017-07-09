/**
 * Created by Keyner on 7/7/17.
 */
import * as types from './mutation-types';

const mutations = {
  [types.addMessage](state, payload) {
    state.messages.push(payload);
  },
};

export { mutations as default };
