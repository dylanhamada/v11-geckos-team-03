import React from "react";

class AddList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "prompt",
      listTitle: "",
      inputValid: false,
      borderColor: "#555",
      spans: 0
    };
    this.addListRef = React.createRef();
  }

  // Inialize element height on grid
  componentDidMount() {
    this.setSpans();
  }

  setSpans = () => {
    const height = this.addListRef.current.clientHeight;

    const spans = Math.floor(height / 10);

    this.setState({ spans: spans });
  };

  // Mode toggle
  toggleMode = () => {
    if (this.state.mode === "prompt") {
      this.setState({ mode: "input" });
      //this.props.setSpansUpdate();
    } else {
      this.setState({ mode: "prompt" });
      //this.props.setSpansTruncate();
    }
  };

  // Submit handlers
  onFormSubmit = event => {
    event.preventDefault();

    // Validate input
    if (!this.state.listTitle) {
      alert("Please enter a title.");
      return false;
    } else if (!this.state.inputValid) {
      alert(
        `A list with the title "${this.state.listTitle}" already exists. Please try a different title.`
      );
      return false;
    }

    // Submit input
    this.props.onSubmit(this.state.listTitle);

    // Clear input
    this.setState({ listTitle: "", inputValid: false, borderColor: "#555" });

    // Change mode back to "prompt"
    this.toggleMode();
  };

  handleChange = e => {
    //Check if user input matches existing list title
    let inputUnique = true;
    this.props.currentLists.forEach(list => {
      if (e.target.value === list.title) {
        inputUnique = false;
      }
    });

    // After check, update state
    inputUnique
      ? this.setState({
          listTitle: e.target.value,
          inputValid: true,
          borderColor: "#4fa644"
        })
      : this.setState({
          listTitle: e.target.value,
          inputValid: false,
          borderColor: "red"
        });

    // Reset border color if input is empty
    if (!e.target.value) {
      this.setState({
        borderColor: "#555"
      });
    }
  };

  render() {
    if (this.state.mode === "prompt") {
      return (
        <div ref={this.addListRef} className="addList addList__prompt">
          <button onClick={this.toggleMode} className="addList__prompt-button">
            <span className="addList__prompt-plus">+</span>
            <span className="addList__prompt-label"> Add new list</span>
          </button>
        </div>
      );
    } else {
      return (
        <div
          className="addList addList__input"
          ref={this.addListRef}
          style={{ gridRowEnd: `span ${this.state.spans}` }}
        >
          <div className="addList__form">
            <form onSubmit={this.onFormSubmit} className="form">
              <div className="form__group">
                <input
                  type="text"
                  className="form form__input form__input--validation"
                  value={this.state.listTitle}
                  onChange={this.handleChange}
                  style={{ borderBottomColor: this.state.borderColor }}
                  placeholder="New list title..."
                />
              </div>
              <div className="form__group">
                <input
                  type="submit"
                  className="form__submit"
                  value="Add List"
                />
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default AddList;
