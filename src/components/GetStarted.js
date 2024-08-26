import React from 'react';

const GetStartedPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Our Platform!</h1>
      <p style={styles.description}>
        We're excited to have you here. Start exploring and discover all the amazing features we offer. 
        Whether you're looking to learn something new or just want to browse around, we're here to help you get started.
      </p>
    </div>
  );
};

const handleGetStarted = () => {
  // You can add logic here to navigate to a different page or perform another action
  console.log('Get Started button clicked');
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  description: {
    fontSize: '1.25rem',
    marginBottom: '30px',
    color: '#555',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default GetStartedPage;
