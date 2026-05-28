"use client";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../../services/api";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type Category = {
  id: number;
  name: string;
  type: string;
  user_id: number | null;
};

export default function CategoriesPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");

  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("expense");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserText = localStorage.getItem("user");

    if (!savedToken || !savedUserText) {
      router.push("/login");
      return;
    }

    const savedUser: User = JSON.parse(savedUserText);

    setUser(savedUser);
    setToken(savedToken);

    loadCategories(savedUser.id, savedToken);
  }, [router]);

  async function loadCategories(userId: number, userToken: string) {
    const data = await getCategories(userId, userToken);

    if (data.categories) {
      setCategories(data.categories);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      return;
    }

    if (!name) {
      setMessage("Category name is required.");
      return;
    }

    const data = await createCategory(
      {
        name: name,
        type: type,
        user_id: user.id,
      },
      token
    );

    setMessage(data.message);
    setName("");
    setType("expense");

    loadCategories(user.id, token);
  }

  async function handleDelete(id: number) {
    if (!user) {
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this category?");

    if (!confirmDelete) {
      return;
    }

    const data = await deleteCategory(id, token);

    setMessage(data.message);

    loadCategories(user.id, token);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        <main className="col-md-9 col-lg-10 p-4">
          <div className="mb-4">
            <h2>Categories</h2>
            <p className="text-muted">
              Create and manage your income and expense categories.
            </p>
          </div>

          {message && (
            <div className="alert alert-info" role="alert">
              {message}
            </div>
          )}

          <div className="card budget-card p-4 mb-4">
            <h5 className="mb-3">Add New Category</h5>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Example: Food, Transport, Salary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>

                <div className="col-md-4 d-flex align-items-end">
                  <button type="submit" className="btn btn-budget w-100">
                    Add Category
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="card budget-card p-4">
            <h5 className="mb-3">Categories List</h5>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>User ID</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-muted">
                        No categories found.
                      </td>
                    </tr>
                  ) : (
                    categories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                          <span
                            className={
                              category.type === "income"
                                ? "badge bg-success"
                                : "badge bg-danger"
                            }
                          >
                            {category.type}
                          </span>
                        </td>
                        <td>{category.user_id || "Default"}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(category.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}