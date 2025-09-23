// app/dashboard/layout.tsx
import Link from 'next/link';
import { FaChartBar, FaSyncAlt, FaSearch, FaUserCircle } from 'react-icons/fa';

function Sidebar() {
  const navItems = [
    { name: 'Analytics', href: '/dashboard/analytics', icon: FaChartBar },
    { name: 'Revision', href: '/dashboard/revision', icon: FaSyncAlt },
    { name: 'Problems', href: '/dashboard/problem/1', icon: FaSearch }, // Example link
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white min-h-screen p-4">
      
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link href={item.href} className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
                <item.icon className="mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-gray-700 pt-4">
        <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-700">
          <FaUserCircle className="mr-3" />
          Prasham Karkera
        </a>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}