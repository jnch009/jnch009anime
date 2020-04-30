import Box from "@material-ui/core/Box";
import teal from "@material-ui/core/colors/teal";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";

import "./Card.css";

const color = teal[500];

const Card = ({ image, title, startDate }) => {
  //console.log(image);
  const [hoverDetails, setHoverDetails] = useState(false);

  return (
    <Box bgcolor={color} m={3} p={7}>
      <Box
        className={hoverDetails ? "image hvr-fade" : null}
        onPointerEnter={() => setHoverDetails(true)}
        onPointerLeave={() => setHoverDetails(false)}
      >
        <img
          className={hoverDetails ? "imgOpacity" : null}
          width={250}
          height={400}
          src={image}
          alt=""
        />
        <p className={hoverDetails ? null : "hidden"}>Click for more details</p>
      </Box>
      <Typography align="center">
        <h4 className="hvr-fade">
          <strong>{title}</strong>
        </h4>
        <h6>Debut: {startDate}</h6>
      </Typography>
    </Box>
  );
};

export default Card;
