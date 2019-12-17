module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          'src/*': ['./src/'],
          'hooks/*': ['./src/hooks/'],
          'components/*': ['./src/components/'],
          'api/*': ['./src/api/'],
          'actions/*': ['./src/actions/'],
          'utils/*': ['./src/utils/'],
          'styles/*': ['./src/styles/'],
          'modules/*': ['./src/modules/'],
        },
      },
    ],
  ],
};
