import React, { Component, ErrorInfo, ReactNode } from 'react';
import { BaseView, BaseText, BaseTouchable } from './index';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReportError = () => {
    // In a real app, you would send this to your error reporting service
    console.log('Reporting error:', this.state.error);
    alert('Error reported. Thank you for helping us improve!');
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <BaseView 
          flex 
          center 
          padding="lg"
          backgroundColor="background"
        >
          <BaseView 
            surface 
            borderRadius="lg" 
            padding="xl"
            shadow="lg"
            maxHeight={400}
          >
            <BaseText 
              variant="heading" 
              center 
              marginBottom="md"
              color="error"
            >
              Oops! Something went wrong
            </BaseText>
            
            <BaseText 
              variant="body" 
              center 
              marginBottom="lg"
              muted
            >
              We're sorry, but something unexpected happened. Don't worry, your data is safe.
            </BaseText>

            {__DEV__ && this.state.error && (
              <BaseView 
                backgroundColor="surface" 
                padding="md" 
                borderRadius="md"
                marginBottom="lg"
              >
                <BaseText variant="caption" color="error">
                  {this.state.error.toString()}
                </BaseText>
              </BaseView>
            )}

            <BaseView row center>
              <BaseTouchable 
                onPress={this.handleRetry}
                backgroundColor="primary"
                borderRadius="md"
                paddingHorizontal="lg"
                paddingVertical="md"
                marginRight="md"
              >
                <BaseText color="textMain" weight="medium">
                  Try Again
                </BaseText>
              </BaseTouchable>

              <BaseTouchable 
                onPress={this.handleReportError}
                border
                borderRadius="md"
                paddingHorizontal="lg"
                paddingVertical="md"
              >
                <BaseText color="primary" weight="medium">
                  Report Issue
                </BaseText>
              </BaseTouchable>
            </BaseView>
          </BaseView>
        </BaseView>
      );
    }

    return this.props.children;
  }
}
