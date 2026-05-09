const browser = process.env.BROWSER || 'chromium';

module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'tests/support/**/*.ts',
      'tests/hooks/**/*.ts',
      'tests/steps/**/*.ts'
    ],
    paths: ['tests/features/**/*.feature'],
    format: [
      'progress',
      `json:reports/${browser}/cucumber-report.json`
    ],
    tags: process.env.TAGS || ''
  }
};