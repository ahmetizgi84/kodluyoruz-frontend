import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchInput from "./SearchInput";

describe("SearchInput komponentini teste hazırla ", () => {
  let input;

  beforeEach(() => {
    const { getByPlaceholderText } = render(<SearchInput />);

    input = getByPlaceholderText("Arama yap...");
  });

  test("input dökümanda olmalı", () => {
    expect(input.toBeInTheDocument);
  });
});
