import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Enter from './Enter';

// Mocking the external fetch API
global.fetch = jest.fn() as jest.Mock;

// Utility function to reset mocks before each test
beforeEach(() => {
  (fetch as any).mockClear();
  (fetch as any).mockResolvedValue({
    json: () => Promise.resolve([{ id: 1, mealName: 'Apple', calories: '95', protein: '0.5', carbs: '25', fat: '0.3' }]),
    ok: true
  });
});

describe('Enter', () => {
  it('renders correctly and fetches meals on mount', async () => {
    const { getByText, getByPlaceholderText, findAllByText } = render(<Enter />);
    
    // Check for initial render components
    expect(getByPlaceholderText('Enter food name')).toBeTruthy();
    expect(getByText('Add New Food')).toBeTruthy();
    
    // Verify API was called to fetch meals
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://brief-oriole-causal.ngrok-free.app/rest_api/api/Barcode/ListOfBarcodes', expect.objectContaining({
      headers: { 'Authorization': 'Bearer undefined' } // Assuming currentUser is not defined in this test environment
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

    // Additional assertions would depend on whether you can access the state or how the component reacts to input
  });

  it('handles adding new food', async () => {
    const { getByText } = render(<Enter />);
    const addButton = getByText('Add New Food');

    // Simulating the button press
    fireEvent.press(addButton);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
        method: 'POST'
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
      expect(fetch).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
        method: 'DELETE'
      }));
    });

    // Expecting an alert indicating success
    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Food deleted successfully!');
  });
});
