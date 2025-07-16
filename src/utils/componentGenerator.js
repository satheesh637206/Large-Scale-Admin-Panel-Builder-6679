export const generateComponentCode = (componentData) => {
  const { name, category, props = {} } = componentData;
  const componentName = name.replace(/\s+/g, '');
  
  return `
import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const ${componentName} = ({ 
  title = "${props.title || 'Component Title'}",
  subtitle = "${props.subtitle || 'Component subtitle'}",
  backgroundColor = "${props.backgroundColor || '#ffffff'}",
  textColor = "${props.textColor || '#000000'}",
  borderRadius = "${props.borderRadius || '0px'}",
  padding = "${props.padding || '1rem'}",
  margin = "${props.margin || '0'}",
  ...otherProps 
}) => {
  const containerStyle = {
    backgroundColor,
    color: textColor,
    borderRadius,
    padding,
    margin,
    ...otherProps.style
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={containerStyle}
      className="component-${category.toLowerCase().replace(/\s+/g, '-')} ${otherProps.className || ''}"
      {...otherProps}
    >
      <div className="component-content">
        <h2 className="component-title text-2xl font-bold mb-2">{title}</h2>
        <p className="component-subtitle text-gray-600">{subtitle}</p>
      </div>
    </motion.div>
  );
};

export default ${componentName};
  `;
};

export const generateTemplateCode = (templateData) => {
  const { name, components = [] } = templateData;
  const templateName = name.replace(/\s+/g, '');
  
  const componentImports = components.map(comp => 
    `import ${comp.name.replace(/\s+/g, '')} from '../components/${comp.name.replace(/\s+/g, '')}';`
  ).join('\n');
  
  const componentElements = components.map(comp => 
    `      <${comp.name.replace(/\s+/g, '')} {...${comp.name.replace(/\s+/g, '').toLowerCase()}Props} />`
  ).join('\n');
  
  return `
import React from 'react';
import { motion } from 'framer-motion';
${componentImports}

const ${templateName} = ({ 
  components = [],
  ...props 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="template-${name.toLowerCase().replace(/\s+/g, '-')} min-h-screen"
      {...props}
    >
${componentElements}
    </motion.div>
  );
};

export default ${templateName};
  `;
};

export const generateWebsiteCode = (websiteData) => {
  const { name, components = [], template, settings = {} } = websiteData;
  const websiteName = name.replace(/\s+/g, '');
  
  return `
import React from 'react';
import { motion } from 'framer-motion';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

const ${websiteName} = () => {
  const siteSettings = ${JSON.stringify(settings, null, 2)};
  
  return (
    <Router>
      <div className="website-container" style={siteSettings.containerStyle}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="home-page"
    >
      {/* Generated components will be inserted here */}
    </motion.div>
  );
};

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="about-page"
    >
      <h1>About Us</h1>
      <p>This is the about page.</p>
    </motion.div>
  );
};

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="contact-page"
    >
      <h1>Contact Us</h1>
      <p>This is the contact page.</p>
    </motion.div>
  );
};

export default ${websiteName};
  `;
};

export const generateComponentPreview = (componentData) => {
  const { name, category, props = {} } = componentData;
  
  return `
    <div style="
      background: ${props.backgroundColor || '#ffffff'};
      color: ${props.textColor || '#000000'};
      border-radius: ${props.borderRadius || '0px'};
      padding: ${props.padding || '1rem'};
      margin: ${props.margin || '0'};
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    ">
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">
        ${props.title || name}
      </h2>
      <p style="color: #666; font-size: 1rem;">
        ${props.subtitle || `This is a ${category.toLowerCase()} component`}
      </p>
    </div>
  `;
};

export const exportComponentAsFile = (componentData) => {
  const code = generateComponentCode(componentData);
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${componentData.name.replace(/\s+/g, '')}.jsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportTemplateAsFile = (templateData) => {
  const code = generateTemplateCode(templateData);
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${templateData.name.replace(/\s+/g, '')}.jsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportWebsiteAsZip = async (websiteData) => {
  // This would normally use a library like JSZip
  // For now, we'll just export the main file
  const code = generateWebsiteCode(websiteData);
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${websiteData.name.replace(/\s+/g, '')}.jsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};