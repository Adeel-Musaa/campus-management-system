import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <img src="/path-to-logo.png" alt="University Logo" />
                <h2>Campus Managment System</h2>
            </div>
            <ul className="menu">
                <li>Dashboard</li>
                <li>Lecture Schedule</li>
                <li>Fee Challans</li>
                <li>Grade Book</li>
                <li>Roll Number Slip</li>
                <li>Datesheet</li>
                <li>Academic Calendar</li>
                <li>Student Services</li>
                <li>Scheme of Study</li>
                <li>E-Notifications</li>
                <li>Todo List</li>
                <li>Personal Diary</li>
            </ul>
        </div>
    );
};

export default Sidebar;