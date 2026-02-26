import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function FullBoard() {
  const navigate = useNavigate();
  const [board, setBoard] = useState<{
    title: string;
    description: string;
    createdAt: string;
  }>();
  const { boardId } = useParams<{ boardId: string }>();
  useEffect(() => {
    async function fetchBoard() {
      try {
        const { data } = await axios.get(
          "https://698e3096aded595c25314dea.mockapi.io/boards/" + boardId,
        );
        setBoard(data);
      } catch {
        alert("Ошибка запроса");
        navigate("/interectboard");
      }
    }
    fetchBoard();
  }, [navigate, boardId]);

  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = canvasRef.current;
    if (!root) return;

    root.style.position = "relative";

    let dragged: HTMLElement | null = null;
    let shiftX = 0;
    let shiftY = 0;

    const onMouseDown = (e: MouseEvent) => {
      let el = e.target as HTMLElement;
      while (el && el !== root && !el.hasAttribute("data-js-dnd")) {
        el = el.parentElement as HTMLElement;
      }
      if (!el || el === root) return;

      if (window.getComputedStyle(el).position !== "absolute") {
        el.style.position = "absolute";
        el.style.cursor = "grabbing";
      }

      const elRect = el.getBoundingClientRect();
      shiftX = e.clientX - elRect.left;
      shiftY = e.clientY - elRect.top;

      dragged = el;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragged) return;

      const rect = root.getBoundingClientRect();
      let left = e.clientX - rect.left - shiftX;
      let top = e.clientY - rect.top - shiftY;

      const maxW = rect.width - dragged.offsetWidth;
      const maxH = rect.height - dragged.offsetHeight;

      if (left < 0) left = 0;
      if (top < 0) top = 0;
      if (left > maxW) left = maxW;
      if (top > maxH) top = maxH;

      dragged.style.left = left + "px";
      dragged.style.top = top + "px";
    };

    const onMouseUp = () => {
      if (dragged) {
        dragged.classList.remove("is-dragging");
        dragged.style.cursor = "grab";
      }

      dragged = null;

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    root.addEventListener("mousedown", onMouseDown);

    return () => {
      root.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

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
          {board ? (
            <>
              <h2>{board.title}</h2>
              <h4>{board.description}</h4>
              <h3>{board.createdAt}</h3>
            </>
          ) : (
            <p>Загрузка...</p>
          )}
          <Link to='/interectboard'>
            <button className='btn-card'>Назад</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
