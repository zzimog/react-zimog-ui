import { Select } from '@ui';
import { Page } from '@app/components';

export const PageSelect = () => (
  <Page
    id="select"
    title="Select"
    menu={{
      overview: 'Overview',
      props: 'Props',
    }}
  >
    <Page.Article
      id="overview"
      description="Animated component which expands to reveal content and collapses to hide it."
      code={`
          <Select>
            <Select.Option value="lorem">Lorem</Select.Option>
            <Select.Group>
              <Select.Legend>Lorem ipsum</Select.Legend>
              <Select.Option value="ipsum">Ipsum</Select.Option>
            </Select.Group>
          </Select>
        `}
      children={
        <div className="mx-auto max-w-md">
          <Select>
            <Select.Option value="apple">Apple</Select.Option>
            <Select.Option value="banana">Banana</Select.Option>
            <Select.Option value="blueberry">Blueberry</Select.Option>
            <Select.Option value="grapes">Grapes</Select.Option>
            <Select.Option value="pineapple">Pineapple</Select.Option>
            <Select.Group>
              <Select.Legend>Vegetables</Select.Legend>
              <Select.Option value="aubergine">Aubergine</Select.Option>
              <Select.Option value="broccoli">Broccoli</Select.Option>
              <Select.Option value="carrot">Carrot</Select.Option>
              <Select.Option value="courgette">Courgette</Select.Option>
              <Select.Option value="leek" disabled>
                Leek
              </Select.Option>
            </Select.Group>
            <Select.Group disabled>
              <Select.Legend>Meat</Select.Legend>
              <Select.Option value="beef">Beef</Select.Option>
              <Select.Option value="chicken">Chicken</Select.Option>
              <Select.Option value="lamb">Lamb</Select.Option>
              <Select.Option value="pork">Pork</Select.Option>
            </Select.Group>
          </Select>
        </div>
      }
    />

    <Page.Article id="props">
      <i>coming soon</i>
    </Page.Article>
  </Page>
);
