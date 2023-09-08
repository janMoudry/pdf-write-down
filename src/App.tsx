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

  const [widthOfSignatures, setWidthOfSignatures] = useState<number>(100);
  const [heightOfSignatures, setHeightOfSignatures] = useState<number>(100);

  const [style, setStyle] = useState<CSSProperties>({
    width: `${widthOfSignatures}px`,
    height: `${heightOfSignatures}px`,
    position: "absolute",
    top: "0",
    left: "0",
    outline: "5px dotted black",
  });

  useEffect(() => {
    if (file) {
      pdfjs.getDocument(URL.createObjectURL(file)).promise.then((pdf) => {
        setNumberOfPages(pdf.numPages);

        pdf.getPage(currentPage).then((page) => {
          const scale = 1.5;
          const viewport = page.getViewport({ scale: scale });
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
  }, [file, currentPage]);

  const handleDrag = (e: React.DragEvent<HTMLInputElement>) => {};

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { pageX, pageY } = e;

    const offsetX = window.innerWidth / 2 - fileDimensions.width / 2;
    const offsetY = window.innerHeight / 2 - fileDimensions.height / 2;

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
    </div>
  );
};

export default App;
