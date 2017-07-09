/**
 * Created by Keyner on 7/7/17.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const state = {
  messages: [],
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
