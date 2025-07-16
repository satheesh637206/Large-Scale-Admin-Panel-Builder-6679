import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [components, setComponents] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Initialize with sample data
    setComponents(generateComponents());
    setTemplates(generateTemplates());
    setWebsites(generateWebsites());
    setUsers(generateUsers());
  }, []);

  const generateComponents = () => {
    const categories = [
      'Headers', 'Navigation', 'Hero Sections', 'Features', 'Testimonials',
      'Pricing', 'Contact Forms', 'Footers', 'Galleries', 'Blogs',
      'E-commerce', 'Authentication', 'Dashboard', 'Charts', 'Tables',
      'Buttons', 'Cards', 'Modals', 'Sidebars', 'Breadcrumbs'
    ];

    const components = [];
    let id = 1;

    categories.forEach(category => {
      for (let i = 1; i <= 25; i++) {
        components.push({
          id: id++,
          name: `${category} ${i}`,
          category,
          type: 'component',
          preview: `https://picsum.photos/300/200?random=${id}`,
          code: generateComponentCode(category, i),
          props: generateComponentProps(category),
          responsive: true,
          premium: Math.random() > 0.7
        });
      }
    });

    return components;
  };

  const generateTemplates = () => {
    const templates = [];
    const templateTypes = [
      'Business', 'Portfolio', 'E-commerce', 'Blog', 'Landing Page',
      'Dashboard', 'SaaS', 'Restaurant', 'Real Estate', 'Education'
    ];

    templateTypes.forEach((type, index) => {
      for (let i = 1; i <= 10; i++) {
        templates.push({
          id: index * 10 + i,
          name: `${type} Template ${i}`,
          type,
          preview: `https://picsum.photos/400/300?random=${index * 10 + i}`,
          components: Math.floor(Math.random() * 20) + 5,
          responsive: true,
          premium: Math.random() > 0.6
        });
      }
    });

    return templates;
  };

  const generateWebsites = () => {
    return [
      {
        id: 1,
        name: 'Tech Startup Landing',
        owner: 'John Doe',
        status: 'Published',
        visits: 12450,
        lastModified: '2024-01-15',
        template: 'SaaS Template 1'
      },
      {
        id: 2,
        name: 'Portfolio Site',
        owner: 'Jane Smith',
        status: 'Draft',
        visits: 890,
        lastModified: '2024-01-14',
        template: 'Portfolio Template 2'
      }
    ];
  };

  const generateUsers = () => {
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'User',
        websites: 3,
        joinDate: '2024-01-01',
        status: 'Active'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'Premium',
        websites: 8,
        joinDate: '2023-12-15',
        status: 'Active'
      }
    ];
  };

  const generateComponentCode = (category, index) => {
    return `
import React from 'react';
import { motion } from 'framer-motion';

const ${category.replace(/\s+/g, '')}${index} = ({ ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="component-${category.toLowerCase().replace(/\s+/g, '-')}"
      {...props}
    >
      <h2>${category} Component ${index}</h2>
      <p>This is a customizable ${category.toLowerCase()} component.</p>
    </motion.div>
  );
};

export default ${category.replace(/\s+/g, '')}${index};
    `;
  };

  const generateComponentProps = (category) => {
    const baseProps = ['className', 'style', 'id'];
    const categoryProps = {
      'Headers': ['title', 'subtitle', 'logo', 'navigation'],
      'Navigation': ['items', 'orientation', 'sticky'],
      'Hero Sections': ['title', 'subtitle', 'backgroundImage', 'ctaText'],
      'Features': ['features', 'columns', 'showIcons'],
      'Testimonials': ['testimonials', 'showAvatar', 'rating'],
      'Pricing': ['plans', 'currency', 'billing'],
      'Contact Forms': ['fields', 'submitText', 'validation'],
      'Footers': ['links', 'social', 'copyright'],
      'Galleries': ['images', 'columns', 'lightbox'],
      'Blogs': ['posts', 'pagination', 'categories']
    };

    return [...baseProps, ...(categoryProps[category] || ['content', 'variant'])];
  };

  const createWebsite = (websiteData) => {
    const newWebsite = {
      id: Date.now(),
      ...websiteData,
      visits: 0,
      lastModified: new Date().toISOString().split('T')[0],
      status: 'Draft'
    };
    setWebsites(prev => [...prev, newWebsite]);
    return newWebsite;
  };

  const updateWebsite = (id, updates) => {
    setWebsites(prev => prev.map(site => 
      site.id === id ? { ...site, ...updates } : site
    ));
  };

  const deleteWebsite = (id) => {
    setWebsites(prev => prev.filter(site => site.id !== id));
  };

  const value = {
    components,
    templates,
    websites,
    users,
    createWebsite,
    updateWebsite,
    deleteWebsite,
    setComponents,
    setTemplates,
    setWebsites,
    setUsers
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};