import { useState, useCallback } from 'react';

export const useDragAndDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback((item, event) => {
    setDraggedItem(item);
    setIsDragging(true);
    
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', JSON.stringify(item));
    }
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    
    setDragPosition({
      x: event.clientX,
      y: event.clientY
    });
  }, []);

  const handleDrop = useCallback((event, onDrop) => {
    event.preventDefault();
    setIsDragging(false);
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (draggedItem && onDrop) {
      onDrop(draggedItem, { x, y });
    }
    
    setDraggedItem(null);
  }, [draggedItem]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setDraggedItem(null);
  }, []);

  return {
    draggedItem,
    dragPosition,
    isDragging,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  };
};

export const useResizable = (initialSize = { width: 200, height: 200 }) => {
  const [size, setSize] = useState(initialSize);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);

  const handleResizeStart = useCallback((handle, event) => {
    setIsResizing(true);
    setResizeHandle(handle);
    event.preventDefault();
  }, []);

  const handleResize = useCallback((event) => {
    if (!isResizing || !resizeHandle) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setSize(prevSize => {
      const newSize = { ...prevSize };

      switch (resizeHandle) {
        case 'se':
          newSize.width = Math.max(50, x);
          newSize.height = Math.max(50, y);
          break;
        case 'sw':
          newSize.height = Math.max(50, y);
          break;
        case 'ne':
          newSize.width = Math.max(50, x);
          break;
        case 'nw':
          break;
        default:
          break;
      }

      return newSize;
    });
  }, [isResizing, resizeHandle]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    setResizeHandle(null);
  }, []);

  return {
    size,
    isResizing,
    resizeHandle,
    handleResizeStart,
    handleResize,
    handleResizeEnd,
    setSize
  };
};