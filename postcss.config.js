'use strict';

/** @type {Record<'plugins', import('postcss').AcceptedPlugin[]>} */
module.exports = {
  plugins: [
    [
      require.resolve('postcss-sort-media-queries'),
      {
        sort: 'mobile-first' // default value
      }
    ],

    // Next.js will disable its built-in default PostCSS configuration you
    // create `postcss.config.js`, which you can add it back:

    /* --- Start of Next.js built-in default PostCSS configuration --- */
    require.resolve('next/dist/compiled/postcss-flexbugs-fixes'),
    [
      require.resolve('next/dist/compiled/postcss-preset-env'),
      {
        browsers: ['defaults'],
        autoprefixer: {
          // Disable legacy flexbox support
          flexbox: 'no-2009'
        },
        // Enable CSS features that have shipped to the
        // web platform, i.e. in 2+ browsers unflagged.
        stage: 3,
        features: {
          'custom-properties': false
        }
      }
    ]
    /* --- End of Next.js built-in default PostCSS configuration --- */
  ]
};
