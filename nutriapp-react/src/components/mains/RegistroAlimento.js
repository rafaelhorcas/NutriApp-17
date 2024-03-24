import React, { useState } from 'react';
import '../../App.css'

export default function RegistroAlimento() {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !calories) return;
        setName('');
        setCalories('');
    };
    return (
        <div className='main'>
            <h1>REGISTRO</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Calorías:
                    <input
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                    />
                </label>
                <button type="submit">Añadir</button>
            </form>
        </div>

    );
}

