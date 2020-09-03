import React, { useEffect, useState } from 'react';
import api from './../../../services/api';

export default function Books(){

    const [passage, setPassage] = useState([]);

    useEffect(() => {
        getText();
    }, []);
    
    async function getText(){
        const books = await api.get("books");
        setPassage(books.data);
    }

    console.log(passage);

    return(
        <div>
            <select className='livros'>
                    {passage.map(passage => (
                            <option key={passage.name} value={passage.name}>{passage.name}</option>
                        ))
                    }
            </select>
            <select className='chapters'>
                <option value='1'>1</option>
            </select>
        </div>
    );
}