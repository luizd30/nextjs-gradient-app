import { SelectedContext, SelectedContextType } from '@/context/selected-color-context'
import React, { useContext } from 'react'

export const Teste = () => {
    const {selectedColor} = useContext(SelectedContext) as SelectedContextType

    console.log(selectedColor)
  return (
    <div>teste</div>
  )
}
