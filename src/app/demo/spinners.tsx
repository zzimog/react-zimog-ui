import { Spinner } from '@ui';
import { DemoBox } from './DemoBox';

const spinners = (
  <DemoBox id="spinners" title="Spinners" row center>
    <div className="flex justify-center items-center gap-2">
      <Spinner />
      <Spinner size={36} />
      <Spinner size={48} />
    </div>
  </DemoBox>
);

export default spinners;
