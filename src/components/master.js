import React, { Component } from "react";
import API from "./api";
import Grid from "@material-ui/core/Grid";

import Dropdown from "./dropdown";
import Card from "./card";

class Master extends Component {
  state = {
    furnitures: [],
    styles: [],
    deliveryTimes: [
      { name: "1 week", value: "1week", selected: false },
      { name: "2 week", value: "2week", selected: false },
      { name: "1 month", value: "1month", selected: false },
      { name: "more", value: "more", selected: false }
    ],
    shows: []
  };

  async componentDidMount() {
    let furnitures = await API.getFurniture();
    let shows = furnitures && furnitures.products ? furnitures.products : [];
    let styles = [];

    if (furnitures && furnitures.furniture_styles) {
      for (let style of furnitures.furniture_styles) {
        styles.push({ name: style, selected: false });
      }
    }

    this.setState({ furnitures, shows, styles });
  }

  search = event => {
    let shows = [...this.state.furnitures.products];
    const search = event.target.value.toLowerCase();

    shows = shows.filter(product =>
      product.name.toLowerCase().includes(search)
    );

    this.setState({ shows });
  };

  selectStyle = index => {
    let { styles } = this.state;

    styles[index].selected = !styles[index].selected;

    this.setState({ styles });
  };

  selectDeliveryTime = index => {
    let { deliveryTimes } = this.state;

    deliveryTimes[index].selected = !deliveryTimes[index].selected;

    this.setState({ deliveryTimes });
  };

  filterByStyle = shows => {
    const { styles } = this.state;
    let selectedStyle = [];
    let result = [];

    for (let style of styles) {
      if (style.selected) {
        selectedStyle.push(style.name);
      }
    }

    if (selectedStyle.length > 0) {
      for (let style of selectedStyle) {
        result = result.concat(
          shows.filter(show => show.furniture_style.includes(style))
        );
      }

      return this.getUniqueObjects(result);
    } else {
      return shows;
    }
  };

  getUniqueObjects = objects => {
    let uniqueObjects = [];
    let check = [];

    for (let object of objects) {
      if (!check.includes(object.name)) {
        uniqueObjects.push(object);
        check.push(object.name);
      }
    }

    return uniqueObjects;
  };

  filterByDeliveryTime = shows => {
    const { deliveryTimes } = this.state;
    let selectedDelivery = [];
    let result = [];

    for (let delivery of deliveryTimes) {
      if (delivery.selected) {
        selectedDelivery.push(delivery.name);
      }
    }

    if (selectedDelivery.length > 0) {
      for (let delivery of selectedDelivery) {
        switch (delivery) {
          case "1 week":
            result = result.concat(
              shows.filter(show => parseInt(show.delivery_time) <= 7)
            );
            break;

          case "2 week":
            result = result.concat(
              shows.filter(
                show =>
                  parseInt(show.delivery_time) > 7 &&
                  parseInt(show.delivery_time) <= 14
              )
            );
            break;

          case "1 month":
            result = result.concat(
              shows.filter(
                show =>
                  parseInt(show.delivery_time) > 14 &&
                  parseInt(show.delivery_time) <= 28
              )
            );
            break;

          case "more":
            result = result.concat(
              shows.filter(show => parseInt(show.delivery_time) > 28)
            );
            break;
        }
      }

      return this.getUniqueObjects(result);
    } else {
      return shows;
    }
  };

  render() {
    let { styles, deliveryTimes, shows } = this.state;

    shows = this.filterByStyle(shows);
    shows = this.filterByDeliveryTime(shows);

    return (
      <div className="master">
        <div className="filter">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            spacing={2}
            style={{ marginBottom: "20px" }}
          >
            <Grid item lg={6}>
              <input
                type="text"
                placeholder="Search Furniture"
                onChange={this.search}
              ></input>

              <hr />
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item lg={6}>
              <Dropdown
                label="Furniture Style"
                selections={styles}
                onSelect={this.selectStyle}
              />
            </Grid>

            <Grid item lg={6}>
              <Dropdown
                label="Delivery Time"
                selections={deliveryTimes}
                onSelect={this.selectDeliveryTime}
              />
            </Grid>
          </Grid>
        </div>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          spacing={2}
          style={{ padding: "20px" }}
        >
          {shows.map((product, i) => {
            return (
              <Grid key={i} item lg={6}>
                <Card product={product} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default Master;
