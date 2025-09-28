import { Accordion } from '@ui';
import { DemoBox } from './DemoBox';

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
  </DemoBox>
);

export default accordion;
