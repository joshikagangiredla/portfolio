import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="label">404</p>
      <h1 className="project__title">This page doesn&apos;t exist.</h1>
      <Link href="/" className="back-link">
        <span aria-hidden="true">←</span> All work
      </Link>
    </div>
  );
}
