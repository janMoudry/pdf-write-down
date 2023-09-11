import React, { useState, useEffect, CSSProperties } from "react";
import "./App.css";
import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileDimensions, setFileDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [numebrOfPages, setNumberOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSigningDown, setIsSigningDown] = useState<boolean>(false);
  const [vectors, setVectors] = useState<{ x: number; y: number }[]>([]);

  const [widthOfSignatures, setWidthOfSignatures] = useState<number>(
    50 * scale,
  );
  const [heightOfSignatures, setHeightOfSignatures] = useState<number>(
    50 * scale,
  );

  const [style, setStyle] = useState<CSSProperties>({
    width: `${widthOfSignatures}px`,
    height: `${heightOfSignatures}px`,
    position: "absolute",
    top: "0",
    left: "0",
    outline: "2px dotted black",
  });

  useEffect(() => {
    if (file) {
      pdfjs.getDocument(URL.createObjectURL(file)).promise.then((pdf) => {
        setNumberOfPages(pdf.numPages);

        pdf.getPage(currentPage).then((page) => {
          const viewport = page.getViewport({ scale });
          const canvas = document.getElementById("canvas") as HTMLCanvasElement;
          const context = canvas.getContext("2d") as CanvasRenderingContext2D;
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          setFileDimensions({
            width: viewport.width,
            height: viewport.height,
          });

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          page.render(renderContext);
        });
      });
    }
  }, [file, currentPage, scale]);

  const handleDrag = (e: React.DragEvent<HTMLInputElement>) => {};

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { pageX, pageY } = e;

    const offsetX = window.innerWidth / 2 - fileDimensions.width / 2;
    const offsetY =
      document.documentElement.scrollHeight / 2 - fileDimensions.height / 2;

    let x = pageX - offsetX - widthOfSignatures;
    let y = pageY - offsetY - heightOfSignatures;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > fileDimensions.width - widthOfSignatures)
      x = fileDimensions.width - widthOfSignatures;
    if (y > fileDimensions.height - heightOfSignatures)
      y = fileDimensions.height - heightOfSignatures;

    setStyle((prevState) => ({
      ...prevState,
      top: `${y}px`,
      left: `${x}px`,
    }));
  };

  useEffect(() => {
    setWidthOfSignatures(50 * scale);
    setHeightOfSignatures(50 * scale);
    setStyle((prevState) => ({
      ...prevState,
      left: 0,
      top: 0,
      width: `${50 * scale}px`,
      height: `${50 * scale}px`,
    }));
  }, [scale]);

  const handleSignDownDocument = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSignDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { pageX, pageY } = e;

    setVectors((prevState) => [
      ...prevState,
      {
        x: pageX,
        y: pageY,
      },
    ]);
  };

  const handleSignDownCapture = () => {
    setIsSigningDown(true);
  };
  const handleSignDownCaptureStop = () => {
    setIsSigningDown(false);
  };

  // draw signature
  useEffect(() => {
    if (vectors.length === 0) return;
    const timeout = setTimeout(() => {
      const canvas = document.getElementById("signature") as HTMLCanvasElement;
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;

      context.clearRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.moveTo(vectors[0].x, vectors[0].y);
      context.strokeStyle = "black";
      context.lineWidth = 2;

      for (let i = 1; i < vectors.length; i++) {
        context.lineTo(vectors[i].x, vectors[i].y);
      }
      context.stroke();

      console.log(context);
    }, 500);

    return () => clearTimeout(timeout);
  }, [vectors]);

  return (
    <div className="app">
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <section>
        <button
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage((prevState) => prevState - 1);
            }
          }}
        >
          {"<"}
        </button>

        <h1
          style={{
            color: "white",
          }}
        >
          {currentPage} ({numebrOfPages})
        </h1>

        <button
          onClick={() => {
            if (currentPage < numebrOfPages) {
              setCurrentPage((prevState) => prevState + 1);
            }
          }}
        >
          {">"}
        </button>
        <div>
          <button
            onClick={() => setScale((prevState) => prevState - 0.1)}
            disabled={scale <= 0.5}
          >
            -
          </button>
          <button onClick={() => setScale(1)}> default </button>
          <button
            onClick={() => setScale((prevState) => prevState + 0.1)}
            disabled={scale >= 1.5}
          >
            +
          </button>
        </div>
        <button onClick={handleSignDownDocument} disabled={!Boolean(file)}>
          Podepsat
        </button>
      </section>

      {Boolean(file) && (
        <div
          style={{
            position: "relative",
          }}
        >
          <canvas id="canvas"></canvas>
          <div
            style={style}
            onDragOver={handleDrag}
            onDragEnd={handleDrop}
            // click and hold to drag
            draggable
          />
        </div>
      )}
      <div
        className="modal"
        style={{
          display: isModalOpen ? "block" : "block",
        }}
      >
        <button onClick={handleCloseModal} className="close">
          X
        </button>
        <div className="signature">
          <canvas
            id="signature"
            onMouseDown={handleSignDownCapture}
            onMouseUp={handleSignDownCaptureStop}
            onMouseMove={isSigningDown ? handleSignDown : () => {}}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default App;
