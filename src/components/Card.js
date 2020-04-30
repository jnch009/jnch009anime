import Box from "@material-ui/core/Box";
import teal from "@material-ui/core/colors/teal";
import Typography from "@material-ui/core/Typography";
import React from "react";

import "./Card.css";

const color = teal[500];

const Card = ({ image, title, startDate }) => {
  console.log(image);
  return (
    <Box bgcolor={color} m={3} p={7}>
      <div class="image">
        <img className="card" width={250} height={400} src={image} alt="" />
        <p>Click for more details</p>
      </div>
      <Typography align="center">
        <h4>
          <strong>{title}</strong>
        </h4>
        <h6>Debut: {startDate}</h6>
      </Typography>
    </Box>
  );
};

export default Card;
