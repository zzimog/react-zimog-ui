import { Select } from '@ui';

export const TestPage = () => {
  return (
    <>
      <select>
        {Array.from({ length: 50 }).map((_, i) => (
          <option key={i} value={`${i}`}>
            Item {i}
          </option>
        ))}
      </select>
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
    </>
  );
};
