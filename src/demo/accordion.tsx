import { Accordion, Button, Collapsible } from '@ui';
import { DemoBox } from './DemoBox';
import { useState } from 'react';
import { DemoSection } from './DemoSection';

function handleChange(value: unknown) {
  console.log(value);
}

// eslint-disable-next-line react-refresh/only-export-components
const DemoAccordion = (props: { single?: boolean }) => (
  <Accordion single={props.single} onChange={handleChange}>
    <Accordion.Item title="Lorem">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid nulla
      accusantium mollitia iure ab ex id laborum, aspernatur repudiandae sed
      repellendus ratione fugit earum ullam quod exercitationem quas ipsam
      praesentium.
    </Accordion.Item>
    <Accordion.Item title="Ipsum">
      <div className="flex justify-center p-8">Lorem ipsum</div>
    </Accordion.Item>
    <Accordion.Item title="Dolor">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum accusantium
      molestiae officiis ratione sapiente at, dicta commodi? Vel cupiditate
      officiis at dolore ducimus natus placeat nam, adipisci repellendus magnam
      dignissimos?
    </Accordion.Item>
  </Accordion>
);

// eslint-disable-next-line react-refresh/only-export-components
const DemoCollapsible = () => {
  const [open, setOpen] = useState(false);

  return (
    <DemoSection title="Collapsible primitive" gap={false} column>
      <Button onClick={() => setOpen(!open)} className="w-full scale-100!">
        Toggle
      </Button>

      <Collapsible open={open}>
        <div className="mt-2 p-4 border border-gray-500/20 rounded-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, nobis
          asperiores. Similique nulla nihil doloremque pariatur velit ipsum
          incidunt itaque enim, aut nam adipisci deserunt dolorum obcaecati quas
          perspiciatis dolores?
        </div>
      </Collapsible>
    </DemoSection>
  );
};

const accordion = (
  <DemoBox id="accordion" title="Accordion">
    <DemoAccordion />
    <DemoAccordion single={true} />
    <DemoCollapsible />
  </DemoBox>
);

export default accordion;
