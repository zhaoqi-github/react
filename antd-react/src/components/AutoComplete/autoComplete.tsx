import { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react'
import Input, { BaseInputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickSide';
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<BaseInputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props

  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const triggerSearch = useRef(false) // 控制是否触发 fetchSuggestions，handleClick 不触发
  const componentRef = useRef<HTMLDivElement>(null)
  const debounceValue = useDebounce(inputValue, 500)
  useClickOutside(componentRef, () => { setSuggestions([]) })

  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(inputValue as string)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  }, [debounceValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  // 高亮某一项
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter': // 回车
        if (suggestions[highlightIndex]) {
          handleClick(suggestions[highlightIndex])
        }
        break
      case 'ArrowUp': // up
        highlight(highlightIndex - 1)
        break
      case 'ArrowDown': // down
        highlight(highlightIndex + 1)
        break
      case 'Escape': // esc
        // setShowDropdown(false)
        break
      default:
        break
    }
  }

  const handleClick = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    triggerSearch.current = false;
    if (onSelect) {
      onSelect(item)
    }
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'is-active': index === highlightIndex
          })
          return (
            <li key={index} onClick={() => { handleClick(item) }} className={cnames}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && <ul><Icon icon="spinner" spin /></ul>}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}



