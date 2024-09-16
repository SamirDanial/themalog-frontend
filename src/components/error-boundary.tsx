import React, { Component, ReactNode } from "react";

// Define the state type
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Define the props type (if you need to pass any props, you can extend this)
interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null }; // Set initial state
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to trigger fallback UI
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log the error to an external service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
