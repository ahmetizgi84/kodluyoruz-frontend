import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EmojiResults from "./EmojiResults";
import EmojiResultRow from "../emojiResultRow/EmojiResultRow";

describe("Header komponentini teste hazırla ", () => {
  let emojiTitles;
  const fakeEmojies = [
    {
      title: "100",
      symbol: "💯",
      keywords: "hundred points symbol symbol wow wow win win perfect perfect parties parties",
    },
    {
      title: "1234",
      symbol: "🔢",
      keywords: "input symbol for numbers symbol",
    },
  ];

  beforeEach(() => {
    //const { getAllByTestId } = render(<EmojiResultRow symbol={fakeEmojies.symbol} title={fakeEmojies.title} />);
    //emojiTitles = getAllByTestId("emoji-title").map((EmojiResultRow) => EmojiResultRow.textContent);
  });

  test("should render every item", () => {
    /*
    console.log(emojiTitles);
    const fakeEmojiTitles = fakeEmojies.map((e) => e.title);
    expect(emojiTitles).toEqual(fakeEmojiTitles);
    */
  });
});
