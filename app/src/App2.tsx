import { NodeGroup } from '@ui';

const App = () => {
  function handleNodeChange(node?: HTMLElement) {
    if (node) {
      node.classList.toggle('bg-red-500');
    }
  }

  return (
    <NodeGroup onNodeChange={handleNodeChange}>
      <NodeGroup.Item>
        <div>1. Lorem</div>
      </NodeGroup.Item>
      <NodeGroup.Item>
        <div>2. Ipsum</div>
      </NodeGroup.Item>
      <NodeGroup.Item>
        <div>3. Dolor</div>
      </NodeGroup.Item>
    </NodeGroup>
  );
};

export default App;
