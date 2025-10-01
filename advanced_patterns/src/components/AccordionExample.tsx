import { Accordion, AccordionItem } from "./AccordionItem";

export const AccordionExample = () => {
  return (
    <div>
      <Accordion>
        <AccordionItem title="Item 1">Item 1</AccordionItem>
        <AccordionItem title="Item 2">Item 2</AccordionItem>
        <AccordionItem title="Item 3">Item 3</AccordionItem>

        {/* </AccordionItem children={"TEST"} /</div>> */}
      </Accordion>
    </div>
  );
};
