import React, {useEffect, useState } from 'react';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import Books from '../components/Books';
import './styles.css';
import api from '../../services/api';

export default function Home(){

    const [passage, setPassage] = useState([]);
    const [books, setBooks] = useState([]);
    const [selected, setSelected] = useState("");
    const [chapters, setChapters] = useState(0);
    const [options] = useState([]);

    useEffect(() => {
        getText();
        getBooks();
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
            <h3 key={passage.number}>{passage.number}{passage.text}</h3>
        ))
    );
    
    async function getChapters(book){
        const resChapter = await api.get("books/"+book);
        setChapters(resChapter.data.chapters);
        for(var i = 1; i <= chapters; i++){
            options.push(<option value={i}>{i}</option>);
        }
        console.log(resChapter.data);
    }

    return(
        <div>
            <section className='buttons'>
                <button className='buttonLeft'><FiChevronLeft className='Arrow'/></button>

                <div>
                    <select className='livros'>
                        {books.map(books => (
                                <option onClick={() => getChapters(books.abbrev.pt)} key={books} name={books.name}>{books.name}</option>
                            ))
                        }
                    </select>
                    <select className='chapters'>
                        {
                            options
                        }
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