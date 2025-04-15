import styled from "styled-components";
import { useRef, useEffect } from "react";

type Priority = "Baja" | "Media" | "Alta";

interface FilterContainerProps {
  selectedPriorities: Priority[];
  onTogglePriority: (priority: Priority) => void;
  onRemovePriority: (priority: Priority) => void;
  onClearAllPriorities: () => void;
  showPriorityFilter: boolean;
  setShowPriorityFilter: (show: boolean) => void;
}

export const Filter_Container = ({
  selectedPriorities,
  onTogglePriority,
  onRemovePriority,
  onClearAllPriorities,
  showPriorityFilter,
  setShowPriorityFilter,
}: FilterContainerProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowPriorityFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPriorityFilter]);

  return (
    <StyledFilterContainer>
      <Filter_Button_Wrapper>
        <Filter_Button
          ref={buttonRef}
          isActive={selectedPriorities.length > 0}
          onClick={() => setShowPriorityFilter(!showPriorityFilter)}
        >
          Filter by:{" "}
          {selectedPriorities.length > 0 && `(${selectedPriorities.length})`}
        </Filter_Button>

        {showPriorityFilter && (
          <Priority_Filter_Dropdown ref={dropdownRef}>
            <Priority_Filter_Option onClick={() => onTogglePriority("Baja")}>
              <Checkbox checked={selectedPriorities.includes("Baja")} />
              <span>Baja</span>
            </Priority_Filter_Option>
            <Priority_Filter_Option onClick={() => onTogglePriority("Media")}>
              <Checkbox checked={selectedPriorities.includes("Media")} />
              <span>Media</span>
            </Priority_Filter_Option>
            <Priority_Filter_Option onClick={() => onTogglePriority("Alta")}>
              <Checkbox checked={selectedPriorities.includes("Alta")} />
              <span>Alta</span>
            </Priority_Filter_Option>
          </Priority_Filter_Dropdown>
        )}
      </Filter_Button_Wrapper>

      {selectedPriorities.length > 0 && (
        <Selected_Options_Container>
          {selectedPriorities.map((priority) => (
            <Priority_Pill key={priority}>
              {priority}
              <Remove_Priority onClick={() => onRemovePriority(priority)}>
                ×
              </Remove_Priority>
            </Priority_Pill>
          ))}
          <Clear_All onClick={onClearAllPriorities}>Clear all</Clear_All>
        </Selected_Options_Container>
      )}
    </StyledFilterContainer>
  );
};

const StyledFilterContainer = styled.div`
  position: absolute;
  top: -15px;
  display: flex;
`;

const Filter_Button_Wrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const Selected_Options_Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-left: 0.5rem;
  position: relative;
  z-index: 100000;
  max-width: 300px;
  overflow-x: auto;
  scrollbar-width: thin;
  padding-bottom: 2px;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    /* background: #ccc; */
    border-radius: 2px;
  }
`;

const Priority_Pill = styled.div`
  display: flex;
  align-items: center;
  /* background-color: #e7e7e7; */
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  font-size: 0.875rem;
  gap: 0.25rem;
  flex-shrink: 0;
`;

const Remove_Priority = styled.span`
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  margin-left: 0.25rem;

  &:hover {
    color: #000000;
  }
`;

const Clear_All = styled.span`
  cursor: pointer;
  font-size: 0.875rem;
  color: #6c6c6c;
  text-decoration: none;
  flex-shrink: 0;
  font-style: italic;

  &:hover {
    color: #bf0000;
  }
`;

const Priority_Filter_Dropdown = styled.div`
  position: absolute;
  top: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.75rem;
  z-index: 10;
  min-width: 120px;
  margin-top: 0.1rem;
`;

const Priority_Filter_Option = styled.div`
font-size: 13px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Checkbox = styled.div<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid #6c6c6c;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ checked }) => (checked ? "#6c6c6c" : "transparent")};

  &::after {
    content: "✓";
    display: ${({ checked }) => (checked ? "block" : "none")};
    color: white;
    font-size: 12px;
  }
`;

const Filter_Button = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? "#6c6c6c9a" : "#b7b7b721")};
  color: ${({ isActive }) => (isActive ? "white" : "inherit")};
  border-radius: 5px;
  padding: 0.5rem 1rem;
  border: none;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-weight:  600;

  &:hover {
    background-color: #6c6c6c;
    color: white;
  }
`;