import { useState } from 'react'
import { isNameReserved, suggestAvailableName } from '../lib/arcadeScores'

export interface NameEditorProps {
  currentName: string
  onSave: (name: string) => void
  onCancel?: () => void
}

function validateName(trimmedName: string, currentName: string): string {
  if (!trimmedName) return 'Entre un prénom'
  if (isNameReserved(trimmedName) && trimmedName !== currentName) return 'taken'
  return ''
}

export default function NameEditor({ currentName, onSave, onCancel }: NameEditorProps) {
  const [inputValue, setInputValue] = useState(currentName)
  const [error, setError] = useState('')

  function handleSave(): void {
    const validationError = validateName(inputValue.trim(), currentName)
    if (validationError) { setError(validationError); return }
    onSave(inputValue.trim())
  }

  const isTaken = error === 'taken'
  const suggestion = isTaken ? suggestAvailableName(inputValue.trim()) : ''

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
      <input
        className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/40 w-full outline-none focus:border-white/40"
        value={inputValue}
        onChange={e => { setInputValue(e.target.value); setError('') }}
        placeholder="Ton prénom"
      />
      {error && !isTaken && <p className="text-red-400 text-sm">{error}</p>}
      {isTaken && (
        <div className="flex flex-col gap-1">
          <p className="text-[#F05063] text-sm">Ce nom est déjà pris</p>
          <button
            className="text-white/60 text-sm text-left hover:text-white transition-colors"
            onClick={() => { setInputValue(suggestion); setError('') }}
          >
            Essaie: {suggestion}
          </button>
        </div>
      )}
      <button
        onClick={handleSave}
        className="rounded-full px-8 py-3 text-white font-bold hover:opacity-90 transition-opacity"
        style={{ background: 'linear-gradient(135deg, #F7941E, #F05063)' }}
      >
        Enregistrer
      </button>
      {onCancel && (
        <button onClick={onCancel} className="text-white/40 text-sm hover:text-white/60 transition-colors text-center">
          Annuler
        </button>
      )}
    </div>
  )
}
