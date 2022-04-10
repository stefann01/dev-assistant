import React from "react";

import styles from "./LoadingIndicator.module.scss";

const LoadingIndicator = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
