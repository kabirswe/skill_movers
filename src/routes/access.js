import path from './path';

export const allowedAccess = {
  admin: {
    routes: [],
    permission: []
  },
  editor: {
    routes: [],
    permission: []
  },
  aprover: {
    routes: [],
    permission: []
  },
  common: [
    path.login,
    path.forgot,
    path.reset,
    path.signup,
    path.unauthorized,
    path.profile,
    path.home,
    path.notFound,
    path.content,
    path.contentEdit,
    path.contentCreate,
    path.contentCopy,
    path.contentPreview,
    path.rawMaterials,
    path.videoManagement,
    path.statisticsOwnMedia,
    path.statisticsVideo,
    path.memberList,
    path.memberSave,
    path.mailGroup,
    path.groupMailList,
    path.mailHistory,
    path.mailHistoryDetails,
    path.tokenExpired,
    path.systemStatistics,
    path.users,
    path.editUser,
    path.systemSettings,
    path.role,
    path.sns,
    path.location
  ]
};
