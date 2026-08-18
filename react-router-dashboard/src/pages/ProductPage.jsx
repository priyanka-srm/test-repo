import { useParams } from "react-router-dom";
function ProductPage() {
  const { productId } = useParams();
  return (
    <div>
      <h1>Product Details</h1>
      <h2>Product ID: {productId}</h2>
      <p>You are viewing product {productId}.</p>
    </div>
  );
}
export default ProductPage;
