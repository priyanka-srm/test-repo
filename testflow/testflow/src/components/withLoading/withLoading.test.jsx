import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import withLoading from "./withLoading";

function UserProfile({ name }) {
  return <h2>{name}</h2>;
}

function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

const UserProfileWithLoading = withLoading(UserProfile);
const ProductListWithLoading = withLoading(ProductList);

describe("withLoading HOC", () => {
  it("shows loading status when isLoading is true", () => {
    render(<UserProfileWithLoading isLoading name="Asha" />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading...");
    expect(
      screen.queryByRole("heading", { name: "Asha" }),
    ).not.toBeInTheDocument();
  });

  it("renders the wrapped component when loading is false", () => {
    render(<UserProfileWithLoading isLoading={false} name="Asha" />);

    expect(screen.getByRole("heading", { name: "Asha" })).toBeInTheDocument();
  });

  it("forwards props to a different wrapped component", () => {
    render(
      <ProductListWithLoading
        isLoading={false}
        products={[{ id: 1, name: "Keyboard" }]}
      />,
    );

    expect(screen.getByText("Keyboard")).toBeInTheDocument();
  });
});
