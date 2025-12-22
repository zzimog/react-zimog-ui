import { Tabs } from '@ui';

export const TestPage = () => {
  return (
    <Tabs defaultValue="1">
      <Tabs.List>
        <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="3">Tab 3</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quod,
        officia inventore vero nulla tempore quae itaque. Ullam, numquam error,
        autem vel voluptatibus placeat aperiam officia asperiores praesentium,
        incidunt deserunt!
      </Tabs.Content>
      <Tabs.Content value="2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est non
        expedita eaque porro sunt cumque quam quibusdam facilis id inventore
        laboriosam, nostrum tempora perferendis reiciendis et unde harum dicta
        eum.
      </Tabs.Content>
      <Tabs.Content value="3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
        dolorem, quis delectus fugiat velit maiores deleniti et quas laborum
        provident vitae nobis culpa laboriosam harum facilis earum voluptatum
        quae quo!
      </Tabs.Content>
    </Tabs>
  );
};
