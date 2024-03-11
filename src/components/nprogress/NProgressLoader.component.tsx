import React from "react";
import styles from "./NProgressLoader.module.scss";


/**
 * @description NProgressLoader component, uses the nprogress package, to make a loading bar in the container that it is placed in
 *              The bar will always be at the top of the container, and will be the width of the container, and will have a pulsing animation
 *
 *
 */
export const NProgressLoader = () => {
  return (
    <div className={styles.nprogressContainer}>
      <div className={styles.nprogressBar} />
    </div>
  );
};
