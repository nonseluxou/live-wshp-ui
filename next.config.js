module.exports = {
  i18n: {
    locales: ['en', 'es', 'gl', 'zh', 'ar'],
    defaultLocale: 'en',
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },
};
