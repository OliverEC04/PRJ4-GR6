import 'react-native-gesture-handler/jestSetup';
import { Alert } from 'react-native';

// Mock for the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

// Mock for the Alert API
jest.spyOn(Alert, 'alert');
