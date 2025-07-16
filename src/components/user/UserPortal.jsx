import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../../contexts/AdminContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiGlobe, FiEye, FiEdit, FiShare2, FiDownload } = FiIcons;

const UserPortal = () => {
  const { userId } = useParams();
  const { websites, components, templates } = useAdmin();
  const [userWebsite, setUserWebsite] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState([]);

  useEffect(() => {
    // Simulate API call to get user's website configuration
    const fetchUserWebsite = async () => {
      // This would normally be an API call
      const mockWebsite = {
        id: userId,
        name: 'My Custom Website',
        components: [
          { id: 1, type: 'header', props: { title: 'Welcome to My Site' } },
          { id: 2, type: 'hero', props: { title: 'Hero Section', subtitle: 'This is a hero section' } },
          { id: 3, type: 'features', props: { items: ['Feature 1', 'Feature 2', 'Feature 3'] } }
        ]
      };
      setUserWebsite(mockWebsite);
      setSelectedComponents(mockWebsite.components);
    };

    fetchUserWebsite();
  }, [userId]);

  const renderComponent = (component) => {
    const baseComponent = components.find(c => c.type === component.type);
    if (!baseComponent) return null;

    return (
      <motion.div
        key={component.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4"
      >
        <div className="mb-4">
          <img
            src={baseComponent.preview}
            alt={baseComponent.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {component.props.title || baseComponent.name}
          </h3>
          {component.props.subtitle && (
            <p className="text-gray-600">{component.props.subtitle}</p>
          )}
          {component.props.items && (
            <ul className="list-disc list-inside text-gray-600">
              {component.props.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    );
  };

  if (!userWebsite) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your website...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <SafeIcon icon={FiGlobe} className="text-blue-600 text-2xl" />
              <div>
                <h1 className="text-xl font-semibold text-gray-800">{userWebsite.name}</h1>
                <p className="text-sm text-gray-500">User ID: {userId}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <SafeIcon icon={FiEye} />
                <span>Preview</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <SafeIcon icon={FiEdit} />
                <span>Edit</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <SafeIcon icon={FiShare2} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Website Components</h2>
          <p className="text-gray-600">
            These are the components that make up your website. They were configured by the admin
            and are rendered here based on your user ID.
          </p>
        </div>

        <div className="space-y-6">
          {selectedComponents.map(renderComponent)}
        </div>

        {selectedComponents.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiGlobe} className="mx-auto text-gray-400 text-6xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Components Yet</h3>
            <p className="text-gray-500">
              Your website doesn't have any components yet. Contact your admin to add some!
            </p>
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <SafeIcon icon={FiDownload} className="text-blue-600" />
              <span className="text-blue-800 font-medium">Download Website</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <SafeIcon icon={FiShare2} className="text-green-600" />
              <span className="text-green-800 font-medium">Share Website</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <SafeIcon icon={FiEdit} className="text-purple-600" />
              <span className="text-purple-800 font-medium">Request Changes</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPortal;