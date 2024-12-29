import { RouterProvider } from 'react-router-dom';
import ScrollTop from './components/global/ScrollTop';
import router from './routes';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
    return (
        <Provider store={store}>
            <ScrollTop>
                <RouterProvider router={router} />
            </ScrollTop>
        </Provider>
    );
}

export default App;
