import React, {useEffect, useState } from 'react';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import Books from '../components/Books';
import './styles.css';
import api from '../../services/api';

export default function Home(){

    const [passage, setPassage] = useState([]);
    const [books, setBooks] = useState([]);
    const [optionChapter] = useState([]);

    useEffect(() => {
        getText();
        getBooks();
        getChapters("gn");
    }, []);
    
    async function getText(){
        const books = await api.get("verses/nvi/jo/3");
        setPassage(books.data.verses);
    }

    async function getBooks(){
        const resBooks = await api.get("books");
        setBooks(resBooks.data);
    }

    const TextPassage = () => (
        passage.map(passage => (
            <h3 className='passage' key={passage.number}>{passage.number} {passage.text}</h3>
        ))
    );
    
    async function getChapters(book){
        const resChapter = await api.get("books/"+book);
        const select = document.getElementById("chapters");
        select.innerHTML = '';
        
        Array.apply(null, Array(resChapter.data.chapters)).map(function (x, i) { 
            var tag = document.createElement("option");
            var text = document.createTextNode(i+1);
            tag.appendChild(text);
            select.appendChild(tag);
        });
    }

    return(
        <div>
            <section className='buttons'>
                <button className='buttonLeft'><FiChevronLeft className='Arrow'/></button>

                <div>
                    <select onChange={e => getChapters(e.target.options[e.target.selectedIndex].value)} className='livros'>
                        {books.map(books => (
                                <option value={books.abbrev.pt} key={books.name} name={books.name}>{books.name}</option>
                            ))
                        }
                    </select>
                    <select id='chapters' className='chapters'>
                    </select>
                </div>

                <button className='buttonRight'><FiChevronRight className='Arrow'/></button>
            </section>
            <main className='text'>
                <TextPassage/>
            </main>
        </div>
    );
}