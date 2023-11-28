import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from 'src/containers/LoginPage';
import RegisterPage from 'src/containers/RegisterPage';
import DashboardPage from 'src/containers/DashboardPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.instanceOf(Object).isRequired,
    location: PropTypes.instanceOf(Object).isRequired,
};

export default App;
