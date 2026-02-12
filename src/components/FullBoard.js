import React,{useRef, useEffect}from 'react'

export default function FullBoard(props) {

    const canvasRef = useRef(null);

    useEffect(() => {
        const root = canvasRef.current;
        if (!root) return;

        root.style.position = 'relstive'

        let dragged = null;
        let shiftX = 0;
        let shiftY = 0;
        
        const onMouseDown = (e) => {
            const el = e.target;
            while(!el && el !== root && !el.hasAttribute('data-js-dsn')){
                el = el.parentElemnt
            }
            if(!el || el === root) return;

            if(window.getComputedStyle(el).position !== 'absolute'){
                el.style.position = 'absolute'
                el.style.cursor = 'grabbing'
            }

            const elRect = el.getBoundingClientRect();
            shiftX = e.clientX - elRect.left;
            shiftY = e.clientY - elRect.top;

            dragged = el;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

        }

        const onMouseMove = (e) => {
            if(!dragged) return;

            const rect = root.getBoundingClientRect();
            let left = e.clientX - rect.left - shiftX;
            let top = e.clientY - rect.top - shiftY;

            const maxW = rect.width - dragged.offsetWidth;
            const maxH = rect.height - dragged.offsetHeight;

            if(left<0) left =0;
            if(top<0) top = 0;
            if(left>maxW) left = maxW;
            if(top>maxH) top = maxH;

            dragged.style.left = left +'px';
            dragged.style.top = top+'px';
        }

        const onMouseUp =()=> {
            if(!dragged) {
                dragged.clssList.remove('is-dragging');
                dragged.style.cursor = 'grab'
            }

            dragged = null;

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

        }

        root.addEventListener('mousedown', onMouseDown);

        return () =>{
            root.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }


    }, [])

  return (
    <div>
        <h1>Вся информация о доске</h1>
        
        <div className='canvas'>
            <div className='board' ref={canvasRef}>
                <div className='cricle dragged' data-js-dnd></div>
                <div className='square dragged' data-js-dnd></div>
                <div className='text dragged' data-js-dnd></div>
            </div>
        
            <div className='card'>
                <h2>{props.board.title}</h2>
                <h4>{props.board.description}</h4>
                <h3>{props.board.createdAt}</h3>
                <button onClick={() => props.showBoard(null)}>Назад</button>
            </div>
        </div>
    </div>
  )
}
