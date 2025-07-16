import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHome, FiLayers, FiTemplate, FiGlobe, FiUsers, FiBarChart3, FiSettings } = FiIcons;

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: FiHome, label: 'Overview' },
    { path: '/admin/components', icon: FiLayers, label: 'Components' },
    { path: '/admin/templates', icon: FiTemplate, label: 'Templates' },
    { path: '/admin/websites', icon: FiGlobe, label: 'Websites' },
    { path: '/admin/users', icon: FiUsers, label: 'Users' },
    { path: '/admin/analytics', icon: FiBarChart3, label: 'Analytics' },
    { path: '/admin/settings', icon: FiSettings, label: 'Settings' }
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
      className="bg-white shadow-lg border-r border-gray-200 flex flex-col"
    >
      <div className="p-6 border-b border-gray-200">
        <motion.div
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiLayers} className="text-white text-xl" />
          </div>
          {isOpen && (
            <div>
              <h2 className="text-lg font-bold text-gray-800">WebBuilder</h2>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          )}
        </motion.div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="text-xl" />
                  {isOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;