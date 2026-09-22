import React from "react";
import PropTypes from "prop-types";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return typeof this.props.fallback === "function"
        ? this.props.fallback(this.state.error, () => this.setState({ hasError: false }))
        : this.props.fallback || (
            <div role="alert" style={{ padding: "1rem", border: "1px solid red", background: "#ffe6e6" }}>
              <p>Something went wrong in this section.</p>
              <button onClick={() => this.setState({ hasError: false })}>Try again</button>
            </div>
          );
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.node.isRequired,
};
