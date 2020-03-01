import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

class FurnitureStyle extends Component {
  state = { selections: [], open: false, label: "" };

  componentDidMount() {
    window.addEventListener("click", e => {
      const { id } = this.props;
      const el = document.getElementById(`${id ? id : "dropdown"}`);

      if (el && el.contains(e.target)) {
        return;
      } else {
        this.setState({ open: false });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        selections: this.props.selections,
        label: this.props.label
      });
    }
  }

  onSelect = index => {
    if (this.props.onSelect) {
      this.props.onSelect(index);
    }
  };

  render() {
    const { id } = this.props;
    const { selections, open, label } = this.state;

    return (
      <div id={id ? id : "dropdown"} style={{ position: "relative" }}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="onHover"
          onClick={() => this.setState({ open: !open })}
          style={{
            backgroundColor: "white",
            padding: "5px",
            border: "1px solid #999999"
          }}
        >
          <Grid item>{label}</Grid>

          <Grid item>
            <ArrowDropDownIcon />
          </Grid>
        </Grid>

        <div
          style={{
            position: "absolute",
            width: "100%",
            border: "1px solid #999999",
            boxSizing: "border-box",
            display: open ? "" : "none"
          }}
        >
          {selections.map((style, i) => {
            return (
              <div
                key={i}
                className="onHover"
                style={{ backgroundColor: "white", padding: "5px" }}
                onClick={() => this.onSelect(i)}
              >
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>{style.name}</Grid>

                  <Grid item>
                    <CheckBoxIcon
                      style={{
                        color: "#009F6C",
                        display: style.selected ? "" : "none"
                      }}
                    />
                    <CheckBoxOutlineBlankIcon
                      style={{
                        display: !style.selected ? "" : "none"
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </div>

        <hr />
      </div>
    );
  }
}

export default FurnitureStyle;
