import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home/Home";
import Header from "./layout/Header/Header";
import Nav from "./layout/Nav/Nav";
import "./styles/index.scss";
import "./styles/utils.scss";
import "./styles/responsive.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Header/>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </Router>
    </React.StrictMode>
);


/*

DIRECTIVES :
 - tout liens => #
 - desktop uniquement : écrans d’au moins 1024 par 780 pixels.
 - soit D3, soit Recharts.
 - utiliser fetch pour req http vers API EN DEHORS des composants
    => mise en place d'un service
 - standardiser les données venant de l'API
 - documentes ton projet : readme, jsdoc, prototypes

??????? :
 - mock des données de l'API obligatoire
 - utilisation du routage
 - kaban : backlog + todos ?
 */
