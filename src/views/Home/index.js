import React, {useEffect, useState } from 'react';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import Books from '../components/Books';
import './styles.css';
import api from '../../services/api';

export default function Home(){

    const [passage, setPassage] = useState([]);
    const [books, setBooks] = useState([]);
    const [currentBook, setCurrentBook] = useState("");
    const [currentChapter, setCurrentChapter] = useState(1);

    useEffect(() => {
        getBooks();
        getChapters("gn");
    }, []);
    
    async function getText(book, chapter){
        if(book && chapter){
            const books = await api.get("verses/acf/"+book+"/"+chapter);
            setPassage(books.data.verses);
            console.log(books);
        }
        else{
            const books = await api.get("verses/acf/"+book+"/1");
            setPassage(books.data.verses);
            console.log(books);
        } 
        console.log(book);
        console.log(chapter);
    }

    async function getBooks(){
        const resBooks = await api.get("books");
        setBooks(resBooks.data);
    }

    const TextPassage = () => (
        passage.map(passage => (
            <h3 className='passage' key={passage.number}><div class='verse'>{passage.number}</div> {passage.text}</h3>
        ))
    );
    
    async function getChapters(book){
        const resChapter = await api.get("books/"+book);
        getText(book, "1");
        setCurrentBook(book);
        const select = document.getElementById("chapters");
        select.innerHTML = '';
        
        Array.apply(null, Array(resChapter.data.chapters)).map(function (x, i) { 
            var tag = document.createElement("option");
            const chapter = i+1;
            var text = document.createTextNode(i+1);
            tag.appendChild(text);
            tag.value = i+1;
            tag.id = "tag";
            select.appendChild(tag);
        });

    }

    async function nextChapter(){
        const text = await api.get("books/"+currentBook);
        getText(currentBook, currentChapter+1);
        setCurrentChapter(currentChapter+1);
    }

    async function previousChapter(){
        const text = await api.get("books/"+currentBook);
        if(currentChapter > 1){
            getText(currentBook, currentChapter-1);
            setCurrentChapter(currentChapter-1);
        }
    }


    return(
        <div>
            <section className='buttons'>
                <button onClick={() => previousChapter()} className='buttonLeft'><FiChevronLeft className='Arrow'/></button>

                <div>
                    <select onChange={e => getChapters(e.target.options[e.target.selectedIndex].value)} className='livros'>
                        {books.map(books => (
                                <option value={books.abbrev.pt} key={books.name} name={books.name}>{books.name}</option>
                            ))
                        }
                    </select>
                    <select id='chapters' className='chapters' onChange={e => {getText(currentBook, e.target.options[e.target.selectedIndex].value); setCurrentChapter(e.target.options[e.target.selectedIndex].value)}}>
                    </select>
                </div>

                <button onClick={() => nextChapter()} className='buttonRight'><FiChevronRight className='Arrow'/></button>
            </section>
            <main className='text'>
                <TextPassage/>
            </main>
        </div>
    );
}