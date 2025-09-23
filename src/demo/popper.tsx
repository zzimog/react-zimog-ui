import { Button, Popper } from '@ui';
import { DemoBox } from './DemoBox';

const popper = (
  <DemoBox id="popper" title="Popper" center>
    <Popper>
      <Popper.Trigger>
        <Button>Open popper</Button>
      </Popper.Trigger>
      <Popper.Layer className="w-[300px]">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
          rerum reiciendis qui quas neque eum est dignissimos ab corrupti, non
          adipisci corporis officiis cum aperiam itaque quo ipsam. Qui,
          perferendis?
        </p>
      </Popper.Layer>
    </Popper>
  </DemoBox>
);

export default popper;
