import React, { useState } from 'react';

// Styles object defining CSS properties for various elements
const styles = {
  // Style for the body background and layout
  body: {
    backgroundImage: 'url("/path/to/uploaded/image/istockphoto-912507022-1024x1024.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  // Style for the main container box
  container: {
    textAlign: 'center',
    width: '90%',
    maxWidth: '800px',
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  // Style for the form container layout
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    margin: '2rem 0',
  },
  // Style for grouping label and input in the form
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    textAlign: 'left',
  },
  // Style for input fields in the form
  formInput: {
    padding: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
  // Style for the submit button
  button: {
    background: 'linear-gradient(145deg, #bdb6f3, #8c7ac7)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '25px',
    color: 'white',
    fontSize: '16px',
    padding: '12px 28px',
    cursor: 'pointer',
    boxShadow: '0 5px 20px rgba(130, 130, 200, 0.4)',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    width: '100%',
    maxWidth: '300px',
    margin: '1rem auto',
  },
  // Style for disabled state of the button
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  // Style for the container displaying search results
  resultsContainer: {
    marginTop: '2rem',
    padding: '1.5rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
  },
  // Style for the list of results
  resultsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    textAlign: 'left',
  },
  // Style for each individual result item
  resultItem: {
    padding: '1rem',
    margin: '0.5rem 0',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
  },
  // Style for error messages displayed to the user
  errorMessage: {
    color: '#ff6b6b',
    background: 'rgba(255, 107, 107, 0.1)',
    padding: '1rem',
    borderRadius: '6px',
    margin: '1rem 0',
    borderLeft: '4px solid #ff6b6b',
  },
  // Style for the main heading text
  heading: {
    fontSize: '2.5rem',
    fontWeight: 700,
    margin: 0,
  },
  // Style for highlighted accent text
  accent: {
    color: '#b68af3',
    textShadow: '0 0 5px rgba(182, 138, 243, 0.7), 0 0 10px rgba(182, 138, 243, 0.6), 0 0 15px rgba(182, 138, 243, 0.5)',
  },
  // Style for the subheading text
  subHeading: {
    fontSize: '1.25rem',
    fontWeight: 300,
    color: '#bbbbbb',
    marginBottom: '1.5rem',
  },
};

// Main application component
function App() {
  // State variables for form inputs and result data
  const [url, setUrl] = useState('');
  const [searchType, setSearchType] = useState('link');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);
    setIsLoading(true);

    try {
      // Make a POST request to the backend API with user inputs
      const response = await fetch('http://localhost:5000/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          search_type: searchType,
          search_term: searchTerm,
        }),
      });
      const data = await response.json();
      setResults(data);  // Set results with the data received from the backend
    } catch (error) {
      setError('Error scraping the website. Please try again.');  // Show error message if request fails
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };

  // Effect to apply styles to the body when the component mounts
  React.useEffect(() => {
    Object.assign(document.body.style, styles.body);  // Apply body styles

    // Cleanup function to reset styles when the component unmounts
    return () => {
      document.body.style = '';
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Website <span style={styles.accent}>Scraper</span>
      </h1>
      
      {/* Form for user inputs */}
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label htmlFor="url">Website URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            required
            style={styles.formInput}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="searchType">Search Type:</label>
          <select
            id="searchType"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={styles.formInput}
          >
            <option value="link">Link</option>
            <option value="image">Image</option>
            <option value="item">Text Item</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="searchTerm">Search Term:</label>
          <input
            type="text"
            id="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter search term"
            required
            style={styles.formInput}
          />
        </div>

        {/* Button with loading state */}
        <button 
          type="submit" 
          style={{
            ...styles.button,
            ...(isLoading ? styles.buttonDisabled : {}),
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Scraping...' : 'Scrape Website'}
        </button>
      </form>

      {/* Display error message if present */}
      {error && <p style={styles.errorMessage}>{error}</p>}
      
      {/* Display search results if available */}
      {results.length > 0 && (
        <div style={styles.resultsContainer}>
          <h2 style={styles.subHeading}>Search Results:</h2>
          <ul style={styles.resultsList}>
            {results.map((result, index) => (
              <li key={index} style={styles.resultItem}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
