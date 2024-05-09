module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // This line ensures Babel transpiles your files.
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|react-native-button|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base))',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'], // Optional, for setting up testing-library
  };
  