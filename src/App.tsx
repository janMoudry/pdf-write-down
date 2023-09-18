import React, { useState, useEffect, CSSProperties } from "react";
import "./App.css";
import * as pdfjs from "pdfjs-dist";
import jsPDF from "jspdf";

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
  const [isSigned, setIsSigned] = useState<boolean>(false);
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
  });

  const signatureRef = React.useRef<HTMLCanvasElement>(null);

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
            width: viewport.width * scale,
            height: viewport.height * scale,
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

    if (!style) return;

    const { pageX, pageY } = e;

    const offsetX = window.innerWidth / 2 - fileDimensions.width / 2 / scale;
    const offsetY =
      document.documentElement.scrollHeight / 2 -
      fileDimensions.height / 2 / scale;

    let x = pageX - offsetX - widthOfSignatures * 1.5;
    let y = pageY - offsetY - heightOfSignatures / 2;

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
      top: "0px",
      left: "0px",
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

      context.strokeStyle = "black";
      context.lineWidth = 0.5;

      context.beginPath();

      for (let i = 1; i < vectors.length; i++) {
        const absoluteWidthOfSignatures = window.innerWidth * 0.25;
        const absoluteHeightOfSignatures = window.innerHeight * 0.25;

        const xOffset = window.innerWidth / 2 - absoluteWidthOfSignatures / 2;
        const yOffset =
          document.documentElement.scrollHeight / 2 -
          absoluteHeightOfSignatures / 2;

        const x = ((vectors[i].x - xOffset) / absoluteWidthOfSignatures) * 100;
        const y = ((vectors[i].y - yOffset) / absoluteHeightOfSignatures) * 100;

        context.lineTo(x, y);
        context.moveTo(x, y);
      }
      context.stroke();

      setVectors([]);
    }, 500);

    return () => clearTimeout(timeout);
  }, [vectors]);

  useEffect(() => {
    // if signatureRef exist insert it to canvas file pdf file
    if (signatureRef.current && file) {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      const signature = signatureRef.current;

      const signaturePosition = {
        x: parseInt(style.left?.toString().replace("px", "") ?? "0"),
        y: parseInt(style.top?.toString().replace("px", "") ?? "0"),
      };

      context.drawImage(
        signature,
        signaturePosition.x,
        signaturePosition.y,
        signature.width,
        signature.height,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const handleDownload = async () => {
    if (isSigned && file && signatureRef.current) {
      const allPages: {
        pageNumber: number;
        page: Promise<pdfjs.PDFPageProxy> | pdfjs.PDFPageProxy;
      }[] = [];

      await pdfjs.getDocument(URL.createObjectURL(file)).promise.then((pdf) => {
        const numberOfPages = pdf.numPages;

        for (let i = 0; i <= numberOfPages; i++) {
          allPages.push({
            pageNumber: i,
            page: pdf.getPage(i),
          });
        }
      });

      const dpi = 300; // Adjust DPI value as needed for quality
      const scaleFactor = dpi / 96; // 96 is the default DPI

      // download pdf from replacePage
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [
          fileDimensions.width / scaleFactor,
          fileDimensions.height / scaleFactor,
        ],
      });

      for (let i = 1; i < allPages.length; i++) {
        if (!allPages[i].pageNumber) return;

        pdf.setPage(i);
        const page = await allPages[i].page;
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        if (currentPage !== allPages[i].pageNumber) {
          pdf.addImage(
            imgData,
            "JPEG",
            0,
            0,
            canvas.width / scaleFactor,
            canvas.height / scaleFactor,
          );
        } else {
          // here I need to connect page with signature and add it to my new pdf file
          const signature = signatureRef.current;

          const signaturePosition = {
            x: parseInt(style.left?.toString().replace("px", "") ?? "0"),
            y: parseInt(style.top?.toString().replace("px", "") ?? "0"),
          };

          pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            canvas.width / scaleFactor,
            canvas.height / scaleFactor,
          );

          pdf.addImage(
            signature,
            "PNG",
            signaturePosition.x / scaleFactor,
            signaturePosition.y / scaleFactor,
            signature.width / scaleFactor,
            signature.height / scaleFactor,
          );
        }

        if (i < allPages.length - 1) pdf.addPage();
      }
      pdf.save("download.pdf");
    }
  };

  return (
    <div className="app">
      <div
        className="controls"
        style={{
          display: isSigned ? "none" : "block",
        }}
      >
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
          accept="application/pdf"
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
              onClick={() =>
                setScale((prevState) => Math.round((prevState - 0.1) * 10) / 10)
              }
              disabled={scale <= 0.5}
            >
              -
            </button>
            <button onClick={() => setScale(1)}> default </button>
            <button
              onClick={() =>
                setScale((prevState) => Math.round((prevState + 0.1) * 10) / 10)
              }
              disabled={scale >= 1.5}
            >
              +
            </button>
          </div>
          <button onClick={handleSignDownDocument} disabled={!Boolean(file)}>
            Podepsat
          </button>
        </section>
      </div>

      {Boolean(file) && (
        <div
          style={{
            position: "relative",
          }}
        >
          <canvas id="canvas"></canvas>
          {!isSigned && (
            <div
              style={{
                ...style,
                outline: isSigned ? "none" : "2px dotted black",
              }}
              onDragOver={handleDrag}
              onDragEnd={handleDrop}
              // click and hold to drag
              draggable
            />
          )}
        </div>
      )}
      <div
        className="modal"
        style={{
          display: isModalOpen ? "block" : "none",
        }}
      >
        <button onClick={handleCloseModal} className="close">
          X
        </button>

        <canvas
          className="signature-container"
          id="signature"
          onMouseDown={handleSignDownCapture}
          onMouseUp={handleSignDownCaptureStop}
          onMouseMove={isSigningDown ? handleSignDown : () => {}}
          style={{
            zIndex: 100,
          }}
          width={"100%"}
          height={"100%"}
          ref={signatureRef}
        />
        <button
          onClick={() => {
            handleCloseModal();
            setIsSigned(true);
          }}
          style={{
            position: "absolute",
            bottom: "5%",
            right: "50%",
            transform: "translateX(50%)",
          }}
        >
          Podepsat
        </button>
      </div>
      {isSigned && <button onClick={handleDownload}> Stáhnout</button>}
    </div>
  );
};

export default App;
