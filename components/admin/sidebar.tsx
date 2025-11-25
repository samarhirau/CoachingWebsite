"use client";
import React, { useCallback } from "react";
import { ChevronsDown, ChevronsUp } from "lucide-react";

interface SidebarLinkProps {
  title: string;
  section: string;
  icon: React.ElementType;
  activeSection: string;
  setActiveSection: (s: string) => void;
  submenu?: string[];
  isOpen?: boolean;
  onToggle?: () => void;
}

export const SidebarLink: React.FC<SidebarLinkProps> = React.memo(
  ({ title, section, icon: Icon, activeSection, setActiveSection, submenu, isOpen, onToggle }) => {
    const isActive = activeSection.startsWith(section);

    return (
      <div>
        <div
          className={`flex items-center justify-between p-3 my-1 rounded-lg cursor-pointer transition duration-150 ${
            isActive ? "bg-indigo-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => (submenu?.length ? onToggle?.() : setActiveSection(section))}
        >
          <div className="flex items-center">
            <Icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{title}</span>
          </div>
          {submenu?.length && (isOpen ? <ChevronsUp className="w-4 h-4" /> : <ChevronsDown className="w-4 h-4" />)}
        </div>
        {submenu?.length && isOpen && (
          <ul className="pl-6 pt-1 border-l-2 border-indigo-400 ml-3">
            {submenu.map((sub) => (
              <li
                key={sub}
                className={`py-1.5 px-3 text-sm cursor-pointer rounded-md transition duration-100 ${
                  activeSection === `${section}/${sub}` ? "bg-indigo-100 text-indigo-700 font-semibold" : "text-gray-500 hover:text-indigo-500"
                }`}
                onClick={() => setActiveSection(`${section}/${sub}`)}
              >
                {sub}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

interface SidebarProps {
  menuStructure: any[];
  activeSection: string;
  setActiveSection: (s: string) => void;
  openMenu: string | null;
  handleToggleMenu: (s: string) => void;
  isSidebarOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ menuStructure, activeSection, setActiveSection, openMenu, handleToggleMenu, isSidebarOpen }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:translate-x-0 transition duration-300 ease-in-out w-64 bg-white shadow-xl z-20 flex flex-col rounded-tr-xl rounded-br-xl`}
    >
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-3xl font-extrabold text-indigo-700">Upcoder</h1>
        <p className="text-xs text-gray-500">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        {menuStructure.map((item) => (
          <SidebarLink
            key={item.section}
            title={item.title}
            section={item.section}
            icon={item.icon}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            submenu={item.submenu}
            isOpen={openMenu === item.section}
            onToggle={() => handleToggleMenu(item.section)}
          />
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100 text-sm text-center text-gray-500">© 2025 Upcoder. All Rights Reserved.</div>
    </aside>
  );
};
