import React, { Component } from "react";

import { Grid } from "@material-ui/core";

class Card extends Component {
  state = {};

  numberWithCommas(num) {
    if (num) {
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
    } else {
      return "0";
    }
  }

  renderFurnitureStyle = style => {
    return style.toString().replace(/,/g, ", ");
  };

  render() {
    const { product } = this.props;

    return (
      <div className="card">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ marginBottom: "10px" }}
        >
          <Grid item className="card-title">
            {product.name}
          </Grid>
          <Grid item className="card-price">
            {this.numberWithCommas(product.price)}
          </Grid>
        </Grid>

        <div className="card-description">{product.description}</div>
        <div className="card-furniture-style">
          {this.renderFurnitureStyle(product.furniture_style)}
        </div>

        <div className="card-delivery-time">{product.delivery_time} Day</div>
      </div>
    );
  }
}

export default Card;
