import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode; 
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("logging", error, errorInfo);
   
  }

  render() {
    if (this.state.hasError) {
      return <div>
        <img className='"sm:h-[300px] md:h-[690px] w-[2000px]' src="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png" alt="error image " />
      </div>
    }

    return this.props.children; 
  }
}
