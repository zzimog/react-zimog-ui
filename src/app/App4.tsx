import { Accordion } from './accordion';

const App = () => {
  return (
    <Accordion onValueChange={(value) => console.log(value)}>
      <Accordion.Item value="foo" className="w-80">
        <Accordion.Trigger className="w-full p-2 border cursor-pointer">
          Trigger
        </Accordion.Trigger>
        <Accordion.Content className="p-2 border">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, vitae
          ratione! Quis veritatis explicabo adipisci maiores optio voluptas iste
          amet non nesciunt soluta impedit, hic aspernatur, voluptatem porro
          eveniet vitae.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default App;
