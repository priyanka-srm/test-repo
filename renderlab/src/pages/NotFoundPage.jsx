import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div className="page-container not-found">
      <span className="not-found-code">404</span>
      <h1>Lab not found.</h1>
      <p>
        This route does not exist in RenderLab. Use the navigation to return to
        an available experiment.
      </p>
      <Link className="button button-primary" to="/">
        Back to overview
      </Link>
    </div>
  );
}
