
import { Header as AntHeader } from 'antd/lib/layout/layout';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import NameInput from '../components/NameInput';

const Header = styled(AntHeader)`
  padding: 2rem;
  background: var(--whitey);

  svg {
    fill: var(--dark);
  }
`

const PageHeader = () => {
  const user = useSelector(state => state.users.me);

  return (
    <Header>
      <NameInput name={user?.name} />
    </Header>
  );
}

export default PageHeader;
