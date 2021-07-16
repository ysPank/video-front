import { useEffect, useState } from 'react'
import { Paragraph } from './Typogrhaphy'


const NameInput = ({ name }) => {
  const [editingName, setEditingName] = useState();

  useEffect(() => {
    setEditingName(name);
  }, [name])

  return (
    <Paragraph
      editable={{
        onChange: setEditingName,
        onEnd: console.log,
      }}
    >
      {editingName}
    </Paragraph>

  )
}

export default NameInput;
