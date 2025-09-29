import { Accordion, Button, Collapsible } from '@ui';
import { DemoBox } from './DemoBox';
import { useState } from 'react';
import { DemoSection } from './DemoSection';

// eslint-disable-next-line react-refresh/only-export-components
const DemoCollapsible = () => {
  const [open, setOpen] = useState(false);

  return (
    <DemoSection title="Collapsible primitive" column>
      <Button onClick={() => setOpen(!open)} className="w-full scale-100!">
        Toggle
      </Button>

      <Collapsible open={open} className="border border-gray-500/20 rounded-md">
        <div className="p-4">
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
    <Accordion>
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
        officiis at dolore ducimus natus placeat nam, adipisci repellendus
        magnam dignissimos?
      </Accordion.Item>
    </Accordion>

    <DemoCollapsible />
  </DemoBox>
);

export default accordion;
