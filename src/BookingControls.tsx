import { CalendarDays } from 'lucide-react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import Select, { type StylesConfig } from 'react-select'
import 'react-datepicker/dist/react-datepicker.css'

type SelectOption = { value: string; label: string }

type BookingServiceSelectProps = {
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}

type BookingTimeSelectProps = {
  inputId?: string
  name?: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
  placeholder?: string
}

type BookingDatePickerProps = {
  value: string
  minDate: string
  onChange: (value: string) => void
}

const selectStyles: StylesConfig<SelectOption> = {
  control: (base, state) => ({
    ...base,
    width: '100%',
    boxSizing: 'border-box',
    minHeight: 45,
    marginTop: 6,
    borderColor: state.isFocused ? '#0052cc' : '#dce3ec',
    borderRadius: 0,
    boxShadow: state.isFocused ? '0 0 0 2px rgba(0, 82, 204, 0.12)' : 'none',
    cursor: 'pointer',
    '&:hover': { borderColor: '#0052cc' },
  }),
  valueContainer: (base) => ({ ...base, paddingInline: 12 }),
  placeholder: (base) => ({ ...base, color: '#9ba6b4', fontSize: 11 }),
  singleValue: (base) => ({ ...base, fontSize: 11 }),
  input: (base) => ({ ...base, fontSize: 11 }),
  indicatorSeparator: () => ({ display: 'none' }),
  menu: (base) => ({
    ...base,
    zIndex: 20,
    marginTop: 3,
    border: '1px solid #dce3ec',
    borderRadius: 0,
    boxShadow: '0 14px 30px rgba(0, 31, 92, 0.13)',
  }),
  menuPortal: (base) => ({ ...base, zIndex: 20 }),
  option: (base, state) => ({
    ...base,
    padding: '10px 12px',
    backgroundColor: state.isSelected
      ? '#0052cc'
      : state.isFocused
        ? '#edf4ff'
        : 'white',
    color: state.isSelected ? 'white' : '#001f5c',
    fontSize: 11,
    cursor: 'pointer',
  }),
}

function localDateString(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function BookingServiceSelect({
  value,
  options,
  onChange,
}: BookingServiceSelectProps) {
  return (
    <Select<SelectOption, false>
      inputId="booking-service"
      name="service"
      required
      classNamePrefix="quadranex-select"
      className="booking-select"
      options={options}
      value={options.find((option) => option.value === value) ?? null}
      onChange={(option) => onChange(option?.value ?? '')}
      placeholder="Choose a service"
      isSearchable={false}
      aria-label="Interested service"
      menuPlacement="auto"
      styles={selectStyles}
    />
  )
}

export function BookingTimeSelect({
  inputId = 'booking-time',
  name = 'time',
  value,
  options,
  onChange,
  placeholder = 'Choose a time window',
}: BookingTimeSelectProps) {
  return (
    <Select<SelectOption, false>
      inputId={inputId}
      name={name}
      required
      classNamePrefix="quadranex-select"
      className="booking-select"
      options={options}
      value={options.find((option) => option.value === value) ?? null}
      onChange={(option) => onChange(option?.value ?? '')}
      placeholder={placeholder}
      isSearchable={false}
      aria-label="Preferred time"
      menuPlacement="auto"
      styles={selectStyles}
    />
  )
}

export function BookingDatePicker({ value, minDate, onChange }: BookingDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  function prepareCalendar() {
    document.getElementById('booking-date')?.scrollIntoView({
      behavior: 'auto',
      block: 'center',
    })
    setIsOpen(true)
  }

  return (
    <DatePicker
      id="booking-date"
      name="date"
      open={isOpen}
      onInputClick={prepareCalendar}
      onCalendarOpen={prepareCalendar}
      onCalendarClose={() => setIsOpen(false)}
      onClickOutside={() => setIsOpen(false)}
      selected={value ? new Date(`${value}T12:00:00`) : null}
      onChange={(date: Date | null) => {
        onChange(date ? localDateString(date) : '')
        setIsOpen(false)
      }}
      onSelect={() => {
        window.requestAnimationFrame(() => setIsOpen(false))
      }}
      minDate={new Date(`${minDate}T12:00:00`)}
      dateFormat="dd MMMM yyyy"
      placeholderText="Choose a date"
      required
      shouldCloseOnSelect
      preventOpenOnFocus
      popperPlacement="bottom-start"
      showIcon
      toggleCalendarOnIconClick
      icon={<CalendarDays size={17} aria-hidden="true" />}
      calendarStartDay={1}
      showPopperArrow={false}
    />
  )
}
