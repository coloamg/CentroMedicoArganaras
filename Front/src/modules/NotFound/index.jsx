import { Button, Result } from 'antd'

function NotFound() {
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
  return <h1>No estas logeado</h1>
}
export default NotFound
