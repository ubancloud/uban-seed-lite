import Vue from 'vue'
const app = {
    state: {
        project: {},
    },
    mutations: {
        TOGGLE_PROJECT: (state, project) => {
            Vue.ls.set('PROJECT', project);
            state.project = project;
        },
    },
    actions: {
        ToggleProject({commit}, project) {
            commit('TOGGLE_PROJECT', project)
        }
    }
};

export default app
