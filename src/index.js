import { createRoot } from "react-dom/client";
import { App } from './App';
import Modal from "react-modal";

import "./index.css";



const container = document.getElementById("root");
Modal.setAppElement(container);
const root = createRoot(container);
root.render(<App />);
