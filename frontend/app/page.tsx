import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container min-vh-100 d-flex align-items-center">
      <div className="row align-items-center w-100">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold">Welcome to Budget+</h1>
          <p className="lead mt-3">
            Manage your personal and shared budgets, track income and expenses,
            monitor spending, and visualize your financial activity with a smart dashboard.
          </p>

          <div className="mt-4">
            <Link href="/login" className="btn btn-budget me-3">
              Get Started
            </Link>

            <Link href="/dashboard" className="btn btn-outline-primary rounded-pill px-4">
              View Dashboard
            </Link>
          </div>
        </div>

        <div className="col-md-6 mt-5 mt-md-0">
          <div className="budget-card p-4">
            <h4>Smart Budget Overview</h4>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Income</span>
              <strong>1200 DT</strong>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <span>Expenses</span>
              <strong>600 DT</strong>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <span>Budget Used</span>
              <strong>50%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}