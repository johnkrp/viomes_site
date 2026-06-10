import { Component, type ErrorInfo, type ReactNode } from "react";

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled rendering error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Κάτι πήγε στραβά
            </h1>
            <p className="mt-3 text-foreground/75">
              Παρακαλούμε ανανεώστε τη σελίδα ή δοκιμάστε ξανά σε λίγο.
            </p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
