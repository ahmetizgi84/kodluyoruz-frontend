import React, { PureComponent } from "react";
import Header from "./components/header/Header";
import SearchInput from "./components/searchInput/SearchInput";
import EmojiResults from "./components/emojiResults/EmojiResults";
import filterEmoji from "./filterEmoji";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filteredEmoji: filterEmoji("", 20),
    };
  }

  handleSearchChange = (event) => {
    this.setState({
      filteredEmoji: filterEmoji(event.target.value, 20),
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchInput textChange={this.handleSearchChange} />
        <EmojiResults emojiData={this.state.filteredEmoji} />
      </div>
    );
  }
}
