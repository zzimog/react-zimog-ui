import { Highlight } from './highlight';

const App = () => {
  return (
    <Highlight type="hover">
      <Highlight.Item>Lorem ipsum dolor</Highlight.Item>
      <Highlight.Item className="ml-auto">Sit</Highlight.Item>
      <Highlight.Item className="mx-auto">Amet consectetur</Highlight.Item>
    </Highlight>
  );
};

export default App;
