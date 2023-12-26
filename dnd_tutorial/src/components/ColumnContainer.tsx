import React, { useState } from "react";
import { Column, Id } from "../types";
import TrashIcon from "../icons/TrashIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "../icons/PlusIcon";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void; // step 11
}

const ColumnContainer = (props: Props) => {
  const { column, deleteColumn, updateColumn, createTask } = props;

  // step 8 adjust columnn name
  const [editMode, setEditMode] = useState(false);

  // step 2
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode, // step 9 編輯中不給抓
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // step 5
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
    bg-columnBackgroundColor
    opacity-40
    border-2
    border-pink-500
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
    "
      ></div>
    );
  }

  return (
    <div
      onClick={() => setEditMode(true)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md
      flex flex-col
    "
    >
      {/* column title */}
      <div className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm ronded-full">
            0
          </div>
          {/** step 8  */}
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="stroke-gray-500 hover:stroke-white rounded px-1 py-2"
        >
          <TrashIcon />
        </button>
      </div>

      {/* column task container */}
      <div className="flex flex-grow">Content</div>
      {/* colun footer  step 10*/}
      <button
        onClick={() => {
          createTask(column.id);
        }}
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
      >
        <PlusIcon />
        Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
