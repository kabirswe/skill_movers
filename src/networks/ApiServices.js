import config from '../config';
const ApiServices = {
  TEST_API: 'tags',
  SIGN_UP: '/authentication/signup',
  // CHECK_USERNAME: 'api/user/check/username',
  // GET_MAIL_POSTING: (id) => `api/mailmagazine/email/history/list/${id}`,
  // SNS_POST_UPDATE: (id) => `api/sns/postings/post/${id}`,
  // SNS_POST_GET: (articleId, platformId) => `api/sns/postings/post/show/data/${articleId}/${platformId}`,
  // OWN_MEDIA_VISITOR_CITY: (startDate, endDate, processedBy, pagination) => `api/statistic/visitor/city?startDate=${startDate}&endDate=${endDate}&processedBy=${processedBy}&pagination=${pagination}`,
  // YOUTUBE_SUMMERY_VIEWS: (startDate, endDate, processedBy) => `api/statistic/youtube/summary/views?startDate=${startDate}&endDate=${endDate}&processedBy=${processedBy}`,
  // GOOGLE_CONSOLE_AUTHENTICATION : 'api/statistic/search-console/authenticate',
  // VIDEO_TRACKING_FOR_LOGGER: (videoId, articleId) => articleId ? `api/article/insert/video/track?videoId=${videoId}&articleId=${articleId}` : `api/article/insert/video/track?videoId=${videoId}`,
};
export default ApiServices;