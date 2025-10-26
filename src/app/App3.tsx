import { Poly, type PolyProps } from '@ui';

type ItemProps = PolyProps<'div'>;

const Item = (props: ItemProps) => {
  function click() {
    console.log('item click');
  }

  return <Poly.section data-slot="item" onClick={click} {...props} />;
};

const App = () => {
  function click() {
    console.log('child click');
  }

  return (
    <Item asChild>
      <button onClick={click}>button</button>
    </Item>
  );
};

export default App;
