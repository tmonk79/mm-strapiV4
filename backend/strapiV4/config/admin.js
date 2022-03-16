module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6bc4b80126dbfcf4d6534c95931ffd2b'),
  },
  url: 'https://admin.dessertcorner.com',
  serveAdminPanel: false,
});
