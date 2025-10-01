interface WithLoadingProps {
  isLoading: boolean;
}

export const withLoading = <T extends object>(
  Component: React.ComponentType<T>
) => {
  return (props: T & WithLoadingProps) => {
    const { isLoading, ...restProps } = props;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...(restProps as T)} />;
  };
};
