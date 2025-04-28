
function MiniPageDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="p-4 hover:bg-gray-200 cursor-pointer">Dashboard</li>
            <li className="p-4 hover:bg-gray-200 cursor-pointer">Users</li>
            <li className="p-4 hover:bg-gray-200 cursor-pointer">Settings</li>
            <li className="p-4 hover:bg-gray-200 cursor-pointer">Reports</li>
            <li className="p-4 hover:bg-gray-200 cursor-pointer">Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin</span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Logout</button>
          </div>
        </header>

        <main className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Resumen de Ventas</h2>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-gray-600">Ventas totales este mes</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Resumen de Ventas</h2>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-gray-600">Ventas totales este mes</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Resumen de Ventas</h2>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-gray-600">Ventas totales este mes</p>
            </div>


          </div>
        </main>
      </div>
    </div>
  )
}

export default MiniPageDashboard