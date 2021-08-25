import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from "./Header";

describe("Header komponentini teste hazırla ", () => {
  let image1, image2;
  const url1 = "//cdn.jsdelivr.net/emojione/assets/png/1f638.png";
  const url2 = "//cdn.jsdelivr.net/emojione/assets/png/1f63a.png";

  beforeEach(() => {
    const { getByAltText } = render(<Header />);
    image1 = getByAltText("cat smiles teeth");
    image2 = getByAltText("cat smiles big");
  });

  test("cat smiles teeth imajı dökümanda olmalı", () => {
    expect(image1.toBeInTheDocument);
  });

  it("cat smiles big imajı dökümanda olmalı", () => {
    expect(image2.toBeInTheDocument);
  });

  it("cat smiles teeth imajı url1'e sahip olmalı", () => {
    expect(image1.src).toContain(url1);
  });

  it("cat smiles big imajı url2'e sahip olmalı", () => {
    expect(image2.src).toContain(url2);
  });
});
