import styled from "styled-components";
import { useLang } from "@/context/Language_Context";

interface PriorityFiltersProps {
  selectedPriorities: string[];
  onTogglePriority: (priority: string) => void;
  onRemovePriority: (priority: string) => void;
  onClearAllPriorities: () => void;
}

export const Priority_Filters = ({
  selectedPriorities,
  onTogglePriority,
  onRemovePriority,
  onClearAllPriorities,
}: PriorityFiltersProps) => {

  const { t } = useLang();

  return (
    <FilterContent>
      <FilterLabel>{t.tasks.filterBy}</FilterLabel>

      
      {["Baja", "Media", "Alta"].map((priority) => (
        <PriorityItem
          key={priority}
          $isSelected={selectedPriorities.includes(priority)}
          onClick={() => onTogglePriority(priority)}
        >
          {priority}
        </PriorityItem>
      ))}

      
      {selectedPriorities.length > 0 && (
        <ClearButton onClick={onClearAllPriorities}>Clear All</ClearButton>
      )}
    </FilterContent>
  );
};

const FilterContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 9999999;
`;

const FilterLabel = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  color: ${({ theme }) => theme.colors.title};
`;

const PriorityItem = styled.button<{ $isSelected: boolean }>`
  padding: 4px 8px;
  background-color: ${({ $isSelected }) => ($isSelected ? "#4caf50" : "#eee")};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "#333")};
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const ClearButton = styled.button`
  padding: 4px 8px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;
