import { DemoBox } from './DemoBox';
import { Tabs } from '@ui';

const tabs = (
  <DemoBox id="tabs" title="Tabs">
    <Tabs defaultValue="0">
      <Tabs.List>
        <Tabs.Trigger value="0">Lorem</Tabs.Trigger>
        <Tabs.Trigger value="1">Ipsum</Tabs.Trigger>
        <Tabs.Trigger value="2">Dolor</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio error
        laborum saepe facilis voluptatum impedit quam earum cupiditate, totam,
        harum debitis quaerat! Debitis mollitia deleniti laboriosam quo numquam
        cumque iusto? Tempore, laudantium dolorem, alias dolor harum autem at
        deleniti magni distinctio assumenda aspernatur! Beatae, unde a numquam
        quisquam non corrupti ratione voluptate illum. Totam praesentium
        excepturi unde error, aliquam a!
      </Tabs.Content>
      <Tabs.Content value="1">
        Beatae debitis doloribus quisquam, odit doloremque, tempore
        necessitatibus recusandae voluptate incidunt voluptates iure explicabo
        deserunt neque ut harum error culpa! Veritatis ab aliquam nesciunt non
        exercitationem culpa necessitatibus consequatur obcaecati. Debitis
        maiores laudantium sed, sit harum dicta non omnis corrupti sapiente at
        ex earum fuga a nihil est nemo. Rerum ullam pariatur hic obcaecati nemo
        vel fugiat, nesciunt cupiditate tenetur.
      </Tabs.Content>
      <Tabs.Content value="2">
        Facilis, quidem. Corrupti eveniet sapiente ea quas fugiat quia ipsum
        tenetur a autem reprehenderit suscipit debitis voluptatum neque,
        recusandae, sed dicta amet dolore magni aut velit officia natus
        doloremque aperiam? Enim delectus atque sint deserunt esse ea ut veniam,
        maiores repellendus voluptatem sed, quis consequuntur ex nostrum numquam
        quam dolorem similique, illo alias dolore ipsam corporis. Consectetur
        aperiam laboriosam fugiat!
      </Tabs.Content>
    </Tabs>
  </DemoBox>
);

export default tabs;
