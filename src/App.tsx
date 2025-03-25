import './App.css';
import ItemsList from './components/ItemsList';

function App() {
  return (
    // Используем React Fragment (<>...</>) для группировки элементов без добавления лишнего DOM-элемента
    <>
      {/* Рендерим компонент ProjectList, который отвечает за отображение списка проектов */}
      <ItemsList />
    </>
  );

}

export default App;
