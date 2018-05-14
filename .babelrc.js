module.exports = {
  presets: [
    [
      'env',
      {
        targets: {
          browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
        },
      },
    ],
    'react',
    'flow',
    'stage-0',
  ],
  plugins: ['transform-class-properties', 'transform-flow-strip-types'],
};
