import { useRef } from 'react';
import { Scrollbar } from './ScrollArea';

const App = () => {
  const viewportRef = useRef<HTMLDivElement>(null);

  function handleScrollY(scrollRatio: number) {
    const viewport = viewportRef.current;
    if (viewport) {
      const scrollable = viewport.scrollHeight - viewport.clientHeight;
      viewport.scrollTop = scrollable * scrollRatio;
    }
  }

  function handleScrollX(scrollRatio: number) {
    const viewport = viewportRef.current;
    if (viewport) {
      const scrollable = viewport.scrollWidth - viewport.clientWidth;
      viewport.scrollLeft = scrollable * scrollRatio;
    }
  }

  return (
    <div
      data-scrollarea="root"
      className={[
        'group/scrollarea',
        'relative',
        'size-80',
        'text-justify',
        'p-5',
        'bg-amber-200',
      ].join(' ')}
    >
      <div
        ref={viewportRef}
        data-scrollarea="viewport"
        className={[
          'size-full',
          'overflow-scroll',
          '[scrollbar-width:none]',
          '[-ms-overflow-style:none]',
          '[-webkit-overflow-scrolling:touch]',
          '[&::-webkit-scrollbar]:hidden',
        ].join(' ')}
      >
        <div className="w-120">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          ipsa cupiditate illum fugiat magnam blanditiis pariatur nesciunt sequi
          asperiores, praesentium quae voluptatem aperiam numquam dolorum esse
          eveniet labore sed non! Delectus molestiae a libero aperiam tempore
          qui quaerat, veniam repellat autem accusantium dolor obcaecati, magni
          nihil voluptates quo maiores tempora sint impedit? Minus, dignissimos
          aperiam saepe maiores officia id vel. Debitis est amet voluptatum,
          laborum dignissimos ipsam in nisi laboriosam cupiditate culpa
          voluptates ab corrupti neque, a quibusdam. Natus culpa illo
          consectetur eos maxime aut porro quas labore nam quasi! Natus, commodi
          maxime optio molestias accusamus quibusdam ipsam cum ratione minima
          minus odit ut beatae quis ipsa rem error aliquam aliquid! Veritatis
          reprehenderit sint velit veniam, error voluptatum praesentium
          repellendus. Possimus libero maiores illum? Soluta amet tempore quod!
          Ab expedita, modi magnam repellat consequatur adipisci fugiat
          voluptatem quam rem eveniet iusto reiciendis, soluta iste magni
          praesentium aperiam placeat nisi architecto! Illum quos laudantium
          fugiat amet a? A magnam iste necessitatibus fugiat suscipit, delectus
          numquam harum qui nemo quas. Aperiam, recusandae dignissimos quidem
          laudantium labore enim sequi cumque omnis provident officiis. Libero
          totam atque necessitatibus vel culpa dolore eveniet aperiam quas
          quibusdam accusamus exercitationem nam similique molestias id corrupti
          cum fugiat eaque, in, corporis dignissimos quis sunt? Temporibus odio
          ea nisi? Quod quas odio consequatur id magni, ex aliquam ab aspernatur
          alias, magnam quasi commodi at obcaecati dolore est rem iusto nam
          harum impedit illo, eum nihil. Velit aut suscipit laboriosam. Quae
          molestiae provident omnis? Accusantium, iusto amet asperiores suscipit
          et voluptatum doloremque ab optio ullam repudiandae magnam, tenetur
          eveniet, nihil ad natus consectetur laboriosam quos. Dignissimos quod
          molestias nihil assumenda! A amet cumque provident ea neque assumenda
          aspernatur! Odit nostrum voluptatibus iusto sunt a, ducimus
          distinctio! Ratione, eligendi asperiores, assumenda porro beatae
          eveniet doloremque facilis nemo hic voluptatum rerum quidem.
        </div>
      </div>
      <Scrollbar
        className={[
          'absolute',
          'inset-[0_0_calc(var(--spacing)*4)_auto]',
          'transition',
          'opacity-0',
          'group-hover/scrollarea:opacity-75',
        ].join(' ')}
        onScrollChange={handleScrollY}
      />
      <Scrollbar
        className={[
          'absolute',
          'inset-[auto_calc(var(--spacing)*4)_0_0]',
          'transition',
          'opacity-0',
          'group-hover/scrollarea:opacity-75',
        ].join(' ')}
        direction="horizontal"
        onScrollChange={handleScrollX}
      />
      <div
        data-scrollbar="corner"
        className={[
          'size-4',
          'absolute',
          'right-0',
          'bottom-0',
          'bg-green-500',
          'transition',
          'opacity-0',
          'group-hover/scrollarea:opacity-75',
        ].join(' ')}
      />
    </div>
  );
};

export default App;
