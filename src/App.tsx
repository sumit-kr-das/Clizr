import { RouterProvider } from 'react-router-dom';
import ScrollTop from './components/global/ScrollTop';
import router from './routes';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <Provider store={store}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />            <ScrollTop>
                <RouterProvider router={router} />
            </ScrollTop>
        </Provider>
    );
}

export default App;
