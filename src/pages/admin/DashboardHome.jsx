export default function DashboardHome() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">
        <p className="text-sm text-gray-500">Total Users</p>
        <p className="mt-2 text-3xl font-bold text-gray-800">1,234</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">
        <p className="text-sm text-gray-500">Products</p>
        <p className="mt-2 text-3xl font-bold text-gray-800">567</p>
      </div>
      <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">
        <p className="text-sm text-gray-500">Orders</p>
        <p className="mt-2 text-3xl font-bold text-gray-800">321</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition">
        <p className="text-sm text-gray-500">Revenue</p>
        <p className="mt-2 text-3xl font-bold text-gray-800">$12,345</p>
      </div>
    </div>
  );
}
