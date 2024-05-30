import React, { useState } from 'react'


export default function TextForm(props) {
    const toUppercasefun = function () {

        const upperCaseValue = text.toUpperCase();
        setText(upperCaseValue);
        props.alertmode('Text has been converted to uppercase', 'info');

    }

    const cleartextForm = function () {
        setText('');
    }
    const onChangeListner = function (event) {
        setText(event.target.value)
    }
    const [text, setText] = useState('Enter your text Here')

    return (
        <div>
            <div className="container">
                <form>
                    <div className="form-group">
                        <p className="textareatitle">{props.title}</p>
                        <textarea className="form-control" id="exampleFormControlTextarea1" style={{backgroundColor:props.mode === 'dark'?'white':'#c9c9e4'}} rows="3" onChange={onChangeListner} value={text}>{text}</textarea>
                    </div>
                </form>
                <div className="btn-group">
                    <button className="btn btn-primary mx-2" disabled={!text} onClick={toUppercasefun}>UpperCase</button>
                    <button className="btn btn-secondary mx-2" disabled={!text}>LowerCase</button>
                    <button className="btn btn-success mx-2" disabled={!text}> Reverse</button>
                    <button className="btn btn-info mx-2" disabled={!text}>Initial Capitals</button>
                    <button className="btn btn-danger mx-2" disabled={!text} onClick={cleartextForm}>Clear</button>
                </div>

            </div>

            <div className="container mt-4">
                <h2>Text Summary</h2>
                <p className="textboxdata">{text.trim().split(' ').filter((elem) => { return !(elem) ? '' : elem }).length} Words, {text.trim().length} Characters</p>
                <h3>Preview</h3>
                <p>{text}</p>
            </div>
        </div>


    )
}

TextForm.defaultProps = {
    title: 'Enter the Text details here'
}
