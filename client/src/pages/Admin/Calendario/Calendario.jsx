import { useState } from 'react';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import Calendar from '../../../components/Calendar';

function Calendario() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
/* Colocar la logica */

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-9xl mx-auto">

            {/* Calendario actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Calendario</h1>
              </div>

            </div>

            <Calendar/>

          </div>
        </main>


      </div>
    </div>
  )
}

export default Calendario