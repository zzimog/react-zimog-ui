import { Accordion } from '@ui';

export const TestPage = () => {
  return (
    <Accordion>
      <Accordion.Item value="1">
        <Accordion.Trigger>Tab 1</Accordion.Trigger>
        <Accordion.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quod,
          officia inventore vero nulla tempore quae itaque. Ullam, numquam
          error, autem vel voluptatibus placeat aperiam officia asperiores
          praesentium, incidunt deserunt!
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
