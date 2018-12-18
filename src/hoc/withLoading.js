import React from 'react';
import s from '../scss/withLoading.module.scss';
import c from 'classnames';

// export default function withLoading(WrappedComponent) {
//   return function WithLoading(props) {
//     const { loading, ...rest } = props;
//     if (loading) {
//       return (
//         <div style={{ color: 'white', textAlign: 'center' }}>loading...</div>
//       );
//     } else {
//       return <WrappedComponent {...rest} />;
//     }
//   };
// }
export default function withLoading(WrappedComponent) {
  return function WithLoading(props) {
    const { loading, ...rest } = props;
    if (loading) {
      return (
        <div className={c(s.ispinner, s.ispinner__animating, s.ispinner__gray)}>
          <div className={s.ispinner__blade} />
          <div className={s.ispinner__blade} />
          <div className={s.ispinner__blade} />
          <div className={s.ispinner__blade} />
          <div className={s.ispinner__blade} />
          <div className={s.ispinner__blade} />
          <div className={s.ispinner__blade} />
          <div className={s.ispinner__blade} />
          <div className={s.ispinner__blade} />
          <div className={s.ispinner__blade} />
          <div className={s.ispinner__blade} />
          <div className={s.ispinner__blade} />
          <div className={s.ispinner__blade} />
        </div>
      );
    } else {
      return <WrappedComponent {...rest} />;
    }
  };
}
