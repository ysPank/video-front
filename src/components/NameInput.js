import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { updateMe } from '../api/socketHandlers';
import { Paragraph } from './Typogrhaphy'
import { NAME_MAX_LENGTH } from '../constants/validations'

const NameInput = () => {
  const user = useSelector(state => state.users.me);
  const [editingName, setEditingName] = useState();
  const [isEditing, setIsEditing] = useState();

  const handleUpdate = () => setEditingName(newName => {
    updateMe({ name: newName });
    setIsEditing(() => false);
    return newName
  })

  useEffect(() => {
    if(user?.name !== editingName) {
      setEditingName(user.name)
    }

    // eslint-disable-next-line
  }, [user])

  return (
    <Paragraph
      editable={{
        onChange: setEditingName,
        onEnd: handleUpdate,
        onCancel: () => {
          setEditingName(() => user.name);
          setIsEditing(() => false);
        },
        onStart: () => setIsEditing(true),
        editing: isEditing,
        maxLength: NAME_MAX_LENGTH,
      }}
    >
      {editingName}
    </Paragraph>

  )
}

export default NameInput;
