export function LoadingIndicator({ isLoading, children, small }) {
  if (isLoading) {
    return small ? (
      <i className="fa fa-spinner fa-pulse" />
    ) : (
      <span className="font--primary spinner--large">
        <i className="fa fa-spinner fa-pulse m-2" />
      </span>
    );
  }
  return children;
}
