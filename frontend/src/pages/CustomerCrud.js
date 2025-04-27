import React, { useState } from "react";

const CustomerCRUD = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...customers];
      updated[editIndex] = form;
      setCustomers(updated);
      setEditIndex(null);
    } else {
      setCustomers([...customers, form]);
    }
    setForm({ name: "", email: "" });
  };

  const handleEdit = (index) => {
    setForm(customers[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = customers.filter((_, i) => i !== index);
    setCustomers(updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Customers</h2>

      {/* Customer Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Customer Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editIndex !== null ? "Update Customer" : "Add Customer"}
        </button>
      </form>

      {/* Customer List */}
      <div className="space-y-4">
        {customers.map((customer, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div>
              <div className="font-semibold">{customer.name}</div>
              <div>{customer.email}</div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-400 px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerCRUD;
