import BaseLayout from "./layout/BaseLayout";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <BaseLayout />
        </BrowserRouter>
    );
}

export default App;
