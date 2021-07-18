import React from 'react'

import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  AudioMutedOutlined,
  SoundOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { Select } from 'antd';
import styled from 'styled-components';
import 'antd/lib/select/style/css';

import { resolutionOptions } from '../../constants/resolutionOptions';



const Bar = styled.div`
  position: absolute;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  background: var(--grayish);
  padding: 0 1rem;

  svg {
    margin-right: 1rem;

    path {
      fill: var(--dark);
    }
  }
`

const VideoControl = ({
  toggleMinify,
  toggleMute,
  setResolution,
  handleHangup,
  resolution,
  isMinified,
  isMuted,
}) => {
  return (
    <Bar>
      <div>
        {isMinified
          ? <FullscreenOutlined onClick={toggleMinify} />
          : <FullscreenExitOutlined onClick={toggleMinify} />
        }
        {isMuted
          ? <SoundOutlined onClick={toggleMute} />
          : <AudioMutedOutlined onClick={toggleMute} />
        }
        <ExportOutlined onClick={handleHangup} />
      </div>

      <div>
        <Select value={resolution} onChange={setResolution}>
        {resolutionOptions.map(option => (
          <Select.Option value={option} key={`resolution-${option}`}>
            {option}
          </Select.Option>
        ))}
      </Select>
      </div>
    </Bar>
  )
}

export default VideoControl
