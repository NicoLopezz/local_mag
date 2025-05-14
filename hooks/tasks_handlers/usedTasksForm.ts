import { useState } from "react";

export interface TaskInput {
  title: string;
  description: string;
  priority?: string;
  dueDate?: string;
  assignee?: string;
  tags?: string;
}

export const useAddTaskForm = (
  initialData?: TaskInput,
  onSubmit?: (task: TaskInput) => void
) => {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    priority: initialData?.priority,
    dueDate: initialData?.dueDate || "",
    assignee: initialData?.assignee || "",
    tags: initialData?.tags || "",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState<string[]>(
    form.tags ? form.tags.split(",").map((tag) => tag.trim()) : []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrioritySelect = (value: string) => {
    setForm((prev) => ({ ...prev, priority: value }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tagList.includes(tagInput.trim())) {
        setTagList((prev) => [...prev, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleTagRemove = (tag: string) => {
    setTagList((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ ...form, tags: tagList.join(",") });
  };

  return {
    form,
    showAdvanced,
    setShowAdvanced,
    tagInput,
    setTagInput,
    tagList,
    handleChange,
    handlePrioritySelect,
    handleTagKeyDown,
    handleTagRemove,
    handleSubmit,
  };
};
