import React from 'react'
import { Input } from './Input'
import { Select } from './Select'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'number' | 'email' | 'password' | 'select'
  options?: { label: string; value: string }[]
  required?: boolean
  error?: string
  value?: string | number
  onChange?: (value: string | number) => void
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  options,
  required = false,
  error,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === 'select' && options ? (
        <Select
          id={name}
          name={name}
          options={options}
          value={value as string}
          onChange={(e) => onChange?.(e.target.value)}
          error={error}
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          error={error}
        />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

interface FormProps {
  onSubmit: (e: React.FormEvent) => void
  children: React.ReactNode
}

export const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {children}
    </form>
  )
} 