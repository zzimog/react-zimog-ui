import { poly } from './polymorphic';

type TestProps = {
  title?: string;
};

const Test = poly('div')<TestProps>((Tag, inProps) => {
  const { title, children, ...props } = inProps;

  return <Tag {...props}>{children}</Tag>;
});

const App = () => {
  return (
    <Test href="/asd" data-test="hello world">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur
      asperiores corporis temporibus tempore quos reiciendis, nihil
      exercitationem iusto officia unde modi iure voluptas fugiat soluta hic
      saepe. Aliquam, quos corrupti?
      <Test as="span" d-href="/helo">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
        necessitatibus amet modi ipsum nam recusandae, sint quasi vero magnam
        possimus adipisci? Vitae a voluptas voluptate rerum dolores illo
        obcaecati temporibus?
      </Test>
    </Test>
  );
};

export default App;
