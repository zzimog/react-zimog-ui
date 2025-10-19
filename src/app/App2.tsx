import { useRef } from 'react';
import {
  type MotionScrollValue,
  useAnimationFrameLoop,
  useScroll,
} from './motion';

type MotionProps = {
  scrollY: MotionScrollValue;
};

const Motion = (inProps: MotionProps) => {
  const { scrollY, ...props } = inProps;

  const ref = useRef<HTMLDivElement>(null);

  useAnimationFrameLoop(() => {
    const node = ref.current;
    if (node) {
      node.style.setProperty('--scroll', `${scrollY.percent}%`);
    }
  });

  return (
    <div ref={ref} className="w-[var(--scroll)] h-4 bg-red-500" {...props} />
  );
};

const App = () => {
  const { ref, scrollY } = useScroll<HTMLDivElement>();

  return (
    <div>
      <div className="bg-blue-500">
        <Motion scrollY={scrollY} />
      </div>
      <div
        ref={ref}
        data-slot="outer"
        className="size-100 p-2 overflow-auto border"
      >
        <div data-slot="inner" className="border border-red-500 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          repudiandae omnis minima illo architecto ipsa consequatur id nemo
          natus veniam nulla repellendus hic a! At reiciendis cum repellat hic
          aliquam! Culpa repellendus voluptatibus ipsam vero iste assumenda
          dolor similique provident veniam, maxime aperiam repellat officiis
          beatae, fugit porro, aliquam inventore amet eaque enim pariatur
          fugiat. Laboriosam beatae itaque id! Cupiditate! Veritatis, cupiditate
          tempore quia doloribus cumque magnam nam aliquid illum magni soluta
          quis quasi nostrum sequi. A harum, recusandae commodi iusto,
          dignissimos nesciunt aliquam similique, nemo beatae modi maiores ipsa!
          Facere adipisci a aliquam nisi, veritatis eos iusto laborum, error
          atque harum quisquam inventore tenetur eum aliquid suscipit quas dicta
          autem id! Quidem, eaque. Sunt nemo itaque quas ratione necessitatibus?
          Quo at consequatur, non accusantium magnam inventore quisquam!
          Aspernatur harum esse veniam expedita pariatur? Necessitatibus
          pariatur sed in cumque perferendis vitae quia incidunt officia itaque!
          Amet deleniti illum cum fugit. Amet earum et id in, obcaecati,
          sapiente eligendi a beatae vitae totam ut aspernatur impedit provident
          eum error eaque adipisci asperiores laborum quia repellendus dolores
          architecto mollitia doloribus minus. Natus. Repellendus consequatur,
          aperiam numquam rerum accusantium totam aliquid adipisci voluptatibus
          facilis provident repellat sapiente quae at suscipit aspernatur omnis,
          fugit voluptas debitis recusandae porro nam harum excepturi. Nam,
          molestiae cumque. Alias repellat dolore, ratione optio sapiente
          deserunt quas aperiam impedit mollitia ad nostrum recusandae animi
          officia fugit quaerat dicta eligendi, vitae vel porro minima enim
          doloremque temporibus labore! Aut, provident! Optio totam rem,
          voluptas cupiditate sed expedita reiciendis soluta dolorem sint porro,
          omnis ea corporis minima amet perspiciatis ratione ipsum ipsa
          perferendis accusamus reprehenderit nisi alias, dolor nulla earum!
          Adipisci! Quia, eveniet libero dolorem ullam fuga a officia, ipsum
          neque doloribus, veniam harum aliquam autem earum ad velit quaerat
          consequuntur distinctio deserunt tempora accusamus? Similique, quis
          explicabo. Autem, iusto explicabo?
        </div>
      </div>
    </div>
  );
};

export default App;
