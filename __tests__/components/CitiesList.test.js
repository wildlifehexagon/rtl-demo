import { render, screen } from "@testing-library/react";
import React from "react";
import CitiesList from "../../components/CitiesList";
import CustomSWRConfig from "../../providers/SWRConfig";
import {
  mockUSCities,
  mockCanadaCities,
  mockMexicoCities,
} from "../../mocks/handlers";

describe("CitiesList", () => {
  // create custom component that includes the SWR provider
  const CitiesListWrapper = ({ country }) => {
    return (
      <CustomSWRConfig>
        <CitiesList country={country} />
      </CustomSWRConfig>
    );
  };

  it("shows US cities when country is USA", async () => {
    render(<CitiesListWrapper country="usa" />);
    // first check loading state
    expect(screen.getByText(/loading.../)).toBeInTheDocument();
    // wait for data to appear
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(10);
    // get the text content of each list item and compare to mock data
    const cities = listItems.map((li) => li.textContent);
    expect(cities).toEqual(mockUSCities);
  });

  it("shows Canada cities when country is Canada", async () => {
    render(<CitiesListWrapper country="canada" />);
    expect(screen.getByText(/loading.../)).toBeInTheDocument();
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(10);
    const cities = listItems.map((li) => li.textContent);
    expect(cities).toEqual(mockCanadaCities);
  });

  it("shows Mexico cities when country is Mexico", async () => {
    render(<CitiesListWrapper country="mexico" />);
    expect(screen.getByText(/loading.../)).toBeInTheDocument();
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(10);
    const cities = listItems.map((li) => li.textContent);
    expect(cities).toEqual(mockMexicoCities);
  });

  it("displays error when country is Atlantis", async () => {
    render(<CitiesListWrapper country="atlantis" />);
    // first check loading state
    expect(screen.getByText(/loading.../)).toBeInTheDocument();
    // wait for error to appear
    const error = await screen.findByText(/got an error/);
    expect(error).toBeInTheDocument();
  });
});
