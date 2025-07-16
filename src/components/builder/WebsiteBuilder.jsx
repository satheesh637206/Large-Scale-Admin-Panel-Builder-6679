import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../contexts/AdminContext';
import ComponentPalette from './ComponentPalette';
import Canvas from './Canvas';
import PropertiesPanel from './PropertiesPanel';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSave, FiEye, FiShare2, FiUndo, FiRedo, FiSettings } = FiIcons;

const WebsiteBuilder = () => {
  const { components } = useAdmin();
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addComponentToCanvas = (component) => {
    const newComponent = {
      ...component,
      id: Date.now(),
      x: Math.random() * 400,
      y: Math.random() * 300,
      props: {}
    };
    
    const newComponents = [...canvasComponents, newComponent];
    setCanvasComponents(newComponents);
    updateHistory(newComponents);
  };

  const updateHistory = (newComponents) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newComponents);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCanvasComponents(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCanvasComponents(history[historyIndex + 1]);
    }
  };

  const updateComponent = (id, updates) => {
    const newComponents = canvasComponents.map(comp =>
      comp.id === id ? { ...comp, ...updates } : comp
    );
    setCanvasComponents(newComponents);
    updateHistory(newComponents);
  };

  const deleteComponent = (id) => {
    const newComponents = canvasComponents.filter(comp => comp.id !== id);
    setCanvasComponents(newComponents);
    updateHistory(newComponents);
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Website Builder</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SafeIcon icon={FiUndo} className="text-gray-600" />
              </button>
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SafeIcon icon={FiRedo} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <SafeIcon icon={FiEye} />
                <span>Preview</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <SafeIcon icon={FiSave} />
                <span>Save</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <SafeIcon icon={FiShare2} />
                <span>Publish</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <ComponentPalette
          components={components}
          onComponentSelect={addComponentToCanvas}
        />
        
        <Canvas
          components={canvasComponents}
          selectedComponent={selectedComponent}
          onComponentSelect={setSelectedComponent}
          onComponentUpdate={updateComponent}
          onComponentDelete={deleteComponent}
        />
        
        <PropertiesPanel
          selectedComponent={selectedComponent}
          onComponentUpdate={updateComponent}
        />
      </div>
    </div>
  );
};

export default WebsiteBuilder;