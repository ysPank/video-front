
import { Header as AntHeader } from 'antd/lib/layout/layout';
import styled from 'styled-components';

import NameInput from './NameInput';

const Header = styled(AntHeader)`
  padding: 2rem;
  background: var(--whitey);

  svg {
    fill: var(--dark);
  }
`;

const PageHeader = () => {
  return (
    <Header>
      <NameInput />
    </Header>
  );
}

export default PageHeader;
