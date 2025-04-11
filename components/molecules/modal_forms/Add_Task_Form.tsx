import { FC, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface Props {
  onSubmit: (task: TaskInput) => void;
  initialData?: TaskInput;
}

interface TaskInput {
  title: string;
  description: string;
  priority?: string;
  dueDate?: string;
  assignee?: string;
  tags?: string;
}

const Form_Title: FC<{ children: string }> = ({ children }) => {
  return <Styled_Title>{children}</Styled_Title>;
};

export const Add_Task_Form: FC<Props> = ({ onSubmit, initialData }) => {
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
    form.tags ? form.tags.split(",").map(tag => tag.trim()) : []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
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
    onSubmit({ ...form, tags: tagList.join(",") });
  };

  const priorityLevels = ["Baja", "Media", "Alta"];
  const selectedIndex = form.priority ? priorityLevels.indexOf(form.priority) : -1;

  return (
    <Form_Container onSubmit={handleSubmit}>
      <Form_Title>Agregar Tarea</Form_Title>

      <Styled_Input
        name="title"
        placeholder="Título de la tarea"
        value={form.title}
        onChange={handleChange}
        required
      />
      <Styled_Textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        required
      />

      <Divider onClick={() => setShowAdvanced(!showAdvanced)}>
        <Line />
        <ChevronButton type="button">
          {showAdvanced ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </ChevronButton>
        <Line />
      </Divider>

      <Advanced_Container $visible={showAdvanced}>
        <Priority_Selector>
          {priorityLevels.map((level) => (
            <Priority_Label key={level} onClick={() => handlePrioritySelect(level)}>
              <Priority_Text selected={form.priority === level}>{level}</Priority_Text>
            </Priority_Label>
          ))}
          {form.priority && (
            <Animated_Underline index={selectedIndex} />
          )}
        </Priority_Selector>

        <Styled_Input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
        />

        <Styled_Input
          name="assignee"
          placeholder="Asignado a"
          value={form.assignee}
          onChange={handleChange}
        />

        <Tags_Wrapper>
          {tagList.map((tag) => (
            <Tag key={tag}>
              {tag}
              <RemoveTag onClick={() => handleTagRemove(tag)}>
                <X size={12} />
              </RemoveTag>
            </Tag>
          ))}
        </Tags_Wrapper>

        <Styled_Input
          name="tags"
          placeholder="Presioná Enter para agregar etiquetas"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
        />
      </Advanced_Container>

      <Styled_Button type="submit">Guardar</Styled_Button>
    </Form_Container>
  );
};

const Form_Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const Styled_Input = styled.input`
  width: 90%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  font-family: inherit;
  transition: border 0.2s;
  &::placeholder {
    font-family: inherit;
    color: #888;
  }

  &:focus {
    border-color: #555;
  }
`;

const Styled_Textarea = styled.textarea`
  width: 90%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 80px;
  outline: none;
  font-family: inherit;
  transition: border 0.2s;

  &::placeholder {
    font-family: inherit;
    color: #888;
  }

  &:focus {
    border-color: #555;
  }
`;

const Advanced_Container = styled.div<{ $visible: boolean }>`
  width: 100%;
  max-height: ${({ $visible }) => ($visible ? "600px" : "0")};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: max-height 0.4s ease;
`;

const Styled_Button = styled.button`
  background: #111;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #000;
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
  }
`;

const Styled_Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  width: 100%;
  margin-top: -1rem;
`;

const ChevronButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #444;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 1px;
  background: #ccc;
`;

const Priority_Selector = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
  position: relative;
  height: 25px;
`;

const Priority_Label = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Priority_Text = styled.span<{ selected?: boolean }>`
  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? 700 : 500)};
  color: #000;
  transition: all 0.25s ease;
  transform: ${({ selected }) => (selected ? "scale(1.05)" : "scale(1)")};
`;

const Animated_Underline = styled.div<{ index: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 33.33%;
  background: #000;
  border-radius: 4px;
  transition: transform 0.5s ease;
  transform: translateX(${({ index }) => index * 100}%);
  opacity: ${({ index }) => (index === -1 ? 0 : 1)};
`;

const slideInTag = keyframes`
  0% {
    transform: translateY(8px) scale(0.9);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const Tags_Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 90%;
`;

const Tag = styled.div`
  background: #000;
  color: #fff;
  padding: 4px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  animation: ${slideInTag} 0.3s ease;
`;

const RemoveTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
