const path = require('../routes/path').default;

module.exports = {
  commentFetchInterval: 30000,
  routes: {
    home: path.home,
    content: path.content,
    public: path.public,
    statistics: path.statisticsOwnMedia,
    statisticsOwnMedia: path.statisticsOwnMedia,
    statisticsVideo: path.statisticsVideo,
    raw_material: path.rawMaterials,
    user: path.users,
    system_setting: path.systemSettings,
    member: path.memberList,
    role: path.role,
    sns: path.sns,
    location: path.location,
    mail: path.mailGroup,
    mailGroup: path.mailGroup,
    mailHistory: path.mailHistory,
    statistics_setting: path.systemStatistics
  },
  editMod: {
    review: ['Article Review', 'Article Approve'],
    approval: ['Article Approve'],
    publish: ['Article Approve'],
    prohibit: ['Article Approve', 'Article Publish'],
    type: {
      review: 'review',
      approval: 'approval',
      publish: 'publish',
      prohibit: 'prohibit'
    }
  },
  approveMod: {
    copy: ['Article Edit', 'Article Review', 'Article Approve'],
    save: ['Article Approve', 'Article Publish'],
    preview: [],
    publish: ['Article Approve'],
    date: ['Article Publish'],
    type: {
      copy: 'copy',
      save: 'save',
      preview: 'preview',
      publish: 'publish',
      date: 'date'
    }
  },
  prohibitMod: {
    save: ['Article Approve', 'Article Publish'],
    preview: ['Article Approve', 'Article Publish'],
    publish: ['Article Approve', 'Article Publish'],

    type: {
      save: 'save',
      preview: 'preview',
      publish: 'publish'
    }
  },
  articlePermissions: [
    'Article Edit',
    'Article Review',
    'Article Approve',
    'Article Publish'
  ]
};
