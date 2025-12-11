import { Card } from '@ui';

export const CardDemo = () => (
  <Card as="article" className="w-100 mx-auto">
    <Card.Header as="header">
      <Card.Title as="h2">Card.Title</Card.Title>
      <Card.Description as="p">Card.Description</Card.Description>
    </Card.Header>
    <Card.Content className="text-justify">
      Card.Content:
      <br />
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae nisi
      recusandae, ex voluptatibus, voluptatem, assumenda odit eveniet
      reprehenderit corporis earum beatae consequuntur aliquam! Enim neque
      voluptas ex non consectetur eaque.
    </Card.Content>
    <Card.Footer as="footer">Card.Footer</Card.Footer>
  </Card>
);
