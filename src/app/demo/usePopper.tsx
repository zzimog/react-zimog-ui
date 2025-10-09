import { Card, usePopper } from '@ui';
import { DemoBox } from './DemoBox';

// eslint-disable-next-line react-refresh/only-export-components
const UsePopperDemo = () => {
  const { triggerRef, layerRef, layerOpen } = usePopper<
    HTMLButtonElement,
    HTMLDivElement
  >();

  return (
    <DemoBox id="usepopper" title="usePopper()">
      <button
        ref={triggerRef}
        className={[
          'p-2',
          'text-white',
          'bg-gray-600',
          'active:bg-gray-500',
          'cursor-pointer',
        ].join(' ')}
      >
        Toggle
      </button>
      {layerOpen && (
        <Card ref={layerRef} opticalCorrection="both" className="max-w-[300px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
          quaerat aperiam ea architecto dignissimos in iusto nihil sunt pariatur
          delectus, est facere? Beatae nesciunt temporibus sunt, vel maxime nam
          laborum!
        </Card>
      )}
    </DemoBox>
  );
};

export default <UsePopperDemo />;
