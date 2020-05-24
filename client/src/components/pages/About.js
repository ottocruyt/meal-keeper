import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";

export const About = () => {
  return (
    <Fragment>
      <Typography variant="body1">
        This is a full stack React application for keeping meals.
      </Typography>
      <Typography variant="body1">
        Trying to make a grocery list for the next week is quite time consuming.
        This app makes it effortless.
      </Typography>
    </Fragment>
  );
};

export default About;
