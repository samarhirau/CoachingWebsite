import React, { useState } from 'react';
import {
  BookOpen, User, DollarSign, Mail, Users, FileText, Globe, MessageSquare, Plus, Settings, Sliders, Layout, Zap, HelpCircle, List, BarChart, CreditCard, ChevronDown, CheckCircle, XCircle, MoreVertical, Search, Filter, Columns, ChevronRight, Menu, Bell,
  Edit
} from 'lucide-react';

// --- 1. TypeScript Interfaces for API Readiness ---

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  href: string;
  submenu?: SidebarItem[];
  active?: boolean;
}

interface Ticket {
  id: string;
  title: string;
  date: string;
  category: string;
  userName: string;
  status: 'High' | 'Medium' | 'Low';
}

// --- 2. Static Data (Replicating Screenshot Content) ---

const SIDEBAR_NAV: SidebarItem[] = [
  { name: 'Ebook', icon: BookOpen, href: '#' },
  { name: 'Enrollments', icon: Users, href: '#' },
  { name: 'Reports', icon: BarChart, href: '#' },
  { name: 'Affiliate', icon: Zap, href: '#' },
  { name: 'Users', icon: User, href: '#' },
  { name: 'Offline Payment', icon: CreditCard, href: '#' },
  { name: 'Message', icon: MessageSquare, href: '#' },
  { name: 'Newsletter', icon: Mail, href: '#' },
  { name: 'Contact', icon: Globe, href: '#' },
  { name: 'Blog', icon: FileText, href: '#' },
  {
    name: 'Customer Support',
    icon: HelpCircle,
    href: '#',
    active: true,
    submenu: [
      { name: 'Ticket List', icon: List, href: '#', active: true },
      { name: 'Support Category', icon: Columns, href: '#' },
      { name: 'Macro Replies', icon: Sliders, href: '#' },
      { name: 'Create Ticket', icon: Edit, href: '#' },
    ],
  },
];

const MOCK_TICKETS: Ticket[] = [
  { id: '#59678', title: 'Designing with Adobe Illustrator', date: 'April 9, 2026', category: 'Inefficient Algorithms', userName: 'Jane Austen', status: 'Medium' },
  { id: '#21234', title: 'Creating Stunning Logos', date: 'February 26, 2026', category: 'Workflow Bottlenecks', userName: 'J.K. Rowling', status: 'High' },
  { id: '#39678', title: 'Python Programming Essentials', date: 'January 8, 2026', category: 'Security Vulnerabilities', userName: 'Emily Brontë', status: 'High' },
  { id: '#71789', title: 'Effective Social Media Marketing', date: 'March 7, 2026', category: 'Deprecated Libraries', userName: 'George Orwell', status: 'High' },
  { id: '#36890', title: 'Effective Email Marketing Campaigns', date: 'September 29, 2026', category: 'Inadequate Storage', userName: 'Fyodor Dostoevsky', status: 'Medium' },
  { id: '#46890', title: 'Animation Basics with After Effects', date: 'July 28, 2026', category: 'Script Errors', userName: 'Harper Lee', status: 'Medium' },
  { id: '#69678', title: 'SEO Strategies for Business Growth', date: 'November 20, 2026', category: 'System Crashes', userName: 'Charlotte Brontë', status: 'High' },
  { id: '#28901', title: 'Creating Engaging Content', date: 'October 19, 2026', category: 'Application Freezing', userName: 'Herman Melville', status: 'Medium' },
  { id: '#27890', title: 'Professional Video Production', date: 'January 26, 2026', category: 'Ineffective Caching', userName: 'Fyodor Dostoevsky', status: 'High' },
  { id: '#45678', title: 'Designing Accessible Websites', date: 'September 16, 2026', category: 'Overuse of Resources', userName: 'Charles Dickens', status: 'Medium' },
];

// --- 3. Utility Components and Hooks ---

const getStatusStyles = (status: Ticket['status']) => {
  switch (status) {
    case 'High':
      return 'bg-green-100 text-green-800';
    case 'Medium':
      return 'bg-blue-100 text-blue-800';
    case 'Low':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const NavLink: React.FC<{ item: SidebarItem; isSub?: boolean }> = ({ item, isSub }) => {
  const Icon = item.icon;
  const baseClasses = 'flex items-center p-3 text-gray-700 rounded-lg transition-colors hover:bg-gray-100';
  const activeClasses = 'bg-teal-50 text-teal-700 font-medium border-l-4 border-teal-600 pl-2';

  return (
    <a href={item.href} className={`${baseClasses} ${item.active ? activeClasses : ''} ${isSub ? 'ml-6' : ''}`}>
      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
      <span className="flex-grow">{item.name}</span>
      {item.submenu && <ChevronRight className="w-4 h-4 ml-auto" />}
    </a>
  );
};

const TicketRow: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const statusClasses = getStatusStyles(ticket.status);

  // Function to handle API action (e.g., Close Ticket)
  const handleTicketAction = (action: string) => {
    // 🚨 THIS IS THE API INTEGRATION POINT 🚨
    console.log(`API Action: ${action} for Ticket ID: ${ticket.id}`);
    setIsDropdownOpen(false);
    // You would typically use an async function here to call your backend API:
    // try {
    //   await fetch(`/api/tickets/${ticket.id}/${action.toLowerCase()}`, { method: 'POST' });
    //   // Refresh the ticket list after successful action
    // } catch (error) {
    //   console.error('Action failed:', error);
    // }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{ticket.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {ticket.title} <p className="text-xs text-gray-500">{ticket.date}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.category}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ticket.userName}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses}`}>
          {ticket.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
        <button className="text-gray-400 hover:text-gray-600 p-1" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <MoreVertical className="w-5 h-5" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-6 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Ticket</a>
              <button onClick={() => handleTicketAction('CloseTicket')} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">
                Close Ticket
              </button>
              <button onClick={() => handleTicketAction('Delete')} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

// --- 4. Main Component Structure ---

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'opened' | 'closed'>('opened');

  return (
    <div className="bg-gray-50 flex h-screen overflow-hidden">
      
      {/* 4.1. Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-xl flex-shrink-0 flex flex-col overflow-y-auto">
        <div className="p-4 flex items-center h-16 border-b border-gray-200">
          <span className="text-2xl font-bold text-gray-800">Edaca</span>
        </div>
        
        <nav className="flex-grow p-3 space-y-1">
          {SIDEBAR_NAV.map((item, index) => (
            <div key={index}>
              <NavLink item={item} />
              {item.submenu && item.active && (
                <div className="pt-2 border-l-2 border-gray-100 ml-3">
                  {item.submenu.map((subItem, subIndex) => (
                    <NavLink key={subIndex} item={subItem} isSub={true} />
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Settings and Addons */}
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <h3 className="uppercase text-xs font-semibold text-gray-500 px-3 mt-4 mb-2">Addons</h3>
            <NavLink item={{ name: 'Addons', icon: Zap, href: '#' }} />
            <h3 className="uppercase text-xs font-semibold text-gray-500 px-3 mt-4 mb-2">Settings</h3>
            <NavLink item={{ name: 'Themes', icon: Layout, href: '#' }} />
            <NavLink item={{ name: 'Settings', icon: Settings, href: '#' }} />
          </div>
        </nav>
      </aside>

      {/* 4.2. Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden">
        
        {/* Top Header/Navbar */}
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="text-xl font-semibold text-gray-700 flex items-center">
            <span className="mr-2">All Contacts</span>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <Plus className="w-4 h-4" />
            </button>
          </h1>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"><Bell className="w-6 h-6" /></button>
            <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"><Menu className="w-6 h-6" /></button>
            <button className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none">
              <span className="font-medium mr-2 hidden sm:inline">User Name</span>
              <img className="h-8 w-8 rounded-full object-cover bg-teal-600 text-white p-1" src="https://via.placeholder.com/150/0d9488/ffffff?text=U" alt="User Avatar" />
            </button>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-grow p-6 overflow-y-auto">
          <div className="bg-white p-6 rounded-xl shadow-md">
            
            {/* Ticket Status Tabs */}
            <div className="flex items-center space-x-6 border-b border-gray-200 mb-6">
              <button 
                onClick={() => setActiveTab('opened')}
                className={`pb-3 border-b-2 font-medium transition-colors ${activeTab === 'opened' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Opened <span className={`ml-1 px-2 py-0.5 text-xs font-semibold rounded-full ${activeTab === 'opened' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700'}`}>10</span>
              </button>
              <button 
                onClick={() => setActiveTab('closed')}
                className={`pb-3 border-b-2 font-medium transition-colors ${activeTab === 'closed' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Closed <span className={`ml-1 px-2 py-0.5 text-xs font-semibold rounded-full ${activeTab === 'closed' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700'}`}>5</span>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center justify-between mb-4 space-x-4">
              <div className="flex-grow flex items-center space-x-3">
                <div className="relative flex items-center w-full max-w-sm">
                  <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-teal-500 focus:border-teal-500 text-sm" />
                  <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                </div>
                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  K.
                </button>
              </div>

              <div className="flex items-center space-x-3 flex-shrink-0">
                <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4 mr-2" /> Filter
                </button>
                <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  <ChevronDown className="w-4 h-4 mr-2" /> Sort By
                </button>
              </div>
            </div>

            {/* Ticket Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_TICKETS.map(ticket => (
                    <TicketRow key={ticket.id} ticket={ticket} />
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

