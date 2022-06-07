import { render, screen } from '@testing-library/react';
import App from '../mainapp/App';

test('renders app successfully', () => {
  render(<App />);
  const element = screen.getByText(/Chatter/i);
  expect(element).toBeInTheDocument();
});
