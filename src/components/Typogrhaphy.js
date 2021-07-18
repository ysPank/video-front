import styled from 'styled-components'

import AntTitle from 'antd/lib/typography/Title'
import AntParagraph from 'antd/lib/typography/Paragraph'
import 'antd/lib/typography/style/css';

const Title = styled(AntTitle)`
    margin-top: 0;
    font-size: clamp(1rem, 10vw, 3.5rem);
    line-height: 1.2;
`

const Paragraph = styled(AntParagraph)`
    margin-bottom: 0 !important;
`;

export {
  Title,
  Paragraph,
};
