import React from "react";

class ErrorBondary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    } else {
      return this.props.children; // refers to the child component we are rendering
    }
  }
}

export default ErrorBondary;
