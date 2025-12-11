import { type PolyProps, Poly, ThemeSwitcher, Title } from '@ui';
import accordion from './__demo/accordion';
import tabs from './__demo/tabs';
import tree from './__demo/tree';
import buttons from './__demo/buttons';
import inputs from './__demo/inputs';
import { CardDemo } from './__demo/CardDemo';

const Container = (props: PolyProps<typeof Poly.div>) => (
  <div className="max-w-7xl mx-auto flex flex-wrap gap-4 py-4" {...props} />
);

const App = () => {
  return (
    <Container>
      <div className="w-full flex justify-between items-center px-2">
        <Title size={1}>UI Demo</Title>
        <ThemeSwitcher />
      </div>
      <main className="flex flex-col gap-4">
        <CardDemo />
        {inputs}
        {buttons}
        {accordion}
        {tabs}
        {tree}
      </main>
    </Container>
  );
};

export default App;
