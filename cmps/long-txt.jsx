const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isLongTxtShown, setLongTxtShown] = useState(false)

    function getTxtToShow(isLongTxtShown, txt, length) {
        return (txt.length < length || isLongTxtShown) ? txt : txt.substring(0, length + 1) + '...'
    }

    function onToggleLongTxt() {
        setLongTxtShown((prevLongTxtShown) => !prevLongTxtShown)
    }
    
    return <div className="">
        <p>{getTxtToShow(isLongTxtShown, txt, length)}</p>
        {txt.length > length && <button onClick={onToggleLongTxt}>{isLongTxtShown ? 'Read less' : 'Read More' }</button>}
    </div>
}