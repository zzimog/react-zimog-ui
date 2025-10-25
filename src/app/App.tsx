import { type PolyProps, Poly, ThemeSwitcher, Title } from '@ui';
import accordion from './demo/accordion';
import tabs from './demo/tabs';
import tree from './demo/tree';
import buttons from './demo/buttons';

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
        {buttons}
        {accordion}
        {tabs}
        {tree}
      </main>
    </Container>
  );
};

export default App;
