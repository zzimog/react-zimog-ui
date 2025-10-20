/**
 * @todo Refactor
 */
import { poly } from '../../ui/polymorphic';

export const HighlightHighlighter = poly.div((Tag, inProps) => {
  const { ...props } = inProps;

  return <Tag {...props} />;
});
