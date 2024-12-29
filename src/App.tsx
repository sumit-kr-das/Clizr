import { RouterProvider } from 'react-router-dom';
import ScrollTop from './components/global/ScrollTop';
import router from './routes';

function App() {
    return (
        <ScrollTop>
            <RouterProvider router={router} />
        </ScrollTop>
    );
}

export default App;
