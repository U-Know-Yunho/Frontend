import React from 'react';

export default function withLoading(WrappedComponent) {
  return function WithLoading(props) {
    const { loading, ...rest } = props;
    if (loading) {
      return (
        <div style={{ color: 'white', textAlign: 'center' }}>loading...</div>
      );
    } else {
      return <WrappedComponent {...rest} />;
    }
  };
}
