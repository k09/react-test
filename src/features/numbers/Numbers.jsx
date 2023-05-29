import { useGetNumbersQuery, useGetNumberQuery, useAddNumberMutation, useEditNumberMutation, useDeleteNumberMutation } from "./numbersSlice";  
import { useState, useEffect, useRef } from "react";
import { nanoid } from '@reduxjs/toolkit';
import { ThemeContext } from '../../app/ThemeContext';
import { useContext } from 'react';

const Numbers = () => {
    const [selected, setSelected] = useState({});
    const [editMode, setEditMode] = useState(false);
    const isEditMode = editMode === true ? 'yes' : 'no';
    const valueRef = useRef(0);
    const textRef = useRef('');
    useEffect(() => { 
        if (selected) {
            setEditMode(true);
        } else {
            setEditMode(false);
        }
    }, [selected]);
    const { data: numbersData, isLoading: isLoadingNumbers, isError: isErrorNumbers, error: errorNumbers  } = useGetNumbersQuery();
    const { data: numberData, isLoading: isLoadingNumber, isError: isErrorNumber, error: errorNumber } = useGetNumberQuery(selected ? selected.id : 0);
    const add = useAddNumberMutation();
    const edit = useEditNumberMutation();
    const del = useDeleteNumberMutation();
    const {theme} = useContext(ThemeContext);
    const canSave = 
        (valueRef && valueRef.current && valueRef.current.value.length > 0) && 
        (textRef && textRef.current && textRef.current.value.length > 0);

    const handleSave = (e) => {
        e.preventDefault();
        const id = editMode === true && selected !== null ? selected.id : nanoid();
        const value = valueRef.current.value;
        const text = textRef.current.value;
        const save = editMode === true && selected !== null  ? edit : add;
        save({ id, value, text });
        handleCancel();
    }
    const handleEdit = (number) => {
        valueRef.current.value = number.value;
        textRef.current.value = number.text;
        setSelected(number);
    }
    const handleDelete = (id) => {
        if (window.confirm(`Eyða færslu ${id}?`)) { del(id); }
    }
    const handleCancel = () => {
        valueRef.current.value = null;
        textRef.current.value = null;
        setSelected(null);
        valueRef.current.focus();
    }
    const handleSearch = (e) => {
        e.preventDefault();
    }
    const handleConsoleLog = () => {
        console.clear();
        console.log(valueRef.current.value);
        console.log(textRef.current.value);
        console.log(valueRef.current.value.length);
        console.log(textRef.current.value.length);
        
    }
    if (isLoadingNumbers) { return <p>Loading numbers......</p>; }
    if (isErrorNumbers) { return <p>Error numbers...... {errorNumbers}</p>; }
    if (isLoadingNumber) { return <p>Loading number......</p>; }
    if (isErrorNumber) { return <p>Error number...... {errorNumber}</p>; }
    return (
        <>
            <h3 className={theme}>RTK Query</h3>
            <p>
                Selected: {selected ? selected.id : 'None'}&nbsp;
                {numberData && numberData.length > 0 && `(${numberData[0].value}  ${numberData[0].text})`}<br/>
                Edit: {isEditMode}
            </p>
            {
                numbersData.map((number) => 
                    <div key={number.id}>
                        <button onClick={() => handleEdit(number)}>e</button>&nbsp;
                        <button onClick={() => handleDelete(number.id)}>d</button>&nbsp;
                        {number.value} {number.text} ({number.id})
                    </div>
                )
            }
            <br/>
            Value:&nbsp;<input type='number' id='number' ref={valueRef} /><br/>
            Text:&nbsp;&nbsp;&nbsp;<input type='text' id='text' ref={textRef} /><br/><br/>
            <button onClick={(e) => handleSave(e)} disabled={!canSave}>save</button>
            <button onClick={handleCancel} disabled={!canSave}>cancel</button><br/><br/><br/>
            <button onClick={handleSearch} disabled={true}>search</button>
            <button onClick={handleConsoleLog} disabled={false}>console.log(...)</button>
            <hr/>
        </>
    );
}
export default Numbers;