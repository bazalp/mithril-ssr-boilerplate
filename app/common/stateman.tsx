import _ from 'lodash';

const stateman = {
  state: {},
  init: (initialState: object) => {
    stateman.state = JSON.parse(JSON.stringify(initialState)) || {};
  },

  get: (field: string) => _.get(stateman.state, field, null),

  set: (field: string, value: object) => _.set(stateman.state, field, value),

  getString: () => JSON.stringify(stateman.state),
};

export default stateman;
