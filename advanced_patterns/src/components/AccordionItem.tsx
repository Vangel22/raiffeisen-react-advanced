import { useState, type ReactNode } from "react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

interface AccordionProps {
  children: ReactNode;
}

export const Accordion = ({ children }: AccordionProps) => {
  return <div>{children}</div>;
};

export const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
      {isOpen && <div style={{ padding: "10px" }}>{children}</div>}
    </div>
  );
};
