import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../contexts/AdminContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUsers, FiGlobe, FiLayers, FiTemplate, FiTrendingUp, FiActivity } = FiIcons;

const Overview = () => {
  const { components, templates, websites, users } = useAdmin();

  const stats = [
    {
      title: 'Total Components',
      value: components.length,
      icon: FiLayers,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      title: 'Templates',
      value: templates.length,
      icon: FiTemplate,
      color: 'from-purple-500 to-purple-600',
      change: '+8%'
    },
    {
      title: 'Active Websites',
      value: websites.length,
      icon: FiGlobe,
      color: 'from-green-500 to-green-600',
      change: '+24%'
    },
    {
      title: 'Total Users',
      value: users.length,
      icon: FiUsers,
      color: 'from-orange-500 to-orange-600',
      change: '+16%'
    }
  ];

  const recentActivity = [
    { action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
    { action: 'Website published', user: 'Jane Smith', time: '15 minutes ago' },
    { action: 'Template created', user: 'Admin', time: '1 hour ago' },
    { action: 'Component updated', user: 'Admin', time: '2 hours ago' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          <SafeIcon icon={FiTrendingUp} className="inline mr-2" />
          View Analytics
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <SafeIcon icon={stat.icon} className="text-white text-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiLayers} className="inline mr-3 text-blue-500" />
              Add New Component
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiTemplate} className="inline mr-3 text-purple-500" />
              Create Template
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiUsers} className="inline mr-3 text-green-500" />
              Manage Users
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiActivity} className="inline mr-3 text-orange-500" />
              View Analytics
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;