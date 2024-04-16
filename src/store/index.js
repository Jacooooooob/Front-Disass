import { createStore } from 'vuex';

export default createStore({
    state: {
        isDisassembling: false,
        progress: 0,
        disassemblyLog: '',
        disassemblyResults: '',
        resultFileUrl: ''
    },
    mutations: {
        startDisassembly(state) {
            state.isDisassembling = true;
            state.progress = 0;
            state.disassemblyLog = 'Starting disassembly...';
        },
        updateProgress(state, payload) {
            state.progress = payload.progress;
            state.disassemblyLog = `Disassembly in progress: ${payload.progress}%`;
        },
        completeDisassembly(state, payload) {
            state.disassemblyResults = payload.results;
            state.resultFileUrl = payload.downloadUrl;
            state.disassemblyLog += '\nDisassembly complete!';
            state.isDisassembling = false;
        },
        errorDisassembly(state, message) {
            state.disassemblyLog += `\nAn error occurred: ${message}`;
            state.isDisassembling = false;
        }
    },
    actions: {
        startDisassembly({ commit }) {
            commit('startDisassembly');
        },
        updateProgress({ commit }, progress) {
            commit('updateProgress', { progress });
        },
        completeDisassembly({ commit }, results) {
            commit('completeDisassembly', results);
        },
        errorDisassembly({ commit }, message) {
            commit('errorDisassembly', message);
        }
    }
});
