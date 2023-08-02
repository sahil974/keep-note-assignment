import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add';
// import Note from './Note';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BASE_URL from '../url';


const CreateNote = () => {
    const [expand, setExpand] = useState(false);
    const [allNote, setAllNote] = useState([])
    const [editIndex, setEditIndex] = useState(-1);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");

    const [note, setNote] = useState({
        title: "",
        content: "",
        status: false
    });

    useEffect(() => {
        axios.get(BASE_URL + "/note")
            .then((res) => {
                // console.log(res.data.notes)
                setAllNote(res.data.notes)
            })
    }, [setNote])

    async function doneClicked(id) {
        await axios.post(BASE_URL + "/note/done/" + id)
            .then((res) => {
                setAllNote(res.data.notes)
            })
    }

    function changeHandler(event) {
        const { name, value } = event.target;
        setNote(function (oldData) {
            return {
                ...oldData,
                [name]: value,
            };
        });
        // console.log(note);
    };

    function addNote() {

        if (!note.content || !note.title) {
            alert('fill the data')
        }
        else {

            // axios.post(BASE_URL + "/notes")
            //     .then((res) => {
            //         if (res.data === "done")
            //             alert("user created")
            //     })

            axios.post(BASE_URL + "/note", note)
                .then((res) => {
                    if (res.data === 'notadded') {
                        alert("not added")
                    }
                    else {
                        // alert("added to database")
                        setAllNote(res.data)
                    }
                })

            setNote({
                title: "",
                content: ""
            });
        }
    }

    function expandNote() {
        setExpand(true);
    }

    function hideNote() {
        setExpand(false);
    }

    async function removeNote(id) {

        await axios.delete(BASE_URL + "/note/" + id)
            .then((res) => {
                if (res.data === "deleted") {
                    // alert("deleted")
                }
                else {
                    alert("not deleted")
                }
            })
            .catch((err) => {
                console.log(err)
            })

        const temp = allNote.filter((ele, ind) => {
            return ind !== id
        })

        setAllNote(temp)

    }

    async function updateNote(index) {
        if (updatedContent.trim() === "" || updatedTitle.trim() === "") {
            alert("Enter the fields");
        }

        else {
            await axios.patch(BASE_URL + "/note/" + index, { content: updatedContent, title: updatedTitle })
                .then((res) => {
                    // Update the state with the updated note content
                    setAllNote(res.data)

                    // setAllNote(prevNotes => {
                    //     const updatedNotes = [...prevNotes];
                    //     updatedNotes[index].content = updatedContent;
                    //     return updatedNotes;
                    // });
                    setEditIndex(-1);
                    setUpdatedContent("");
                    setUpdatedTitle("")
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // const noteId = allNote[index]._id;


    }

    return (

        <>
            <div className='main_note'>
                <form action="" onDoubleClick={hideNote}>
                    {expand ?
                        <input
                            type="text"
                            placeholder="Title"
                            autoComplete='off'
                            name='title'
                            value={note.title}
                            onChange={changeHandler}
                        />
                        : null}
                    <textarea
                        cols=""
                        rows=""
                        placeholder='Write a note'
                        name='content'
                        value={note.content}
                        onChange={changeHandler}
                        onClick={expandNote}
                        onDoubleClick={hideNote}
                    />
                    {expand ?
                        <Button className='plus-button' onClick={addNote}>{<AddIcon className='plus_sign' />}</Button>
                        : null}
                </form>
            </div>

            {allNote.map(function (val, index) {
                return (
                    <div className='note' key={index}>
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedTitle}
                                    placeholder={val.title}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                />
                                <textarea
                                    value={updatedContent}
                                    placeholder={val.content}
                                    onChange={(e) => setUpdatedContent(e.target.value)}
                                />
                                <button className='update-buttons' onClick={() => updateNote(index)}>Update</button>
                                <button className='update-buttons' onClick={() => setEditIndex(-1)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h1 className={val.status ? 'noteH1 done' : 'noteH1'}>{val.title}</h1>
                                <br />
                                <p className={val.status ? 'done' : ''} >{val.content}</p>

                                <button className='done-button btn' onClick={() => doneClicked(index)}>
                                    <AddTaskIcon />
                                </button>

                                <button
                                    className='btn'
                                    onClick={() => removeNote(index)}
                                >
                                    <DeleteOutlineIcon className='deleteIcon' />
                                </button>

                                <button className='btn' onClick={() => setEditIndex(index)}>< EditNoteIcon className='update-icon' /></button>
                            </>
                        )}
                    </div>
                );
            })}
        </>
    )
}

export default CreateNote