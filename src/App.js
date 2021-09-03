import './App.css';
import FormProvider from './context/formContext';
import Form from './components/form/form';

function App() {
  return (
    <FormProvider>
      <div className='container'>
        <Form title='Most Excellent Form' name='testForm' />
      </div>
    </FormProvider>
  );
}

export default App;
