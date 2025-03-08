import { useState, useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'

type Todo = {
  id: number
  text: string
  completed: boolean
}

type TodoListProps = {
  initialTodos?: Todo[]
}

function TodoList({ initialTodos = [] }: TodoListProps) {
  const { t } = useTranslation()
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [inputValue, setInputValue] = useState<string>('')

  const addTodo = useCallback(() => {
    if (inputValue.trim() !== '') {
      setTodos(prevTodos => [...prevTodos, { id: Date.now(), text: inputValue, completed: false }])
      setInputValue('')
    }
  }, [inputValue])

  const toggleTodo = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    )
  }, [])

  const deleteTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }, [])

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="text-2xl font-bold mb-4">{t('todos:title')}</h2>
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="w-50 border rounded-md px-2 py-1 mr-2"
          placeholder={t('todos:itemPlaceholder')}
        />
        <button onClick={addTodo} className="bg-green-500 text-white px-4 py-2 rounded-md">
          {t('todos:itemAddButton')}
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{
                transform: 'scale(1.5)', // 체크박스 크기 조정
                marginRight: '10px', // 여백 조정
              }}
            />
            {/* 너비를 조정하여 삭제 버튼과 가까이 배치합니다. */}
            <span
              style={{ width: '40%' }} // 너비를 조정할 수 있습니다.
              className={`${todo.completed ? 'line-through text-gray-500' : ''}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white px-2 py-1 rounded-md ml-1"
            >
              {t('todos:itemDeleteButton')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(TodoList)
