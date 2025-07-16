import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSave, FiSettings, FiShield, FiMail, FiDatabase, FiGlobe } = FiIcons;

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'email', label: 'Email', icon: FiMail },
    { id: 'database', label: 'Database', icon: FiDatabase },
    { id: 'api', label: 'API', icon: FiGlobe }
  ];

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Name
        </label>
        <input
          type="text"
          defaultValue="WebBuilder Pro"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Description
        </label>
        <textarea
          rows={3}
          defaultValue="Professional website builder with drag-and-drop functionality"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Default Language
        </label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>

      <div className="flex items-center space-x-3">
        <input type="checkbox" id="maintenance" className="rounded" />
        <label htmlFor="maintenance" className="text-sm text-gray-700">
          Enable maintenance mode
        </label>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Timeout (minutes)
        </label>
        <input
          type="number"
          defaultValue="30"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center space-x-3">
        <input type="checkbox" id="2fa" className="rounded" defaultChecked />
        <label htmlFor="2fa" className="text-sm text-gray-700">
          Enable two-factor authentication
        </label>
      </div>

      <div className="flex items-center space-x-3">
        <input type="checkbox" id="loginAttempts" className="rounded" defaultChecked />
        <label htmlFor="loginAttempts" className="text-sm text-gray-700">
          Limit login attempts
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password Policy
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="minLength" className="rounded" defaultChecked />
            <label htmlFor="minLength" className="text-sm text-gray-700">
              Minimum 8 characters
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="uppercase" className="rounded" defaultChecked />
            <label htmlFor="uppercase" className="text-sm text-gray-700">
              Require uppercase letters
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="numbers" className="rounded" defaultChecked />
            <label htmlFor="numbers" className="text-sm text-gray-700">
              Require numbers
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const EmailSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SMTP Host
        </label>
        <input
          type="text"
          placeholder="smtp.gmail.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SMTP Port
        </label>
        <input
          type="number"
          defaultValue="587"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Username
        </label>
        <input
          type="email"
          placeholder="your-email@gmail.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Password
        </label>
        <input
          type="password"
          placeholder="Enter email password"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center space-x-3">
        <input type="checkbox" id="ssl" className="rounded" defaultChecked />
        <label htmlFor="ssl" className="text-sm text-gray-700">
          Use SSL/TLS encryption
        </label>
      </div>
    </div>
  );

  const DatabaseSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Database Type
        </label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>PostgreSQL</option>
          <option>MySQL</option>
          <option>SQLite</option>
          <option>MongoDB</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Database Host
        </label>
        <input
          type="text"
          defaultValue="localhost"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Database Port
        </label>
        <input
          type="number"
          defaultValue="5432"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Database Name
        </label>
        <input
          type="text"
          defaultValue="webbuilder"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Test Connection
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Backup Database
        </button>
      </div>
    </div>
  );

  const ApiSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          API Base URL
        </label>
        <input
          type="url"
          defaultValue="https://api.webbuilder.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          API Key
        </label>
        <div className="flex space-x-2">
          <input
            type="password"
            defaultValue="sk-1234567890abcdef"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Regenerate
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rate Limiting (requests per minute)
        </label>
        <input
          type="number"
          defaultValue="100"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center space-x-3">
        <input type="checkbox" id="apiLogging" className="rounded" defaultChecked />
        <label htmlFor="apiLogging" className="text-sm text-gray-700">
          Enable API request logging
        </label>
      </div>

      <div className="flex items-center space-x-3">
        <input type="checkbox" id="cors" className="rounded" defaultChecked />
        <label htmlFor="cors" className="text-sm text-gray-700">
          Enable CORS
        </label>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return <GeneralSettings />;
      case 'security': return <SecuritySettings />;
      case 'email': return <EmailSettings />;
      case 'database': return <DatabaseSettings />;
      case 'api': return <ApiSettings />;
      default: return <GeneralSettings />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          <SafeIcon icon={FiSave} className="inline mr-2" />
          Save Changes
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <SafeIcon icon={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;