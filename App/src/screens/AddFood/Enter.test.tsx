import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Enter from './Enter';
import { Alert } from 'react-native';  // Import Alert from react-native

// Mocking the external fetch API
global.fetch = jest.fn() as jest.Mock;

// Utility function to reset mocks before each test
beforeEach(() => {
  (fetch as any).mockClear();
  (fetch as any).mockResolvedValue({
    json: () => Promise.resolve([{ id: 1, mealName: 'Apple', calories: '95', protein: '0.5', carbs: '25', fat: '0.3' }]),
    ok: true
  });
  jest.spyOn(Alert, 'alert');
});

describe('Enter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and fetches meals on mount', async () => {
    const { getByText, getByPlaceholderText, findAllByText } = render(<Enter />);
    
    // Check for initial render components
    expect(getByPlaceholderText('Enter food name')).toBeTruthy();
    expect(getByText('Add New Food')).toBeTruthy();
    
    // Verify API was called to fetch meals
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('http://rottehjem.duckdns.org:5000/api/Barcode/ListOfBarcodesForUser', expect.objectContaining({
      headers: { 'Authorization': 'Bearer test-token' } // Assuming currentUser is mocked with test-token
    })));

    // Checking if meals are rendered
    const items = await findAllByText('Apple');
    expect(items).toHaveLength(1); // Assumes that "Apple" is part of the fetched meals
  });

  it('allows entering food details and updating states', () => {
    const { getByPlaceholderText } = render(<Enter />);
    const foodNameInput = getByPlaceholderText('Enter food name');
    const proteinInput = getByPlaceholderText('Enter protein amount');
    
    fireEvent.changeText(foodNameInput, 'Banana');
    fireEvent.changeText(proteinInput, '1.2');
  });

  it('handles adding new food', async () => {
    const { getByText } = render(<Enter />);
    const addButton = getByText('Add');

    // Simulating the button press
    fireEvent.press(addButton);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('AddMealWithNoBarcode'), expect.objectContaining({
        method: 'POST',
        headers: { Authorization: 'Bearer test-token' },
      }));
    });

    // Check for successful alert (mocked)
    expect(Alert.alert).toHaveBeenCalledWith('Success', 'New food added successfully!');
  });

  it('handles deleting food', async () => {
    const { getByText } = render(<Enter />);
    const deleteButton = getByText('Delete Food');

    // Setting a specific ID to test deletion
    fireEvent.press(deleteButton);

    // Wait for the delete fetch call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('RemoveBarcode'), expect.objectContaining({
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer test-token' },
      }));
    });

    // Expecting an alert indicating success
    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Food deleted successfully!');
  });
});
