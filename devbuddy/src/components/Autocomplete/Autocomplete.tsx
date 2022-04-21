import React, { useState, useRef, useEffect } from "react";
import Input from "../Input/Input";
import styles from "./Autocomplete.module.scss";
interface AutocompleteProps {
  options: string[];
  onChange: (value: string) => void;
  value: string;
}

export default function Autocomplete({
  options,
  onChange,
  value,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div ref={listRef}>
      <span>
        <Input
          type="text"
          onChange={(e: any) => onChangeHandler(e)}
          value={value}
          onFocus={() => setIsOpen(true)}
        />
      </span>

      {isOpen && (
        <ul className={styles.list}>
          {options
            // .filter((option) => option.includes(value))
            .map((option) => (
              <li
                className={styles.listItem}
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                <span>{option}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
