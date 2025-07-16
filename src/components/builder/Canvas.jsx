import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTrash2, FiMove, FiEdit } = FiIcons;

const Canvas = ({ components, selectedComponent, onComponentSelect, onComponentUpdate, onComponentDelete }) => {
  const canvasRef = useRef(null);

  const handleComponentDrag = (componentId, x, y) => {
    onComponentUpdate(componentId, { x, y });
  };

  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current) {
      onComponentSelect(null);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="relative min-h-full p-8"
        style={{ minWidth: '1200px', minHeight: '800px' }}
      >
        <div className="bg-white rounded-lg shadow-sm min-h-full relative">
          {components.map((component) => (
            <CanvasComponent
              key={component.id}
              component={component}
              isSelected={selectedComponent?.id === component.id}
              onSelect={() => onComponentSelect(component)}
              onDrag={handleComponentDrag}
              onDelete={() => onComponentDelete(component.id)}
            />
          ))}
          
          {components.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiMove} className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Start Building</h3>
                <p className="text-gray-500">Drag components from the palette to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CanvasComponent = ({ component, isSelected, onSelect, onDrag, onDelete }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.component-actions')) return;
    
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    onSelect();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const canvas = e.currentTarget.closest('.relative');
    const canvasRect = canvas.getBoundingClientRect();
    
    const newX = e.clientX - canvasRect.left - dragOffset.x;
    const newY = e.clientY - canvasRect.top - dragOffset.y;
    
    onDrag(component.id, Math.max(0, newX), Math.max(0, newY));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        position: 'absolute',
        left: component.x,
        top: component.y,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
        isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
      }`}
      onMouseDown={handleMouseDown}
    >
      <div className="w-64 h-40 overflow-hidden rounded-lg">
        <img
          src={component.preview}
          alt={component.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-gray-800 text-sm">{component.name}</h3>
        <p className="text-xs text-gray-600">{component.category}</p>
      </div>
      
      {isSelected && (
        <div className="component-actions absolute -top-2 -right-2 flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle edit
            }}
            className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            <SafeIcon icon={FiEdit} className="text-xs" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <SafeIcon icon={FiTrash2} className="text-xs" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Canvas;