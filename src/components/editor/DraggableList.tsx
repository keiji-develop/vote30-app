import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '../Button';

export interface DraggableListItem {
  id: string;
  title: string;
  onRemove: () => void;
}

interface DraggableListProps {
  items: DraggableListItem[];
  onReorder: (newIds: string[]) => void;
}

export function DraggableList({ items, onReorder }: DraggableListProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    onReorder(newItems.map(item => item.id));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = Array.from(items);
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    onReorder(newItems.map(item => item.id));
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = Array.from(items);
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    onReorder(newItems.map(item => item.id));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex items-center gap-2 p-2 bg-white rounded shadow"
                  >
                    <div className="flex-grow">{item.title}</div>
                    <div className="flex gap-2">
                      {index > 0 && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleMoveUp(index)}
                        >
                          ↑
                        </Button>
                      )}
                      {index < items.length - 1 && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleMoveDown(index)}
                        >
                          ↓
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={item.onRemove}
                      >
                        削除
                      </Button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
} 