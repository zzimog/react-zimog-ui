import { Accordion } from '@ui';
import { DemoBox } from './DemoBox';

const accordion = (
  <DemoBox id="accordion" title="Accordion">
    <Accordion>
      <Accordion.Item value="lorem">
        <Accordion.Trigger>Lorem</Accordion.Trigger>
        <Accordion.Content>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
          nulla accusantium mollitia iure ab ex id laborum, aspernatur
          repudiandae sed repellendus ratione fugit earum ullam quod
          exercitationem quas ipsam praesentium.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="ipsum">
        <Accordion.Trigger>Ipsum</Accordion.Trigger>
        <Accordion.Content>
          <div className="flex justify-center p-8">Lorem ipsum</div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="dolor">
        <Accordion.Trigger>Dolor</Accordion.Trigger>
        <Accordion.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
          accusantium molestiae officiis ratione sapiente at, dicta commodi? Vel
          cupiditate officiis at dolore ducimus natus placeat nam, adipisci
          repellendus magnam dignissimos?
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  </DemoBox>
);

export default accordion;
