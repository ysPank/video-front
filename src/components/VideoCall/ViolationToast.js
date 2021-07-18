import { Button } from 'antd'
import React from 'react'

const ViolationToast = ({ closeToast, acceptVideo }) => {
  return (
    <div>
      <div>
        Cup alert!
      </div>
      <Button
        onClick={() => {
          acceptVideo();
          closeToast();
        }}
      >
        Show anyway
      </Button>
    </div>
  )
}

export default ViolationToast
