import { useState, type ChangeEvent } from 'react';
import { Button, Popper, type PopperOptions } from '@ui';
import { DemoBox } from './DemoBox';

// eslint-disable-next-line react-refresh/only-export-components
const PopperDemo = () => {
  const [options, setOptions] = useState<PopperOptions>({
    open: false,
    distance: 8,
    flip: true,
    position: 'bottom-center',
  });

  function handlePosition(evt: ChangeEvent<HTMLInputElement>) {
    const { value } = evt.target;
    setOptions((prev) => ({
      ...prev,
      position: value,
    }));
  }

  return (
    <DemoBox id="popper" title="Popper" center>
      <div className="flex gap-2">
        <input
          name="pos"
          type="radio"
          value="top-start"
          onChange={handlePosition}
        />
        <input
          name="pos"
          type="radio"
          value="top-center"
          onChange={handlePosition}
        />
        <input
          name="pos"
          type="radio"
          value="top-end"
          onChange={handlePosition}
        />
      </div>
      <div className="w-full flex justify-between items-center gap-2 my-2">
        <div className="flex flex-col gap-2">
          <input
            name="pos"
            type="radio"
            value="left-start"
            onChange={handlePosition}
          />
          <input
            name="pos"
            type="radio"
            value="left-center"
            onChange={handlePosition}
          />
          <input
            name="pos"
            type="radio"
            value="left-end"
            onChange={handlePosition}
          />
        </div>

        <Popper {...options}>
          <Popper.Trigger>
            <Button>Open popper</Button>
          </Popper.Trigger>
          <Popper.Layer className="w-[300px]">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              rerum reiciendis qui quas neque eum est dignissimos ab corrupti,
              non adipisci corporis officiis cum aperiam itaque quo ipsam. Qui,
              perferendis?
            </p>
          </Popper.Layer>
        </Popper>

        <div className="flex flex-col gap-2">
          <input
            name="pos"
            type="radio"
            value="right-start"
            onChange={handlePosition}
          />
          <input
            name="pos"
            type="radio"
            value="right-center"
            onChange={handlePosition}
          />
          <input
            name="pos"
            type="radio"
            value="right-end"
            onChange={handlePosition}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <input
          name="pos"
          type="radio"
          value="bottom-start"
          onChange={handlePosition}
        />
        <input
          name="pos"
          type="radio"
          value="bottom-center"
          onChange={handlePosition}
          defaultChecked
        />
        <input
          name="pos"
          type="radio"
          value="bottom-end"
          onChange={handlePosition}
        />
      </div>
    </DemoBox>
  );
};

const popper = <PopperDemo />;

export default popper;
