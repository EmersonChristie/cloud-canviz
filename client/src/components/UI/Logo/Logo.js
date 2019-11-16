import React from "react";
import classes from "./Logo.module.css";

const SvgComponent = props => (
  <div className={classes.logo} style={{ width: `${props.width}` }}>
    <div className={classes.svg}>
      <svg
        id="prefix__b1bcea3e-3912-4606-9c1d-850d58aa109b"
        data-name="Layer 1"
        viewBox="0 0 600 200"
        {...props}
      >
        <defs></defs>
        <title>{"logoArtboard 1"}</title>
        <path
          className={classes.an}
          d="M207.147 137.226c-10.589 0-21.345.594-31.914-.111-18.213-1.216-39.362-16.887-33.509-37.297 5.913-20.615 33.507-27.817 51.985-23 11.194 2.919 22.213 9.998 26.476 21.209 1.897 4.987 1.87 9.895 1.87 15.09v37.747c0 8.043 12.5 8.057 12.5 0V112.16c0-7.35-.745-14.336-3.84-21.146-5.73-12.611-17.782-21.22-30.702-25.382-23.389-7.532-54.39.286-66.948 22.798-12.572 22.536 1.881 47.753 23.885 56.961 15.493 6.483 33.758 4.335 50.197 4.335 8.044 0 8.057-12.5 0-12.5zM322.955 151.366c0-12.187.302-24.412 0-36.595-.286-11.528-6.134-21.767-15.01-28.948-9.437-7.635-21.166-10.115-33.072-10.532-13.043-.457-25.404 2.845-36.027 10.493-6.47 4.657-.236 15.505 6.309 10.793 10.988-7.91 23.25-10.021 36.634-8.286 11.89 1.542 24.179 8.289 27.776 20.545 1.894 6.456.89 14.11.89 20.737v21.793c0 8.043 12.5 8.056 12.5 0z"
        />
        <path
          className={classes.c}
          d="M558.636 162.969H135.84c-8.207 0-16.563.394-24.737-.517-19.648-2.189-39.327-11.44-51.614-27.258-12.442-16.017-14.795-37.046-8.046-55.912.233-.65 1.163-3.004 1.025-2.681-.154.36.895-1.926 1.232-2.605a66.89 66.89 0 017.339-11.677 68.644 68.644 0 0122.063-18.267c16.808-8.775 40.04-9.896 57.69-2.671 8.519 3.486 15.306 9.61 21.302 16.449 5.313 6.06 14.125-2.81 8.839-8.84-13.673-15.595-30.573-23.198-51.174-24.275-21.975-1.149-42.696 5.105-59.206 19.94-29.62 26.611-34.349 72.943-6.802 103 17.535 19.135 43.53 27.814 69.001 27.814h345.06c29.8 0 59.725.798 89.517 0 .435-.012.872 0 1.307 0 8.043 0 8.057-12.5 0-12.5z"
        />
        <path
          className={classes.viz}
          d="M379.85 154.004a7 7 0 01-2.44 1.862 8.056 8.056 0 01-3.66.814 7.606 7.606 0 01-3.658-.873 5.99 5.99 0 01-2.237-1.803l-46.958-67.03a2.09 2.09 0 010-2.735 5.892 5.892 0 013.456-1.92 9.507 9.507 0 014.777.058 6.28 6.28 0 013.355 1.92l41.266 58.884 41.063-58.884a6.245 6.245 0 013.354-1.92 9.507 9.507 0 014.777-.058 5.898 5.898 0 013.456 1.92 2.096 2.096 0 010 2.735zM436.157 85.694a3.007 3.007 0 011.83-2.56 10.07 10.07 0 018.944 0 3.007 3.007 0 011.83 2.56v67.378a3.004 3.004 0 01-1.83 2.56 10.07 10.07 0 01-8.944 0 3.004 3.004 0 01-1.83-2.56zM458.924 85.578a3.008 3.008 0 011.83-2.56 8.872 8.872 0 014.472-1.048h81.923a8.88 8.88 0 014.472 1.047 3.008 3.008 0 011.83 2.56 2.338 2.338 0 01-.916 1.746q-.914.816-.71.698l-75.419 61.444h70.743a8.88 8.88 0 014.472 1.047 2.706 2.706 0 010 5.12 8.88 8.88 0 01-4.472 1.048h-81.923a8.872 8.872 0 01-4.472-1.048 3.004 3.004 0 01-1.83-2.56 3.554 3.554 0 011.22-2.21l75.214-61.677h-70.132a8.872 8.872 0 01-4.472-1.047 3.005 3.005 0 01-1.83-2.56z"
        />
      </svg>
    </div>
  </div>
);

export default SvgComponent;
